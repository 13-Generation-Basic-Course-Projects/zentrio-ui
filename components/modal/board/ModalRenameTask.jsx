"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  useDraggable,
} from "@heroui/react";
import {
  getTaskByBoardIdAction,
  updateTaskByIdAction,
} from "@/action/board.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ModalRenameTask({
  isOpen,
  onOpenChange,
  taskId,
  title,
  description,
  startedAt,
  finishedAt,
  boardId,
  ganttBarId,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: title || "",
    description: description || "",
    startedAt: startedAt || "",
    finishedAt: finishedAt || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateTaskByIdAction(
        taskId,
        formData.title,
        formData.description,
        formData.startedAt,
        formData.finishedAt,
        boardId,
        ganttBarId
      );

      if (result.success) {
        toast.success("Task updated successfully!");
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.error || "Failed to update task");
      }
    } catch (error) {
      toast.error("An error occurred while updating task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent !p-0 m-0 border-none shadow-none min-w-0 h-auto w-full"
        radius="none"
        disableRipple={true}
        disableAnimation
      >
        <div className="flex justify-start items-center w-full">Rename</div>
      </Button>
      <Modal
        ref={targetRef}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                Rename
              </ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-title">
                      Title <span className="text-progress-red">*</span>
                    </label>
                    <input
                      className="border text-caption border-gray-300 rounded-small px-3 py-3 pt-3 focus:outline-none focus:ring-2 focus:ring-rose-500"
                      placeholder="Input your title"
                      required
                      value={formData.title}
                      onChange={(e) => {
                        setFormData({ ...formData, title: e.target.value });
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 py-4">
                    <Button
                      className="bg-transparent border-1 border-bgColor"
                      radius="full"
                      onPress={() => {
                        close();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      radius="full"
                      isLoading={isLoading}
                      onPress={() => handleSubmit(e)}
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
