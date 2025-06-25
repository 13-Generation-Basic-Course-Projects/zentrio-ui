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
import { IconpopupLeave } from "../icon/Iconpopup";
import { BadgeMinus } from "lucide-react";
import { leaveTheBoardAction } from "@/action/board.action";
import { useRouter } from "next/navigation"; // Updated import
import { getBoardMemberAction } from "@/action/member.action";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { deleteBoardAction } from "@/action/workspace.action";

export default function ModalLeave({
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  action,
  trigger,
  boardId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log("boardid ", boardId);
  const router = useRouter();

  const handleLeaveBoard = async () => {
    if (boardId) {
      try {
        const result = await leaveTheBoardAction(boardId);
        console.log("Leave board result:", result);

        if (result.success) {
          router.push("/workspace"); // Redirect to /workspace on success
        }
      } catch (error) {
        console.error("Error leaving board:", error);
      }
    }
  };
  const handleDeleteboardIfMangerRole = async () => {
    if (boardId) {
      try {
        const result = await deleteBoardAction(boardId);
        console.log("Leave board result:", result);

        if (result.success) {
          router.push("/workspace"); // Redirect to /workspace on success
        }
      } catch (error) {
        console.error("Error leaving board:", error);
      }
    }
  };

  return (
    <>
      {/* Use custom trigger if provided, otherwise use default span */}
      {trigger ? (
        <div onClick={onOpen} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <span onClick={onOpen} className="text-red-500 cursor-pointer pl-4">
          Quit Team
        </span>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent className="flex flex-col justify-center items-center">
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="w-8 h-8 rounded-full bg-slate-orange flex justify-center items-center">
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
                  onPress={async () => {
                    await handleLeaveBoard(); // Ensure async operation completes
                    const currentUserProfile =
                      await getCurrentUserProfileAction();

                    const boardMember = await getBoardMemberAction(boardId);
                    console.log(
                      "this is the boardmember",
                      boardMember,
                      currentUserProfile
                    );
                    onClose();
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
