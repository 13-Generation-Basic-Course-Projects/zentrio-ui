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
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { IconAdd } from "../../icon/everyicon";
import { taskFormSchema } from "@/lib/schemas/createTaskSchema";
import { createTaskByBoardIdAndGanttChartIdAction } from "@/action/board.action";
import { toast } from "react-toastify";
import PopupActionNoGanttChart from "@/components/popup/PopupActionNoGanttChart";

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
  const [apiError, setApiError] = useState(null);

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
      teamLeader: "", // Stores userId
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
    if (!allMemberInBoard || !Array.isArray(allMemberInBoard)) {
      return [];
    }

    return allMemberInBoard
      .filter((member) => !member.roles.includes("ROLE_MANAGER"))
      .map((member) => ({
        key: member.userId,
        label: member.username, // Display username
        value: member.userId, // Store userId
        email: member.email,
        profileImage: member.profileImage,
        roles: member.roles,
      }));
  }, [allMemberInBoard]);

  console.log("Current User:", currentUser);
  console.log("Is Current User Manager:", isCurrentUserManager);
  console.log("allMemberInBoard", allMemberInBoard);

  const onSubmit = async (data) => {
    try {
      setApiError(null);

      // Validate ganttChartId
      if (!ganttChartId || (ganttChartId ?? "") === "No data available") {
        throw new Error("No valid Gantt chart available");
      }

      // Validate ganttBarId
      const selectedGanttBar = ganttbar?.payload?.find(
        (bar) => bar.ganttBarId === data.ganttBarId
      );
      if (!selectedGanttBar) {
        throw new Error("Invalid Gantt bar ID selected");
      }

      // Parse dates and add time buffer for current date
      let taskStart = new Date(data.dateRange.start);
      const taskEnd = new Date(data.dateRange.end);

      // Check if start date is today and add 2 minutes buffer
      const today = new Date();
      const isStartDateToday =
        taskStart.toDateString() === today.toDateString();

      if (isStartDateToday) {
        // If start date is today, set time to current time + 2 minutes
        const currentTime = new Date();
        const bufferedTime = new Date(currentTime.getTime() + 2 * 60 * 1000); // Add 2 minutes

        // Set the start date to today with buffered time
        taskStart = new Date(
          taskStart.getFullYear(),
          taskStart.getMonth(),
          taskStart.getDate(),
          bufferedTime.getHours(),
          bufferedTime.getMinutes(),
          bufferedTime.getSeconds()
        );
      } else {
        // If not today, set to start of day (00:00:00)
        taskStart.setHours(0, 0, 0, 0);
      }

      // Set end date to end of day (23:59:59) unless it's a specific time
      if (taskEnd.getHours() === 0 && taskEnd.getMinutes() === 0) {
        taskEnd.setHours(23, 59, 59, 999);
      }

      // Validate task dates against Gantt bar dates
      const ganttStart = new Date(selectedGanttBar.startedAt);
      const ganttEnd = new Date(selectedGanttBar.finishedAt);

      if (taskStart < ganttStart) {
        throw new Error(
          `Task start date must be on or after Gantt bar start date (${ganttStart.toLocaleDateString()})`
        );
      }
      if (taskEnd > ganttEnd) {
        throw new Error(
          `Task end date must be on or before Gantt bar end date (${ganttEnd.toLocaleDateString()})`
        );
      }

      const payload = {
        title: data.title,
        description: data.description,
        startedAt: taskStart.toISOString(),
        finishedAt: taskEnd.toISOString(),
        boardId: boardId,
        ganttBarId: data.ganttBarId,
        leaderId: data.teamLeader || null,
      };

      console.log("Submitting Payload:", payload);
      console.log(
        "Start time adjusted:",
        isStartDateToday ? "Yes (+2 minutes)" : "No"
      );

      const result = await createTaskByBoardIdAndGanttChartIdAction(
        payload,
        boardId,
        ganttChartId
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to create task");
      }

      console.log("API Response:", result);

      toast.success(`"${data.title}"\nTask created successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });

      reset();
      onOpenChange();
    } catch (error) {
      console.error("Error creating task:", error.message);
      setApiError(error.message);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleClose = () => {
    reset({
      title: "",
      description: "",
      dateRange: { start: "", end: "" },
      ganttBarId: "",
      teamLeader: "",
    });
    setApiError(null);
    onOpenChange();
  };

  // Handle case where no Gantt bars or invalid ganttChartId
  if (
    !ganttbar?.payload?.length ||
    (ganttChartId ?? "") === "No data available"
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
        fullWidth="true"
      >
        <IconAdd />
        Create
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
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
                  className="grid grid-cols-1 gap-4"
                >
                  <div>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          isRequired
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
                              focus:shadow-none  
                              focus:outline-none
                              focus:ring-0       
                              focus-within:shadow-none
                              focus-within:ring-0
                              rounded-small
                              transition-all 
                              hover:bg-white
                              px-3
                              py-6
                              ${errors.title ? "border-red-500" : ""}
                            `,
                            input: "text-black",
                          }}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Controller
                      name="dateRange"
                      control={control}
                      render={({ field }) => (
                        <DateRangePicker
                          isRequired
                          className="max-w-none"
                          minValue={today(getLocalTimeZone())} // Prevent selecting past dates
                          maxValue={
                            selectedGanttBar
                              ? parseDate(
                                  selectedGanttBar.finishedAt.split("T")[0]
                                )
                              : undefined
                          } // Limit to Gantt bar end date
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
                          labelPlacement="outside"
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
                              focus:shadow-none  
                              focus:outline-none
                              focus:ring-0       
                              focus-within:shadow-none
                              focus-within:ring-0
                              rounded-small
                              transition-all 
                              hover:bg-white
                              px-3
                              py-6
                              ${errors.dateRange ? "border-red-500" : ""}
                            `,
                            input: "text-black",
                            label: "text-label font-medium",
                          }}
                          style={{
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    />
                  </div>

                  {/* Show assign team leader section only if current user is a manager */}
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
                            } // Set userId
                            onInputChange={() => {}} // Prevent manual input
                            inputValue={
                              memberOptions.find((m) => m.key === field.value)
                                ?.label || ""
                            } // Display username
                            isInvalid={!!errors.teamLeader}
                            errorMessage={errors.teamLeader?.message}
                            allowsCustomValue={false} // Prevent custom input
                            items={memberOptions}
                            classNames={{
                              base: "w-full",
                              listboxWrapper: "max-h-[200px]",
                              popoverContent:
                                "bg-white border border-gray-300 shadow-lg rounded-large pb-[50px]",
                              endContentWrapper: "hidden",
                              clearButton: "hidden",
                              selectorButton: "hidden",
                            }}
                            inputProps={{
                              classNames: {
                                inputWrapper: `
                                  bg-white 
                                  border
                                  border-gray-300
                                  shadow-none         
                                  focus:shadow-none  
                                  focus:outline-none
                                  focus:ring-0       
                                  focus-within:shadow-none
                                  focus-within:ring-0 
                                  rounded-small
                                  transition-all 
                                  hover:bg-white 
                                  py-6
                                  ${errors.teamLeader ? "border-red-500" : ""}
                                `,
                                input: "text-black",
                              },
                            }}
                          >
                            {memberOptions.map((member) => (
                              <AutocompleteItem
                                key={member.key}
                                value={member.key} // Use userId
                                textValue={member.label} // Display username
                                className="hover:bg-gray-50"
                              >
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
                                      <span className="text-xs text-gray-500">
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
                                                className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full"
                                              >
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

                  <div>
                    <label className="text-label font-medium">
                      Gantt bar <span className="text-red-500">*</span>
                    </label>
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
                              focus:shadow-none  
                              focus:outline-none
                              focus:ring-0       
                              focus-within:shadow-none
                              focus-within:ring-0 
                              rounded-small
                              transition-all 
                              hover:bg-white 
                              px-3
                              py-6
                              ${errors.ganttBarId ? "border-red-500" : ""}
                            `,
                            value: "text-gray-500",
                          }}
                        >
                          {ganttbar?.payload?.map((bar) => (
                            <SelectItem
                              key={bar.ganttBarId}
                              value={bar.ganttBarId}
                            >
                              {`${bar.title} (${bar.face}, ${new Date(
                                bar.startedAt
                              ).toLocaleDateString()} - ${new Date(
                                bar.finishedAt
                              ).toLocaleDateString()})`}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.ganttBarId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.ganttBarId.message}
                      </p>
                    )}
                  </div>

                  <div>
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
                          onChange={(e) => field.onChange(e.target.value)}
                          classNames={{
                            inputWrapper: `
                              bg-white 
                              text-black 
                              border
                              border-gray-300
                              shadow-none         
                              focus:shadow-none  
                              focus:outline-none
                              focus:ring-0       
                              focus-within:shadow-none
                              focus-within:ring-0 
                              rounded-small
                              transition-all 
                              hover:bg-white
                              px-3
                              py-4
                              ${errors.description ? "border-red-500" : ""}
                            `,
                            input: "text-black",
                          }}
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      type="button"
                      className="bg-transparent border-1 border-bgColor"
                      radius="full"
                      onPress={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      radius="full"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                    >
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
