"use client";
import React from "react";
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
  Input,
} from "@heroui/react";
import { IconAdd } from "../../icon/everyicon";

import { ganttChartSchema } from "@/lib/schemas/ganttChartSchema";
import { createGanttChartByBoardIdAction } from "@/action/board.action";

export default function ModalCreateGanttChart({ boardId, ganttChartId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // React Hook Form setup with Zod resolver
    ("log in modalgantchart", boardId);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(ganttChartSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      title: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data) => {
      ("Form data:", data);

    // Call the action with form data and boardId
    const result = await createGanttChartByBoardIdAction(data, boardId);
  };

  const handleClose = () => {
    reset();
    onOpenChange();
  };
    ("modal create gantchat", ganttChartId);
  return (
    <>
      {!ganttChartId.includes("No data available") ? (
        ""
      ) : (
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
                    Create Gantt Chart
                  </ModalHeader>
                  <ModalBody>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-4"
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
                                label: "text-sm font-medium text-title",
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
                              py-3
                              ${errors.title ? "border-red-500" : ""}
                            `,
                                input: "text-caption",
                              }}
                            />
                          )}
                        />
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
                          {isSubmitting ? "Creating..." : "Save"}
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
