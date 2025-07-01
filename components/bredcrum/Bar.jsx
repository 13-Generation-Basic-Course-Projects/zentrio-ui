// components/Bar.jsx
"use client";
import React from "react";
import { Button, useDisclosure } from "@heroui/react";
import DrawerSeeAll from "../modal/DrawerSeeAll";


export default function Bar({ title, btn , workspaceId}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-4">
        <p className="text-body-sm font-extrabold">{title}</p>
        <Button
          className="hover:text-primary bg-transparent"
          variant="none"
          onPress={onOpen}
        >
          {btn}
        </Button>
      </div>
      <div className="border-1 mb-4"></div>

      <DrawerSeeAll
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        workspaceId={workspaceId}
      />
    </div>
  );
}
