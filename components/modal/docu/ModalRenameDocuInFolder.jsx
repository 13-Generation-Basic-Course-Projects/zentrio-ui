"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { updateFileNameByFileIdAction } from "@/action/drive.action";
import { toast } from "react-toastify";

/* rename foc in document */
export function ModalRenameFileOrFolderInFolder({
  tokenFromGoogle,
  fileId,
  successMessage,
  errorMessage,
  isFolder,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newName, setNewName] = useState("");

  const handleSave = async (close) => {
    try {
      const updatedDoc = await updateFileNameByFileIdAction({
        tokenFromGoogle,
        fileId,
        newName,
      });

      if (updatedDoc?.status === "success" || updatedDoc?.success) {
        toast.success(
          successMessage ||
            (isFolder
              ? "Folder renamed successfully."
              : "File renamed successfully."),
          {
            position: "top-right",
            duration: 4000,
          }
        );
      } else {
        throw new Error("Deletion failed unexpectedly");
      }
      close();
    } catch (error) {
      console.error("Rename failed:", error);
      toast.error(
        errorMessage ||
          (isFolder
            ? "Failed to rename the folder"
            : "Failed to rename the file"),
        {
          position: "top-right",
          duration: 4000,
        }
      );
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent p-0 m-0 border-none shadow-none  min-w-0 h-auto "
        radius="none"
        disableRipple={true}
        disableAnimation
      >
        Rename
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        1
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Rename</ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-title">
                      Title <span className="text-progress-red">*</span>
                    </label>
                    <input
                      className="border text-caption border-gray-300 rounded-small px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Input your title"
                      required
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 py-4">
                    <Button
                      className="bg-transparent border-1 border-bgColor"
                      radius="full"
                      onPress={() => {
                        close();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      radius="full"
                      onPress={() => handleSave(close)}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}