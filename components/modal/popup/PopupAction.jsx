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
export default function PopupAction({
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
                <div className={`w-8 h-8 rounded-full ${bgcolor}  flex justify-center items-center `}>
                  {icon}
                </div>
              </ModalHeader>
              <ModalHeader>{massageTitle}</ModalHeader>
              <ModalBody>
                <p>{massageBody}</p>
              </ModalBody>
              
              {massageDo || massageUndo != null 
                ? 
                  swapButton
                    ?
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
                    :
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
                        // onPress={onClose}
                      >
                            <p className="text-red-500">{massageDo}</p>
                      </Button>
                      </form>
                    </ModalFooter> 
                :  
                <div className="h-5"></div>
              }
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}