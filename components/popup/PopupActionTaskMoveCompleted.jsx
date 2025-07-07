"use client";
import React, { useState } from "react";

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
import { toast } from "react-toastify";
import {
  changeStatusTaskAction,
  deleteTaskAction,
} from "@/action/board.action";
import { useRouter } from "next/navigation";

export default function PopupActionTaskMoveCompleted({
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
  onClose,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const result = await changeStatusTaskAction(taskId, "COMPLETED");
      if (result.success) {
        toast.success("Task completed successfully!");
        onClose();
        router.refresh();
      } else {
        toast.error(result.error || "Failed to complete task");
      }
    } catch (error) {
      toast.error("An error occurred while completing task");
    } finally {
      setIsLoading(false);
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
                        onClick={handleComplete}
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
