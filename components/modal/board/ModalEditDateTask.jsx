"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  DateRangePicker,
  useDraggable
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { today, parseDate } from "@internationalized/date";
import { updateTaskDateByIdAndTaskIdAction } from "@/action/board.action";
import { toast } from "react-toastify";

export default function ModalEditDateTask({
  taskId,
  currentStartDate,
  currentEndDate,
  ganttbarData
}) {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      dateRange: { start: null, end: null }
    }
  });

  // Min/Max for Gantt bar limits
  const getDateConstraints = () => {
    if (!ganttbarData?.startedAt || !ganttbarData?.finishedAt) {
      return {
        minValue: today("Asia/Bangkok"),
        maxValue: null
      };
    }
    const ganttStartDate = ganttbarData.startedAt.split("T")[0];
    const ganttEndDate = ganttbarData.finishedAt.split("T")[0];
    return {
      minValue: parseDate(ganttStartDate),
      maxValue: parseDate(ganttEndDate)
    };
  };

  const { minValue, maxValue } = getDateConstraints();

  useEffect(() => {
    if (isOpen && currentStartDate && currentEndDate) {
      reset({
        dateRange: {
          start: parseDate(currentStartDate.split("T")[0]),
          end: parseDate(currentEndDate.split("T")[0])
        }
      });
    }
  }, [isOpen, currentStartDate, currentEndDate, reset]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleEditSubmit = async (data) => {
    const calendarEnd = data.dateRange?.end;
    const finishedAt =
      calendarEnd?.toDate?.() ??
      new Date(calendarEnd.year, calendarEnd.month - 1, calendarEnd.day);
      
      finishedAt.setHours(finishedAt.getHours() + 7);
    try {
      
      await updateTaskDateByIdAndTaskIdAction({ taskId, finishedAt });
      toast.success("Task date updated successfully!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: "#ffffff",
          color: "#1F2937",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "500",
          padding: "16px 20px",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "1px solid #E5E7EB"
        },
        icon: "📅"
      });
      handleClose();
    } catch (error) {
      console.error("Error updating task date:", error);
      toast.error("Failed to update task date: " + error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        style: {
          background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
          color: "#ffffff",
          borderRadius: "16px",
          fontSize: "14px",
          fontWeight: "500",
          padding: "16px 20px",
          boxShadow:
            "0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 10px 10px -5px rgba(239, 68, 68, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)"
        }
      });
    }
  };

  return (
    <>
      {/* Trigger */}
      <div onClick={handleOpen} className="w-full cursor-pointer flex gap-2  items-center">
        <div> 
             <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
          />
        </svg>
        </div>
        <div >Edit Date</div>
      </div>

      {/* Modal */}
      <Modal ref={targetRef} isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1 cursor-move">
                Extend task deadline
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(handleEditSubmit)}>
                  <Controller
                    name="dateRange"
                    control={control}
                    rules={{
                      required: "Deadline is required",
                      validate: {
                        validRange: (value) => {
                          if (!value.start || !value.end)
                            return "Both start and end dates are required";
                          if (value.start > value.end)
                            return "End date must be after start date";
                          if (minValue && value.start < minValue)
                            return `Start date cannot be before ${minValue.toString()}`;
                          if (maxValue && value.end > maxValue)
                            return `End date cannot be after ${maxValue.toString()}`;
                          return true;
                        }
                      }
                    }}
                    render={({ field }) => (
                      <DateRangePicker
                        className="max-w-none"
                        minValue={minValue}
                        maxValue={maxValue}
                        value={
                          field.value.start && field.value.end
                            ? {
                                start: field.value.start,
                                end: field.value.end
                              }
                            : null
                        }
                        onChange={(value) =>
                          field.onChange({
                            start: value?.start || null,
                            end: value?.end || null
                          })
                        }
                        label="Deadline"
                        description={
                          ganttbarData
                            ? `Available range: ${ganttbarData.startedAt.split("T")[0]} → ${ganttbarData.finishedAt.split("T")[0]}`
                            : undefined
                        }
                        isInvalid={!!errors.dateRange}
                        errorMessage={
                          errors.dateRange?.start?.message ||
                          errors.dateRange?.end?.message ||
                          errors.dateRange?.message
                        }
                        classNames={{
                          inputWrapper: `bg-white border border-gray-300 shadow-none rounded-small px-3 py-6 ${
                            errors.dateRange ? "border-red-500" : ""
                          }`,
                          input: "text-black",
                          label: "text-label font-medium"
                        }}
                      />
                    )}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit(handleEditSubmit)}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
