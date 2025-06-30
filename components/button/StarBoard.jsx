"use client";
import React, { useState } from "react";
import { StarIconOutline, StarIconSolid } from "../icon/everyicon";
import { Button } from "@heroui/react";
import { updateFavBoardByIdAction } from "@/action/workspace.action";


export default function StarBoard({ favBoard, boardId }) {
  const [favorited, setFavorited] = useState(favBoard);
  const [loading, setLoading] = useState(false);

  const handleToggleFavorite = async () => {
    const newFavoriteStatus = !favorited;
    setFavorited(newFavoriteStatus); // Optimistic UI update
    setLoading(true);

    try {
      await updateFavBoardByIdAction({
        boardId,
        isFavourite: newFavoriteStatus,
      });
    } catch (error) {
      console.error("Failed to update favorite status", error);
      setFavorited(favorited); // Revert back if failed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[50px]">
      <Button
        onPress={handleToggleFavorite}
        className="w-[40px] h-[50px] min-w-0 bg-transparent border text-primary p-0"
        size="sm"
        aria-label="Toggle favorite"
        isDisabled={loading}
      >
        {favorited ? (
          <StarIconSolid className="text-yellow-500" />
        ) : (
          <StarIconOutline className="text-yellow-500" />
        )}
      </Button>
    </div>
  );
}
