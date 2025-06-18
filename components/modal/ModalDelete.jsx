"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { IconpopupDelete } from "../icon/Iconpopup";
import { useTransition } from "react";

export default function ModalDelete({
  isOpen,
  onClose,
  messageTitle,
  messageBody,
  messageUndo,
  messageDo,
  action,
  boardId,
  userId,
  onDeleteSuccess,
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
      <ModalContent className="flex flex-col justify-center items-center">
        <>
          <ModalHeader>
            <div className="w-10 h-10 rounded-full bg-slate-orange flex justify-center items-center">
              <IconpopupDelete />
            </div>
          </ModalHeader>
          <ModalHeader>{messageTitle}</ModalHeader>
          <ModalBody>
            <p className="text-center">{messageBody}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-slate-blue-more text-white font-semibold"
              variant="light"
              onPress={onClose}
            >
              <p className="text-blue-500">{messageUndo}</p>
            </Button>
            <Button
              className="bg-slate-red text-white font-semibold"
              onPress={() => {
                if (action) {
                  startTransition(async () => {
                    try {
                      await action(boardId, userId);
                      if (typeof onDeleteSuccess === "function") {
                        onDeleteSuccess(userId); // Only call if it's a function
                      }
                      onClose();
                    } catch (error) {
                      console.error("Error in delete action:", error);
                    }
                  });
                }
              }}
              isDisabled={isPending || !action}
            >
              <p className="text-red-500">
                {isPending ? "Deleting..." : messageDo}
              </p>
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}
