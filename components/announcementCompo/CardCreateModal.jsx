"use client";
import preImage from "@/assets/folderdynamiccolor.png";
import thumbup from "@/assets/thumbupdynamiccolor.png";
import logo from "@/public/image/Zentrio-Logo.png";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  X,
  Calendar,
  Users,
  Zap,
  ArrowRight,
  Plus,
  Paperclip,
} from "lucide-react";
import { Button } from "@heroui/react";
import {
  createAnnouncementByBoardIdAction,
  uploadMultiImgByBoardIdAction,
} from "@/action/announcement.action";

export default function CardCreateModal({
  onClose,
  boardId,
  boardMember,
  preventUserImage,
}) {
  // max size 10 mb
  const MAX_SIZE_MB = 10;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files || []);

    // Check size of each selected file
    for (const file of newFiles) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(
          `File "${file.name}" is too large! Maximum size is ${MAX_SIZE_MB}MB.`
        );
        return;
      }
    }

    setImages((prev) => [...prev, ...newFiles]);
    e.target.value = null;
  };

  // Remove single file by index
  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // handle submit call from action
  const handleSubmit = async () => {
    if (!title || !description) return;

    setLoading(true);
    try {
      if (images.length > 0) {
        await uploadMultiImgByBoardIdAction(boardId, images);
      }
      await createAnnouncementByBoardIdAction({ title, description, boardId });
      onClose();
    } catch (error) {
      console.error("Failed to create announcement", error);
    } finally {
      setLoading(false);
    }
  };

  const managerMember = boardMember?.find((member) =>
    member.roles?.includes("ROLE_MANAGER")
  );

  const isFormValid = title.trim() && description.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border-0 overflow-hidden transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4">
        <CardContent className="p-0 flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Modern Brand Section */}
          <div className="w-full lg:w-2/5 relative overflow-hidden">
            {/* <div className="h-full bg-gradient-to-br from-primary via-primary to-white relative"> */}
            <div className="h-full bg-gradient-to-br from-primary via-primary to-white relative">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-md z-0" />

              <Image src={preImage} className="h-auto w-full absolute" alt="" />
              <Image
                src={thumbup}
                className="h-auto w-full bottom-5 left-3 absolute"
                alt=""
              />
              <Image
                src={logo}
                alt="logo"
                className="h-[30px] w-auto  object-contain bottom-5 right-5 absolute"
              />

              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-32 right-8 w-16 h-16 bg-white/20 rounded-lg rotate-45 animate-bounce"></div>
                <div className="absolute bottom-20 left-8 w-12 h-12 bg-white/30 rounded-full animate-pulse delay-300"></div>
                <div className="absolute bottom-40 right-12 w-8 h-8 bg-white/40 rounded-full animate-ping delay-700"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
                <div className="mb-8">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                    <Zap className="w-4 h-4 mr-2" />
                    Work smart with Zentrio <br />
                    젠트리오와 함께 스마트하게 일하세요
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Modern Form */}
          <div className="w-full  lg:w-3/5 flex flex-col">
            {/* Header */}
            <div className="px-2 py-2 border-b border-gray-100 ">
              <div className="flex items-center justify-between mb-2 hidden">
                <div className="flex items-center space-x-3">
                  <div className="w-[90px] h-[90px] rounded-xl flex items-center justify-center">
                    <Image src={logo} alt="logo" className=" " />
                  </div>
                </div>
              </div>
              {/* Author info */}
              {managerMember && (
                <div className="flex items-center space-x-3 p-4 rounded-2xl">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-indigo-400 to-purple-400 p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                        <img
                          src={managerMember.profileImage || preventUserImage}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">
                      {managerMember.username || managerMember.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {managerMember.roles?.[0] || "Manager"}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              )}
            </div>

            {/* Form Content */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="flex-1 flex flex-col"
            >
              <div className="flex-1 px-8 py-6 space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Announcement Title
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div
                    className={`relative transition-all duration-200 ${
                      focusedField === "title" ? "scale-[1.02]" : ""
                    }`}
                  >
                    <input
                      className={`w-full px-4 py-4 text-lg font-semibold bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-200 placeholder-gray-400 ${
                        focusedField === "title"
                          ? "border-indigo-500 bg-white shadow-lg shadow-indigo-500/10"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      placeholder="Enter a compelling title..."
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onFocus={() => setFocusedField("title")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    Description
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div
                    className={`relative transition-all duration-200 ${
                      focusedField === "description" ? "scale-[1.02]" : ""
                    }`}
                  >
                    <textarea
                      className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-200 placeholder-gray-400 resize-none ${
                        focusedField === "description"
                          ? "border-indigo-500 bg-white shadow-lg shadow-indigo-500/10"
                          : "border-transparent hover:border-gray-300"
                      }`}
                      placeholder="What would you like to announce? Share details, updates, or important information..."
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      onFocus={() => setFocusedField("description")}
                      onBlur={() => setFocusedField(null)}
                      required
                    />
                  </div>
                </div>

                {/* Image Attachments */}
                {images.length > 0 && (
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">
                      Attachments ({images.length})
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {images.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-image-icon lucide-image text-primary"
                              >
                                <rect
                                  width="18"
                                  height="18"
                                  x="3"
                                  y="3"
                                  rx="2"
                                  ry="2"
                                />
                                <circle cx="9" cy="9" r="2" />
                                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium text-gray-900">
                                {file.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="w-8 h-8 rounded-xl bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media Upload */}
                <div className="p-4 border-2 border-dashed border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 group-hover:bg-indigo-100 rounded-xl flex items-center justify-center transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Upload Images
                        </div>
                        <div className="text-xs text-gray-500">
                          Images up to {MAX_SIZE_MB}MB
                        </div>
                      </div>
                    </div>
                    <label className="cursor-pointer">
                      <div className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Browse
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                        multiple
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex space-x-3">
                  <Button
                    type="button"
                    className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium transition-all duration-200 hover:scale-[1.02]"
                    radius="lg"
                    onPress={onClose}
                    isDisabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className={`flex-1 font-semibold transition-all duration-200 ${
                      isFormValid && !loading
                        ? "bg-gradient-to-r  bg-gradient-to-br from-primary via-primary to-white text-white transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    radius="lg"
                    isDisabled={!isFormValid || loading}
                    isLoading={loading}
                  >
                    <span className="flex items-center">
                      {loading ? "Creating..." : "Create Announcement"}
                      {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
