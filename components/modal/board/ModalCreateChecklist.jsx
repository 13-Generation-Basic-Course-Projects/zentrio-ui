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
import { parseDate } from "@internationalized/date";
import { checklistSchema } from "@/lib/schemas/createCheckListSchema";

export default function ModalCreateChecklist({
  onSubmit,
  buttonText = "Create",
  modalTitle = "Create Checklist",
  taskid,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      title: "",
      duration: {
        start: "2024-04-01",
        end: "2024-04-08",
      },
      description: "",
    },
  });

  // Handle form submission
  const onFormSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit({
        title: data.title.trim(),
        duration: {
          start: data.duration.start,
          end: data.duration.end,
        },
        description: data.description || "New checklist item",
      });
      reset(); // Reset form after submission
      onOpenChange(false); // Close modal
    }
  };

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
