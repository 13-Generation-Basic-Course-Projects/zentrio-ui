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
import ModalDelete from "../modal/ModalDelete";

// Props expected: title, image, isFavourite, boardId, workspaceId, updateFavAction, deleteBoardAction
export default function CardBoardFavorite({
  title,
  image,
  boardId,
  workspaceId,
  isFavourite,
  updateFavAction,
  deleteBoardAction,
}) {
  const [favorited, setFavorited] = useState(isFavourite);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <Card className="py-4 h-[340px] rounded-xl shadow-sm">
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
        <p className="text-body-sm font-semibold text-primary truncate">
          {title}
        </p>

        {/* Favorite (star) toggle button */}
        <button
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const newFavoriteStatus = !favorited;
            setFavorited(newFavoriteStatus); // Optimistic UI

            try {
              if (updateFavAction && boardId) {
                await updateFavAction({
                  boardId,
                  isFavourite: newFavoriteStatus,
                });
                console.log(
                  `✅ Favorite status updated to ${newFavoriteStatus}`
                );
              }
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

      {/* Body */}
      <CardBody className="overflow-visible py-2">
        <Link href={`/dashboard/1/1/board`}>
          {image && image.startsWith("bg-") ? (
            <div
              className={`rounded-xl w-full h-32 bg-cover bg-center ${image}`}
              aria-label={`Card background for ${title}`}
            />
          ) : image ? (
            <img
              src={image}
              alt={`Card background for ${title}`}
              className="object-cover rounded-xl w-full h-32"
            />
          ) : (
            <div
              className="rounded-xl w-full h-32 bg-gray-200"
              aria-label={`No image available for ${title}`}
            />
          )}
        </Link>
      </CardBody>

      {/* Footer */}
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

            {isDeleteOpen && (
              <ModalDelete
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                messageTitle="Are you sure?"
                messageBody="You want to delete this board."
                messageUndo="Cancel"
                messageDo="Delete"
                action={async () => {
                  if (deleteBoardAction && boardId && workspaceId) {
                    await deleteBoardAction(boardId, workspaceId);
                    console.log("Delete confirmed!");
                    setIsDeleteOpen(false);
                  }
                }}
              />
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
