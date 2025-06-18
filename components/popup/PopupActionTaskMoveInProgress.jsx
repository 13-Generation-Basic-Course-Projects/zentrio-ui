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
  Input, // Import Input component from @heroui/react
} from "@heroui/react";
import { toast, ToastContainer } from "react-toastify";
import { FeedBackAction } from "@/action/board.action";

export default function PopupActionTaskMoveInProgress({
  title,
  icon,
  bgcolor,
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  color,
  swapButton,
  ganttBarId,
  taskId,
  boardId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comment, setComment] = useState(""); // State to store input value

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const result = await FeedBackAction(taskId, { comment, taskId });
      toast.success("Feedback submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      onOpenChange(false); // Close modal on success
    } catch (error) {
      console.error("Feedback submission failed", error);
      toast.error("Failed to submit feedback!", {
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
        className="bg-transparent h-auto flex items-center cursor-pointer !p-0 !border-0 w-full"
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
          className="flex flex-col justify-center items-center z-[50px]"
        >
          {(onClose) => (
            <>
              <ModalHeader>
                <div
                  className={`w-8 h-8 rounded-full ${bgcolor} flex justify-center items-center`}
                >
                  {icon}
                </div>
              </ModalHeader>
              <ModalHeader>{massageTitle}</ModalHeader>
              <ModalBody>
                <p className="text-center break-words text-balance">
                  {massageBody}
                </p>
                <Input
                  placeholder="Enter your feedback"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-4"
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-slate-blue-more text-white font-semibold"
                  variant="light"
                  onPress={onClose}
                >
                  <p className="text-blue-500">{massageUndo}</p>
                </Button>
                <Button
                  className="bg-green-300 text-white font-semibold"
                  onPress={handleSubmit}
                >
                  <p className="text-white">{massageDo}</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
}
