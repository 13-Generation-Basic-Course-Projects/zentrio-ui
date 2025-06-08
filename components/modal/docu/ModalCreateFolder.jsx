"use client";
import React from "react";
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
import { createFolderAction } from "@/action/document.action";

export default function ModalCreateFolder({ isOpen, onClose, boardId }) {
  const tokenFromGoogle = "ya29.a0AW4XtxiIRM0q6UxU1kQs0kkNkvhpcayVWTTivdBmUoxvDd0LS6rjsulQ3plI1oUuhGmcwcFjErPaq-v5OfItAulHCNe0hx89l2yg4qhNG-HhItuPFRQml0MdAV2ah_0zhlOPQtadJxXC0RVU60vBldU4dxSVLxHMSQUxdr--ZwaCgYKARsSARcSFQHGX2MiKQXjrFY9su2UHVnFgnH_iw0177";

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
      const payload = {
        accessToken: tokenFromGoogle,
        folderName: data.name,
        types: "FOLDER", // static value
        boardId, // coming from props
      };

      const createdFolder = await createFolderAction(payload);
      console.log("Folder Created:", createdFolder);

      
      reset();
      onClose();
    } catch (error) {
      console.error("Error creating folder:", error);
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
