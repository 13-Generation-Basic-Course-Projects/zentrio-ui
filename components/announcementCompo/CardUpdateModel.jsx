"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { X, Image } from "lucide-react";
import { Button } from "@heroui/react";
import { updateAnnouncementByIdAction, uploadMultiImgByBoardIdAction } from "@/action/announcement.action";


export default function CardUpdateModal({ onClose, boardId, announcement, Announcements }) {
  
  const MAX_SIZE_MB = 10;
  const [title, setTitle] = useState(announcement?.title || "");
  const [description, setDescription] = useState(announcement?.description || "");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files || []);
    for (const file of newFiles) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`"${file.name}" exceeds 10MB.`);
        return;
      }
    }
    setImages(prev => [...prev, ...newFiles]);
    e.target.value = null;
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    if (!title || !description) return;
    setLoading(true);
    try {
      if (images.length > 0) {
        await uploadMultiImgByBoardIdAction(boardId, images);
      }

      await updateAnnouncementByIdAction(announcement.id, {
        title,
        description,
        boardId,
      });

      onClose();
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-[90%] max-w-lg bg-white rounded-large shadow-lg border border-gray-200">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Update Announcement</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div className="p-4">
              <input
                className="w-full border-none outline-none text-lg font-semibold mb-2"
                placeholder="Announcement title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="w-full border-none outline-none resize-none text-base min-h-[80px]"
                placeholder="Description"
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
                        className="text-gray-400 hover:text-red-500 text-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Image Button */}
              <div className="mt-4 flex items-center justify-between p-3 border border-gray-200 rounded-large">
                <span className="text-sm font-medium text-gray-700">
                  Add more images
                </span>
                <label className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer">
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

            {/* Footer */}
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
                  {loading ? "Updating..." : "Update"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
