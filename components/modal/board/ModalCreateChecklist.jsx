"use client";
import React, { useMemo, useCallback, useState } from "react";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ModalCreateChecklist({
  onSubmit,
  buttonText = "Create",
  modalTitle = "Create Checklist",
  taskid,
  finishedAt,
  startedAt,
  stage,
  boardId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startedAt: "",
    finishedAt: "",
  });

  // Memoize all computed values to prevent recalculation
  const {
    taskStartDate,
    taskEndDate,
    todayDate,
    defaultStart,
    defaultEnd,
    minValue,
    maxValue,
    memoizedSchema,
    defaultValues,
  } = useMemo(() => {
    // Convert the task dates to the correct format for default values
    const taskStartDate = startedAt ? startedAt.split("T")[0] : null;
    const taskEndDate = finishedAt ? finishedAt.split("T")[0] : null;

    // Get today's date in the local timezone
    const todayDate = today(getLocalTimeZone());

    // Set default values based on task dates or fallback to today + 7 days
    const defaultStart = taskStartDate || todayDate.toString();
    const defaultEnd = taskEndDate || todayDate.add({ days: 7 }).toString();

    // Set minValue: if task has a start date, use that; otherwise use today
    const minValue = taskStartDate ? parseDate(taskStartDate) : todayDate;

    // Create the schema
    const memoizedSchema = checklistSchema({
      taskStartedAt: startedAt,
      taskFinishedAt: finishedAt,
    });

    // Create default values
    const defaultValues = {
      title: "",
      duration: {
        start: defaultStart,
        end: defaultEnd,
      },
      description: "",
    };

    // Create maxValue for DateRangePicker
    const maxValue = taskEndDate ? parseDate(taskEndDate) : undefined;

    return {
      taskStartDate,
      taskEndDate,
      todayDate,
      defaultStart,
      defaultEnd,
      minValue,
      maxValue,
      memoizedSchema,
      defaultValues,
    };
  }, [startedAt, finishedAt]);

  // Initialize React Hook Form with memoized values
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(memoizedSchema),
    defaultValues,
  });

  // Memoize the date range change handler to prevent recreation
  const handleDateRangeChange = useCallback((field) => {
    return (value) => {
      if (value && value.start && value.end) {
        field.onChange({
          start: value.start.toString(),
          end: value.end.toString(),
        });
      }
    };
  }, []);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createCheckListAction(taskid, formData);
      if (result.success) {
        toast.success("Checklist created successfully!");
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to create checklist");
      }
    } catch (error) {
      toast.error("An error occurred while creating checklist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {stage == "COMPLETED" || stage == "UNDER_REVIEW" || stage == "TO DO" ? (
        ""
      ) : (
        <>
          <Button
            onPress={onOpen}
            className="flex items-center gap-2 pxj-4 py-1 text-sm font-medium text-primary bg-slate-blue border border-blue-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[30px]"
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
                    <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                          render={({ field }) => {
                            // Safely parse the field values
                            let startValue, endValue;
                            try {
                              startValue = field.value?.start
                                ? parseDate(field.value.start)
                                : parseDate(defaultStart);
                              endValue = field.value?.end
                                ? parseDate(field.value.end)
                                : parseDate(defaultEnd);
                            } catch (error) {
                              //console.error("Date parsing error:", error);
                              startValue = parseDate(defaultStart);
                              endValue = parseDate(defaultEnd);
                            }

                            return (
                              <DateRangePicker
                                isRequired
                                className="max-w-none"
                                minValue={minValue}
                                maxValue={maxValue}
                                value={{
                                  start: startValue,
                                  end: endValue,
                                }}
                                onChange={handleDateRangeChange(field)}
                                label="Stay duration"
                              />
                            );
                          }}
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
                          isLoading={isLoading}
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
      )}
    </>
  );
}
