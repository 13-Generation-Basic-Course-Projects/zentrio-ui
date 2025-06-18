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

// Define the Face enum values
const faceEnum = [
  "PLANNING",
  "REQUIREMENT_ANALYSIS",
  "DESIGN",
  "IMPLEMENTATION",
  "TESTING_AND_REVIEW",
  "DEPLOYMENT_AND_MAINTENANCE",
];

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
    }),
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
      duration: { start: "", end: "" },
      face: "",
    },
  });

  // Watch fields to enable/disable add button
  const titleValue = watch("title");
  const durationValue = watch("duration");
  const faceValue = watch("face");

  const showToast = useCallback((type, message, options = {}) => {
    try {
      const toastId = `${type}-${++toastCounter.current}`;
      if (options.preventDuplicate) {
        activeToasts.current.forEach((id) => {
          if (id.startsWith(`${type}-`)) {
            try {
              toast.dismiss(id);
              activeToasts.current.delete(id);
            } catch (err) {
              console.warn("Toast dismiss error:", err);
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
          activeToasts.current.delete(toastId);
          if (options.onClose) options.onClose();
        },
      };

      activeToasts.current.add(toastId);
      return toast[type](message, toastOptions);
    } catch (error) {
      console.error("Toast error:", error);
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }, []);

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
        duration: { start: "", end: "" },
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

    const payload = pendingItems.map((item) => ({
      title: item.title,
      startedAt: new Date(item.startedAt + "T00:00:00.000Z").toISOString(),
      finishedAt: new Date(item.finishedAt + "T23:59:59.999Z").toISOString(),
      face: item.face,
      ganttChartId,
    }));

    console.log("Sending payload to action:", payload);

    try {
      const result = await createGanttBarsByGanttChartIdAction({
        ganttChartId,
        data: payload,
      });

      console.log("API result:", result);

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
        showToast("error", `Failed to create Gantt bars. Please try again.`, {
          preventDuplicate: true,
          autoClose: 4000,
        });
      }
    } catch (err) {
      console.error("Failed to create Gantt bars:", err);
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

  const handleModalClose = useCallback(() => {
    reset();
    setPendingItems([]);
    activeToasts.current.forEach((toastId) => {
      try {
        toast.dismiss(toastId);
      } catch (err) {
        console.warn("Toast cleanup error:", err);
      }
    });
    activeToasts.current.clear();
  }, [reset]);

  return (
    <>
      {(ganttChartId ?? "").includes("No data available") ? (
        ""
      ) : (
        <>
          <Button
            onPress={onOpen}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px]"
            fullWidth
          >
            <IconAdd />
            Create
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={handleModalClose}
            size="xl"
          >
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
                              isRequired
                              className="max-w-none"
                              minValue={today(getLocalTimeZone())} // Prevent past dates
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
                              label="Gantt Bar Duration"
                              labelPlacement="outside"
                              isInvalid={!!errors.duration}
                              errorMessage={
                                errors.duration?.start?.message ||
                                errors.duration?.end?.message ||
                                errors.duration?.message
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
                          Face <span className="text-progress-red">*</span>
                        </label>
                        <select
                          {...register("face")}
                          className={`border text-caption border-gray-300 rounded-small px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.face ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">Select face</option>
                          {faceEnum.map((face) => (
                            <option key={face} value={face}>
                              {face.replace(/_/g, " ")}
                            </option>
                          ))}
                        </select>
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
                                className="flex items-center justify-between bg-bgColor rounded-large px-4 py-2 w-auto"
                              >
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
                                  aria-label="Delete"
                                >
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
                            !faceValue
                          }
                          className="w-full bg-bgColor text-primary font-medium py-3 rounded-full border border-title/20 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
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
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        radius="full"
                        disabled={pendingItems.length === 0}
                        onPress={onSaveAllItems}
                      >
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
