"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { deleteAnnouncementByIdAction } from "@/action/announcement.action";
import { toast } from "react-toastify";

export default function ModalDeleteAnnoun({
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
  announId,
  isOpen,
  onClose,
}) {
  const handleDelete = async () => {
    try {
      const res = await deleteAnnouncementByIdAction(announId);
      if (res?.success) {
        toast.success("Announcement deleted successfully!");
        onClose(); // Only close modal if deletion succeeded
      } else {
        toast.error("Failed to delete announcement.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
      console.error("Delete error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
      <ModalContent className="flex flex-col justify-center items-center z-[50px]">
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
            <p className="text-center break-words text-balance">{massageBody}</p>
          </ModalBody>

          {massageDo || massageUndo ? (
            swapButton ? (
              <ModalFooter>
                <form action={action}>
                  <Button className="bg-slate-red text-white font-semibold">
                    <p className="text-red-500">{massageDo}</p>
                  </Button>
                </form>
                <Button
                  className="bg-slate-blue-more text-white font-semibold"
                  variant="light"
                  onPress={onClose}
                >
                  <p className="text-blue-500">{massageUndo}</p>
                </Button>
              </ModalFooter>
            ) : (
              <ModalFooter>
                <Button
                  className="bg-slate-blue-more text-white font-semibold"
                  variant="light"
                  onPress={onClose}
                >
                  <p className="text-blue-500">{massageUndo}</p>
                </Button>
                <form action={action}>
                  <Button
                    className="bg-slate-red text-white font-semibold"
                    onPress={handleDelete}
                  >
                    <p className="text-red-500">{massageDo}</p>
                  </Button>
                </form>
              </ModalFooter>
            )
          ) : (
            <div className="h-5" />
          )}
        </>
      </ModalContent>
    </Modal>
  );
}
