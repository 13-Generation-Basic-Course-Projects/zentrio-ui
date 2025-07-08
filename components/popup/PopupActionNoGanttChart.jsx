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
import { useRouter } from "next/navigation";
import { deleteDocumentAction } from "@/action/document.action";
export default function PopupActionNoGanttChart({
  accessToken,
  action,
  ganttChartId,
  setActiveTab,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // const router = useRouter();

  const handleConfirm = () => {
    //  ("Action confirmed for ganttChartId:", ganttChartId);

    // Switch to the Kanban tab
    setActiveTab("calendar"); // Change to "calendar"  or "Kanban" blahh blahh blahh

    // Close the modal
    onOpenChange(false);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px]"
        fullWidth="true"
      >
        Create
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent className="flex  flex-col justify-center items-center z-[50px]">
          {(onClose) => (
            <>
              <ModalHeader className="pt-10  pb-0">
                <div
                  className={`w-10 h-10 rounded-full bg-slate-red  text-h3 flex justify-center items-center  `}
                >
                  ?
                </div>
              </ModalHeader>
              <ModalHeader>
                <p className="font-extra-bold">
                  {" "}
                  Empty {ganttChartId != null ? "GanttBar" : "GanttChart"}?{" "}
                </p>
              </ModalHeader>
              <ModalBody>
                <p className="   text-center break-words text-balance">
                  Please add your{" "}
                  {ganttChartId != null ? "Gantt Bar" : "Gantt Chart"} first
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  className="bg-slate-red text-white font-semibold"
                  variant="light"
                  onPress={onClose}
                >
                  <p className="text-red-500">No, Cancel</p>
                </Button>
                <form action={action}>
                  <Button
                    className={`bg-slate-blue-more text-white font-semibold`}
                    onPress={handleConfirm}
                  >
                    <p className="text-blue-500">Yes, let’s go</p>
                  </Button>
                </form>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
