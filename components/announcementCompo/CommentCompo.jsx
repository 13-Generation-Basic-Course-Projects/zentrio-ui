"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  editCommentByIdAction,
  deleteCommentByIdAction,
} from "@/action/announcement.action";

// Format date function
function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export default function CommentCompo({
  announId,
  comments,
  currentUserProfile,
  boardMember,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  // Get current user ID
  const currentUserId = currentUserProfile?.payload?.user?.userId;

  // Get current user's board roles
  const currentUserBoardInfo = boardMember?.find(
    (member) => member.userId === currentUserId
  );
  const currentUserRoles = currentUserBoardInfo?.roles || [];
  const isProjectManager = currentUserRoles.includes("ROLE_MANAGER");

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditedContent(comment.content);
  };

  const handleSave = async (commentId) => {
    try {
      if (!editedContent.trim()) return;

      await editCommentByIdAction({
        commentId,
        content: editedContent,
        announId,
      });
      console.log("asd",announId,commentId,editedContent)

      setEditingId(null);
      setEditedContent("");
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent("");
  };

  const handleDelete = async (commentId) => {
    try {
      await deleteCommentByIdAction({ commentId });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="space-y-4 p-6">
      {comments?.map((comment, index) => {
        const isEditing = editingId === comment.id;
        const isOwner = comment?.member?.userId === currentUserId;
        const canDelete = isOwner || isProjectManager;

        return (
          <Card key={index} className="p-4 flex gap-4 items-start rounded-xl">
            {/* Profile Image */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={comment.member.imageUrl || "/default-profile.png"}
                alt={comment.member.username}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Content */}
            <CardContent className="p-0 space-y-1 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-sm">
                    {comment.member.username}
                  </div>
                  <p className="text-small text-gray-500">
                    {formatDate(comment.creationDate)}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleSave(comment.id)}
                      >
                        <Check className="w-4 h-4 text-green-600" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleCancel}
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </Button>
                    </>
                  ) : (
                    <>
                      {isOwner && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(comment)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                      )}
                      {canDelete && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Comment Content or Input */}
              {isEditing ? (
                <Input
  value={editedContent}
  onChange={(e) => {
    setEditedContent(e.target.value);
    console.log("Input value:", e.target.value); // 🔍 log every keystroke
  }}
  className="mt-2"
/>
              ) : (
                <div className="text-sm text-gray-800">{comment.content}</div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
