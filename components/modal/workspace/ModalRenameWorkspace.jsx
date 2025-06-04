"use client";
import React, { useTransition } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RenameSchema } from "@/lib/schemas/workspaceSchema";

export default function ModalRenameWorkspace({
  isOpen,
  onClose,
  workspaceId,
  currentTitle,
  updateNameWorkspace, // async function passed as prop: (id, { title }) => ...
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(RenameSchema),
    defaultValues: { title: currentTitle },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data) => {
    startTransition(async () => {
      try {
        await updateNameWorkspace(workspaceId, data);
        reset();
        onClose(); // close modal after success
      } catch (err) {
        console.error(err);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="xl">
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Rename Workspace
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-title">
                    Title <span className="text-progress-red">*</span>
                  </label>
                  <input
                    {...register("title")}
                    className="border text-caption border-gray-300 rounded-small px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={currentTitle}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    type="button"
                    className="bg-transparent border border-bgColor"
                    radius="full"
                    onPress={() => {
                      close();
                      onClose();
                    }}
                    isDisabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    radius="full"
                    isDisabled={isPending}
                  >
                    {isPending ? "Saving..." : "Save"}
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
