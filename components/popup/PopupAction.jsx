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

import { IconpopupDelete } from "@/components/icon/Iconpopup";
import { useRouter } from "next/navigation";
import { deleteDocumentAction } from "@/action/document.action";
import { deleteCheckListByTaskIdAction } from "@/action/board.action";
import { toast } from "react-toastify";
export default function PopupAction({
  title,
  icon,
  bgcolor,
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  documentId,
  accessToken,
  color,
  swapButton,
  action,

  checkListId,
  taskId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //console.log(accessToken);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const result = await deleteCheckListByTaskIdAction(checkListId, taskId);
      if (result?.status === "success" || result?.success) {
        toast.success("You have deleted the checklist successfully", {
          position: "top-right",
          duration: 4000,
        });
        router.refresh(); // Refresh only on success
      } else {
        throw new Error("Deletion failed unexpectedly");
      }
    } catch (error) {
      //console.error("Delete failed:", error);
      toast.error(
        "Failed to delete checklist: " + (error.message || "Unknown error"),
        {
          position: "top-right",
          duration: 4000,
        }
      );
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
