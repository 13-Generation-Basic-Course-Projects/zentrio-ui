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
import { LeaveIcon } from "../icon/everyicon";
import { IconpopupDelete, IconpopupLeave } from "../icon/Iconpopup";
export default function ModalDelete({
  title,
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  color,
  action,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent  flex items-center gap-2 cursor-pointer p-3 !border-0"
      >
        <div className={`font-medium ${color} `}>{title}</div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent className="flex  flex-col justify-center items-center">
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="w-8 h-8 rounded-full bg-slate-orange flex justify-center items-center ">
                  <IconpopupDelete />
                </div>
              </ModalHeader>
              <ModalHeader>{massageTitle}</ModalHeader>
              <ModalBody>
                <p>{massageBody}</p>
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
                className="bg-slate-red text-white font-semibold"
                onPress={onClose}
              >
                <p className="text-red-500">{massageDo}</p>
                
              </Button>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
