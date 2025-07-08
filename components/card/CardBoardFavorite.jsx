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
import { usePathname, useSearchParams } from "next/navigation";
import { StackedUser } from "../useravatar/StackUser";

// Props expected: title, image, isFavourite, boardId, workspaceId, updateFavAction, deleteBoardAction
export default function CardBoardFavorite({
  title,
  image,
  images,
  boardId,
  // workspaceId,
  isFavourite,
  updateFavAction,
  deleteBoardAction,
  role,
  memberData,
  isFavBoardDelete,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* Extract workspaceId and projectId from the current URL */
  const pathSegments = pathname.split("/");
  const workspaceId = pathSegments[2] || "defaultWorkspace";
  const projectId = pathSegments[3] || "defaultProject";

  const userRole = role || searchParams.get("role") || "pm";

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
                  (
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
        <Link href={`/dashboard/${workspaceId}/${boardId}/board?role=${role}`}>
          {image && image.startsWith("bg-") ? (
            <div
              className={`rounded-xl w-full h-32 bg-cover bg-center ${image}`}
              aria-label={`Card background for ${title}`}
            />
          ) : (
            <img
              src={images}
              alt={`Card background for ${images}`}
              className="object-cover rounded-xl w-full h-32"
            />
          )}
        </Link>
      </CardBody>

      {/* Footer */}
      <CardFooter className="pt-2 px-4 flex flex-col items-start space-y-4">
        <StackedUser image={memberData} />
        <div className="flex w-full justify-between text-sm text-gray-600">
          {/* Members icon and text */}
          <div className="flex items-center gap-1">
            <Image
              src={iconMember}
              className="w-[16px] h-[16px]"
              alt="Members icon"
            />
            <p className="text-body-sm">
              {memberData.length === 0
                ? "No member"
                : `${memberData.length} ${
                    memberData.length === 1 ? "Member" : "Members"
                  }`}
            </p>
          </div>
          {isFavBoardDelete ? (
            ""
          ) : (
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
                        ("Delete confirmed!");
                      setIsDeleteOpen(false);
                    }
                  }}
                />
              )}
            </div>
          )}
          {/* Delete button and confirmation modal */}
        </div>
      </CardFooter>
    </Card>
  );
}
