"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import Image from "next/image";
import Task3D from "@/assets/emptyKanbanPage/3DUIWorkflowDesign.png";
import Clock3D from "@/assets/emptyKanbanPage/Clock3D.png";

export function EmptyKanban() {
  return (
    <div className=" w-full h-full">
      <div className="absolute  pl-[50px]">
        <div className="w-[734px]  flex flex-col gap-[37px]">
          <p className="text-[48px] font-semibold bg-clip-text bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] text-transparent">
            Let’s get this board moving.
          </p>
          <p className="text-body-lg">
            Your Kanban board is currently empty. <br />
            create the Gantt chart now for free to start use your kanban. Stay
            productive, stay in control — your workflow starts here!
          </p>
        </div>
      </div>

      <Image
        src={Task3D}
        alt="3D UI Workflow Design"
        className=" w-[350px]    absolute bottom-4 right-10"
        
      />
      <Image
        src={Clock3D}
        alt="3D Clock Design"
        className="  size-[169px] lg:size-[200px] absolute bottom-2 right-4"
        priority
      />
    </div>
  );
}
