"use client";
import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Textarea,
} from "@heroui/react";
import Image from "next/image";

export default function ModalCreateWorkspace() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-[10px] min-w-0  bg-transparent border-1 border-primary text-primary"
        size="sm"
      >
        +
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent className="max-h-[90vh] overflow-y-auto">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Workspace
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <div className="grid grid-cols-4 gap-2">
                    {/* title */}
                    <div className="col-span-3 flex flex-col items-start justify-center">
                      <label className="text-label-sm"> workspace title</label>
                      <Input
                        className="max-w-none h-[40px] bg-transparent"
                        radius="full"
                        placeholder="Type here"
                        type="text"
                        variant="bordered"
                      />
                    </div>
                    {/* select option */}
                    <div className="flex flex-col items-start justify-center">
                      <label className="text-label-sm"> color</label>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            className="h-[40px]"
                            radius="full"
                          >
                            Open Menu
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="new">New file</DropdownItem>
                          <DropdownItem key="copy">Copy link</DropdownItem>
                          <DropdownItem key="edit">Edit file</DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                          >
                            Delete file
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                    {/* description */}
                    <div className="col-span-4">
                      <label className="text-label-sm">
                        Workspace Description
                      </label>
                      <Textarea
                        className="max-w-none bg-transparent"
                        placeholder="Enter your description"
                        variant="bordered"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end items-center pt-2">
                    <Button color="primary" radius="full" onPress={onClose}>
                      Create Workspace
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
