// ModalCreateWorkspace.jsx
"use client";

import React, { useState, useTransition } from "react";
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
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "@/lib/schemas/workspaceSchema";
import { toast } from "react-toastify";

const colorOptions = [
  { key: "red", label: "Red", className: "bg-board-red" },
  { key: "blue", label: "Blue Sky", className: "bg-board-primary" },
  { key: "green", label: "Green", className: "bg-board-green" },
  { key: "purple", label: "Purple", className: "bg-board-purple" },
  { key: "orange", label: "Orange", className: "bg-board-orange" },
  { key: "violet", label: "Violet", className: "bg-board-violet" },
];

export default function ModalCreateWorkspace({ createWorkspace }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const watchedTitle = watch("title");

  // Load color from localStorage when modal opens or title changes
  React.useEffect(() => {
    if (isOpen && watchedTitle) {
      // Only access localStorage on client side
      if (typeof window !== "undefined") {
        try {
          const savedColorClass = localStorage.getItem(
            `workspaceColor-${watchedTitle}`
          );
          if (savedColorClass) {
            const color = colorOptions.find(
              (c) => c.className === savedColorClass
            );
            setSelectedOption(color || null);
          } else {
            setSelectedOption(null);
          }
        } catch (error) {
          console.warn("Failed to access localStorage:", error);
          setSelectedOption(null);
        }
      }
    }
  }, [isOpen, watchedTitle]);

  // Reset form and selected color on modal close
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedOption(null);
      reset();
    }
  }, [isOpen, reset]);

  const handleColorSelect = (key) => {
    const color = colorOptions.find((c) => c.key === key);
    if (color) {
      setSelectedOption((prev) => (prev?.key === key ? null : color));
    }
  };

  const onSubmit = async (data) => {
    if (!createWorkspace) {
      console.error("createWorkspace function is not provided");
      return;
    }

    try {
      await createWorkspace(data); // backend create action

      // Only access localStorage on client side
      if (typeof window !== "undefined" && selectedOption?.className) {
        try {
          localStorage.setItem(
            `workspaceColor-${data.title}`,
            selectedOption.className
          );
            ("Color that selected in workspace: ", selectedOption);
            (
            "Saved color in localStorage:",
            localStorage.getItem(`workspaceColor-${data.title}`)
          );
        } catch (error) {
          console.warn("Failed to save to localStorage:", error);
        }
      }

      toast.success("Workspace created successfully");

      reset();
      setSelectedOption(null);
      onOpenChange(false);

      startTransition(() => {
        router.refresh();
      });
    } catch (err) {
      console.error("Error creating workspace:", err);
      toast.error("Failed to create workspace");
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="w-[10px] min-w-0 bg-transparent border border-primary text-primary"
        size="sm"
      >
        +
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent className="max-h-[90vh] overflow-y-auto">
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create New Workspace
            </ModalHeader>
            <div className="border border-bgColor my-4"></div>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-4 gap-2 text-title">
                  {/* Workspace Title */}
                  <div className="col-span-3 flex flex-col space-y-2">
                    <label className="text-label-sm">Workspace Title</label>
                    <input
                      {...register("title")}
                      placeholder="Type here"
                      className={`
                        w-full bg-transparent text-title/50 text-caption
                        border border-gray-300 rounded-full px-9 h-10
                        focus:outline-none focus:border-primary
                        transition-all duration-150 ease-in-out
                      `}
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,${svgIconInput}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "8px center",
                      }}
                    />

                    {errors.title && (
                      <p className="text-red-500 text-caption-tiny">
                        *{errors.title.message}*
                      </p>
                    )}
                  </div>

                  {/* Color Picker */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-label-sm">Color</label>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          variant="bordered"
                          className="h-10 flex justify-between items-center px-4"
                          radius="full"
                        >
                          {selectedOption ? (
                            <div className="flex items-center gap-2 text-label-sm text-title">
                              <div
                                className={`w-4 h-4 rounded-full ${selectedOption.className}`}
                              />
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
                              d="M13 1.5C13 1.5 8.58107 7.5 6.99995 7.5 5.41884 7.5 1 1.5 1 1.5"
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
                            <div className="flex flex-row space-x-4 items-center">
                              <div
                                className={`w-4 h-4 rounded-full ${color.className}`}
                              />
                              <p>{color.label}</p>
                            </div>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  {/* Workspace Description */}
                  <div className="col-span-4 space-y-2">
                    <label className="text-label-sm">
                      Workspace Description
                    </label>
                    <textarea
                      {...register("description")}
                      placeholder="Type here"
                      className={`
                        w-full bg-transparent text-title/50 text-caption
                        border border-gray-300 rounded-2xl px-9 py-3 min-h-[80px]
                        focus:outline-none focus:border-primary
                        transition-all duration-150 ease-in-out resize-none
                      `}
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,${svgIconType}")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "10px 15px",
                        paddingLeft: "36px",
                        lineHeight: "1.4",
                      }}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-caption-tiny">
                        *{errors.description.message}*
                      </p>
                    )}
                  </div>
                </div>

                <div className="border border-bgColor my-4"></div>

                <div className="flex justify-end items-center pt-2 py-4">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isPending ? "Creating..." : "Create Workspace"}
                  </button>
                </div>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

// You can keep your SVG icons encoded strings as you had them
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
