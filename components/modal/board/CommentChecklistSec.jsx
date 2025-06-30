"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  deleteCommentBycmtIdAction,
  editCommmentAction,
} from "@/action/board.action";
import { toast } from "react-toastify";

const editCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment is required")
    .max(50, "Comment must be 50 characters or less"),
});

export default function CommentChecklistSec({
  comments,
  preventUserImage,
  checklistId,
  onCommentsUpdated,
  onTotalCommentLengthUpdated, // New prop
}) {
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(editCommentSchema),
    defaultValues: { content: "" },
  });

  // Calculate and pass total comment length
  useEffect(() => {
    const totalLength = comments.reduce(
      (sum, comment) => sum + (comment.content?.length || 0),
      0
    );
    if (onTotalCommentLengthUpdated) {
      onTotalCommentLengthUpdated(totalLength);
    }
  }, [comments, onTotalCommentLengthUpdated]);

  const startEditing = (comment) => {
    setEditingCommentId(comment.id);
    reset({ content: comment.content });
    setSubmitError("");
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    reset();
    setSubmitError("");
  };

  const onSubmit = async (data) => {
    try {
      setSubmitError("");
      const result = await editCommmentAction({
        commentId: editingCommentId,
        content: data.content,
        checklistId,
      });

      if (result.success) {
        toast.success("Comment updated successfully!", { duration: 3000 });
        if (onCommentsUpdated && result.updatedComments) {
          onCommentsUpdated(result.updatedComments);
        }
        cancelEditing();
      } else {
        setSubmitError(result.error || "Failed to edit comment");
        toast.error(result.error || "Failed to edit comment", {
          duration: 3000,
        });
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred");
      toast.error("An unexpected error occurred", { duration: 3000 });
    }
  };

  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const handleDelete = async (commentId) => {
    try {
      setDeletingCommentId(commentId);
      const result = await deleteCommentBycmtIdAction(commentId);

      if (result.success) {
        toast.success("Comment deleted successfully!", { duration: 3000 });
        if (onCommentsUpdated && result.updatedComments) {
          onCommentsUpdated(result.updatedComments);
        }
      } else {
        toast.error(result.error || "Failed to delete comment", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", { duration: 3000 });
    } finally {
      setDeletingCommentId(null);
    }
  };

  return (
    <div className="space-y-1">
      {(comments ?? []).map((el) => (
        <div key={el.id}>
          <p className="flex items-center gap-2">
            <img
              src={
                preventUserImage ||
                el.member?.imageUrl ||
                "https://i.pinimg.com/736x/78/d9/4b/78d94baa8d7459c33b6b99f647893869.jpg"
              }
              alt={el.member?.username || "User"}
              className="w-6 h-6 rounded-full object-cover"
            />
            {el.member?.username || "Anonymous"}
          </p>
          <div className="ml-8 text-title/50 text-caption flex flex-col space-y-1">
            {editingCommentId === el.id ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                <input
                  type="text"
                  className={`w-full p-2 border rounded-medium ${
                    errors.content ? "border-red-500" : "border-gray-400"
                  } text-caption`}
                  {...register("content")}
                />
                <p
                  className={`text-caption ${
                    (watch("content")?.length || 0) >= 450
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {watch("content")?.length || 0}/500 characters
                </p>
                {errors.content && (
                  <p className="NO MATCHING ID FOUND text-caption">
                    {errors.content.message}
                  </p>
                )}
                {submitError && (
                  <p className="text-red-500 text-caption">{submitError}</p>
                )}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 Installed Apps py-1 bg-primary text-white rounded-medium disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(el.id)}
                    disabled={deletingCommentId === el.id}
                    className="px-3 py-1 bg-red-500 text-white rounded-medium disabled:opacity-50 hover:bg-red-600"
                  >
                    {deletingCommentId === el.id ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEditing}
                    className="px-3 py-1 bg-gray-300 rounded-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p>{el.content || "No content available"}</p>
                  <p className="text-caption text-gray-500">
                    {el.content?.length || 0}/500 characters
                  </p>
                </div>
                <button
                  onClick={() => startEditing(el)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex justify-end">
              <div className="flex flex-col items-end bg-progress-green/20 rounded-full p-2">
                <div className="flex items-center space-x-2">
                  <svg
                    width="10"
                    height="11"
                    viewBox="0 0 10 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 2.24344C2.83564 2.24344 1.08108 3.998 1.08108 6.16236C1.08108 8.32672 2.83564 10.0813 5 10.0813C7.16436 10.0813 8.91892 8.32672 8.91892 6.16236C8.91892 3.998 7.16436 2.24344 5 2.24344ZM0.27027 6.16236C0.27027 3.5502 2.38784 1.43263 5 1.43263C7.61216 1.43263 9.72973 3.5502 9.72973 6.16236C9.72973 8.77452 7.61216 10.8921 5 10.8921C2.38784 10.8921 0.27027 8.77452 0.27027 6.16236Z"
                      fill="#5FC381"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5 3.05425C5.2239 3.05425 5.40541 3.23576 5.40541 3.45966V5.93766L6.83649 6.83209C7.02635 6.95076 7.08407 7.20087 6.9654 7.39074C6.84674 7.5806 6.59662 7.63832 6.40676 7.51966L4.78514 6.50614C4.6666 6.43206 4.59459 6.30214 4.59459 6.16236V3.45966C4.59459 3.23576 4.7761 3.05425 5 3.05425Z"
                      fill="#5FC381"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.04342 1.01083C2.20174 1.16915 2.20174 1.42584 2.04342 1.58416L0.69207 2.93551C0.53375 3.09383 0.277061 3.09383 0.11874 2.93551C-0.0395802 2.77719 -0.0395802 2.5205 0.11874 2.36218L1.47009 1.01083C1.62841 0.85251 1.8851 0.85251 2.04342 1.01083Z"
                      fill="#5FC381"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.95658 1.01083C7.79826 1.16915 7.79826 1.42584 7.95658 1.58416L9.30793 2.93551C9.46625 3.09383 9.72294 3.09383 9.88126 2.93551C10.0396 2.77719 10.0396 2.5205 9.88126 2.36218L8.52991 1.01083C8.37159 0.85251 8.1149 0.85251 7.95658 1.01083Z"
                      fill="#5FC381"
                    />
                  </svg>
                  <span className="text-caption-tiny text-gray-500">
                    {el.creationDate
                      ? new Date(el.creationDate).toLocaleTimeString()
                      : "Unknown time"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
