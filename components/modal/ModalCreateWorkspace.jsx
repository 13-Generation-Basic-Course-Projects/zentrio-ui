"use client";
import React, { useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

// SVG Icons 
const svgIconInput = encodeURIComponent(`
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.99805 15H9.99805M5.99805 10H13.998" stroke="#59BAD5" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M5.5 2.5C3.9442 2.54667 3.01661 2.71984 2.37477 3.36227C1.49609 4.24177 1.49609 5.6573 1.49609 8.48836L1.49609 14.9944C1.49609 17.8255 1.49609 19.241 2.37477 20.1205C3.25345 21 4.66767 21 7.49609 21L12.4961 21C15.3245 21 16.7387 21 17.6174 20.1205C18.4961 19.241 18.4961 17.8255 18.4961 14.9944V8.48836C18.4961 5.6573 18.4961 4.24177 17.6174 3.36228C16.9756 2.71984 16.048 2.54667 14.4922 2.5" stroke="#59BAD5" strokeWidth="1.5"/>
    <path d="M5.49609 2.75C5.49609 1.7835 6.2796 1 7.24609 1H12.7461C13.7126 1 14.4961 1.7835 14.4961 2.75C14.4961 3.7165 13.7126 4.5 12.7461 4.5H7.24609C6.2796 4.5 5.49609 3.7165 5.49609 2.75Z" stroke="#59BAD5" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
`);

const svgIconType = encodeURIComponent(`
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.2141 2.98239L13.6158 1.58063C14.39 0.806457 15.6452 0.806457 16.4194 1.58063C17.1935 2.3548 17.1935 3.60998 16.4194 4.38415L15.0176 5.78591M12.2141 2.98239L3.98023 11.2163C2.93493 12.2616 2.41226 12.7842 2.05637 13.4211C1.70047 14.058 1.3424 15.5619 1 17C2.43809 16.6576 3.94199 16.2995 4.57889 15.9436C5.21579 15.5877 5.73844 15.0651 6.78375 14.0198L15.0176 5.78591M12.2141 2.98239L15.0176 5.78591" stroke="#59BAD5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
`);

export default function ModalCreateWorkspace() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(null);

  const colorOptions = [
    { key: "red", label: "Red", className: "bg-board-red" },
    { key: "blue", label: "Blue Sky", className: "bg-board-primary" },
    { key: "green", label: "Green", className: "bg-board-green" },
    { key: "purple", label: "Purple", className: "bg-board-purple" },
    { key: "orange", label: "Orange", className: "bg-board-orange" },
    { key: "violet", label: "Violet", className: "bg-board-violet" },
  ];

  const handleColorSelect = (key) => {
    const color = colorOptions.find((c) => c.key === key);
    if (color) {
      if (selectedOption?.key === key) {
        // If the same color is clicked again, deselect
        setSelectedOption(null);
      } else {
        setSelectedOption(color);
      }
    }
  };
  

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-[10px] min-w-0 bg-transparent border-1 border-primary text-primary"
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
              <div className="border-1 mt-2 mb-4 border-bgColor"></div>
              <ModalBody>
                <form>
                  <div className="grid grid-cols-4 gap-2 text-title">
                    {/* Title */}
                    <div className="col-span-3 flex flex-col space-y-2">
                      <label className="text-label-sm">Workspace Title</label>
                      <input
                        type="text"
                        placeholder="Type here"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;utf8,${svgIconInput}")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "8px center",
                          paddingLeft: "36px",
                          height: "40px",
                          borderRadius: "9999px",
                          border: "1px solid #ccc",
                        }}
                        className="text-title/50 text-caption bg-transparent w-full"
                      />
                    </div>

                    {/* Color */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-label-sm">Color</label>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            className="h-[40px]"
                            radius="full"
                          >
                            {selectedOption ? (
                              <div className="flex items-center gap-2 text-label-sm">
                                <div
                                  className={`w-4 h-4 rounded-full ${selectedOption.className}`}
                                ></div>
                                <span>{selectedOption.label}</span>
                              </div>
                            ) : (
                              <span className="text-title/50 text-label-sm">
                                Select color
                              </span>
                            )}
                            <svg
                              width="14"
                              height="9"
                              viewBox="0 0 14 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13 1.50005C13 1.50005 8.58107 7.49999 6.99995 7.5C5.41884 7.50001 1 1.5 1 1.5"
                                stroke="#59BAD5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          aria-label="Select Color"
                          onAction={handleColorSelect}
                        >
                          {colorOptions.map((color) => (
                            <DropdownItem
                              key={color.key}
                              className="hover:text-primary hover:bg-primary/10"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <p>{color.label}</p>
                                <div
                                  className={`w-4 h-4 rounded-full  ${color.className}`}
                                />
                              </div>
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* Description */}
                    <div className="col-span-4 space-y-2">
                      <label className="text-label-sm">
                        Workspace Description
                      </label>
                      <textarea
                        placeholder="Type here"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;utf8,${svgIconType}")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "10px calc(1em + 0px)",
                          paddingLeft: "36px",
                          paddingTop: "10px",
                          height: "80px",
                          borderRadius: "12px",
                          border: "1px solid #ccc",
                          lineHeight: "1.4",
                          resize: "none",
                        }}
                        className="text-title/50 text-caption bg-transparent w-full"
                      />
                    </div>
                  </div>

                  <div className="mx-[-1rem] border border-bgColor mt-5 mb-2"></div>

                  <div className="flex justify-end items-center pt-2 py-4">
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