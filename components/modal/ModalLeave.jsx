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
import { IconpopupLeave } from "../icon/Iconpopup";
import { leaveTheBoardAction } from "@/action/board.action";
import { useRouter } from "next/navigation";
import { getBoardMemberAction } from "@/action/member.action";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { deleteBoardAction } from "@/action/workspace.action";
import { useEffect, useState } from "react";

export default function ModalLeave({
  massageTitle,
  massageBody,
  massageUndo,
  massageDo,
  trigger,
  boardId,
  workspaceId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [boardMembers, setBoardMembers] = useState([]);
  const [userRole, setUserRole] = useState("");

  console.log("workspaceId in modal leave : ", workspaceId);

  const loadData = async () => {
    try {
      const userResponse = await getCurrentUserProfileAction();
      const memberResponse = await getBoardMemberAction(boardId);
      const user = userResponse?.payload?.user;
      const members = memberResponse || [];

      console.log("Current User is:", user);
      console.log("Board Members is:", members);
      
      const matchedMember = members.find(
        (member) => member.userId === user.userId
      );

      const role = matchedMember?.roles?.[0] || "UNKNOWN";

      console.log("Matched Role:", role);

      setCurrentUser(user);
      setBoardMembers(members);
      setUserRole(role);
    } catch (error) {
      console.error("Error loading modal data:", error);
    }
  };

  const handleLeaveBoard = async () => {
    try {
      const result = await leaveTheBoardAction(boardId);
      console.log("Leave board result:", result);
      if (result.success) {
        router.push("/workspace");
      }
    } catch (error) {
      console.error("Error leaving board:", error);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      const result = await deleteBoardAction(boardId, workspaceId);
      console.log("Delete board result:", result);
      if (result.success) {
        router.push("/workspace");
      }
    } catch (error) {
      console.error("Error deleting board:", error);
    }
  };

  const handleAction = async (onClose) => {
    console.log("🚀 User role in handleAction:", userRole);
    try {
      if (userRole === "ROLE_MANAGER") {
        await handleDeleteBoard();
      } else if (userRole ==="ROLE_LEADER" || userRole === "ROLE_MEMBER"){
        await handleLeaveBoard();
      }
      onClose();
    } catch (error) {
      console.error("Error executing action:", error);
    }
  };

  return (
    <>
      {trigger ? (
        <div
          onClick={() => {
            onOpen();
            loadData(); // load current user + members + role
          }}
          className="cursor-pointer"
        >
          {trigger}
        </div>
      ) : (
        <span
          onClick={() => {
            onOpen();
            loadData(); // same here
          }}
          className="text-red-500 cursor-pointer pl-4"
        >
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
                {currentUser && (
                  <p className="text-sm text-gray-500 mt-2">
                    Your Role:{" "}
                    <span className="font-semibold text-blue-500">
                      {userRole}
                    </span>
                  </p>
                )}
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
                  onPress={() => handleAction(onClose)}
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
