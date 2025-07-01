"use client"; // if in Next.js app directory

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

export default function DrawerSeeAll({
  title,
  isOpen,
  onClose,
  size = "2xl",
  workspaceId,
}) {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (isOpen && workspaceId) {
      const fetchBoards = async () => {
        const data = await getAllBoardBywWorkspaceIdAction(workspaceId);
        console.log("Get all board in see all: ", data);
        setBoards(data);
      };
      fetchBoards();
    }
  }, [isOpen, workspaceId]);

  return (
    <Drawer isOpen={isOpen} size={size} onClose={onClose}>
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1">{title}</DrawerHeader>
            <DrawerBody>
              <div className="space-y-4">
                {boards.map((board) => (
                  <CardBoardDetail
                    key={board.id}
                    title={board.title}
                    description={board.description}
                    image={board.image}
                    images={board.images}
                    memberData={board.members}
                  />
                ))}
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
