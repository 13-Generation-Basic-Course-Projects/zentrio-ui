"use client";

import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import CardBoardDetail from "../card/CardBoardDetail";
import { getAllBoardBywWorkspaceIdAction } from "@/action/workspace.action";

const colorOptions = [
  { key: "red", label: "Red", className: "bg-board-red" },
  { key: "blue", label: "Blue Sky", className: "bg-board-primary" },
  { key: "green", label: "Green", className: "bg-board-green" },
  { key: "purple", label: "Purple", className: "bg-board-purple" },
  { key: "orange", label: "Orange", className: "bg-board-orange" },
  { key: "violet", label: "Violet", className: "bg-board-violet" },
];

export default function DrawerSeeAll({
  title,
  isOpen,
  onClose,
  size = "2xl",
  workspaceId,
  boardsOtherWorkspace = null,
  workspaceType = { workspaceType },
}) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (isOpen) {
      if (boardsOtherWorkspace && Array.isArray(boardsOtherWorkspace)) {
        setBoards({ payload: boardsOtherWorkspace });
      } else if (workspaceId) {
        const fetchBoards = async () => {
          const data = await getAllBoardBywWorkspaceIdAction(workspaceId);
          console.log("Get all board in see all: ", data);
          setBoards(data);
        };
        fetchBoards();
      }
    }
  }, [isOpen, workspaceId, boardsOtherWorkspace ?? null]);

  return (
    <Drawer isOpen={isOpen} size={size} onClose={onClose}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
            <DrawerBody>
              <div className="space-y-4">
                {boards?.payload?.map((board, i) => {
                  let image = "";

                  const matchedColor = colorOptions.find(
                    (c) => c.key === board.cover
                  );

                  if (matchedColor) {
                    image = matchedColor.className;
                  } else if (
                    board.image?.startsWith("http") ||
                    board.image?.startsWith("data:")
                  ) {
                    image = board.image;
                  } else {
                    image = "bg-gray-200";
                  }

                  return (
                    <CardBoardDetail
                      key={i}
                      title={board?.title}
                      description={board?.description}
                      // image={board?.image}
                      image={board?.image}
                      images={board?.imageUrl}
                      boardId={board?.boardId || board?.id}
                      workspaceId={workspaceId}
                      workspaceType={workspaceType}
                    />
                  );
                })}
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button
                color="danger"
                variant="light"
                onPress={onClose}
                className="rounded-large"
              >
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
