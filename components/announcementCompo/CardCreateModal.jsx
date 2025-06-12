import { Card, CardContent } from "../ui/card";
import React from "react";
import { X } from "lucide-react";
import { Input, Textarea, Button } from "@heroui/react";
import { useState } from "react";
import { createAnnouncementByBoardIdAction } from "@/action/announcement.action";

export default function CardCreateModal({ onClose, boardId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

 

  const handleSubmit = async () => {
    if (!title || !description) return;

    setLoading(true);
    try {
      await createAnnouncementByBoardIdAction({ title, description , boardId});
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
            <button
              onClick={onClose}
              className="text-description hover:text-primary"
            >
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
              label="Image"
              labelPlacement="outside"
              type="file"
              className="w-full"
            />
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
};