"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
} from "@heroui/react";
import { IconAdd } from "../../icon/everyicon";

export default function ModalUpdateChecklist({ input }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        className="flex  items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px]"
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
                Update Checklist
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-title">
                      Title <span className="text-progress-red">*</span>
                    </label>
                    <input
                      className="border text-caption border-gray-300 rounded-small px-3 py-3 "
                      placeholder="Input your title"
                      required
                    />
                  </div>

                  <div className="relative w-full flex flex-col gap-3 mt-3">
                    <label className="text-sm font-medium text-title">
                      Duration <span className="text-progress-red">*</span>
                    </label>

                    <input
                      type="date"
                      className="border text-caption border-gray-300 rounded-small px-3 py-3  w-full pr-12"
                      placeholder="choose your date"
                      required
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        cursor: "pointer",
                      }}
                    />

                    {/* Custom calendar icon container */}
                    <div
                      className="absolute right-3 top-1/2 transform -translate-y-0 flex items-center justify-center rounded bg-opacity-10 p-1.5 cursor-pointer"
                      onClick={() => {
                        // Optional: programmatically open date picker if needed
                        document
                          .querySelector('input[type="date"]')
                          .showPicker?.();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

                    <style jsx>{`
                      /* Hide native calendar icon */
                      input[type="date"]::-webkit-calendar-picker-indicator {
                        opacity: 0;
                        pointer-events: none;
                        display: none;
                      }
                    `}</style>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 py-4">
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
