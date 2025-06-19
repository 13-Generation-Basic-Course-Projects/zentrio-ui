import { IconpopupLeave } from "@/components/icon/Iconpopup";
import { LogOut } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function ModalLogOut({
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  onConfirm, // <-- Add new prop for confirmation callback
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
   return (
    <>
      <Button
        onPress={onOpen}
        disableRipple={true}
        disableAnimation
        className="relative w-full h-[48px] overflow-hidden rounded-2xl 
    bg-gradient-to-r from-[#59BAD5] to-[#3BA0C0] p-4 
    transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
    hover:scale-105 
    hover:shadow-2xl hover:shadow-[#59BAD5]/40 
    disabled:cursor-not-allowed disabled:opacity-70 group
  "
      >
        <div className="relative flex items-center justify-center gap-3 text-white z-10">
          <>
            <LogOut className="w-5 h-5 transition-transform duration-300 hover:scale-110" />
            <span className="font-semibold">Logout</span>
          </>
        </div>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent className="flex flex-col justify-center items-center">
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
                  <p className="text-blue-500">{massageUndo}</p>
                </Button>
                <Button
                  className="bg-slate-red"
                  onPress={() => {
                    onConfirm(); // Call the logout function
                    onClose(); // Close modal after confirm
                  }}
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
