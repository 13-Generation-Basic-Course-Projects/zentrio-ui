"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  IconDelete,
  StackedProfiles,
  StarIconOutline,
  StarIconSolid,
} from "../icon/everyicon";
import iconMember from "@/assets/memberSideBar.png";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import ModalDelete from "../modal/ModalDelete";

export default function CardBoard({
  title,
  image,
  role,
  deleteBoardAction,
  boardId,
  updateNameBoardAction,
  getBoardByIdAction,
  updateFavAction,
  isFavourite,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* Extract workspaceId and projectId from the current URL */
  const pathSegments = pathname.split("/");
  const workspaceId = pathSegments[2] || "defaultWorkspace";
  // const projectId = pathSegments[3] || "defaultProject";
  const boardIdFromURL = pathSegments[3] || boardId; // defaultProject

  const userRole = role || searchParams.get("role") || "pm";
  const [favorited, setFavorited] = useState(isFavourite);

  /* State for delete confirmation modal */
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /* State to manage editing mode and edited title */
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  /* Function to handle rename confirmation */

  const handleTitleUpdate = async () => {
    if (newTitle.trim() === "") return; // Skip if empty

    try {
      /* Step 1: Get the existing board data */
      const response = await getBoardByIdAction(boardId);
      const existingBoard = response.payload;

      if (!existingBoard) throw new Error("Board not found");

      /* Step 2: Update only the title, keep others */
      await updateNameBoardAction(boardId, {
        title: newTitle, // New title
        description: existingBoard.description, // Preserve old description
        cover: existingBoard.cover, // Preserve old cover image
        workspaceId: existingBoard.workspaceId, // Preserve workspace ID
      });

      console.log("✅ Board title updated to:", newTitle);
    } catch (error) {
      console.error("❌ Failed to update board title:", error);
    }

    setEditing(false); // Hide input after update
  };

  return (
    <Card className="py-4 h-[340px] rounded-xl shadow-sm">
      {/* Card Header: shows editable title and favorite button */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
        {editing ? (
          /* Input for editing title */
          <input
            type="text"
            className="text-body-sm font-semibold text-primary bg-transparent border-b border-primary focus:outline-none"
            value={newTitle}
            autoFocus
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleTitleUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleTitleUpdate();
              if (e.key === "Escape") {
                setNewTitle(title); // Reset to original
                setEditing(false);
              }
            }}
          />
        ) : (
          /* Clickable title to enter editing mode */
          <p
            className="text-body-sm font-semibold text-primary truncate cursor-pointer"
            onClick={() => setEditing(true)}
            title="Click to rename"
          >
            {newTitle}
          </p>
        )}

        {/* Favorite (star) toggle button */}
        <button
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const newFavoriteStatus = !favorited;
            setFavorited(newFavoriteStatus); // Optimistic UI

            try {
              await updateFavAction({
                boardId,
                isFavourite: newFavoriteStatus,
              });

              console.log(`✅ Favorite status updated to ${newFavoriteStatus}`);
            } catch (error) {
              console.error("❌ Failed to update favorite status:", error);
              setFavorited(!newFavoriteStatus); // Revert if error
            }
          }}
          className="text-yellow-500 hover:text-yellow-600 p-3"
          aria-label="Toggle favorite"
        >
          {favorited ? <StarIconSolid /> : <StarIconOutline />}
        </button>
      </CardHeader>

      {/* Card Body: background image or placeholder */}
      <CardBody className="overflow-visible py-2">
        <Link
          href={`/dashboard/${workspaceId}/${boardIdFromURL}/board?role=${role}`}
        >
          {image?.startsWith("data:image") ? (
            <img
              src={image}
              alt="Board Cover"
              className="w-full h-32 object-cover rounded-lg"
            />
          ) : image ? (
            <div
              className={`w-full h-32 rounded-lg ${
                {
                  red: "bg-board-red",
                  blue: "bg-board-primary",
                  green: "bg-board-green",
                  purple: "bg-board-purple",
                  orange: "bg-board-orange",
                  violet: "bg-board-violet",
                }[image] || "bg-gray-300"
              }`}
            />
          ) : (
            <div
              className="rounded-xl w-full h-32 bg-gray-200"
              aria-label={`No image available for ${title}`}
            />
          )}
        </Link>
      </CardBody>

      {/* Card Footer: member count and delete button */}
      <CardFooter className="pt-2 px-4 flex flex-col items-start space-y-4">
        <StackedProfiles />
        <div className="flex w-full justify-between text-sm text-gray-600">
          {/* Members icon and text */}
          <div className="flex items-center gap-1">
            <Image
              src={iconMember}
              className="w-[16px] h-[16px]"
              alt="Members icon"
            />
            <p className="text-body-sm">13 Members</p>
          </div>

          {/* Delete button and confirmation modal */}
          <div className="flex items-center text-progress-red py-5 gap-1">
            <button onClick={() => setIsDeleteOpen(true)}>
              <IconDelete />
            </button>

            {/* Delete confirmation modal */}
            {isDeleteOpen && (
              <ModalDelete
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                messageTitle="Are you sure?"
                messageBody="You want delete this board."
                messageUndo="Cancel"
                messageDo="Delete"
                action={async () => {
                  await deleteBoardAction(boardId, workspaceId);
                  console.log("Delete confirmed!");
                  setIsDeleteOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
