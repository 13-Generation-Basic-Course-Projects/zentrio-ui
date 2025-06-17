"use client";
import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { IconAdd } from "../../icon/everyicon";

export const ganttBars = [
  { key: "planning", label: "Planning" },
  { key: "development", label: "Development" },
  { key: "review", label: "Review" },
];

export default function ModalUpdateTask({ input }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex  items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-gray-100 h-[50px]"
        // className="bg-transparent h-[340px]  "
        fullWidth="true "
      >
        <IconAdd />
        Create
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Task
              </ModalHeader>
              <ModalBody>
                <form action="" className="grid grid-cols-1 gap-4">
                  <div>
                    <Input
                      isRequired
                      errorMessage="Please input a valid title"
                      label="Title"
                      labelPlacement="outside"
                      name="title"
                      placeholder="Input your title"
                      type="text"
                      classNames={{
                        label: "text-label font-medium",
                        inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        focus:outline-none
                        focus-within:ring-2 
                        focus-within:ring-primary 
                        rounded-small
                        transition-all 
                        hover:bg-white
                        px-6
                        py-6
                      `,
                        input: "text-black",
                      }}
                    />
                  </div>

                  <div>
                    <Input
                      isRequired
                      errorMessage="Please input a valid title"
                      label="Duration"
                      labelPlacement="outside"
                      name="date"
                      placeholder="Input your title"
                      type="date"
                      classNames={{
                        label: "text-label font-medium",
                        inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        focus:outline-none
                        focus-within:ring-2 
                        focus-within:ring-primary 
                        rounded-small
                        transition-all 
                        hover:bg-white
                        px-6
                        py-6
                      `,
                        input: "text-black",
                      }}
                    />
                  </div>

                  <div>
                    <Input
                      isRequired
                      errorMessage="Please enter a valid team leader"
                      label="Assign team leader"
                      labelPlacement="outside"
                      name="name"
                      placeholder="Name"
                      startContent={
                        <span className="text-2xl p-1 border-r-1 border-gray-400 text-default-400 pointer-events-none flex-shrink-0">
                          @
                        </span>
                      }
                      type="text"
                      classNames={{
                        label: "text-label font-medium",
                        inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        focus:outline-none
                        focus-within:ring-2 
                        focus-within:ring-primary  
                        rounded-small
                        transition-all 
                        hover:bg-white 
                        py-6
                      `,
                        input: "text-black",
                      }}
                    />
                  </div>

                  <div>
                    <label className="text-label font-medium">
                      Gantt bar <span className="text-red-500">*</span>
                    </label>
                    <Select
                      isRequired
                      placeholder="Choose your Gantt bar"
                      classNames={{
                        trigger: `
                        bg-white 
                        text-black 
                        border 
                        border-gray-300 
                        focus:ring-2 
                        focus:ring-primary
                        rounded-small
                        transition-all 
                        hover:bg-white 
                        px-6
                        py-6
                      `,
                        value: "text-gray-500",
                      }}
                    >
                      {ganttBars.map((ganttBar) => (
                        <SelectItem key={ganttBar.key}>
                          {ganttBar.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Textarea
                      isRequired
                      label="Description"
                      labelPlacement="outside"
                      placeholder="Input your description"
                      classNames={{
                        inputWrapper: `
                        bg-white 
                        text-black 
                        border
                        border-gray-300
                        focus-within:ring-2 
                        focus-within:ring-primary
                        rounded-small
                        transition-all 
                        hover:bg-white
                        px-6
                        py-4
                      `,
                        input: "text-black",
                      }}
                    />
                  </div>

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
