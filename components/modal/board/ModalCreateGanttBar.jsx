"use client";
import React, { useState } from "react";
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
import { ganttBarSchema } from "@/lib/schemas/ganttBarSchema";

export default function ModalCreateGanttBar({ input }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addedTitles, setAddedTitles] = useState([]);

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
      duration: "",
    },
  });

  // Watch the title field to enable/disable add button
  const titleValue = watch("title");

  // Add title to the list
  const onAddTitle = (data) => {
    if (!data.title.trim()) return;
    setAddedTitles((prev) => [...prev, data.title.trim()]);
    reset({ title: "", duration: data.duration }); // Reset only title, keep duration
  };

  // Remove title from the list by index
  const handleRemoveTitle = (index) => {
    setAddedTitles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle final form submission (Save button)
  const onSubmit = (data) => {
    console.log("Final form data:", {
      ...data,
      addedTitles,
    });
    // Here you would typically send the data to your API
    // Reset form and close modal
    reset();
    setAddedTitles([]);
  };

  // Handle modal close
  const handleModalClose = () => {
    reset();
    setAddedTitles([]);
  };

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
                <form onSubmit={handleSubmit(onAddTitle)}>
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

                  {/* Duration Input */}
                  <div className="relative w-full flex flex-col gap-3 mt-3">
                    <label className="text-sm font-medium text-title">
                      Duration <span className="text-progress-red">*</span>
                    </label>

                    <input
                      {...register("duration")}
                      type="date"
                      className={`border text-caption border-gray-300 rounded-small px-3 py-3 w-full pr-12 ${
                        errors.duration ? "border-red-500" : ""
                      }`}
                      placeholder="choose your date"
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        cursor: "pointer",
                      }}
                    />

                    {errors.duration && (
                      <span className="text-sm text-red-500">
                        {errors.duration.message}
                      </span>
                    )}

                    {/* Custom calendar icon container */}
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-0 flex items-center justify-center rounded bg-opacity-10 p-1.5 cursor-pointer"
                      onClick={() => {
                        document
                          .querySelector('input[type="date"]')
                          .showPicker?.();
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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

                  {/* Display added titles */}
                  <div className="w-auto text-title/50 text-caption-tiny mt-5 flex flex-row gap-2">
                    {addedTitles.length === 0 ? (
                      <div className="bg-bgColor rounded-large w-auto px-3 py-2">
                        No titles added
                      </div>
                    ) : (
                      addedTitles.map((title, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-bgColor rounded-large px-4 py-2 w-auto"
                        >
                          <span>{title}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTitle(idx)}
                            className="text-progress-red/70 hover:text-progress-red"
                            aria-label={`Remove title ${title}`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add button */}
                  <div className="w-full mt-10">
                    <button
                      type="submit"
                      disabled={!titleValue?.trim()}
                      className="w-full bg-bgColor text-primary font-medium py-3 rounded-full border border-title/20 hover:bg-title hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </form>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2 py-4">
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
                    onPress={handleSubmit((data) => {
                      onSubmit(data);
                      onClose();
                    })}
                  >
                    Save
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
