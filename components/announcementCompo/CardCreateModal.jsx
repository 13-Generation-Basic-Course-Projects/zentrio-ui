import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  X,
  Camera,
  Image,
  MapPin,
  Smile,
  Users,
  Globe,
  Lock,
  ChevronDown,
} from "lucide-react";
import { Input, Textarea, Button } from "@heroui/react";
import {
  createAnnouncementByBoardIdAction,
  uploadMultiImgByBoardIdAction,
} from "@/action/announcement.action";

export default function CardCreateModal({ onClose, boardId, boardMember, Announcements }) {
  // const announcementList = Announcements?.payload || [];
  console.log("bb",Announcements);

  const MAX_SIZE_MB = 10;

  console.log("rkun", boardMember);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // renamed to images for clarity
  const [loading, setLoading] = useState(false);
  const [privacy, setPrivacy] = useState("public");
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);

const handleImageChange = (e) => {
  const newFiles = Array.from(e.target.files || []);

  // Check size of each selected file
  for (const file of newFiles) {
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`File "${file.name}" is too large! Maximum size is ${MAX_SIZE_MB}MB.`);
      return; // stop if any file is too large
    }
  }

  setImages(prev => [...prev, ...newFiles]);
  e.target.value = null; // Reset input so same file can be selected again
};


  // Remove single file by index
  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

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

  // const currentPrivacy = privacyOptions.find(
  //   (option) => option.value === privacy
  // );
  // const PrivacyIcon = currentPrivacy.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-[90%] max-w-lg bg-white rounded-large shadow-lg border border-gray-200">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-title">
                Create Announcement
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {boardMember
                .filter((member) =>
                  member.roles?.some((role) => role === "ROLE_MANAGER")
                )
                .map((member) => (
                  <div
                    key={member.userId}
                    className="w-10 h-10 rounded-full overflow-hidden bg-gray-100"
                  >
                    <img
                      src={member.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">
                  
                </div>
                <div className="relative">
                </div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="p-4">
              {/* Title Input */}
              <input
                className="w-full border-none outline-none text-lg font-semibold placeholder-gray-500 mb-2"
                placeholder="Announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              {/* Description Textarea */}
              <textarea
                className="w-full resize-none border-none outline-none text-base placeholder-gray-500 min-h-[80px]"
                placeholder="What would you like to announce?"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              {/* Selected Images Preview */}
              {images.length > 0 && (
                <div className="mt-3 space-y-2">
                  {images.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-large"
                    >
                      <div className="flex items-center space-x-2">
                        <Image className="w-5 h-5 text-primary" />
                        <span className="text-sm text-gray-700">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors text-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Media Options */}
              <div className="mt-4 flex items-center justify-between p-3 border border-gray-200 rounded-large">
                <span className="text-sm font-medium text-gray-700">
                  Add to your announcement
                </span>
                <div className="flex items-center space-x-2">
                  <label className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                    <Image className="w-5 h-5 text-primary" />
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

            {/* Footer Buttons */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <Button
                  type="button"
                  className="flex-1 bg-transparent hover:bg-gray-100 text-gray-600 border border-gray-300"
                  radius="lg"
                  onPress={onClose}
                  isDisabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={`flex-1 font-semibold transition-all ${
                    title.trim() && description.trim()
                      ? "bg-primary hover:bg-primary text-white transform hover:scale-[1.02]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  radius="lg"
                  isDisabled={!title.trim() || !description.trim() || loading}
                  isLoading={loading}
                >
                  {loading ? "Creating..." : "Create Announcement"}
                </Button>
              </div>
            </div>
          </form>

          {/* Overlay for dropdown */}
          {showPrivacyDropdown && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => setShowPrivacyDropdown(false)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
