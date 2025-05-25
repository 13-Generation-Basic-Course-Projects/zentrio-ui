import { Button } from "@heroui/react";
import React from "react";
import Gantt from "@/assets/emptyGanttBar/Gantt.png";
import Human from "@/assets/emptyGanttBar/Human.png";
import Clock3D from "@/assets/emptyKanbanPage/Clock3D.png";
import Image from "next/image";

export function EmptyGanttChart() {
  return <>
    <div className="flex justify-between items-center">
        <p className="text-h1 font-semibold">Gantt Chart</p>
        <Button color="success" className="w-[139px] h-[48px] bg-primary flex gap-[8px] items-center justify-center rounded-[8px]">
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </span>
            <p className="text-body-sm text-white">
                Create
            </p>
        </Button>
    </div>
    <div className="absolute top-[30%] right-[1.5%]">
        <div className="w-[734px] h-[136px] flex flex-col gap-[37px]">
            <p className="text-[48px] font-semibold bg-clip-text bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] text-transparent">Plan Smarter with Gantt Chart</p>
            <p className="text-body-lg">
                Turn complex projects into clear, actionable timelines. Drag, drop, and <br /> schedule your tasks with ease while keeping collaboration at the center <br /> of your planning process.
            </p>
        </div>
    </div>
    <Image 
        src={Gantt}
        alt="Gantt Chart Illustration"
        className="absolute left-[20%] top-[30%] w-[267px] h-[373px]"
    />
    <Image 
        src={Human}
        alt="Human Illustration"
        className="absolute top-[40%] left-[4%] w-[319px] h-[578px]"
    />
    <Image
        src={Clock3D}
        alt="3D Clock Design"
        className="absolute top-[100%] right-[1%] size-[169px]"
    />
  </>
}