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
      {/* <Button
  onPress={onOpen}
  disableRipple
  disableAnimation
  className="relative w-full h-12 rounded-2xl 
    backdrop-blur-md border border-white/10 
    bg-gradient-to-br from-white/10 via-white/5 to-white/0 
    transition-all duration-300 ease-in-out 
    shadow-[0_4px_20px_rgba(91,192,222,0.2)] 
    hover:shadow-[0_8px_30px_rgba(91,192,222,0.35)] 
    hover:scale-[1.04] active:scale-95 
    disabled:opacity-50 disabled:cursor-not-allowed group"
>
  
  <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

  
  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-cyan-300/40 transition-all duration-300" />

  
  <div className="relative z-10 flex items-center justify-center gap-2 text-white">
    <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
    <span className="font-medium tracking-wide text-sm">Logout</span>
  </div>
</Button> */}

      <Button
        onPress={onOpen}
        disableRipple
        disableAnimation
        className="group relative w-full h-[48px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#59BAD5]  via-[#0098c6] to-[#4ccbe1] backdrop-blur-md p-4 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/25"
      >
        <div className="absolute inset-0 bg-gradient-to-r  from-[#59BAD5]  via-[#0098c6] to-[#4ccbe1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
        <div className="relative flex items-center justify-center gap-3 text-white">
          <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
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
