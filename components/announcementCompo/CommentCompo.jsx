"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

import {
  Pencil,
  Trash2,
  Check,
  X,
  Crown,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
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

// Get time ago format
function getTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
}

export default function CommentCompo({
  announId,
  comments,
  currentUserProfile,
  boardMember,
}) {
  const [editingId, setEditingId] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

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

      const res = await editCommentByIdAction({
        commentId,
        content: editedContent,
        announId,
      });

      if (res?.success) {
        toast.success("Comment updated successfully!");
      } else {
        toast.error("Failed to update comment.");
      }

      setEditingId(null);
      setEditedContent("");
    } catch (error) {
      toast.error("An error occurred while updating the comment.");
      console.error("Failed to edit comment:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedContent("");
  };

  const handleDelete = async (commentId) => {
    try {
      const res = await deleteCommentByIdAction({ commentId });

      if (res?.success) {
        toast.success("Comment deleted successfully!");
      } else {
        toast.error("Failed to delete comment.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the comment.");
      console.error("Failed to delete comment:", error);
    }
  };

  const getUserRole = (userId) => {
    const userBoardInfo = boardMember?.find(
      (member) => member.userId === userId
    );
    return userBoardInfo?.roles || [];
  };

  const getInitials = (username) => {
    return (
      username
        ?.split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  // Don't render if no comments
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
          <MessageCircle className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-gray-500 text-sm">
          No comments yet. Be the first to comment!
        </p>
      </div>
    );
  }

  // Determine which comments to show
  const commentsToShow = showAllComments ? comments : comments.slice(0, 1);
  const remainingCommentsCount = comments.length - 1;

  const toggleShowAllComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <div className="space-y-4">
      {/* Comments List */}
      <div className="space-y-4">
        {commentsToShow.map((comment, index) => {
          const isEditing = editingId === comment.id;
          const isOwner = comment?.member?.userId === currentUserId;
          const canDelete = isOwner || isProjectManager;
          const userRoles = getUserRole(comment.member.userId);
          const isManager = userRoles.includes("ROLE_MANAGER");

          return (
            <Card
              key={index}
              className="group hover:shadow-md transition-all duration-300 border-0 shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl hover:scale-[1.02]"
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  {/* Enhanced Profile Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-9 h-9 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary to-purple-600 text-white font-semibold text-sm">
                      {comment.member.imageUrl ? (
                        <Image
                          src={comment.member.imageUrl}
                          alt={comment.member.username}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full rounded-full"
                        />
                      ) : (
                        getInitials(comment.member.username)
                      )}
                    </div>

                    {isManager && (
                      <div className="absolute -top-1 -right-1.5 w-4 h-4 border-white border-2 bg-yellow-500 rounded-full flex items-center justify-center shadow-md">
                        <Crown className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {comment.member.username}
                          </h4>
                          {/* {isManager && (
                            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                              Manager
                            </span>
                          )} */}
                          {isOwner && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <span>{getTimeAgo(comment.creationDate)}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          {/* <span>{formatDate(comment.creationDate)}</span> */}
                        </p>
                      </div>

                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {isEditing ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleSave(comment.id)}
                              className="h-7 px-2 text-white text-xs rounded-xl"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancel}
                              className="h-7 px-2 border-gray-300 hover:bg-gray-50 text-xs rounded-xl"
                            >
                              <X className="w-3 h-3 mr-1" />
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            {isOwner && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEdit(comment)}
                                className="h-7 px-2 hover:text-blue-600 transition-colors text-xs"
                              >
                                <Pencil className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                            )}
                            {canDelete && (
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDelete(comment.id)}
                                className="h-7 px-2 hover:text-red-600 transition-colors text-xs"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Comment Content */}
                    <div className="mt-2">
                      {isEditing ? (
                        <div className="space-y-2">
                          <Input
                            value={editedContent}
                            onChange={(e) => {
                              setEditedContent(e.target.value);
                              console.log("Input value:", e.target.value);
                            }}
                            className="w-full p-3 border-2 border-blue-200 focus:border-primary rounded-xl bg-white shadow-sm text-sm"
                            placeholder="Edit your comment..."
                            autoFocus
                          />
                          <div className="text-xs text-gray-500">
                            Press Enter to save, or use the buttons above
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-3 rounded-tr-xl rounded-br-xl border-l-4 border-primary">
                          <p className="text-sm text-gray-800 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {comments.length > 1 && (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={toggleShowAllComments}
            className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            {showAllComments ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show {remainingCommentsCount} More{" "}
                {remainingCommentsCount === 1 ? "Comment" : "Comments"}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
