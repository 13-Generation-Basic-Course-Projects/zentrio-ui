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
import { useTransition } from "react";

/* new modal */
export default function ModalDelete({
  isOpen,
  onClose,
  messageTitle,
  messageBody,
  messageUndo,
  messageDo,
  action,
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
      <ModalContent className="flex flex-col justify-center items-center">
        <>
          <ModalHeader>
            <div className="w-10 h-10 rounded-full bg-slate-orange flex justify-center items-center">
              <IconpopupDelete />
            </div>
          </ModalHeader>
          <ModalHeader>{messageTitle}</ModalHeader>
          <ModalBody>
            <p>{messageBody}</p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-slate-blue-more text-white font-semibold"
              variant="light"
              onPress={onClose}
            >
              <p className="text-blue-500">{messageUndo}</p>
            </Button>

            <Button
              className="bg-slate-red text-white font-semibold"
              onPress={() => {
                startTransition(() => {
                  action?.();
                });
              }}
              isDisabled={isPending}
            >
              <p className="text-red-500">
                {isPending ? "Deleting..." : messageDo}
              </p>
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
}




/* old modal */
// export default function ModalDelete({
//   title,
//   massageTitle,
//   massageBody,
//   massageUndo,
//   massageDo,
//   color,
//   action,
// }) {
//   // const { isOpen, onOpen, onOpenChange } = useDisclosure();

//   return (
//     <>
//       {/* <Button
//         onPress={onOpen}
//         className="bg-transparent  flex items-center gap-2 cursor-pointer p-3 !border-0"
//       >
//         <div className={`font-medium ${color} `}>{title}</div>
//       </Button> */}
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
//         <ModalContent className="flex  flex-col justify-center items-center">
//           {(onClose) => (
//             <>
//               <ModalHeader>
//                 <div className="w-8 h-8 rounded-full bg-slate-orange flex justify-center items-center ">
//                   <IconpopupDelete />
//                 </div>
//               </ModalHeader>
//               <ModalHeader>{massageTitle}</ModalHeader>
//               <ModalBody>
//                 <p>{massageBody}</p>
//               </ModalBody>
//               <ModalFooter>
//                <Button
//                 className="bg-slate-blue-more text-white font-semibold"
//                 variant="light"
//                 onPress={onClose}
//               >
//                 <p className="text-blue-500">{massageUndo}</p>

//               </Button>

//               <Button
//                 className="bg-slate-red text-white font-semibold"
//                 onPress={onClose}
//               >
//                 <p className="text-red-500">{massageDo}</p>
                
//               </Button>

//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
