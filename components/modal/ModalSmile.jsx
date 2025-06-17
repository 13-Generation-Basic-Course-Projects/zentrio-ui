import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { FaceIcon } from "../icon/everyicon";
import { IconpopupLeave } from "../icon/Iconpopup";
export default function ModalSmile({
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  action,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        // onPress={onOpen}
        className="bg-transparent  p-2 flex items-center gap-2 cursor-pointer p-0 border-0"
      >
        <FaceIcon strokwidth={2} size={4} color={"red"} />
        <span className="text-red-500 font-medium">Logout</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent className="flex  flex-col justify-center items-center">
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="w-8 h-8 rounded-full bg-slate-orange flex justify-center items-center ">
                  <IconpopupLeave />
                </div>
              </ModalHeader>
              <ModalHeader>{massageTitle}</ModalHeader>
              <ModalBody>
                <p>{massageBody}</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-slate-blue-more"
                  variant="light"
                  onPress={onClose}
                >
                  <p className="text-slate-blue">{massageUndo}</p>
                </Button>
                <Button className="bg-slate-red" onPress={onClose}>
                  <p className="text-red-300">{massageDo}</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
