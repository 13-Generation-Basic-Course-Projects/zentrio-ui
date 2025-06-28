"use client";
import React, { useRef, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Card,
} from "@heroui/react";

import { createBoardSchema } from "@/lib/schemas/workspaceSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBoardAction,
  uploadImageBoardAction,
} from "@/action/workspace.action";

// SVG icons as data URLs (could be moved to a separate file for reusability)
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

export default function ModalCreateBoard({ Workspaceid }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBoardSchema),
  });

  const colorOptions = [
    { key: "red", label: "Red", className: "bg-board-red" },
    { key: "blue", label: "Blue Sky", className: "bg-board-primary" },
    { key: "green", label: "Green", className: "bg-board-green" },
    { key: "purple", label: "Purple", className: "bg-board-purple" },
    { key: "orange", label: "Orange", className: "bg-board-orange" },
    { key: "violet", label: "Violet", className: "bg-board-violet" },
  ];

  const toggleColors = () => {
    setShowColors((prev) => !prev);
  };

  const handleColorSelect = (colorKey) => {
    setPreviewUrl(null);
    setSelectedFileName(null);
    setSelectedOption((prev) => (prev === colorKey ? null : colorKey));
    setShowColors(false);
    setDropdownOpen(false);
    setValue("cover", colorKey);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedOption(null);
      setSelectedFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file));
      setValue("cover", file);
    }
  };

  const onSubmit = async (data) => {
    let board = null; // declare outside try

    try {
      if (selectedOption) {
        board = await createBoardAction({
          title: data.title,
          description: data.description || "",
          cover: selectedOption,
          workspaceId: Workspaceid,
        });
     
      } else {
        board = await createBoardAction({
          title: data.title,
          description: data.description || "",
          cover: "",
          workspaceId: Workspaceid,
        });

        const image = fileInputRef.current?.files?.[0];
        console.log("cccccc", image);
        if (!image) {
          console.warn(" No file selected!");
          return;
        }

        await uploadImageBoardAction({ boardId: board?.boardId, image });
        console.warn("No image or color selected.");
        return;
      }
    } catch (error) {
      console.error(" Error creating board:", error);
      return;
    } finally {
      reset();
      setPreviewUrl(null);
      setSelectedOption(null);
      setSelectedFileName(null);
      setDropdownOpen(false);
      setShowColors(false);
      onOpenChange(false);
    }

    // Extract boardId here
    const boardId = board?.id; // Use optional chaining to be safe

    if (boardId) {
      console.log("Board ID:", boardId);
    } else {
      console.warn("Board created but no ID found!");
    }
  };

 


  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent h-[340px] !p-0"
        fullWidth
      >
        <Card className="bg-transparent w-full h-full shadow-none border-none">
          <div className="flex items-center justify-center h-full bg-transparent">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-xl h-full w-full text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition">
              <div className="flex items-center justify-center w-14 h-14 text-h1 text-primary border-2 border-dashed border-primary rounded-full leading-none">
                +
              </div>
              <div className="text-primary mt-2 font-medium">
                Create New Board
              </div>
            </div>
          </div>
        </Card>
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
        <ModalContent className="max-h-[90vh] overflow-y-auto scrollbar-hidden">
          <ModalHeader className="flex flex-col gap-1">
            Create new Board
          </ModalHeader>
          <div className="border-1 mt-2 mb-4 border-bgColor"></div>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-4 gap-2 text-title">
                {/* Title */}
                <div className="col-span-3 flex flex-col items-start justify-center space-y-2">
                  <label className="text-label-sm">Board Title</label>
                  <input
                    {...register("title")}
                    placeholder="Type here"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,${svgIconInput}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "8px center",
                      paddingLeft: "36px",
                      height: "40px",
                      borderRadius: "9999px",
                    }}
                    className={`
                      w-full bg-transparent text-title/50 text-caption
                      border border-gray-300
                      focus:outline-none focus:border-primary
                      transition-all duration-150 ease-in-out
                    `}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-caption-tiny">
                      *{errors.title.message}*
                    </span>
                  )}
                </div>

                {/* Cover select */}
                <div className="flex flex-col space-y-2">
                  <label className="text-label-sm">Cover</label>
                  <div className="relative">
                    <button
                      className="h-[40px] rounded-full border border-gray-300 px-4 flex items-center gap-2"
                      onClick={() => setDropdownOpen((open) => !open)}
                      type="button"
                    >
                      {selectedOption && (
                        <div
                          className={`w-4 h-4 rounded-full ${
                            colorOptions.find(
                              (color) => color.key === selectedOption
                            )?.className || ""
                          }`}
                        />
                      )}

                      <div className="flex flex-col items-start">
                        <p className="text-caption-tiny text-title/50 truncate max-w-[70px]">
                          {selectedOption
                            ? colorOptions.find(
                                (color) => color.key === selectedOption
                              )?.label || selectedOption
                            : selectedFileName || "Select Cover"}
                        </p>
                      </div>

                      <svg
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-auto"
                      >
                        <path
                          d="M13 1.5C13 1.5 8.58107 7.5 6.99995 7.5C5.41884 7.5 1 1.5 1 1.5"
                          stroke="#59BAD5"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute mt-1 w-36 text-caption bg-white border rounded-small shadow-md z-50">
                        <input
                          type="file"
                          id="fileUpload"
                          accept="image/*"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          className="hidden"
                        />

                        <label
                          htmlFor="fileUpload"
                          className="w-full px-2 py-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                        >
                          <span>Upload images</span>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.4776 9.01106C17.485 9.01102 17.4925 9.01101 17.5 9.01101C19.9853 9.01101 22 11.0294 22 13.5193C22 15.8398 20.25 17.7508 18 18M17.4776 9.01106C17.4924 8.84606 17.5 8.67896 17.5 8.51009C17.5 5.46695 15.0376 3 12 3C9.12324 3 6.76233 5.21267 6.52042 8.03192M17.4776 9.01106C17.3753 10.1476 16.9286 11.1846 16.2428 12.0165M6.52042 8.03192C3.98398 8.27373 2 10.4139 2 13.0183C2 15.4417 3.71776 17.4632 6 17.9273M6.52042 8.03192C6.67826 8.01687 6.83823 8.00917 7 8.00917C8.12582 8.00917 9.16474 8.38194 10.0005 9.01101"
                              stroke="#59BAD5"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 13V21M12 13C11.2998 13 9.99153 14.9943 9.5 15.5M12 13C12.7002 13 14.0085 14.9943 14.5 15.5"
                              stroke="#59BAD5"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </label>

                        <div>
                          <button
                            className="w-full px-2 py-2 flex justify-between items-center hover:bg-gray-100"
                            onClick={toggleColors}
                            type="button"
                          >
                            <span>Select colors</span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="24"
                                height="24"
                                rx="12"
                                fill="#59BAD5"
                              />
                            </svg>
                          </button>

                          {showColors && (
                            <div className="pl-2 h-[100px] overflow-auto scrollbar-hidden">
                              {colorOptions.map((color) => (
                                <button
                                  key={color.key}
                                  onClick={() => handleColorSelect(color.key)}
                                  className="flex items-center gap-2 py-1 px-2 w-full text-left hover:bg-gray-100 rounded"
                                  type="button"
                                >
                                  <div
                                    className={`w-4 h-4 rounded-full ${color.className}`}
                                  />
                                  <span>{color.label}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {errors.cover && (
                    <span className="text-red-500 text-caption-tiny">
                      *{errors.cover.message}*
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="col-span-4 space-y-2">
                  <label className="text-label-sm">Board Description</label>
                  <textarea
                    {...register("description")}
                    placeholder="Type here"
                    style={{
                      backgroundImage: `url("data:image/svg+xml;utf8,${svgIconType}")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "10px calc(1em + 0px)",
                      paddingLeft: "36px",
                      paddingTop: "10px",
                      height: "80px",
                      borderRadius: "12px",
                      lineHeight: "1.4",
                      resize: "none",
                    }}
                    className={`
                      w-full bg-transparent text-title/50 text-caption
                      border border-gray-300
                      focus:outline-none focus:border-primary
                      transition-all duration-150 ease-in-out
                    `}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-caption-tiny">
                      *{errors.description.message}*
                    </span>
                  )}
                </div>
              </div>

              <div className="mx-[-1rem] border border-bgColor mt-5 mb-2"></div>

              <div className="flex justify-end items-center pt-2 py-4">
                <Button color="primary" radius="full" type="submit">
                  Create Board
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
