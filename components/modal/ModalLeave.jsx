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
import { useState } from "react";

export default function ModalLeave({ trigger, boardId, workspaceId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getModalContent = () => {
    if (userRole === "ROLE_MANAGER") {
      return {
        title: "Delete Board?",
        body: "This will permanently delete the board and remove all members.",
        confirmText: "Delete Board",
        isDestructive: true,
      };
    }

    return {
      title: "Leave Team?",
      body: "You'll lose access to this board.",
      confirmText: "Leave Team",
      isDestructive: false,
    };
  };

  const loadUserRole = async () => {
    try {
      const userResponse = await getCurrentUserProfileAction();
      const memberResponse = await getBoardMemberAction(boardId);
      const user = userResponse?.payload?.user;
      const members = memberResponse || [];

      const matchedMember = members.find(
        (member) => member.userId === user.userId
      );

      const role = matchedMember?.roles?.[0] || "ROLE_MEMBER";
      setUserRole(role);
    } catch (error) {
      console.error("Error loading user role:", error);
      setUserRole("ROLE_MEMBER"); // Default fallback
    }
  };

  const handleAction = async (onClose) => {
    setIsLoading(true);

    try {
      let result;

      if (userRole === "ROLE_MANAGER") {
        result = await deleteBoardAction(boardId, workspaceId);
      } else {
        result = await leaveTheBoardAction(boardId);
      }

      if (result?.success) {
        router.push("/workspace");
        onClose();
      }
    } catch (error) {
      console.error("Error executing action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = async () => {
    onOpen();
    await loadUserRole();
  };

  const modalContent = getModalContent();

  return (
    <>
      {trigger ? (
        <div onClick={handleOpenModal} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <span
          onClick={handleOpenModal}
          className="text-red-500 hover:text-red-600 cursor-pointer pl-4 transition-colors"
        >
          Quit Team
        </span>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-3 pb-2">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    modalContent.isDestructive
                      ? "bg-red-50 border-2 border-red-100"
                      : "bg-orange-50 border-2 border-orange-100"
                  }`}
                >
                  <IconpopupLeave
                    className={`w-8 h-8 ${
                      modalContent.isDestructive
                        ? "text-red-500"
                        : "text-orange-500"
                    }`}
                  />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {modalContent.title}
                </h2>
              </ModalHeader>

              <ModalBody className="text-center py-2">
                <p className="text-gray-600 text-base">{modalContent.body}</p>
              </ModalBody>

              <ModalFooter className="flex gap-3 pt-4">
                <Button
                  variant="light"
                  onPress={onClose}
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </Button>

                <Button
                  onPress={() => handleAction(onClose)}
                  disabled={isLoading}
                  className={`flex-1 rounded-full text-white font-medium ${
                    modalContent.isDestructive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-orange-500 hover:bg-orange-600"
                  } disabled:opacity-50`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    modalContent.confirmText
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
