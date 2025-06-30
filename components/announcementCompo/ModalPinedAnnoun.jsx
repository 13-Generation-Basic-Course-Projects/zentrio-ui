"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { toast } from "react-toastify";
import { pinedAnnouncementByIdAction } from "@/action/announcement.action";

export default function ModalPinedAnnoun({
  isOpen,
  onClose,
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
}) {
  const handlePined = async () => {
    try {
      const res = await pinedAnnouncementByIdAction(announId);
      if (res?.success) {
        toast.success("Announcement pinned successfully!");
        onClose();
      } else {
        toast.error("Failed to pin announcement.");
      }
    } catch (error) {
      toast.error("Something went wrong while pinning.");
      console.error("Pin error:", error);
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
            <p className="text-center break-words text-balance">
              {massageBody}
            </p>
          </ModalBody>

          {massageDo || massageUndo != null ? (
            swapButton ? (
              <ModalFooter>
                <form action={action}>
                  <Button className="bg-slate-blue text-white font-semibold">
                    <p className="text-blue-500">{massageDo}</p>
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
                <Button
                  className="bg-slate-blue text-white font-semibold"
                  onPress={handlePined}
                >
                  <p className="text-blue-500">{massageDo}</p>
                </Button>
              </ModalFooter>
            )
          ) : (
            <div className="h-5"></div>
          )}
        </>
      </ModalContent>
    </Modal>
  );
}
