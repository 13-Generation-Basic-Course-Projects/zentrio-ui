import { IconpopupLeave } from "@/components/icon/Iconpopup";
import { LogOut, ArrowRight } from "lucide-react";
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
        disableRipple
        disableAnimation
        className=" w-full h-[48px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#59BAD5]  via-[#0098c6] to-[#4ccbe1] backdrop-blur-md p-4 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25"
      >
        <div className=" inset-0 bg-gradient-to-r from-[#59BAD5] via-[#0098c6] to-[#4ccbe1] opacity-0 hover:opacity-100 transition-opacity duration-500" />
        <div className=" inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        <div className="relative flex items-center justify-center gap-3 text-white">
          <LogOut className="w-5 h-5 transition-transform duration-300 hover:rotate-180" />
          <span className="font-bold tracking-wide">Logout</span>
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
