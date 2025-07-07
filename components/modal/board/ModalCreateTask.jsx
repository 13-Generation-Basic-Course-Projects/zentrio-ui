"use client";
import React, { useState, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea,
  DateRangePicker,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { parseDate, today } from "@internationalized/date";
import { IconAdd } from "../../icon/everyicon";
import { taskFormSchema } from "@/lib/schemas/createTaskSchema";
import { createTaskByBoardIdAndGanttChartIdAction } from "@/action/board.action";
import { toast } from "react-toastify";
import PopupActionNoGanttChart from "@/components/popup/PopupActionNoGanttChart";
import { useRouter } from "next/navigation";

export default function ModalCreateTask({
  input,
  boardId,
  ganttChartId,
  ganttbar,
  allMemberInBoard,
  setActiveTab,
  userId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startedAt: "",
    finishedAt: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      dateRange: { start: "", end: "" },
      ganttBarId: "",
      teamLeader: "",
    },
  });

  // Watch ganttBarId to dynamically get selected Gantt bar for date constraints
  const ganttBarId = watch("ganttBarId");
  const selectedGanttBar = ganttbar?.payload?.find(
    (bar) => bar.ganttBarId === ganttBarId
  );

  // Check if current user is a manager
  const currentUser = allMemberInBoard?.find(
    (member) => member.userId === userId
  );
  const isCurrentUserManager =
    currentUser?.roles?.includes("ROLE_MANAGER") || false;

  // Prepare member options for autocomplete (exclude managers)
  const memberOptions = useMemo(() => {
    if (!Array.isArray(allMemberInBoard)) return [];
    return allMemberInBoard
      .filter((member) => !member.roles.includes("ROLE_MANAGER"))
      .map((member) => ({
        key: member.userId,
        label: member.username,
        value: member.userId,
        email: member.email,
        profileImage: member.profileImage,
        roles: member.roles,
      }));
  }, [allMemberInBoard]);

  // Helper functions to check Gantt bar status
  const getGanttBarStatus = (ganttBar) => {
    const today = new Date();
    const ganttStartDate = new Date(ganttBar.startedAt);
    const ganttEndDate = new Date(ganttBar.finishedAt);

    // Set all dates to start of day for proper comparison
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const ganttStart = new Date(
      ganttStartDate.getFullYear(),
      ganttStartDate.getMonth(),
      ganttStartDate.getDate()
    );
    const ganttEnd = new Date(
      ganttEndDate.getFullYear(),
      ganttEndDate.getMonth(),
      ganttEndDate.getDate()
    );

    //console.log(
    //   "Today:",
    //   todayStart,
    //   "Gantt Start:",
    //   ganttStart,
    //   "Gantt End:",
    //   ganttEnd
    // );

    if (ganttEnd < todayStart) {
      return "expired"; // Past end date
    } else if (ganttStart > todayStart) {
      return "not_started"; // Future start date
    } else {
      return "active"; // Currently active
    }
  };

  const isGanttBarExpired = (ganttBar) => {
    return getGanttBarStatus(ganttBar) === "expired";
  };

  const isGanttBarNotStarted = (ganttBar) => {
    return getGanttBarStatus(ganttBar) === "not_started";
  };

  // Updated: Only disable expired Gantt bars, allow not_started ones
  const isGanttBarDisabled = (ganttBar) => {
    const status = getGanttBarStatus(ganttBar);
    return status === "expired"; // Only disable expired bars
  };

  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const result = await createTaskByBoardIdAndGanttChartIdAction(
        data,
        boardId,
        ganttChartId
      );

      if (result.success) {
        toast.success("Task created successfully!");
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to create task");
      }
    } catch (error) {
      toast.error("An error occurred while creating task");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setApiError(null);
    onOpenChange();
  };

  // Handle no Gantt bars or invalid ganttChartId
  if (
    !Array.isArray(ganttbar?.payload) ||
    !ganttbar.payload.length ||
    ganttChartId === "No data available"
  ) {
    return (
      <PopupActionNoGanttChart
        ganttChartId={ganttChartId}
        setActiveTab={setActiveTab}
      />
    );
  }

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px]"
        fullWidth="true">
        <IconAdd />
        Create
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Task
              </ModalHeader>
              <ModalBody>
                {apiError && (
                  <p className="text-red-500 text-sm mb-4">{apiError}</p>
                )}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 gap-4">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Title"
                        labelPlacement="outside"
                        placeholder="Input your title"
                        type="text"
                        isInvalid={!!errors.title}
                        errorMessage={errors.title?.message}
                        classNames={{
                          label: "text-label font-medium",
                          inputWrapper: `
                            bg-white 
                            border
                            border-gray-300
                            shadow-none
                            rounded-small
                            px-3
                            py-6
                            ${errors.title ? "border-red-500" : ""}
                          `,
                          input: "text-black",
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="dateRange"
                    control={control}
                    render={({ field }) => (
                      <DateRangePicker
                        className="max-w-none"
                        minValue={
                          selectedGanttBar && isGanttBarNotStarted(selectedGanttBar)
                            ? parseDate(selectedGanttBar.startedAt.split("T")[0])
                            : today("Asia/Bangkok")
                        }
                        maxValue={
                          selectedGanttBar
                            ? parseDate(
                                selectedGanttBar.finishedAt.split("T")[0]
                              )
                            : undefined
                        }
                        value={
                          field.value.start && field.value.end
                            ? {
                                start: parseDate(field.value.start),
                                end: parseDate(field.value.end),
                              }
                            : null
                        }
                        onChange={(value) =>
                          field.onChange({
                            start: value.start.toString(),
                            end: value.end.toString(),
                          })
                        }
                        label="Task Duration"
                        isInvalid={!!errors.dateRange}
                        errorMessage={
                          errors.dateRange?.start?.message ||
                          errors.dateRange?.end?.message ||
                          errors.dateRange?.message
                        }
                        classNames={{
                          inputWrapper: `
                            bg-white 
                            border
                            border-gray-300
                            shadow-none
                            rounded-small
                            px-3
                            py-6
                            ${errors.dateRange ? "border-red-500" : ""}
                          `,
                          input: "text-black",
                          label: "text-label font-medium",
                        }}
                      />
                    )}
                  />

                  {isCurrentUserManager && (
                    <div>
                      <label className="text-label font-medium block mb-2">
                        Assign team leader
                      </label>
                      <Controller
                        name="teamLeader"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            placeholder="Type to search members..."
                            startContent={
                              <span className="text-2xl p-1 border-r-1 border-gray-400 text-default-400 pointer-events-none flex-shrink-0">
                                @
                              </span>
                            }
                            selectedKey={field.value || ""}
                            onSelectionChange={(key) =>
                              field.onChange(key || "")
                            }
                            inputValue={
                              memberOptions.find((m) => m.key === field.value)
                                ?.label || ""
                            }
                            isInvalid={!!errors.teamLeader}
                            errorMessage={errors.teamLeader?.message}
                            allowsCustomValue={false}
                            items={memberOptions}
                            classNames={{
                              base: "w-full",
                              listboxWrapper: "max-h-[200px]",
                              popoverContent:
                                "bg-white border border-gray-300 shadow-lg rounded-large pb-[50px] ",
                            }}
                            inputProps={{
                              classNames: {
                                inputWrapper: `
                                  bg-white 
                                  border
                                  border-gray-300
                                  shadow-none
                                  rounded-small
                                  py-6
                                  ${errors.teamLeader ? "border-red-500" : ""}
                                `,
                                input: "text-black",
                              },
                            }}>
                            {memberOptions.map((member) => (
                              <AutocompleteItem
                                key={member.key}
                                value={member.key}
                                textValue={member.label}
                                className="hover:bg-gray-50">
                                <div className="flex items-center gap-2 py-1">
                                  {member.profileImage ? (
                                    <img
                                      src={member.profileImage}
                                      alt={member.label}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                                      {member.label.charAt(0).toUpperCase()}
                                    </div>
                                  )}
                                  <div className="flex gap-2 items-center justify-between w-full">
                                    <div className="flex gap-2 items-center">
                                      <span className="text-xs text-gray-500 hidden">
                                        {member.email}
                                      </span>
                                      <span className="text-sm font-medium text-gray-900">
                                        {member.label}
                                      </span>
                                    </div>
                                    <div>
                                      {member.roles &&
                                        member.roles.length > 0 && (
                                          <div className="flex gap-1 mt-1">
                                            {member.roles.map((role, index) => (
                                              <span
                                                key={index}
                                                className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                                {role.replace("ROLE_", "")}
                                              </span>
                                            ))}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </AutocompleteItem>
                            ))}
                          </Autocomplete>
                        )}
                      />
                    </div>
                  )}

                  <Controller
                    name="ganttBarId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        isRequired
                        placeholder="Choose your Gantt bar"
                        selectedKeys={field.value ? [field.value] : []}
                        onChange={(e) => field.onChange(e.target.value)}
                        isInvalid={!!errors.ganttBarId}
                        errorMessage={errors.ganttBarId?.message}
                        classNames={{
                          trigger: `
                            bg-white 
                            text-black 
                            border 
                            border-gray-300 
                            shadow-none
                            rounded-small
                            px-3
                            py-6
                            ${errors.ganttBarId ? "border-red-500" : ""}
                          `,
                          value: "text-gray-500",
                        }}
                        disabledKeys={
                          ganttbar?.payload
                            ?.filter((bar) => isGanttBarDisabled(bar))
                            .map((bar) => bar.ganttBarId) || []
                        }>
                        {ganttbar?.payload?.map((bar) => {
                          const status = getGanttBarStatus(bar);
                          let statusText = "";
                          let statusClass = "";

                          if (status === "expired") {
                            statusText = " (Expired)";
                            statusClass = "text-red-400 opacity-60";
                          } else if (status === "not_started") {
                            statusText = " (Scheduled)";
                            statusClass = "text-blue-600"; // Changed to blue for scheduled/upcoming
                          }

                          const displayText = `${bar.title} (${
                            bar.face
                          }) • ${formatDate(bar.startedAt)} - ${formatDate(
                            bar.finishedAt
                          )}${statusText}`;

                          return (
                            <SelectItem
                              key={bar.ganttBarId}
                              value={bar.ganttBarId}
                              textValue={displayText}
                              className={statusClass}>
                              <div className={`flex flex-col ${statusClass}`}>
                                <div className="font-medium">
                                  {bar.title} ({bar.face})
                                </div>
                                <div className="text-sm text-gray-600">
                                  {formatDate(bar.startedAt)} -{" "}
                                  {formatDate(bar.finishedAt)}
                                  {statusText && (
                                    <span
                                      className={
                                        status === "expired"
                                          ? "text-red-500"
                                          : status === "not_started"
                                          ? "text-blue-600"
                                          : "text-green-600"
                                      }
                                    >
                                      {statusText}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </Select>
                    )}
                  />

                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        isRequired
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Input your description"
                        isInvalid={!!errors.description}
                        errorMessage={errors.description?.message}
                        classNames={{
                          inputWrapper: `
                            bg-white 
                            text-black 
                            border
                            border-gray-300
                            shadow-none
                            rounded-small
                            px-3
                            py-4
                            ${errors.description ? "border-red-500" : ""}
                          `,
                          input: "text-black",
                        }}
                      />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      type="button"
                      className="bg-transparent border-1 border-bgColor"
                      radius="full"
                      onPress={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      radius="full"
                      isLoading={isLoading}
                      isDisabled={isLoading}>
                      Save
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}