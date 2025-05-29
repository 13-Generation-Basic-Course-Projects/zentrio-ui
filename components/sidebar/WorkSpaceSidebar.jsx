"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/image/Zentrio-Logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import board from "../../assets/boardSideBar.png";
import { LeaveIcon } from "../icon/everyicon";
import { icon } from "../icon/allicon";
import SaveWorkspace from "../button/SaveWorkspace";
import ModalCreateWorkspace from "../modal/ModalCreateWorkspace";
import ModalCreateBoard from "../modal/ModalCreateBoard";

const randomColor = () =>
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

const myworkspaceItem = [
  {
    title: "My Empty workspace",
    url: "/workspace",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: true,
  },
  {
    title: "My workspace 2",
    url: "/workspace/2",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: true,
  },
  {
    title: "My workspace 3",
    url: "/workspace/3",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: false,
  },
];
const otherworkspaceItem = [
  {
    title: "OtherWorkspace 1",
    url: "/workspace/otherworkspace/1",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: true,
  },
  {
    title: "OtherWorkspace 2",
    url: "/workspace/otherworkspace/2",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: true,
  },
  {
    title: "OtherWorkspace 3",
    url: "/workspace/otherworkspace/3",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: false,
  },
];

export default function WorkSpaceSideBar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-none  ">
      <SidebarContent className="h-screen flex flex-col !border-0 ">
        <div className="p-4 !border-0">
          <Link href="/">
            <Image src={logo} className="w-[168px] object-cover" alt="logo" />
          </Link>
        </div>

        <SidebarGroup className="flex flex-col flex-1 !border-0 px-5">
          <SidebarGroupContent className="flex flex-col flex-1 !border-0 gap-6">
            {/* TOP + MIDDLE MENU Combined */}
            <SidebarMenu className="space-y-1 flex flex-col gap-2 !border-0">
              <SaveWorkspace />
              {/* 1 */}
              <div className="flex items-center justify-between">
                <p className="  text-body-sm  font-extrabold">My Workspace</p>
                <ModalCreateWorkspace />
              </div>
              {myworkspaceItem.map((item, i) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={i} className="!border-0 p-0">
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={`group flex w-full items-center justify-between  rounded-lg transition-colors duration-200  p-0
                ${
                  isActive
                    ? "bg-slate-blue text-primary"
                    : "hover:bg-slate-100 text-gray-700"
                } !border-0`}
                    >
                      <Link href={item.url}>
                        <div className="flex items-center gap-2 justify-between w-full">
                          <span
                            className={`${item.color} h-5 w-5 rounded-full`}
                          ></span>
                          <span className="flex-1 text-left sm:text-body-sm  truncate overflow-hidden whitespace-nowrap">
                            {item.title}
                          </span>
                          <span>{icon.threedotH}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {/* 2 */}
              <p className="text-body-sm  font-extrabold">Other Workspace</p>
              {otherworkspaceItem.map((item, i) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={i} className="!border-0 w-full  p-0">
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={`group flex w-full items-center justify-between  p-0  rounded-lg transition-colors duration-200 
                ${
                  isActive
                    ? "bg-slate-blue text-primary"
                    : "hover:bg-slate-100 text-gray-700"
                } !border-0`}
                    >
                      <Link href={item.url}>
                        <div className="flex items-center gap-2  justify-between w-full">
                          <span
                            className={`${item.color} h-5 w-5 rounded-full`}
                          ></span>
                          <span className="flex-1 text-left sm:text-body-sm truncate overflow-hidden whitespace-nowrap">
                            {item.title}
                          </span>
                          <span>{icon.threedotH}</span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            {/* LOGOUT (Shown conditionally with hidden class removed if needed) */}
            <SidebarMenu className="!border-0 mt-auto hidden">
              <SidebarMenuItem className="!border-0">
                <SidebarMenuButton
                  asChild
                  tooltip="Logout"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors !border-0"
                >
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LeaveIcon strokwidth={2} size={4} color={"red"} />
                    <span className="text-red-500 font-medium">Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
