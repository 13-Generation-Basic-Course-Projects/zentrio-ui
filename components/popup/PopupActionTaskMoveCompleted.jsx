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
  useDraggable,
} from "@heroui/react";
import { toast, ToastContainer } from "react-toastify";
import {
  changeStageToUnderReviewAction,
  deleteTaskAction,
} from "@/action/board.action";
import { useRealtime } from "@/hooks/useRealtime";
export default function PopupActionTaskMoveComplete({
  title,
  icon,
  bgcolor,
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  color,
  swapButton,
  action,
  ganttBarId,
  taskId,
  boardId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Real-time connection
  const { emitEvent } = useRealtime(boardId);

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  const handleDelete = async () => {
    try {
      const result = await changeStageToUnderReviewAction(taskId, "COMPLETED");
        ("respon delete", result);
      
      if (result.success) {
        // Emit real-time event for task stage change
        emitEvent('task-updated', {
          taskId: taskId,
          updatedTask: { stage: 'COMPLETED' }
        });
      }
      
      toast.success("Task move stage successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to move task!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent h-auto  flex items-center cursor-pointer  !p-0 !border-0 w-full"
        disableRipple={true}
        disableAnimation
      >
        <div
          className={`font-medium ${color} flex justify-start items-center w-full`}
        >
          {title}
        </div>
      </Button>
      <Modal
        ref={targetRef}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
      >
        <ModalContent
          {...moveProps}
          className="flex  flex-col justify-center items-center z-[50px]"
        >
          {(onClose) => (
            <>
              <ModalHeader>
                <div
                  className={`w-8 h-8 rounded-full ${bgcolor}  flex justify-center items-center `}
                >
                  {icon}
                </div>
              </ModalHeader>
              <ModalHeader>{massageTitle}</ModalHeader>
              <ModalBody>
                <p className="   text-center break-words text-balance">
                  {massageBody}
                </p>
              </ModalBody>

              {massageDo || massageUndo != null ? (
                swapButton ? (
                  <ModalFooter>
                    <form action={action}>
                      <Button
                        className="bg-green-500 text-white font-semibold"
                        // onPress={onClose}
                      >
                        <p className="text-red-500">{massageDo}</p>
                      </Button>
                    </form>
                    <Button
                      className={`bg-slate-blue-more text-white font-semibold`}
                      variant="light"
                      onPress={onClose}
                    >
                      <p className="text-blue-500">{massageUndo}</p>
                    </Button>
                  </ModalFooter>
                ) : (
                  <ModalFooter>
                    <Button
                      className={`bg-slate-blue-more text-white font-semibold`}
                      variant="light"
                      onPress={onClose}
                    >
                      <p className="text-blue-500">{massageUndo}</p>
                    </Button>
                    <form action={action}>
                      <Button
                        className="bg-green-300 text-white font-semibold"
                        onPress={onClose}
                        onClick={handleDelete}
                        // onPress={onClose}
                      >
                        <p className="text-white">{massageDo}</p>
                      </Button>
                    </form>
                  </ModalFooter>
                )
              ) : (
                <div className="h-5"></div>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
