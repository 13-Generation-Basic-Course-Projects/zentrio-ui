"use client";

import { Button } from "@heroui/react";
import { useState } from "react";
import Image from "next/image";
import Task3D from "@/assets/emptyKanbanPage/3DUIWorkflowDesign.png"
import Clock3D from "@/assets/emptyKanbanPage/Clock3D.png"

export function EmptyKanban() {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="flex h-[118px] justify-between items-center">
        <div>
          <p className="text-h1 font-bold tracking-[0.2px]">Hikoko Design</p>
        </div>
        <div className="flex gap-[8px]">
          <Button
            color="success"
            className="w-[139px] h-[48px] bg-primary flex gap-[8px] items-center justify-center rounded-[8px]"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <p className="text-body-sm text-white">Create</p>
          </Button>
          <Button
            color="success"
            className="w-[109px] h-[48px] bg-white border-[#E2E8F0] border-1 flex gap-[8px] items-center justify-center rounded-[8px]"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-[20px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </span>
            <p className="text-body-sm">Invite</p>
          </Button>
          <div
            onClick={() => setActive(!active)}
            className="w-[40px] h-[48px] border-[#E2E8F0] border-1 bg-white flex items-center justify-center rounded-[8px] cursor-pointer"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={active ? `#FFFF00` : `none`}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#292D32"
                className="size-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center w-[315px] border-b-2 border-title h-[37px]">
          <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">
            TODO
          </p>
          <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">
            2
          </p>
        </div>
        <div className="flex items-center w-[315px] border-b-2 border-[#306BFF] h-[37px]">
          <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">
            In Progress
          </p>
          <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">
            2
          </p>
        </div>
        <div className="flex items-center w-[315px] border-b-2 border-[#FFB580] h-[37px]">
          <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">
            Under Review
          </p>
          <p className="flex items-center justify-center -[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">
            2
          </p>
        </div>
        <div className="flex items-center w-[315px] border-b-2 border-[#78C552] h-[37px]">
          <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">
            COMPLETED
          </p>
          <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">
            2
          </p>
        </div>
      </div>
      <div className="absolute top-[50%] left-[5%]">
        <div className="w-[734px] h-[136px] flex flex-col gap-[37px]">
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

      {/* Worm */}
      <div className="absolute top-[85%] right-[20%] size-[526px]">
        <svg
          width={124}
          height={47}
          viewBox="0 0 124 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect
            width="120.327"
            height="24.0309"
            transform="matrix(-0.981556 0.191176 -0.197076 -0.980388 123.461 23.7168)"
            fill="url(#pattern0_3611_136733)"
          />
          <defs>
            <pattern
              id="pattern0_3611_136733"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <use
                xlinkHref="#image0_3611_136733"
                transform="matrix(0.00350373 0 0 0.0175439 -0.00628901 0)"
              />
            </pattern>
            <image
              id="image0_3611_136733"
              width={289}
              height={57}
              preserveAspectRatio="none"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </div>


      <div className="absolute top-[65%] right-[9%] size-[526px]">
        <Image
          src={Task3D}
          alt="3D UI Workflow Design"
          priority
        />
      </div>
      
      <div className="absolute bottom-[-20%] right-[1%] size-[169px]">
        <Image
          src={Clock3D}
          alt="3D Clock Design"
          priority
        />
      </div>
    </>
  );
}

export function EmptyPageHaveMember() {
  const [active, setActive] = useState(false);

  return (
    <>
      <div className="flex w-full h-[118px] justify-between items-center">
        <div className="flex flex-col gap-[-5px]">
          <p className="text-h1 font-bold tracking-[0.2px]">Hikoko Design</p>
          <div className="relative">
            <Image
              src="3"
              alt="Avatar"
              className="w-[32px] h-[32px] border-3 border-white bg-slate-green-more rounded-full absolute"
            />
            <Image
              src="3"
              alt="Avatar"
              className="w-[32px] h-[32px] border-3 border-white bg-slate-blue-more rounded-full absolute left-[9%]"
            />
            <Image
              src="3"
              alt="Avatar"
              className="w-[32px] h-[32px] border-3 border-white bg-slate-orange-more rounded-full absolute left-[18%]"
            />
            <p className="w-[32px] h-[32px] border-3 border-white bg-slate-red-more rounded-full absolute left-[27%] flex justify-center items-center text-[12px] text-description">
              3+
            </p>
          </div>
        </div>
        <div className="flex gap-[8px]">
          <Button
            color="success"
            className="w-[139px] h-[48px] bg-primary flex gap-[8px] items-center justify-center rounded-[8px]"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </span>
            <p className="text-body-sm text-white">Create</p>
          </Button>
          <Button
            color="success"
            className="w-[109px] h-[48px] bg-white border-[#E2E8F0] border-1 flex gap-[8px] items-center justify-center rounded-[8px]"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-[20px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </span>
            <p className="text-body-sm">Invite</p>
          </Button>
          <div
            onClick={() => setActive(!active)}
            className="w-[40px] h-[48px] border-[#E2E8F0] border-1 bg-white flex items-center justify-center rounded-[8px] cursor-pointer"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={active ? `#FFFF00` : `none`}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#292D32"
                className="size-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-[1.5%]">
        <div className="flex items-center w-[315px] border-b-2 border-title h-[37px]">
          <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">
            TODO
          </p>
          <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">
            2
          </p>
        </div>
        <div className="flex items-center w-[315px] border-b-2 border-[#306BFF] h-[37px]">
          <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">
            In Progress
          </p>
          <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">
            2
          </p>
        </div>
        <div className="flex items-center w-[315px] border-b-2 border-[#FFB580] h-[37px]">
          <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">
            Under Review
          </p>
          <p className="flex items-center justify-center -[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">
            2
          </p>
        </div>
        <div className="flex items-center w-[315px] border-b-2 border-[#78C552] h-[37px]">
          <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">
            COMPLETED
          </p>
          <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">
            2
          </p>
        </div>
      </div>
      <div className="absolute top-[50%] left-[5%]">
        <div className="w-[734px] h-[136px] flex flex-col gap-[37px]">
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

      {/* Worm */}
      <div className="absolute top-[85%] right-[20%] size-[526px]">
        <svg
          width={124}
          height={47}
          viewBox="0 0 124 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect
            width="120.327"
            height="24.0309"
            transform="matrix(-0.981556 0.191176 -0.197076 -0.980388 123.461 23.7168)"
            fill="url(#pattern0_3611_136733)"
          />
          <defs>
            <pattern
              id="pattern0_3611_136733"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <use
                xlinkHref="#image0_3611_136733"
                transform="matrix(0.00350373 0 0 0.0175439 -0.00628901 0)"
              />
            </pattern>
            <image
              id="image0_3611_136733"
              width={289}
              height={57}
              preserveAspectRatio="none"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </div>

      <div className="relative w-full h-[800px]"> {/* Adjust parent height as needed */}
      <Image
        src={Task3D}
        alt="3D UI Workflow Design"
        className="absolute top-[65%] right-[9%] size-[526px]"
        priority
      />
      <Image
        src={Clock3D}
        alt="3D Clock Design"
        className="absolute bottom-[-20%] right-[1%] size-[169px]"
        priority
      />
    </div>
    </>
  );
}
