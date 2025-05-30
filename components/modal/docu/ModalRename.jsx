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

export default function ModalRename({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Rename</ModalHeader>
        <ModalBody>
          <form>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-title">
                Title <span className="text-progress-red">*</span>
              </label>
              <input
                className="border text-caption border-gray-300 rounded-small px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Input new name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 py-4">
              <Button
                className="bg-transparent border-1 border-bgColor"
                radius="full"
                onPress={onClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                radius="full"
                onPress={() => {
                  // Add your rename logic here!
                  onClose();
                }}
              >
                Save
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
