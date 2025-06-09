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

export default function ModalCreateTask({
  input,
  boardId,
  ganttChartId,
  ganttbar,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [apiError, setApiError] = useState(null);

  // React Hook Form setup with Zod resolver
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
      date: "",
      ganttBarId: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      setApiError(null);
      // Transform form data to match API request
      const payload = {
        title: data.title,
        description: data.description,
        startedAt: new Date(data.date).toISOString(),
        finishedAt: new Date(data.date).toISOString(),
        boardId: boardId,
        ganttBarId: data.ganttBarId,
      };

      console.log("Submitting Payload:", payload);

      // Call API action
      const result = await createTaskByBoardIdAndGanttChartIdAction(
        payload,
        boardId,
        ganttChartId
      );

      if (!result.success) {
        throw new Error(result.error || "Failed to create task");
      }

      console.log("API Response:", result);

      // Reset form and close modal on success
      reset();
      onOpenChange();
    } catch (error) {
      console.error("Error creating task:", error.message);
      setApiError(error.message);
    }
  };

  const handleClose = () => {
    reset();
    setApiError(null);
    onOpenChange();
  };

  // Check if ganttbar payload is empty
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
                  {/* Title Field */}
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
                              px-6
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

                  {/* Date Field */}
                  <div>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          isRequired
                          label="Duration"
                          labelPlacement="outside"
                          placeholder="Select date"
                          type="date"
                          isInvalid={!!errors.date}
                          errorMessage={errors.date?.message}
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
                              px-6
                              py-6
                              ${errors.date ? "border-red-500" : ""}
                            `,
                            input: "text-black",
                          }}
                        />
                      )}
                    />
                    {errors.date && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.date.message}
                      </p>
                    )}
                  </div>
                  {/* team leader optional */}
                  <div>
                    <Input
                      isRequired
                      errorMessage="Please enter a valid team leader"
                      label="Assign team leader"
                      labelPlacement="outside"
                      name="name"
                      placeholder="Name"
                      startContent={
                        <span className=" text-2xl p-1 border-r-1 border-gray-400 text-default-400 pointer-events-none flex-shrink-0">
                          @
                        </span>
                      }
                      type="text"
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
                  </div>
                  {/* Gantt Bar Field */}
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
                              px-6
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
                              {bar.title}
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

                  {/* Description Field */}
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
                              px-6
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

                  {/* Action Buttons */}
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
