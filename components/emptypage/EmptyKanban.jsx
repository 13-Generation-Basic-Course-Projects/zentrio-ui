"use client"

import { Button } from "@heroui/react";
import { useState } from "react";
import Task3D from "@/assets/emptyKanbanPage/3DUIWorkflowDesign.png"
import Clock3D from "@/assets/emptyKanbanPage/Clock3D.png";
import Image from "next/image";

export function EmptyKanban(){
    const [active, setActive] = useState(false);

    return<>
        <div className="flex h-[118px] justify-between items-center">
            <div>
                <p className="text-h1 font-bold tracking-[0.2px]">Hikoko Design</p>
            </div>
            <div className="flex gap-[8px]">
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
                <Button color="success" className="w-[109px] h-[48px] bg-white border-[#E2E8F0] border-1 flex gap-[8px] items-center justify-center rounded-[8px]">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[20px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                    </span>
                    <p className="text-body-sm">
                        Invite
                    </p>
                </Button>
                <div onClick={()=>setActive(!active)} className="w-[40px] h-[48px] border-[#E2E8F0] border-1 bg-white flex items-center justify-center rounded-[8px] cursor-pointer">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={active ? `#FFFF00` : `none`} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#292D32" className="size-[18px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div className="flex justify-between">
            <div className="flex items-center w-[315px] border-b-2 border-title h-[37px]">
                <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">TODO</p>
                <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">2</p>
            </div>
            <div className="flex items-center w-[315px] border-b-2 border-[#306BFF] h-[37px]">
                <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">In Progress</p>
                <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">2</p>
            </div>
            <div className="flex items-center w-[315px] border-b-2 border-[#FFB580] h-[37px]">
                <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">Under Review</p>
                <p className="flex items-center justify-center -[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">2</p>
            </div>
            <div className="flex items-center w-[315px] border-b-2 border-[#78C552] h-[37px]">
                <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">COMPLETED</p>
                <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">2</p>
            </div>
        </div>
        <div className="absolute top-[50%] left-[5%]">
            <div className="w-[734px] h-[136px] flex flex-col gap-[37px]">
                <p className="text-[48px] font-semibold bg-clip-text bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] text-transparent">Let’s get this board moving.</p>
                <p className="text-body-lg">
                    Your Kanban board is currently empty. <br />
                    create the Gantt chart now for free to start use your kanban. Stay productive, stay in control — your workflow starts here!
                </p>
            </div>
        </div>
        <Image
            src={Task3D}
            alt="3D UI Workflow Design"
            className="absolute top-[65%] right-[9%] size-[526px]"
        />
        <Image
            src={Clock3D}
            alt="3D Clock Design"
            className="absolute top-[110%] right-[1%] size-[169px]"
        />
    </>
}

export function EmptyPageHaveMember(){
    const [active, setActive] = useState(false);

    return<>
        <div className="flex h-[118px] justify-between items-center">
            <div className="flex flex-col gap-[-5px]">
                <p className="text-h1 font-bold tracking-[0.2px]">Hikoko Design</p>
                <div className="relative">
                    <Image
                        src=""
                        alt="Avatar"
                        className="w-[32px] h-[32px] border-3 border-white bg-slate-green-more rounded-full absolute"
                    />
                    <Image
                    src=""
                    alt="Avatar"
                    className="w-[32px] h-[32px] border-3 border-white bg-slate-blue-more rounded-full absolute left-[9%]"
                    />
                    <Image
                        src=""
                        alt="Avatar"
                        className="w-[32px] h-[32px] border-3 border-white bg-slate-orange-more rounded-full absolute left-[18%]"
                    />  
                    <p className="w-[32px] h-[32px] border-3 border-white bg-slate-red-more rounded-full absolute left-[27%] flex justify-center items-center text-[12px] text-description">
                        3+
                    </p>
                </div>
            </div>
            <div className="flex gap-[8px]">
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
                <Button color="success" className="w-[109px] h-[48px] bg-white border-[#E2E8F0] border-1 flex gap-[8px] items-center justify-center rounded-[8px]">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-[20px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>
                    </span>
                    <p className="text-body-sm">
                        Invite
                    </p>
                </Button>
                <div onClick={()=>setActive(!active)} className="w-[40px] h-[48px] border-[#E2E8F0] border-1 bg-white flex items-center justify-center rounded-[8px] cursor-pointer">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill={active ? `#FFFF00` : `none`} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#292D32" className="size-[18px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
        <div className="flex justify-between pt-[1.5%]">
            <div className="flex items-center w-[315px] border-b-2 border-title h-[37px]">
                <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">TODO</p>
                <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">2</p>
            </div>
            <div className="flex items-center w-[315px] border-b-2 border-[#306BFF] h-[37px]">
                <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">In Progress</p>
                <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">2</p>
            </div>
            <div className="flex items-center w-[315px] border-b-2 border-[#FFB580] h-[37px]">
                <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">Under Review</p>
                <p className="flex items-center justify-center -[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">2</p>
            </div>
            <div className="flex items-center w-[315px] border-b-2 border-[#78C552] h-[37px]">
                <p className="font-bold text-title pr-2 text-body-sm tracking-[1px]">COMPLETED</p>
                <p className="flex items-center justify-center boder-[#E2E8F0] border-1 w-[39.25px] h-[24px] rounded-full text-caption text-center text-[#94A3B8] font-bold">2</p>
            </div>
        </div>
        <div className="absolute top-[50%] left-[5%]">
            <div className="w-[734px] h-[136px] flex flex-col gap-[37px]">
                <p className="text-[48px] font-semibold bg-clip-text bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] text-transparent">Let’s get this board moving.</p>
                <p className="text-body-lg">
                    Your Kanban board is currently empty. <br />
                    create the Gantt chart now for free to start use your kanban. Stay productive, stay in control — your workflow starts here!
                </p>
            </div>
        </div>
        <Image
            src={Task3D}
            alt="3D UI Workflow Design"
            className="absolute top-[65%] right-[9%] size-[526px]"
        />
        <Image
            src={Clock3D}
            alt="3D Clock Design"
            className="absolute top-[110%] right-[1%] size-[169px]"
        />
    </>
}