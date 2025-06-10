"use client";
import React, { useState } from "react";
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
} from "@heroui/react";
import { IconAdd } from "../../icon/everyicon";
import { taskFormSchema } from "@/lib/schemas/createTaskSchema";
import { createTaskByBoardIdAndGanttChartIdAction } from "@/action/board.action";
import { toast } from "react-toastify"; // Import toast

export default function ModalCreateTask({
  input,
  boardId,
  ganttChartId,
  ganttbar,
  allMemberInBoard,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [apiError, setApiError] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      startedAt: "",
      finishedAt: "",
      ganttBarId: "",
      teamLeader: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setApiError(null);

      // Validate ganttBarId
      const selectedGanttBar = ganttbar?.payload?.find(
        (bar) => bar.ganttBarId === data.ganttBarId
      );
      if (!selectedGanttBar) {
        throw new Error("Invalid Gantt bar ID selected");
      }

      // Validate task dates against Gantt bar dates
      const taskStart = new Date(data.startedAt);
      const taskEnd = new Date(data.finishedAt);
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
      };

      console.log("Submitting Payload:", payload);

      const result = await createTaskByBoardIdAndGanttChartIdAction(
        payload,
        boardId,
        ganttChartId
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to create task");
      }

      console.log("API Response:", result);

      // Show success toast
      toast.success(`"${data.title}"\nTask created successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });

      reset();
      onOpenChange();
    } catch (error) {
      console.error("Error creating task:", error.message);
      setApiError(error.message);
      // Show error toast
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleClose = () => {
    reset();
    setApiError(null);
    onOpenChange();
  };

  console.log("modal create task and all member", allMemberInBoard);
  //console.log("show gantbar and contain gantbar id ", ganttbar, boardId);

  if (!ganttbar?.payload?.length) {
    return <p className="text-red-500">No Gantt bars available.</p>;
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
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Controller
                      name="startedAt"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          isRequired
                          label="Start Date"
                          labelPlacement="outside"
                          placeholder="Select start date"
                          type="date"
                          isInvalid={!!errors.startedAt}
                          errorMessage={errors.startedAt?.message}
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
                              ${errors.startedAt ? "border-red-500" : ""}
                            `,
                            input: "text-black",
                          }}
                        />
                      )}
                    />
                    {errors.startedAt && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.startedAt.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Controller
                      name="finishedAt"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          isRequired
                          label="End Date"
                          labelPlacement="outside"
                          placeholder="Select end date"
                          type="date"
                          isInvalid={!!errors.finishedAt}
                          errorMessage={errors.finishedAt?.message}
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

                              ${errors.finishedAt ? "border-red-500" : ""}
                            `,
                            input: "text-black",
                          }}
                        />
                      )}
                    />
                    {errors.finishedAt && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.finishedAt.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Controller
                      name="teamLeader"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Assign team leader"
                          labelPlacement="outside"
                          placeholder="Name"
                          startContent={
                            <span className="text-2xl p-1 border-r-1 border-gray-400 text-default-400 pointer-events-none flex-shrink-0">
                              @
                            </span>
                          }
                          type="text"
                          isInvalid={!!errors.teamLeader}
                          errorMessage={errors.teamLeader?.message}
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
                              py-6
                            `,
                            input: "text-black",
                          }}
                        />
                      )}
                    />
                  </div>

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
                          onChange={(e) => field.onChange(e.target.value)} // Fixed typo: onChangeFACChange
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
