"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { folderSchema } from "@/lib/schemas/documentSchema";
import { createDriveFileAction } from "@/action/drive.action";
import { toast } from "react-toastify";

export default function ModalCreateFolderInFolder({
  isOpen,
  onClose,
  folderId,
  tokenFromGoogle,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(folderSchema),
  });

  const onSubmit = async (data) => {
    try {
      const createdFolder = await createDriveFileAction({
        name: data.name,
        folderId,
        fileType: "FOLDER",
        token: tokenFromGoogle,
      });

      console.log("createdFolder: ", createdFolder);

      if (
        createdFolder?.status === "ACCEPTED" ||
        createdFolder?.success === true
      ) {
        toast.success("Folder created successfully!", {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      reset();
      onClose();
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="xl">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create New Folder
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-medium text-title">
                    Title <span className="text-progress-red">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="border text-caption border-gray-300 rounded-small px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Input your title"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 py-4">
                  <Button
                    className="bg-transparent border-1 border-bgColor"
                    radius="full"
                    onPress={() => {
                      reset();
                      close();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" radius="full">
                    Save
                  </Button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
