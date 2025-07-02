"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { StackedUser } from "../useravatar/StackUser";
import { getMemberByBoardIdAction } from "@/action/board.action";
import { toast } from "react-toastify";

export default function CardBoard({
  title,
  image,
  images,
  role,
  deleteBoardAction,
  boardId,
  updateNameBoardAction,
  getBoardByIdAction,
  updateFavAction,
  isFavourite,
  includesPathOtherWorkSpace,
  isFavBtn,
  otherBoardImage,
}) {
  

  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log("is fav", isFavBtn);
  /* Extract workspaceId and projectId from the current URL */
  const pathSegments = pathname.split("/");
  const workspaceId = pathSegments[2] || "defaultWorkspace";
  const projectId = pathSegments[3] || "defaultProject";

  const userRole = role || searchParams.get("role") || "pm";
  const [favorited, setFavorited] = useState(isFavourite);

  /* State for delete confirmation modal */
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  /* State to manage editing mode and edited title */
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

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
        title: newTitle,
        description: existingBoard.description,
        cover: existingBoard.cover,
        workspaceId: existingBoard.workspaceId,
      });

      console.log("Board title updated to:", newTitle);
      toast.success("You have successfully updated the board title");
    } catch (error) {
      toast.error("Failed to update the board title");
      console.error(" Failed to update board title:", error);
    }

    setEditing(false); // Hide input after update
  };

  // fong
  const [members, setMembers] = useState([]); // State to store members
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  /* Fetch members when component mounts or boardId changes */
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const membersResponse = await getMemberByBoardIdAction({ boardId });
        const allMemberInBoard = membersResponse?.payload || [];
        setMembers(allMemberInBoard);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setError("Failed to load members");
        setMembers([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [boardId]);
  console.log("member", members);
  return (
    <Card className="py-4 h-[340px] rounded-xl shadow-sm">
      {/* Card Header: shows editable title and favorite button */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
        {editing && !includesPathOtherWorkSpace ? (
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
            {title}
          </p>
        )}
        {/* Favorite (star) toggle button */}

        {isFavBtn !== false ? (
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

                toast.success(
                  newFavoriteStatus
                    ? "Added to favorites"
                    : "Removed from favorites"
                );
              } catch (error) {
                console.error(" Failed to update favorite status:", error);
                toast.error(" Failed to update favorite status");
                setFavorited(!newFavoriteStatus); // Revert if error
              }
            }}
            className="text-yellow-500 hover:text-yellow-600 p-3"
            aria-label="Toggle favorite"
          >
            {favorited ? <StarIconSolid /> : <StarIconOutline />}
          </button>
        ) : (
          ""
        )}
      </CardHeader>

      {/* Card Body: background image or placeholder */}
     {/* Card Body: background image or placeholder */}
     <CardBody className="overflow-visible py-2 ">
        <Link href={`/dashboard/${workspaceId}/${boardId}/board`}>
          {image && image.startsWith("bg-") ? (
            <div
              className={`rounded-xl w-full h-32 bg-cover bg-center ${image}`}
              aria-label={`Card background for ${title}`}
            />
          ) : image ||  otherBoardImage ? (
            <img
              src={includesPathOtherWorkSpace ?  otherBoardImage : images}
              alt={images || "Board cover image"}
              className="w-full h-32 object-cover rounded-xl"
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
        <StackedUser image={members} />
        <div className="flex w-full justify-between text-sm text-gray-600">
          {/* Members icon and text */}
          <div className="flex items-center gap-1">
            <Image
              src={iconMember}
              className="w-[16px] h-[16px]"
              alt="Members icon"
            />
            <p className="text-body-sm">
              {members.length === 0
                ? "No Members"
                : `${members.length} ${
                    members.length === 1 ? "Member" : "Members"
                  }`}
            </p>
          </div>

          {/* Delete button and confirmation modal */}
          {includesPathOtherWorkSpace ? (
            ""
          ) : (
            <div className="flex items-center text-progress-red py-5 gap-1">
              <button
                onClick={() => setIsDeleteOpen(true)}
                className="flex items-center space-x-2 hover:bg-slate-50 rounded-medium text-caption"
              >
                <IconDelete />
                <span>Remove</span>
              </button>

              {/* Delete confirmation modal */}
              {isDeleteOpen && (
                <>
                  <ModalDelete
                    isOpen={isDeleteOpen}
                    onClose={() => setIsDeleteOpen(false)}
                    messageTitle="Are you sure?"
                    messageBody="You want delete this board."
                    messageUndo="Cancel"
                    messageDo="Delete"
                    action={async () => {
                      try {
                        await deleteBoardAction(boardId, workspaceId);
                        toast.success("Board deleted successfully");
                        console.log("Delete confirmed!");
                      } catch (error) {
                        console.error(" Failed to delete board:", error);
                        toast.error(" Failed to delete board");
                      } finally {
                        setIsDeleteOpen(false);
                      }
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
