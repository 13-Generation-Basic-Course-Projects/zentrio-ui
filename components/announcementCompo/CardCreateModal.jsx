import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { X } from "lucide-react";
import { Input, Textarea, Button } from "@heroui/react";
import { createAnnouncementByBoardIdAction, uploadMultiImgByBoardIdAction } from "@/action/announcement.action";

export default function CardCreateModal({ onClose, boardId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // renamed to images for clarity
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files || []);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Card className="w-[90%] max-w-xl bg-white rounded-large p-6">
        <CardContent>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-h5 font-semibold">Create Announcement</h2>
            <button onClick={onClose} className="text-description hover:text-primary">
              <X />
            </button>
          </div>

          <div className="space-y-8">
            <Input
              isRequired
              label="Title"
              labelPlacement="outside"
              placeholder="Enter your title"
              type="text"
              className="w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              isRequired
              label="Description"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="file"
              multiple
              accept="image/*"
              label="Images"
              labelPlacement="outside"
              className="w-full"
              onChange={handleImageChange}
            />

            {/* Preview selected files with remove buttons */}
          {images.length > 0 && (
  <div className="mt-2 flex flex-wrap gap-2 max-h-40 overflow-auto border p-2 rounded">
    {images.map((file, idx) => {
      const url = URL.createObjectURL(file);
      return (
        <div key={idx} className="relative w-20 h-20 border rounded overflow-hidden">
          <img
            src={url}
            alt={file.name}
            className="object-cover w-full h-full"
            onLoad={() => URL.revokeObjectURL(url)} // free memory when loaded
          />
          <button
            onClick={() => removeImage(idx)}
            type="button"
            className="absolute top-0 right-0 bg-red-600 text-white rounded-bl px-0 text-xs hover:bg-red-800 w-3 h-5"
          >
            ×
          </button>
        </div>
      );
    })}
  </div>
)}


            <div className="flex justify-between pt-2">
              <Button
                className="w-full bg-primary text-white"
                isLoading={loading}
                onClick={handleSubmit}
              >
                Create
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
