"use client";

import React, { useEffect, useState } from "react";
import { Button, useDisclosure } from "@heroui/react";
import DrawerSeeAll from "../modal/DrawerSeeAll";
import {
  getAllBoardBywWorkspaceIdAction,
  getOtherWorkSpaceJoinedAction,
} from "@/action/workspace.action";


export default function Bar({ title, btn, workspaceId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isValidWorkspace, setIsValidWorkspace] = useState(false);
  const [boards, setBoards] = useState([]);
  const [workspaceType, setWorkspaceType] = useState("own"); // or "other"

  useEffect(() => {
    const checkWorkspace = async () => {
      if (!workspaceId) {
        setIsValidWorkspace(false);
        return;
      }

      // Try own workspace first
      const result = await getAllBoardBywWorkspaceIdAction(workspaceId);
      if (result?.status !== 404 && Array.isArray(result?.payload)) {
        setIsValidWorkspace(true);
        setBoards(result.payload);
        setWorkspaceType("own");
        return;
      }

      // Try other workspace
      const getWorKSpaceJoined = await getOtherWorkSpaceJoinedAction();
      const matchingWorkspace = getWorKSpaceJoined.payload.find(
        (workspace) => workspace.workspaceId === workspaceId
      );

      if (matchingWorkspace) {
        const otherBoards = matchingWorkspace.otherBoards || [];
        setIsValidWorkspace(true);
        setBoards(otherBoards); 
        setWorkspaceType("other");
      } else {
        setIsValidWorkspace(false);
        setBoards([]);
      }
    };

    checkWorkspace();
  }, [workspaceId]);

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-4">
        <p className="text-body-sm font-extrabold">{title}</p>
        <Button
          className={`bg-transparent ${
            !isValidWorkspace
              ? "text-gray-400 cursor-not-allowed"
              : "hover:text-primary"
          }`}
          variant="none"
          onPress={onOpen}
          disabled={!isValidWorkspace}
        >
          {btn}
        </Button>
      </div>
      <div className="border-1 mb-4"></div>

      <DrawerSeeAll
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        boardsOtherWorkspace={boards}
        workspaceType={workspaceType}
        workspaceId={workspaceId}
      />
    </div>
  );
}
