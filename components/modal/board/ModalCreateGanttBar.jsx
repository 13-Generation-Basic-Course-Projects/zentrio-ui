"use client";
import React, { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
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

// Define the Zod schema to match your backend expectation
const ganttBarSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    startedAt: z
      .string({ required_error: "Start date is required" })
      .transform((val) => new Date(val))
      .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid start date",
      }),
    finishedAt: z
      .string({ required_error: "End date is required" })
      .transform((val) => new Date(val))
      .refine((date) => !isNaN(date.getTime()), {
        message: "Invalid end date",
      }),
    face: z.enum(faceEnum, { required_error: "Face is required" }),
  })
  .refine((data) => data.finishedAt >= data.startedAt, {
    message: "End date must be on or after start date",
    path: ["finishedAt"],
  });

export default function ModalCreateGanttBar({ input, ganttChartId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pendingItems, setPendingItems] = useState([]);

  // Use refs to track active toasts and prevent duplicates
  const activeToasts = useRef(new Set());
  const toastCounter = useRef(0);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(ganttBarSchema),
    defaultValues: {
      title: "",
      startedAt: "",
      finishedAt: "",
      face: "",
    },
  });

  // Watch fields to enable/disable add button
  const titleValue = watch("title");
  const startedAtValue = watch("startedAt");
  const finishedAtValue = watch("finishedAt");
  const faceValue = watch("face");

  // Utility function to safely show toast with simplified toastId
  const showToast = useCallback((type, message, options = {}) => {
    try {
      // Generate simple, unique toastId
      const toastId = `${type}-${++toastCounter.current}`;

      // Clean up any existing toast with same base identifier
      if (options.preventDuplicate) {
        activeToasts.current.forEach((id) => {
          if (id.startsWith(`${type}-`)) {
            try {
              toast.dismiss(id);
              activeToasts.current.delete(id);
            } catch (err) {
              // Silently handle dismiss errors
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
      // Fallback to console log if toast fails
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }, []);

  // Add item to pending list
  const onAddToPending = useCallback(
    (data) => {
      if (!data.title.trim()) return;

      const newItem = {
        title: data.title.trim(),
        startedAt: data.startedAt,
        finishedAt: data.finishedAt,
        face: data.face,
      };

      setPendingItems((prev) => [...prev, newItem]);

      // Show success toast with simplified message
      showToast("success", `"${data.title}" added to pending list!`, {
        preventDuplicate: false,
        autoClose: 2000,
      });

      // Reset form but keep face selection
      reset({
        title: "",
        startedAt: "",
        finishedAt: "",
        face: data.face,
      });
    },
    [showToast, reset]
  );

  // Remove item from pending list by index
  const handleRemovePendingItem = useCallback(
    (index) => {
      const removedItem = pendingItems[index];
      if (!removedItem) return;

      setPendingItems((prev) => prev.filter((_, i) => i !== index));

      // Show info toast for removal
      showToast("info", `"${removedItem.title}" removed from pending list`, {
        autoClose: 1500,
      });
    },
    [pendingItems, showToast]
  );

  // Handle final form submission (Save button)
  const onSaveAllItems = useCallback(async () => {
    if (pendingItems.length === 0) {
      showToast("warn", "No items in pending list to save", {
        preventDuplicate: true,
      });
      return;
    }

    const payload = pendingItems.map((item) => ({
      title: item.title,
      startedAt: new Date(item.startedAt).toISOString(),
      finishedAt: new Date(item.finishedAt).toISOString(),
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

      // Show success or error toast based on result
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

        // Clear form and pending items on success
        reset();
        setPendingItems([]);
        onOpenChange(); // Close modal
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

  // Handle modal close - cleanup function
  const handleModalClose = useCallback(() => {
    reset();
    setPendingItems([]);

    // Clean up any active toasts when modal closes
    activeToasts.current.forEach((toastId) => {
      try {
        toast.dismiss(toastId);
      } catch (err) {
        // Silently handle cleanup errors
        console.warn("Toast cleanup error:", err);
      }
    });
    activeToasts.current.clear();
  }, [reset]);

  return (
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

                  {/* Start Date Input */}
                  <div className="relative w-full flex flex-col gap-3 mt-3">
                    <label className="text-sm font-medium text-title">
                      Start Date <span className="text-progress-red">*</span>
                    </label>
                    <input
                      {...register("startedAt")}
                      type="date"
                      className={`border text-caption border-gray-300 rounded-small px-3 py-3 w-full pr-12 ${
                        errors.startedAt ? "border-red-500" : ""
                      }`}
                      placeholder="Choose start date"
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        cursor: "pointer",
                      }}
                    />
                    {errors.startedAt && (
                      <span className="text-sm text-red-500">
                        {errors.startedAt.message}
                      </span>
                    )}
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-0 flex items-center justify-center rounded bg-opacity-10 p-1.5 cursor-pointer"
                      onClick={() => {
                        document
                          .querySelector('input[name="startedAt"]')
                          ?.showPicker?.();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <style jsx>{`
                      input[type="date"]::-webkit-calendar-picker-indicator {
                        opacity: 0;
                        pointer-events: none;
                        display: none;
                      }
                    `}</style>
                  </div>

                  {/* End Date Input */}
                  <div className="relative w-full flex flex-col gap-3 mt-3">
                    <label className="text-sm font-medium text-title">
                      End Date <span className="text-progress-red">*</span>
                    </label>
                    <input
                      {...register("finishedAt")}
                      type="date"
                      className={`border text-caption border-gray-300 rounded-small px-3 py-3 w-full pr-12 ${
                        errors.finishedAt ? "border-red-500" : ""
                      }`}
                      placeholder="Choose end date"
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        cursor: "pointer",
                      }}
                    />
                    {errors.finishedAt && (
                      <span className="text-sm text-red-500">
                        {errors.finishedAt.message}
                      </span>
                    )}
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-0 flex items-center justify-center rounded bg-opacity-10 p-1.5 cursor-pointer"
                      onClick={() => {
                        document
                          .querySelector('input[name="finishedAt"]')
                          ?.showPicker?.();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Face Dropdown */}
                  <div className="flex flex-col gap-3 mt-3">
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
                        !startedAtValue ||
                        !finishedAtValue ||
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
  );
}
