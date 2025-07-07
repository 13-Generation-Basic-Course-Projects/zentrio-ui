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

export function ModalRenameTask({ taskId, boardId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newName, setNewName] = useState("");
  const [taskData, setTaskData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  // Fetch task data when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchTask = async () => {
        try {
          const response = await getTaskByBoardIdAction(boardId);
          const task = response?.payload?.find((t) => t.taskId === taskId); // Fix: Filter by taskId
          if (!task) throw new Error("Task not found");
          setTaskData(task);
          setNewName(task.title || "");
        } catch (err) {
          setError(err.message);
          toast.error("Failed to load task data: " + err.message, {
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
              backdropFilter: "blur(10px)",
            },
            progressStyle: {
              background: "rgba(255, 255, 255, 0.3)",
            },
          });
        }
      };
      fetchTask();
    }
  }, [isOpen, taskId, boardId]);

  const handleSave = async (close) => {
    if (!newName.trim()) {
      toast.error("Title cannot be empty", {
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
          backdropFilter: "blur(10px)",
        },
        progressStyle: {
          background: "rgba(255, 255, 255, 0.3)",
        },
      });
      return;
    }

    if (!taskData) {
      toast.error("Task data not loaded", {
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
          backdropFilter: "blur(10px)",
        },
        progressStyle: {
          background: "rgba(255, 255, 255, 0.3)",
        },
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Prepare data for updateTaskByIdAction
      const title = newName;
      const description = taskData.description || "";
      const startedAt = taskData.startedAt.endsWith("Z")
        ? taskData.startedAt
        : `${taskData.startedAt}Z`;
      const finishedAt = taskData.finishedAt.endsWith("Z")
        ? taskData.finishedAt
        : `${taskData.finishedAt}Z`;
      const boardIdValue = taskData.boardId;
      const ganttBarId = taskData.ganttBarId;

      // console.log("Sending update payload to updateTaskByIdAction:", {
      //   taskId,
      //   title,
      //   description,
      //   startedAt,
      //   finishedAt,
      //   boardId: boardIdValue,
      //   ganttBarId,
      // });

      const result = await updateTaskByIdAction(
        taskId,
        title,
        description,
        startedAt,
        finishedAt,
        boardIdValue,
        ganttBarId
      );

      // console.log("REsult from updateTaskByIdAction:", result);

      toast.success("Task updated successfully", {
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
          border: "1px solid #E5E7EB",
        },
        icon: "✅",
      });
      close();
      return result;
    } catch (err) {
      // console.error("Update error:", err, "Response:", err.message);
      setError(err.message);
      toast.error(`Failed to update task: ${err.message || "Bad Request"}`, {
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
          backdropFilter: "blur(10px)",
        },
        progressStyle: {
          background: "rgba(255, 255, 255, 0.3)",
        },
      });
      throw err;
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
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                        // console.log("Input changed to:", e.target.value);
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
                      onPress={() => handleSave(close)}
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