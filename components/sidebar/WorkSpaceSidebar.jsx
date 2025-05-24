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
import calender from "../../assets/calendarSideBar.png";
import member from "../../assets/memberSideBar.png";
import board from "../../assets/boardSideBar.png";
import folder from "../../assets/folderSidBar.png";
import report from "@/assets/report.png";
import { LeaveIcon } from "../icon/everyicon";
const randomColor = () =>
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

const items = [
  {
    title: "workspace1",
    url: "/workspace",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: true,
  },
  {
    title: "workspace2",
    url: "/workspace/2",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: true,
  },
  {
    title: "workspace3",
    url: "/workspace/3",
    color: "bg-pink-300",
    activeIcon: board,
    myworkspace: true,
  },
];

export default function WorkSpaceSideBar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-none  ">
      <SidebarContent className="h-screen flex flex-col !border-0">
        <div className="p-4 !border-0">
          <Link href="/">
            <Image src={logo} className="w-[168px] object-cover" alt="logo" />
          </Link>
        </div>

        <SidebarGroup className="flex-1 flex flex-col !border-0">
          <SidebarGroupContent className="flex-1 flex flex-col justify-between !border-0">
            {/* TOP MENU */}
            <SidebarMenu className="!border-0">
              {items.map((item, i) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem className="py-1 !border-0" key={i}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={
                        isActive
                          ? "bg-slate-blue rounded-lg text-primary !border-0"
                          : "!border-0"
                      }
                    >
                      <Link href={item.url}>
                        <p className={`${item.color} h-5 w-5 rounded-full`}>
                          {" "}
                          3
                        </p>

                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            {/* BOTTOM LOGOUT */}
            <SidebarMenu className="!border-0 hidden">
              <SidebarMenuItem className="!border-0">
                <SidebarMenuButton
                  asChild
                  tooltip="Logout"
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer pb-10 !border-0"
                >
                  <div>
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
