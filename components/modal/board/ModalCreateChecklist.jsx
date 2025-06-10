"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  DateRangePicker,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { checklistSchema } from "@/lib/schemas/createCheckListSchema";
import { createCheckListAction } from "@/action/board.action";

export default function ModalCreateChecklist({
  onSubmit,
  buttonText = "Create",
  modalTitle = "Create Checklist",
  taskid,
  finishedAt,
  startedAt,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Convert the task dates to the correct format for default values
  const taskStartDate = startedAt ? startedAt.split("T")[0] : null; // "2025-06-13"
  const taskEndDate = finishedAt ? finishedAt.split("T")[0] : null; // "2025-06-21"

  // Get today's date in the local timezone
  const todayDate = today(getLocalTimeZone());

  // Set default values based on task dates or fallback to today + 7 days
  const defaultStart = taskStartDate || todayDate.toString();
  const defaultEnd = taskEndDate || todayDate.add({ days: 7 }).toString();

  // Initialize React Hook Form with Zod resolver - call the schema function with task dates
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(
      checklistSchema({
        taskStartedAt: startedAt,
        taskFinishedAt: finishedAt,
      })
    ),
    defaultValues: {
      title: "",
      duration: {
        start: defaultStart,
        end: defaultEnd,
      },
      description: "",
    },
  });

  // Handle form submission
  const onFormSubmit = async (data) => {
    try {
      // Transform the data to match the backend's expected format
      const transformedData = {
        title: data.title,
        description: data.description || "", // Ensure description is always a string
        startedAt: new Date(
          data.duration.start + "T00:00:00.000Z"
        ).toISOString(),
        finishedAt: new Date(
          data.duration.end + "T23:59:59.999Z"
        ).toISOString(),
        taskId: taskid,
      };

      console.log("Transformed submit data", transformedData);

      // Call the createCheckListAction
      const result = await createCheckListAction(taskid, transformedData);
      console.log("result form", result);

      // Close modal and reset form on success
      reset();
      //onClose();
    } catch (error) {
      console.error("Form submission error:", error.message);
      // Show user-facing error
      alert(`Error: ${error.message}`);
    }
  };

  // console.log("task id in modal", taskid);
  // console.log("date", finishedAt, startedAt);
  // console.log("default dates", defaultStart, defaultEnd);

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex items-center gap-2 px-4 py-1 text-sm font-medium text-primary bg-slate-blue border border-blue-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[30px]"
        fullWidth="true"
      >
        <p className="px-2">+</p>
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalTitle}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-title">
                      Title <span className="text-progress-red">*</span>
                    </label>
                    <input
                      className="border text-caption border-gray-300 rounded-small px-3 py-3"
                      placeholder="Input your title"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-progress-red text-xs">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="relative w-full flex flex-col gap-3 mt-3">
                    <label className="text-sm font-medium text-title">
                      Duration <span className="text-progress-red">*</span>
                    </label>
                    <Controller
                      name="duration"
                      control={control}
                      render={({ field }) => (
                        <DateRangePicker
                          isRequired
                          className="max-w-none"
                          minValue={todayDate} // Prevent selecting past dates
                          maxValue={
                            taskEndDate ? parseDate(taskEndDate) : undefined
                          } // Limit to task end date if available
                          value={{
                            start: parseDate(field.value.start),
                            end: parseDate(field.value.end),
                          }}
                          onChange={(value) =>
                            field.onChange({
                              start: value.start.toString(),
                              end: value.end.toString(),
                            })
                          }
                          label="Stay duration"
                          style={{
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            cursor: "pointer",
                          }}
                        />
                      )}
                    />
                    {errors.duration?.start && (
                      <p className="text-progress-red text-xs">
                        {errors.duration.start.message}
                      </p>
                    )}
                    {errors.duration?.end && (
                      <p className="text-progress-red text-xs">
                        {errors.duration.end.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-3 mt-3">
                    <label className="text-sm font-medium text-title">
                      Description
                    </label>
                    <textarea
                      className="border text-caption border-gray-300 rounded-small px-3 py-3 resize-none"
                      placeholder="Add a description (optional)"
                      rows={3}
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-progress-red text-xs">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 py-4">
                    <Button
                      type="button"
                      className="bg-transparent border-1 border-bgColor"
                      radius="full"
                      onPress={() => {
                        reset();
                        onClose();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      radius="full"
                      isDisabled={isSubmitting || !!errors.title}
                      isLoading={isSubmitting}
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
