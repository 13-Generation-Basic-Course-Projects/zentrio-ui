"use client";

import React, { useState, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import uploadIcon from "@/assets/uploadicon.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ModalUploadFileInFolder({
  isOpen,
  onClose,
  folderId, // optional: ID of folder to upload to (if uploading to folder)
  tokenFromGoogle,
}) {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    if (!folderId || !tokenFromGoogle) {
      console.error("Missing folderId or token");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("token", tokenFromGoogle);
      formData.append("folderId", folderId);
      formData.append("file", selectedFile);

      console.log("folderId ", folderId);

      const res = await fetch("/api/upload-to-folder", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Server error:", result);
        throw new Error(result.error || "Upload failed");
      }

      toast.success("File uploaded successfully!", {
        position: "top-right",
        duration: 4000,
      })
      setFileName("");
      setSelectedFile(null);

      router.refresh();
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error.message || "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFileName("");
    setSelectedFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex justify-center text-2xl font-bold">
              Upload
            </ModalHeader>

            <ModalBody>
              <div
                className="border-2 border-dashed border-primary rounded-xl p-6 flex flex-col items-center text-center space-y-2 bg-blue-50 cursor-pointer hover:bg-blue-100 transition"
                onClick={handleBrowseClick}
              >
                <Image
                  src={uploadIcon}
                  width={69}
                  height={60}
                  alt="upload icon"
                />
                <p className="text-h6 text-title">
                  Drag & drop files or{" "}
                  <span className="text-primary font-bold underline cursor-pointer">
                    Browse
                  </span>
                </p>
                <p className="text-sm text-description">
                  Supported formats: DOCX, XLSX, PPTX
                </p>
                <input
                  type="file"
                  accept=".docx,.xlsx,.pptx"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleFileSelect}
                />
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-title">Uploading</label>
                <div className="w-full text-title/50 text-caption p-4 border rounded-medium border-gray-400 flex justify-between items-center cursor-pointer">
                  {fileName || "Choose your file"}
                  <div className="inline-block ml-2">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33398 18.2243H15.0007C15.4427 18.2243 15.8666 18.0487 16.1792 17.7361C16.4917 17.4236 16.6673 16.9996 16.6673 16.5576V5.72428L12.5007 1.55762H5.00065C4.55862 1.55762 4.1347 1.73321 3.82214 2.04577C3.50958 2.35833 3.33398 2.78226 3.33398 3.22428V6.55762"
                        stroke="#59BAD5"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.668 1.55762V4.89095C11.668 5.33298 11.8436 5.7569 12.1561 6.06946C12.4687 6.38202 12.8926 6.55762 13.3346 6.55762H16.668M1.66797 12.391H10.0013M10.0013 12.391L7.5013 14.891M10.0013 12.391L7.5013 9.89095"
                        stroke="#59BAD5"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                className="w-full"
                color="primary"
                isDisabled={!fileName || isUploading}
                onPress={handleUpload}
                isLoading={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload File"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}