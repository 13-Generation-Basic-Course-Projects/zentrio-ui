"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import { toast } from "react-toastify";
import { deleteFileByFileIdAction } from "@/action/drive.action";
import { useRouter } from "next/navigation";
export default function PopupActionDeleteDriveFile({
  title,
  icon,
  bgcolor,
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  fileId,
  isFolder,
  action,
  accessToken,
  color,
  swapButton,
  successMessage,
  errorMessage,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

    (accessToken);
  const handleDelete = async () => {
    try {
      const result = await deleteFileByFileIdAction({ fileId, accessToken });
      if (result?.status === "success" || result?.success) {
        toast.success(
          successMessage ||
            (isFolder
              ? "Folder deleted successfully."
              : "File deleted successfully."),
          {
            position: "top-right",
            duration: 4000,
          }
        );
      } else {
        throw new Error("Deletion failed unexpectedly");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(
        errorMessage ||
        (isFolder
          ? "Failed to delete the folder"
          : "Failed to delete the file"
        ),
        {
          position: "top-right",
          autoClose: 4000
        }
      )
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent h-auto  flex items-center cursor-pointer  p-0 !border-0"
      >
        <div className={`font-medium ${color} `}>{title}</div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent className="flex  flex-col justify-center items-center z-[50px]">
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
                        className="bg-slate-red text-white font-semibold"
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
                        className="bg-slate-red text-white font-semibold"
                        onPress={onClose}
                        onClick={handleDelete}
                        // onPress={onClose}
                      >
                        <p className="text-red-500">{massageDo}</p>
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