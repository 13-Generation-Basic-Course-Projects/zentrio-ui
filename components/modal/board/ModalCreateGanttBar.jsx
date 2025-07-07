"use client";
import React, { useState, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  DateRangePicker,
} from "@heroui/react";
import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { IconAdd } from "../../icon/everyicon";
import { X } from "lucide-react";
import { createGanttBarsByGanttChartIdAction } from "@/action/gantt.action";
import { toast } from "react-toastify";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

// Define the Face enum values
const faceEnum = [
  "PLANNING",
  "REQUIREMENT_ANALYSIS",
  "DESIGN",
  "IMPLEMENTATION",
  "TESTING_AND_REVIEW",
  "DEPLOYMENT_AND_MAINTENANCE",
];

const faceOptions = faceEnum.map((face) => ({
  key: face,
  label: face.replace(/_/g, " "),
}));

// Define the Zod schema
const ganttBarSchema = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z
    .object({
      start: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid start date",
      }),
      end: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid end date",
      }),
    })
    .refine((data) => new Date(data.start) <= new Date(data.end), {
      message: "End date must be on or after start date",
      path: ["end"],
    })
    .refine(
      (data) => {
        const startDate = new Date(data.start);
        const endDate = new Date(data.end);
        const diffTime = endDate - startDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 6; // Minimum 7 days (inclusive, so 6 days difference)
      },
      {
        message: "End date must be at least 7 days after start date",
        path: ["end"],
      }
    ),
  face: z.enum(faceEnum, { required_error: "Face is required" }),
});

export default function ModalCreateGanttBar({ input, ganttChartId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pendingItems, setPendingItems] = useState([]);
  const activeToasts = useRef(new Set());
  const toastCounter = useRef(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(ganttBarSchema),
    defaultValues: {
      title: "",
      duration: {
        start: today(getLocalTimeZone()).toString(),
        end: today(getLocalTimeZone()).add({ days: 7 }).toString(),
      },
      face: "",
    },
  });

  // Watch fields to enable/disable add button
  const titleValue = watch("title");
  const durationValue = watch("duration");
  const faceValue = watch("face");

  // const showToast = useCallback((type, message, options = {}) => {
  //   try {
  //     const toastId = `${type}-${++toastCounter.current}`;
  //     if (options.preventDuplicate) {
  //       activeToasts.current.forEach((id) => {
  //         if (id.startsWith(`${type}-`)) {
  //           try {
  //             toast.dismiss(id);
  //             activeToasts.current.delete(id);
  //           } catch (err) {
  //             //console.warn("Toast dismiss error:", err);
  //           }
  //         }
  //       });
  //     }

  //     const toastOptions = {
  //       toastId,
  //       position: "top-right",
  //       autoClose: 3000,
  //       ...options,
  //       onClose: () => {
  //         activeToasts.current.delete(toastId);
  //         if (options.onClose) options.onClose();
  //       },
  //     };

  //     activeToasts.current.add(toastId);
  //     //console.log(`Showing toast: ${type} - ${message}`); // Debugging
  //     return toast[type](message, toastOptions);
  //   } catch (error) {
  //     //console.error("Toast error:", error);
  //     //console.log(`${type.toUpperCase()}: ${message}`);
  //   }
  // }, []);

  const showToast = useCallback((type, message, options = {}) => {
  try {
    const toastId = `${type}-${++toastCounter.current}`;
    if (options.preventDuplicate) {
      activeToasts.current.forEach((id) => {
        if (id.startsWith(`${type}-`) && toast.isActive(id)) {
          try {
            toast.dismiss(id);
            activeToasts.current.delete(id);
          } catch (err) {
            //console.warn("Toast dismiss error:", err);
          }
        }
      });
    }

    const toastOptions = {
      toastId,
      position: "top-right",
      autoClose: 3000,
      ...options,
      onClose: () => {
        activeToasts.current.delete(toastId); // Remove from activeToasts when toast auto-closes
        if (options.onClose) options.onClose();
      },
    };

    activeToasts.current.add(toastId);
    //console.log(`Showing toast: ${type} - ${message}`);
    return toast[type](message, toastOptions);
  } catch (error) {
    //console.error("Toast error:", error);
    //console.log(`${type.toUpperCase()}: ${message}`);
  }
}, []);

const handleModalClose = useCallback(() => {
  reset();
  setPendingItems([]);

  // Create a copy of active toasts to avoid modifying during iteration
  const currentToasts = Array.from(activeToasts.current);

  currentToasts.forEach((toastId) => {
    try {
      // Only dismiss if the toast is still active
      if (toast.isActive(toastId)) {
        toast.dismiss(toastId);
      }
    } catch (err) {
      //console.warn("Toast cleanup error:", err);
    } finally {
      // Always remove from tracking
      activeToasts.current.delete(toastId);
    }
  });

  // Clear the set as final cleanup
  activeToasts.current.clear();
}, [reset]);

  const onAddToPending = useCallback(
    (data) => {
      if (!data.title.trim()) return;

      const newItem = {
        title: data.title.trim(),
        startedAt: data.duration.start,
        finishedAt: data.duration.end,
        face: data.face,
      };

      setPendingItems((prev) => [...prev, newItem]);

      showToast("success", `"${data.title}" added to pending list!`, {
        preventDuplicate: false,
        autoClose: 2000,
      });

      reset({
        title: "",
        duration: {
          start: today(getLocalTimeZone()).toString(),
          end: today(getLocalTimeZone()).add({ days: 7 }).toString(),
        },
        face: data.face,
      });
    },
    [showToast, reset]
  );

  const handleRemovePendingItem = useCallback(
    (index) => {
      const removedItem = pendingItems[index];
      if (!removedItem) return;

      setPendingItems((prev) => prev.filter((_, i) => i !== index));

      showToast("info", `"${removedItem.title}" removed from pending list`, {
        autoClose: 1500,
      });
    },
    [pendingItems, showToast]
  );

  const onSaveAllItems = useCallback(async () => {
    if (pendingItems.length === 0) {
      showToast("warn", "No items in pending list to save", {
        preventDuplicate: true,
      });
      return;
    }

    const now = new Date();
    const utc7OffsetMs = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
    const oneHourMs = 1 * 60 * 60 * 1000; // 1 hour in milliseconds
    const sixMinutesMs = 6 * 60 * 1000; // 6 minutes in milliseconds (5 + 1)
    const nowInUtc7PlusOneHour = new Date(
      now.getTime() + utc7OffsetMs + oneHourMs
    );
    const payload = pendingItems.map((item) => {
      const selectedStartDate = new Date(item.startedAt);

      // Determine the appropriate start date
      let startDate;
      const nowInUtc7 = new Date(now.getTime() + utc7OffsetMs);
      if (selectedStartDate <= nowInUtc7) {
        // If the selected start date is today or in the past, use today
        startDate = new Date(
          nowInUtc7.getFullYear(),
          nowInUtc7.getMonth(),
          nowInUtc7.getDate()
        );
      } else {
        // Use the selected start date
        startDate = new Date(
          selectedStartDate.getFullYear(),
          selectedStartDate.getMonth(),
          selectedStartDate.getDate()
        );
      }

      // Set the time to now + 8 hours (UTC+7 + 1 hour)
      const startedAt = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        nowInUtc7PlusOneHour.getHours(),
        nowInUtc7PlusOneHour.getMinutes(),
        nowInUtc7PlusOneHour.getSeconds(),
        nowInUtc7PlusOneHour.getMilliseconds()
      );

      // If the adjusted startedAt is still in the past, move it to tomorrow
      if (startedAt <= nowInUtc7) {
        startedAt.setDate(startedAt.getDate() + 1);
      }

      const finishedAt = new Date(
        new Date(item.finishedAt).getFullYear(),
        new Date(item.finishedAt).getMonth(),
        new Date(item.finishedAt).getDate(),
        23,
        59,
        59,
        999
      );

      return {
        title: item.title,
        startedAt: startedAt.toISOString(),
        finishedAt: finishedAt.toISOString(),
        face: item.face,
        ganttChartId,
      };
    });

    //console.log("Sending payload to action:", payload);

    try {
      const result = await createGanttBarsByGanttChartIdAction({
        ganttChartId,
        data: payload,
      });

      //console.log("API result:", result);

      const titles = pendingItems.map((item) => item.title).join(", ");

      if (result.status !== 400) {
        showToast(
          "success",
          `Gantt bar(s) created successfully!\nItems: ${titles}`,
          {
            preventDuplicate: true,
            autoClose: 4000,
          }
        );

        reset();
        setPendingItems([]);
        onOpenChange();
      } else {
        showToast(
          "error",
          `Failed to create Gantt bars: ${
            result.detail || "Please try again."
          }`,
          {
            preventDuplicate: true,
            autoClose: 4000,
          }
        );
      }
    } catch (err) {
      //console.error("Failed to create Gantt bars:", err);
      showToast(
        "error",
        `Failed to create Gantt bars: ${err.message || "Unknown error"}`,
        {
          preventDuplicate: true,
          autoClose: 4000,
        }
      );
    }
  }, [pendingItems, ganttChartId, showToast, reset, onOpenChange]);


  
  // const handleModalClose = useCallback(() => {
  //   reset();
  //   setPendingItems([]);

  //   // Create a copy of the Set to avoid modification during iteration
  //   const currentToasts = Array.from(activeToasts.current);

  //   currentToasts.forEach((toastId) => {
  //     try {
  //       // Check if toast exists before dismissing
  //       if (toast.isActive(toastId)) {
  //         toast.dismiss(toastId);
  //       }
  //     } catch (err) {
  //       //console.warn("Toast cleanup error:", err);
  //     } finally {
  //       // Always remove from our tracking
  //       activeToasts.current.delete(toastId);
  //     }
  //   });

  //   // Clear the set as a final cleanup
  //   activeToasts.current.clear();
  // }, [reset]);

  const validateDuration = useCallback(
    (value) => {
      if (!value?.start || !value?.end) {
        return null;
      }

      const start = value.start;
      const end = value.end;

      // Calculate the difference in days
      const startDate = start.toDate(getLocalTimeZone());
      const endDate = end.toDate(getLocalTimeZone());
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      //console.log(`Validation: diffDays = ${diffDays}`);

      if (diffDays < 7) {
        //console.log("Validation: Duration < 7 days");

        // Defer the toast to avoid render-time state updates
        setTimeout(() => {
          showToast(
            "error",
            "End date must be at least 7 days after start date",
            {
              preventDuplicate: true,
              autoClose: 3000,
            }
          );
        }, 0);

        return "End date must be at least 7 days after start date";
      }

      //console.log("Validation: Duration valid");
      return null;
    },
    [showToast]
  );


  <Controller
    name="duration"
    control={control}
    render={({ field }) => (
      <DateRangePicker
        className="max-w-none"
        minValue={today(getLocalTimeZone())}
        // Remove the validate prop entirely
        value={
          field.value?.start && field.value?.end
            ? {
                start: parseDate(field.value.start),
                end: parseDate(field.value.end),
              }
            : null
        }
        onChange={(value) => {
          if (value?.start && value?.end) {
            // Perform validation here instead of in validate prop
            const startDate = value.start.toDate(getLocalTimeZone());
            const endDate = value.end.toDate(getLocalTimeZone());
            const diffTime = endDate.getTime() - startDate.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            //console.log(`OnChange validation: diffDays = ${diffDays}`);

            // Only show toast if validation fails
            if (diffDays < 6) {
              // Use setTimeout to defer the toast to avoid render-time state updates
              setTimeout(() => {
                showToast(
                  "error",
                  "End date must be at least 7 days after start date",
                  {
                    preventDuplicate: true,
                    autoClose: 3000,
                  }
                );
              }, 0);
            }

            // Always update the field value
            field.onChange({
              start: value.start.toString(),
              end: value.end.toString(),
            });
          }
        }}
        label="Gantt Bar Duration"
        labelPlacement="outside"
        isInvalid={!!errors.duration}
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
          ${errors.duration ? "border-red-500" : ""}
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
  />;

  // Also remove the validateDuration function since it's no longer needed

  return (
    <>
      {(ganttChartId ?? "").includes("No data available") ? (
        ""
      ) : (
        <>
          <Button
            onPress={onOpen}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px]"
            fullWidth>
            <IconAdd />
            Create
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleModalClose}
            size="xl">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Create Gantt Bar
                  </ModalHeader>
                  <ModalBody>
                    <form onSubmit={handleSubmit(onAddToPending)}>
                      {/* Title Input */}
                      <div className="flex flex-col gap-3">
                        <label className="text-sm font-medium text-title">
                          Title <span className="text-progress-red">*</span>
                        </label>
                        <input
                          {...register("title")}
                          className={`border text-caption border-gray-300 rounded-small px-3 py-3 ${
                            errors.title ? "border-red-500" : ""
                          }`}
                          placeholder="Input your title"
                        />
                        {errors.title && (
                          <span className="text-sm text-red-500">
                            {errors.title.message}
                          </span>
                        )}
                      </div>

                      {/* DateRangePicker */}
                      <div className="relative w-full flex flex-col gap-3 mt-6">
                        <label className="text-sm font-medium text-title">
                          Duration <span className="text-progress-red">*</span>
                        </label>
                        <Controller
                          name="duration"
                          control={control}
                          render={({ field }) => (
                            <DateRangePicker
                              className="max-w-none"
                              minValue={today(getLocalTimeZone())} // Prevent past dates
                              validate={validateDuration}
                              value={
                                field.value?.start && field.value?.end
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
                              label="Gantt Bar Duration"
                              // labelPlacement="outside"
                              // isInvalid={!!errors.duration}
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
                                  ${errors.duration ? "border-red-500" : ""}
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

                      {/* Face Dropdown */}
                      <div className="flex flex-col gap-3 mt-6">
                        <label className="text-sm font-medium text-title">
                          Phases <span className="text-progress-red">*</span>
                        </label>
                        <Controller
                          name="face"
                          control={control}
                          rules={{ required: "Phase is required" }}
                          render={({ field }) => (
                            <Autocomplete
                              selectedKey={field.value || ""}
                              onSelectionChange={(key) => field.onChange(key)}
                              onBlur={field.onBlur}
                              placeholder="Select Phase"
                              className="w-full"
                              size="md"
                              classNames={{
                                trigger: `border text-caption border-gray-300 rounded-small px-3 py-3 text-sm ${
                                  errors.face ? "border-red-500" : ""
                                }`,
                                popoverContent:
                                  "bg-white border border-gray-200 shadow-md rounded-md",
                                listbox: "bg-white text-gray-700",
                              }}>
                              {faceOptions.map((option) => (
                                <AutocompleteItem
                                  key={option.key}
                                  textValue={option.label}>
                                  {option.label}
                                </AutocompleteItem>
                              ))}
                            </Autocomplete>
                          )}
                        />
                        {errors.face && (
                          <span className="text-sm text-red-500">
                            {errors.face.message}
                          </span>
                        )}
                      </div>

                      {/* Display pending items */}
                      <div className="w-auto text-title/50 text-caption-tiny mt-5 flex flex-row gap-2 flex-wrap">
                        {pendingItems.length === 0 ? (
                          <div className="bg-bgColor rounded-large w-auto px-3 py-2">
                            No items in pending
                          </div>
                        ) : (
                          pendingItems.map(
                            ({ title, startedAt, finishedAt, face }, idx) => (
                              <div
                                key={`${title}-${idx}`}
                                className="flex items-center justify-between bg-bgColor rounded-large px-4 py-2 w-auto">
                                <span>
                                  {`${title} (${face.replace(
                                    /_/g,
                                    " "
                                  )}, ${new Date(
                                    startedAt
                                  ).toLocaleDateString()} - ${new Date(
                                    finishedAt
                                  ).toLocaleDateString()})`}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemovePendingItem(idx)}
                                  className="text-progress-red/70 hover:text-progress-red ml-2"
                                  aria-label="Delete">
                                  <X size={16} />
                                </button>
                              </div>
                            )
                          )
                        )}
                      </div>

                      {/* Add to Pending button */}
                      <div className="w-full mt-10">
                        <button
                          type="submit"
                          disabled={
                            !titleValue?.trim() ||
                            !durationValue?.start ||
                            !durationValue?.end ||
                            !faceValue ||
                            !!errors.duration
                          }
                          className="w-full bg-bgColor text-primary font-medium py-3 rounded-full border border-title/20 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">
                          Add to Pending
                        </button>
                      </div>
                    </form>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2 py-6">
                      <Button
                        className="bg-transparent border-1 border-bgColor"
                        radius="full"
                        onPress={() => {
                          handleModalClose();
                          onClose();
                        }}>
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        radius="full"
                        disabled={pendingItems.length === 0}
                        onPress={onSaveAllItems}>
                        Save ({pendingItems.length})
                      </Button>
                    </div>
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
