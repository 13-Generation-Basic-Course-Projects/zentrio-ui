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
import member from "../../assets/memberSidebar.png";
import board from "../../assets/boardSideBar.png";
import folder from "../../assets/folderSidBar.png";
import report from "@/assets/report.png";
import { LeaveIcon } from "../icon/everyicon";
import ModalLeave from "../modal/ModalLeave";
import LeaveButton from "../button/LeaveButton";

const items = [
  {
    title: "Board",
    url: "/dashboard/1/1/board",
    icon: board,
    activeIcon: board,
  },
  {
    title: "Document",
    url: "/dashboard/1/1/docu",
    icon: folder,
    activeIcon: folder,
  },
  {
    title: "Calendar",
    url: "/dashboard/1/1/calendar",
    icon: calender,
    activeIcon: calender,
  },
  {
    title: "Members",
    url: "/dashboard/1/1/member",
    icon: member,
    activeIcon: member,
  },
  {
    title: "Reports",
    url: "/dashboard/1/1/report",
    icon: report,
    activeIcon: report,
  },
  // {
  //   title: "nh test lg lg 1 auth",
  //   url: "/test",
  //   icon: report,
  //   activeIcon: report,
  // },
];

export default function DashbaordSideBar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-none  ">
      <SidebarContent className="h-screen flex flex-col !border-0">
        <div className="p-4 !border-0 ">
          <Link href="/workspace">
            <Image src={logo} className="w-[168px] object-cover" alt="logo" />
          </Link>
        </div>

        <SidebarGroup className="flex-1 flex flex-col !border-0">
          <SidebarGroupContent className="flex-1 flex flex-col justify-between !border-0">
            {/* TOP MENU */}
            <SidebarMenu className="!border-0">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem className="py-1 !border-0" key={item.title}>
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
                        <Image
                          src={isActive ? item.activeIcon : item.icon}
                          className="w-[18px] object-cover"
                          alt={`${item.title} icon`}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            {/* BOTTOM LOGOUT */}
            <SidebarMenu className="!border-0">
              <SidebarMenuItem className="!border-0">
                <SidebarMenuButton
                  asChild
                  tooltip="Logout"
                  className="flex items-center gap-2 px-4 cursor-pointer pb-10 !border-0"
                >
                  <div className=" ">
                    <ModalLeave
                      massageTitle={"Are you sure?"}
                      massageBody={"You want to leave this board “Zin two"}
                      massageUndo={"No, cancel"}
                      massageDo={"Yes, Leave"}
                      action={[<LeaveButton />]}
                    />
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
