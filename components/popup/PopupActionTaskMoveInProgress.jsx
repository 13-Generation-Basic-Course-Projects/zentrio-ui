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
  Input,
  Textarea,
} from "@heroui/react";
import { toast } from "react-toastify";
import { FeedBackAction } from "@/action/board.action";

export default function PopupActionTaskMoveInProgress({
  title,
  icon,
  bgcolor,
  massageTitle, // Consider renaming to `messageTitle` for clarity
  massageBody, // Consider renaming to `messageBody`
  massageUndo, // Consider renaming to `messageUndo`
  massageDo, // Consider renaming to `messageDo`
  color,
  swapButton,
  ganttBarId,
  taskId,
  boardId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Please enter a comment!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      return;
    }

    setIsSubmitting(true);
    try {
        ({ taskId, comment });
      const result = await FeedBackAction(taskId, { comment, taskId });
      toast.success("Feedback submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
      setComment("");
      onOpenChange(false);
    } catch (error) {
      console.error("Feedback submission failed", error);
      toast.error("Failed to submit feedback!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setComment("");
    onOpenChange(false);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent h-auto flex items-center cursor-pointer !p-0 !border-0 w-full hover:bg-gray-50 transition-colors duration-200 rounded-md"
        disableRipple={false}
        aria-label={title}
      >
        <div
          className={`font-medium ${color} flex justify-start items-center w-full py-2 px-1`}
        >
          {title}
        </div>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="z-[50]"
        classNames={{
          backdrop: "bg-black/50 backdrop-blur-sm",
          base: "border-none shadow-2xl",
          body: "py-6",
          header: "border-b border-gray-100",
          footer: "border-t border-gray-100",
        }}
      >
        <ModalContent className="bg-white rounded-2xl overflow-hidden">
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center items-center gap-3 py-6 bg-gradient-to-r from-gray-50 to-white">
                <div
                  className={`w-12 h-12 rounded-xl ${bgcolor} flex justify-center items-center shadow-lg`}
                >
                  <div className="text-xl">{icon}</div>
                </div>
                <span className="text-xl font-semibold text-gray-800">
                  {massageTitle}
                </span>
              </ModalHeader>

              <ModalBody className="px-8 py-8 space-y-6">
                <p className="text-center text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                  {massageBody}
                </p>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 text-left">
                    Your Feedback
                  </label>
                  <Textarea
                    placeholder="Share your thoughts, concerns, or suggestions..."
                    value={comment}
                    onValueChange={setComment}
                    minRows={4}
                    maxRows={8}
                    className="w-full"
                    classNames={{
                      base: "w-full",
                      input: [
                        "bg-white",
                        "border-2",
                        "border-gray-200",
                        "hover:border-gray-300",
                        "focus:border-blue-500",
                        "rounded-xl",
                        "px-4",
                        "py-3",
                        "text-gray-800",
                        "placeholder:text-gray-400",
                        "resize-none",
                        "transition-all",
                        "duration-200",
                        "shadow-sm",
                        "focus:shadow-md",
                      ],
                      inputWrapper: [
                        "border-none",
                        "bg-transparent",
                        "shadow-none",
                        "hover:bg-transparent",
                        "focus-within:bg-transparent",
                        "!cursor-text",
                      ],
                    }}
                    autoFocus
                    aria-label="Feedback input"
                  />
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>Help us improve by sharing your experience</span>
                    <span>{comment.length}/500</span>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter className="px-8 py-6 bg-gray-50 gap-3">
                <Button
                  variant="light"
                  onPress={handleClose}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-medium rounded-xl transition-all duration-200"
                  aria-label={massageUndo}
                >
                  {massageUndo}
                </Button>
                <Button
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={isSubmitting || !comment.trim()}
                  className="px-8 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={massageDo}
                >
                  {isSubmitting ? "Submitting..." : massageDo}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
