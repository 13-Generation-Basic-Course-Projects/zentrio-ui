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

export default function ModalLeave({ trigger, boardId, workspaceId }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState(null);
  const [boardMembers, setBoardMembers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Dynamic content based on role
  const getModalContent = () => {
    switch (userRole) {
      case "ROLE_MANAGER":
        return {
          title: "Quit Team?",
          body: "As a manager, leaving will permanently delete this entire board and remove all team members. This action cannot be undone.",
          confirmText: "Leave",
          cancelText: "Cancel",
          isDestructive: true,
          warningMessage:
            "This will permanently delete the board and remove all team members.",
        };
      case "ROLE_LEADER":
        return {
          title: "Quit Team?",
          body: "Are you sure you want to leave this team? As a leader, your departure may affect team coordination.",
          confirmText: "Leave Team",
          cancelText: "Cancel",
          isDestructive: false,
          warningMessage:
            "You will lose access to this board and its contents.",
        };
      case "ROLE_MEMBER":
        return {
          title: "Leave Team?",
          body: "Are you sure you want to leave this team? You'll no longer have access to this board.",
          confirmText: "Leave Team",
          cancelText: "Cancel",
          isDestructive: false,
          warningMessage:
            "You will lose access to this board and its contents.",
        };
      default:
        return {
          title: "Leave Team?",
          body: "Are you sure you want to leave this team?",
          confirmText: "Leave",
          cancelText: "Cancel",
          isDestructive: false,
          warningMessage: "You will lose access to this board.",
        };
    }
  };

  const loadData = async () => {
    setIsDataLoading(true);
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
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleLeaveBoard = async () => {
    try {
      const result = await leaveTheBoardAction(boardId);
      console.log("Leave board result:", result);
      if (result.success) {
        router.push("/workspace");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error leaving board:", error);
      return false;
    }
  };

  const handleDeleteBoard = async () => {
    try {
      const result = await deleteBoardAction(boardId, workspaceId);
      console.log("Delete board result:", result);
      if (result.success) {
        router.push("/workspace");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting board:", error);
      return false;
    }
  };

  const handleAction = async (onClose) => {
    console.log(" User role in handleAction:", userRole);
    setIsLoading(true);

    try {
      let success = false;

      if (userRole === "ROLE_MANAGER") {
        success = await handleDeleteBoard();
      } else if (userRole === "ROLE_LEADER" || userRole === "ROLE_MEMBER") {
        success = await handleLeaveBoard();
      }

      if (success) {
        onClose();
      } else {
       
        console.error("Action failed");
      }
    } catch (error) {
      console.error("Error executing action:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    onOpen();
    loadData();
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
          className="text-red-500 cursor-pointer pl-4"
        >
          Quit Team
        </span>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent className="flex flex-col justify-center items-center">
          {(onClose) => (
            <>
              <ModalHeader>
                <div
                  className={`w-12 h-12 rounded-full flex justify-center items-center ${
                    modalContent.isDestructive ? "bg-red-100" : "bg-orange-100"
                  }`}
                >
                  <IconpopupLeave
                    className={`w-6 h-6 ${
                      modalContent.isDestructive
                        ? "text-red-600"
                        : "text-orange-600"
                    }`}
                  />
                </div>
              </ModalHeader>

              <ModalHeader className="text-center pb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {modalContent.title}
                </h3>
              </ModalHeader>

              <ModalBody className="text-center px-6">
                {isDataLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                    <span className="ml-2 text-gray-600">Loading...</span>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-700 mb-4">{modalContent.body}</p>

                    {/* {currentUser && userRole && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-600">
                          Your Role:{" "}
                          <span
                            className={`font-semibold ${
                              userRole === "ROLE_MANAGER"
                                ? "text-purple-600"
                                : userRole === "ROLE_LEADER"
                                ? "text-blue-600"
                                : "text-green-600"
                            }`}
                          >
                            {userRole.replace("ROLE_", "")}
                          </span>
                        </p>
                      </div>
                    )} */}

                    {modalContent.isDestructive && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-red-800">
                          {modalContent.warningMessage}
                        </p>
                      </div>
                    )}

                    {!modalContent.isDestructive && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          {modalContent.warningMessage}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </ModalBody>

              <ModalFooter className="flex gap-3 pt-4">
                <Button
                  variant="light"
                  onPress={onClose}
                  disabled={isLoading || isDataLoading}
                  className="min-w-24 rounded-full border border-gray-300 hover:bg-gray-50"
                >
                  <span className="text-gray-700">
                    {modalContent.cancelText}
                  </span>
                </Button>

                <Button
                  className={`min-w-24 text-white font-medium rounded-full ${
                    modalContent.isDestructive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-orange-600 hover:bg-orange-700"
                  } ${
                    isLoading || isDataLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onPress={() => handleAction(onClose)}
                  disabled={isLoading || isDataLoading}
                >
                  <span>
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      modalContent.confirmText
                    )}
                  </span>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
