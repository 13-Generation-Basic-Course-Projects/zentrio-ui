"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { postCommentByCheckListIdAction } from "@/action/board.action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Define the Zod schema for the comment
const commentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment is required")
    .max(500, "Comment must be 500 characters or less"),
});

export default function PostCommentChecklist({ checklistId, onCommentPosted }) {
  const router = useRouter();

  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const result = await postCommentByCheckListIdAction({
        checklistId,
        content: data.content,
      });

      if (result.success) {
          ("Comment posted successfully:", result.data);

        // Clear the form
        reset();

        // Show success toast
        toast.success("Comment posted successfully!");

        // Notify parent component if callback provided
        if (onCommentPosted) {
          onCommentPosted(result.data);
        }

        // Force a router refresh to sync data
        router.refresh();
      } else {
        console.error("Failed to post comment:", result.error);
        toast.error(result.error || "Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div>
      <label className="block text-title">Activity </label>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <input
          type="text"
          placeholder="Write a comment"
          className={`w-full h-15 text-title/50 text-caption p-4 pr-10 border border-gray-400 rounded-medium ${
            errors.content ? "border-red-500" : ""
          }`}
          {...register("content")}
        />

        {/* Form validation errors */}
        {errors.content && (
          <p className="text-red-500 text-caption mt-1">
            {errors.content.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-3 top-1/2 -translate-y-1/2 disabled:cursor-not-allowed"
        >
          <svg
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 fill-primary transition-opacity ${
              isSubmitting ? "opacity-50" : "hover:opacity-80"
            }`}
          >
            <path
              clipRule="evenodd"
              d="M26.8908 3.63751C27.4296 2.02234 25.8325 0.515487 24.2514 1.14736L23.7584 1.34438L2.05498 8.09216C0.775656 8.48991 0.61966 10.236 1.80825 10.8539L11.8128 16.0544C11.8453 16.0712 11.8781 16.0868 11.9113 16.1011C11.9255 16.1337 11.9408 16.166 11.9574 16.1978L17.1625 26.1935C17.7809 27.381 19.5286 27.2252 19.9267 25.947L26.6579 4.33542L26.8908 3.63751ZM4.2732 9.49616C4.10263 9.54919 4.08185 9.78221 4.24034 9.8646L12.281 14.0443C12.3584 14.0845 12.453 14.0699 12.5146 14.0083L22.2205 4.31105C22.3683 4.16341 22.2193 3.91657 22.0198 3.97859L4.2732 9.49616ZM18.5213 23.7312C18.4682 23.9016 18.2354 23.9224 18.153 23.7641L13.9694 15.7303C13.9291 15.6529 13.9437 15.5582 14.0055 15.4965L23.7117 5.79893C23.8594 5.65131 24.1061 5.80048 24.044 5.99989L18.5213 23.7312Z"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}
