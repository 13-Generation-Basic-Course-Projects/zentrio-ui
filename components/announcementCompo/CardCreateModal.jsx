import { Card, CardContent } from "../ui/card";
import React from "react";
import { X } from "lucide-react";
import { Input, Textarea, Button } from "@heroui/react";

export default function CardCreateModal({ onClose }) {
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
            />
            <Textarea
              isRequired
              label="Description"
              labelPlacement="outside"
              placeholder="Enter your description"
              className="w-full"
            />
            <Input
              label="Image"
              labelPlacement="outside"
              type="file"
              className="w-full"
            />
            
            <div className="flex justify-between pt-2">
              <Button className="w-full bg-primary text-white">Create</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
