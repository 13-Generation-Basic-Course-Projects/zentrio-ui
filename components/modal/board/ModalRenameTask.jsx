"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  useDraggable,
} from "@heroui/react";
import { updateDocumentNameByIdAction } from "@/action/document.action";

/* rename foc in document */
export function ModalRenameTask({}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newName, setNewName] = useState("");

  const handleSave = async (close) => {};

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent !p-0 m-0 border-none shadow-none  min-w-0 h-auto w-full"
        radius="none"
        disableRipple={true}
        disableAnimation
      >
        <div className="flex justify-start items-center w-full">Rename</div>
      </Button>
      <Modal
        ref={targetRef}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
      >
        1
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader {...moveProps} className="flex flex-col gap-1">
                Rename
              </ModalHeader>
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
                        console.log("Input changed to:", e.target.value);
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
