"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import coverProfile from "@/assets/coverprofile.png";
import { Button } from "@heroui/react";
import {
  Camera,
  Loader2,
  X,
  Upload,
  Check,
  AlertCircle,
  Maximize2,
  RotateCw,
  Move,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  IconDate,
  IconEdit,
  IconJob,
  IconMap,
  IconReturnLeft,
} from "../icon/everyicon";
import { updateProfileImageAction } from "@/action/profile.action";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";

export default function ProfileLayout({
  user,
  acheivment,
  profile,
  action,
  currentUserProfile,
}) {
  const data = currentUserProfile?.payload?.user || {};

  //console.log("Current User Profile:", currentUserProfile);

  const tabItems = [
    { key: "profile", title: "Profile", content: profile },
    { key: "achievement", title: "Achievements", content: acheivment },
  ];

  const [activeTab, setActiveTab] = useState("profile");
  const currentTab = tabItems.find((tab) => tab.key === activeTab);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef(null);

  const [localPreview, setLocalPreview] = useState(null);
  const [serverImage, setServerImage] = useState(data?.profileImage);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const getFilteredActions = () => {
    if (activeTab === "profile") return action[0] ? [action[0]] : [];
    if (activeTab === "achievement") return action[1] ? [action[1]] : [];
    return [];
  };

  // Helper function to check file types
  const isValidImageType = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    return validTypes.includes(file.type);
  };

  // Helper function to format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (isValidImageType(file)) {
        processFile(file);
      } else {
        setError("Please drop a valid image file (JPEG, PNG, or WebP).");
      }
    }
  };

  // Process file (common function for both file input and drag-drop)
  const processFile = (file) => {
    setError("");

    // Check file size before processing
    const maxFileSize = 50 * 1024 * 1024; // 50MB limit
    if (file.size > maxFileSize) {
      setError(
        `File too large (${formatFileSize(file.size)}). Maximum size is 50MB.`
      );
      return;
    }

    handleImageChange(file);
  };

  // Enhanced file validation and handling
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageType(file)) {
      setError("Please select a valid image file (JPEG, PNG, or WebP).");
      e.target.value = "";
      return;
    }

    processFile(file);
  };

  // Enhanced image compression with progress
  const handleImageChange = async (file) => {
    if (!file) return;

    setIsCompressing(true);
    setCompressionProgress(0);
    setError("");

    try {
      //console.log(`Original file: ${file.name}`);
      //console.log(`Original size: ${formatFileSize(file.size)}`);

      // Determine compression settings based on file size
      let compressionOptions;

      if (file.size > 10 * 1024 * 1024) {
        // > 10MB
        compressionOptions = {
          maxSizeMB: 0.3,
          maxWidthOrHeight: 1000,
          useWebWorker: true,
          initialQuality: 0.7,
          alwaysKeepResolution: false,
          fileType: "image/jpeg",
        };
      } else if (file.size > 5 * 1024 * 1024) {
        // > 5MB
        compressionOptions = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          initialQuality: 0.8,
          alwaysKeepResolution: false,
          fileType: "image/jpeg",
        };
      } else {
        // <= 5MB
        compressionOptions = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1500,
          useWebWorker: true,
          initialQuality: 0.9,
          alwaysKeepResolution: false,
          fileType: file.type.includes("png") ? "image/png" : "image/jpeg",
        };
      }

      // Simulate progress for user feedback
      const progressInterval = setInterval(() => {
        setCompressionProgress((prev) => Math.min(prev + 8, 85));
      }, 150);

      const compressedFile = await imageCompression(file, compressionOptions);

      clearInterval(progressInterval);
      setCompressionProgress(100);

      //console.log(`Compressed size: ${formatFileSize(compressedFile.size)}`);
      //console.log(
      //   `Compression ratio: ${(
      //     (1 - compressedFile.size / file.size) *
      //     100
      //   ).toFixed(1)}%`
      // );

      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
        setCropModalOpen(true);
        setIsCompressing(false);
        setCompressionProgress(0);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      //console.error("Error compressing image:", error);
      setError("Failed to process the image. Please try a different image.");
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
      mediaWidth,
      mediaHeight
    );
  }

  // Enhanced crop save with better quality control
  async function handleCropSave() {
    if (!completedCrop || !imgRef.current) return;

    setIsUploading(true);
    setError("");

    try {
      const image = imgRef.current;
      const crop = completedCrop;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      // Improve image quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      // Create high-quality preview for UI
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setLocalPreview(dataUrl);
      setServerImage(dataUrl);

      // Upload cropped image to server with optimal compression
      canvas.toBlob(
        async (blob) => {
          if (!blob) {
            setError("Failed to create image blob");
            setIsUploading(false);
            return;
          }

          try {
            // Additional compression for server upload
            const compressedBlob = await imageCompression(blob, {
              maxSizeMB: 0.5,
              maxWidthOrHeight: 800,
              useWebWorker: true,
              initialQuality: 0.85,
              fileType: "image/jpeg",
            });

            const formData = new FormData();
            formData.append("file", compressedBlob, "profile.jpg");

            await updateProfileImageAction({ formData });

            setUploadSuccess(true);
            setTimeout(() => {
              setUploadSuccess(false);
              setCropModalOpen(false);
              setImgSrc("");
            }, 1500);
          } catch (error) {
            //console.error("Upload error:", error);
            setError("Failed to upload image. Please try again.");
          } finally {
            setIsUploading(false);
          }
        },
        "image/jpeg",
        0.85
      );
    } catch (error) {
      //console.error("Error saving cropped image:", error);
      setError("Failed to save the image. Please try again.");
      setIsUploading(false);
    }
  }

  const resetCropModal = () => {
    setCropModalOpen(false);
    setImgSrc("");
    setError("");
    setUploadSuccess(false);
    setZoom(1);
  };

  return (
    <>
      {/* Header Section - Responsive */}
      <div className="w-full sticky top-0 z-[20] px-4 sm:px-6 lg:px-10 py-2">
        <div className="relative">
          <Image
            className="w-full rounded-xl h-32 sm:h-40 md:h-48 lg:h-52 object-cover"
            src={coverProfile}
            alt="cover profile"
          />
          <Button
            className="absolute top-2 left-2 sm:left-2 backdrop-blur-sm bg-white/20 border-white/30 text-xs sm:text-sm"
            size="sm"
            color="primary"
            variant="bordered"
            onClick={() => {
              window.history.length > 1
                ? window.history.back()
                : (window.location.href = "/dashboard");
            }}
          >
            <IconReturnLeft strokeWidth={2} size={4} color={"currentColor"} />
            <span className="hidden sm:inline">Go Back</span>
          </Button>

          {/* Profile Image - Responsive sizing */}
          <div className="absolute bottom-[-40px] sm:bottom-[-50px] md:bottom-[-60px] left-1/2 -translate-x-1/2 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-2 sm:border-4 border-white p-1 group cursor-pointer bg-white shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105">
            <img
              className="rounded-full object-cover w-full h-full border-2 border-primary p-[2px]"
              src={
                localPreview ||
                serverImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&s"
              }
              alt="profile"
            />

            {/* Loading overlay for compression */}
            {isCompressing && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#59BAD5] via-[#0098c6] to-[#4ccbe1] flex flex-col items-center justify-center rounded-full backdrop-blur-sm">
                <div className="relative">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 border-2 sm:border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-[8px] sm:text-xs font-bold">
                      {compressionProgress}%
                    </span>
                  </div>
                </div>
                <span className="text-white text-[8px] sm:text-xs mt-1 sm:mt-2 font-medium">
                  Processing...
                </span>
              </div>
            )}

            {/* Upload overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#59BAD5] via-[#0098c6] to-[#4ccbe1] flex flex-col items-center justify-center rounded-full backdrop-blur-sm">
                <Loader2 className="text-white w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-spin mb-1" />
                <span className="text-white text-[8px] sm:text-xs font-medium">
                  Uploading...
                </span>
              </div>
            )}

            {/* Success overlay */}
            {uploadSuccess && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#59BAD5] via-[#0098c6] to-[#4ccbe1] flex flex-col items-center justify-center rounded-full backdrop-blur-sm">
                <Check className="text-white w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 mb-1" />
                <span className="text-white text-[8px] sm:text-xs font-medium">
                  Success!
                </span>
              </div>
            )}

            {/* Hover overlay - Touch friendly */}
            {!isCompressing && !isUploading && !uploadSuccess && (
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300 backdrop-blur-sm rounded-full">
                <label className="cursor-pointer flex flex-col items-center gap-1 p-2 sm:p-4 touch-manipulation">
                  <Camera className="text-white w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
                  <span className="text-white text-[8px] sm:text-xs font-medium">
                    Change
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isCompressing || isUploading}
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        {/* User Info Section - Responsive */}
        <div className="text-center mt-12 sm:mt-16 md:mt-20 text-body-sm">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            {data?.username || "N/A"}
          </h1>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-600 mt-2 sm:mt-3">
            <p className="flex items-center justify-center gap-2">
              <IconJob strokeWidth={1.5} size={4} color={"currentColor"} />
              <span className="truncate max-w-[200px]">
                {data?.position || "N/A"}
              </span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <IconMap strokeWidth={1.5} size={4} color={"currentColor"} />
              <span className="truncate max-w-[200px]">
                {data?.location || "N/A"}
              </span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <IconDate strokeWidth={1.5} size={4} color={"currentColor"} />
              {data.createdAt ? data.createdAt.split("T")[0] : " "}
            </p>
          </div>
        </div>

        {/* Tabs and Actions Section - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 sm:mt-8 gap-4">
          {/* Tabs */}
          <div className="flex gap-4 sm:gap-8 border-b w-full sm:w-fit overflow-x-auto">
            {tabItems.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 cursor-pointer transition-all duration-300 relative font-medium whitespace-nowrap text-sm sm:text-base touch-manipulation ${
                  activeTab === tab.key
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.title}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-start sm:justify-end gap-3 w-full sm:w-auto">
            {getFilteredActions().length > 0 ? (
              getFilteredActions().map((ModalComp, index) => (
                <div key={ModalComp.key || index} className="flex-shrink-0">
                  {ModalComp}
                </div>
              ))
            ) : (
              <div className="text-gray-400 text-xs sm:text-sm">
                No actions available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section - Responsive */}
      <div className="min-h-screen px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-full">{currentTab?.content}</div>
      </div>

      {/* Responsive Crop Modal */}
      {cropModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden border border-white/10 transition-all duration-300 transform origin-center">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#59BAD5] via-[#0098c6] to-[#4ccbe1] px-4 sm:px-5 py-3 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-white/90" />
                <h2 className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                  EDIT PROFILE PHOTO
                </h2>
              </div>
              <button
                onClick={resetCropModal}
                className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200 touch-manipulation"
                disabled={isUploading}
              >
                <X className="w-4 h-4 text-white/80 hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-4 rounded-lg overflow-hidden border border-gray-200/50 shadow-inner">
                <ReactCrop
                  crop={crop}
                  onChange={setCrop}
                  onComplete={setCompletedCrop}
                  aspect={1}
                  className="w-full"
                  ruleOfThirds
                >
                  <img
                    ref={imgRef}
                    src={imgSrc}
                    alt="Crop preview"
                    className="max-w-full max-h-[180px] sm:max-h-[220px] object-contain mx-auto block"
                    style={{
                      filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                    }}
                    onLoad={(e) => {
                      const { width, height } = e.currentTarget;
                      setCrop(centerAspectCrop(width, height, 1));
                    }}
                  />
                </ReactCrop>
              </div>

              {/* Buttons - Responsive */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCropSave}
                  disabled={!completedCrop || isUploading}
                  className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-[#59BAD5] via-[#0098c6] to-[#4ccbe1] hover:from-[#4ccbe1] hover:to-[#59BAD5] rounded-[10px] shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>UPLOADING</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>SAVE CHANGES</span>
                    </>
                  )}
                </button>
                <button
                  onClick={resetCropModal}
                  disabled={isUploading}
                  className="flex-1 py-2.5 px-4 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:border-[#59BAD5] rounded-[10px] shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation"
                >
                  <X className="w-4 h-4" />
                  <span>CANCEL</span>
                </button>
              </div>
            </div>

            {/* Status Bar */}
            {isUploading && (
              <div className="h-1 bg-gradient-to-r from-indigo-200 to-purple-200 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#59BAD5] via-[#0098c6] to-[#4ccbe1] animate-progress"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Message - Responsive */}
      {error && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-red-50 border border-red-200 rounded-lg p-3 shadow-lg z-50">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-500 hover:text-red-700 touch-manipulation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }

        /* Touch-friendly improvements */
        .touch-manipulation {
          touch-action: manipulation;
        }

        /* Responsive text sizing */
        @media (max-width: 640px) {
          .text-body-sm {
            font-size: 0.875rem;
          }
        }

        /* Improved scrollbar for mobile */
        .overflow-x-auto::-webkit-scrollbar {
          height: 2px;
        }

        .overflow-x-auto::-webkit-scrollbar-track {
          background: transparent;
        }

        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 1px;
        }
      `}</style>
    </>
  );
}
