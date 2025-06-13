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
import { useState } from "react";
import { deleteAnnouncementByIdAction } from "@/action/announcement.action";

import { IconpopupDelete } from "../icon/Iconpopup";
import { useRouter } from "next/navigation";
import { deleteDocumentAction } from "@/action/document.action";
export default function ModalEditAnnoun({
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
  announId,
  onDeleteSuccess,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  console.log(accessToken);
  // const router = useRouter();

// const handleDelete = async (id) => {
//   console.log("modal delete announce id: ", id);
//   await deleteAnnouncementByIdAction(id);
// };

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
                        // onClick={handleDelete(announId)}
                        // onPress={() => handleDelete(announId) && onClose} 
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
