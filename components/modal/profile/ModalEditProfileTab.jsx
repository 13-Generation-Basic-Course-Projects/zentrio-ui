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
import React from "react";
import { IconEdit } from "../../icon/everyicon";

export function ModalEditProfile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        <IconEdit strokeWidth={1.5} size={5} color={"currentColor"} /> Edit
        Profile
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <div className=" flex flex-col  gap-3 ">input</div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      className="bg-transparent border-1 border-bgColor"
                      radius="full"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button color="primary" radius="full" onPress={onClose}>
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
export function ModalEditAchievment() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        <IconEdit strokeWidth={1.5} size={5} color={"currentColor"} /> Edit
        Achievment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <div className=" flex flex-col  gap-3 ">input</div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      className="bg-transparent border-1 border-bgColor"
                      radius="full"
                      onPress={onClose}
                    >
                      Cancel
                    </Button>
                    <Button color="primary" radius="full" onPress={onClose}>
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
