"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import calender from "../../assets/calendarSidebar.png";
import member from "../../assets/memberSideBar.png";
import board from "../../assets/boardSideBar.png";
import folder from "../../assets/folderSidBar.png";
import report from "@/assets/report.png";
import ModalLeave from "../modal/ModalLeave";
import LeaveButton from "../button/LeaveButton";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [role, setRole] = useState("pm"); // default fallback role

  // On mount, set role once from URL
  useEffect(() => {
    const initialRole = searchParams.get("role");
    if (initialRole) {
      setRole(initialRole);
    }
  }, []);

  const pathSegments = pathname.split("/");
  const workspaceId = pathSegments[2] || "1";
  const projectId = pathSegments[3] || "1";

  const isTl = role === "tl";

  const items = [
    {
      title: "Board",
      url: `/dashboard/${workspaceId}/${projectId}/board?role=${role}`,
      icon: board,
      activeIcon: board,
    },
    {
      title: "Document",
      url: `/dashboard/${workspaceId}/${projectId}/docu?role=${role}`,
      icon: folder,
      activeIcon: folder,
    },
    {
      title: "Calendar",
      url: `/dashboard/${workspaceId}/${projectId}/calendar?role=${role}`,
      icon: calender,
      activeIcon: calender,
    },
    {
      title: "Members",
      url: `/dashboard/${workspaceId}/${projectId}/member?role=${role}`,
      icon: member,
      activeIcon: member,
    },
    {
      title: "Reports",
      url: `/dashboard/${workspaceId}/${projectId}/report?role=${role}`,
      icon: report,
      activeIcon: report,
    },
  ];

  const filteredItems = isTl
    ? items.filter((item) => item.title !== "Reports")
    : items;

  return (
    <Sidebar collapsible="icon" className="border-none  rounded-tr-3xl bg-white">
      <SidebarContent className="h-screen flex flex-col !border-0  rounded-tr-xl">
        <div className="p-4 !border-0 flex justify-between items-center">
          <Link href="/workspace">
            <Image src={logo} className="w-[168px] object-cover" alt="logo" />
          </Link>
          <SidebarTrigger  />
        </div>
        
        <SidebarGroup className="flex-1 flex flex-col !border-0">
          <SidebarGroupContent className="flex-1 flex flex-col justify-between !border-0">
            {/* TOP MENU */}
            {/* <SidebarMenu className="!border-0">
              {filteredItems.map((item) => {
                const isActive = pathname === item.url.split("?")[0]; // compare path only
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
            </SidebarMenu> */}
            <SidebarMenu className="!border-0">
              {filteredItems.map((item) => {
                const isActive = pathname === item.url.split("?")[0]; // compare path only
                return (
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`${
                      isActive
                        ? "bg-slate-blue text-primary hover:text-primary"
                        : ""
                    }`}
                    style={{ borderRadius: "0.5rem" }} // 8px = rounded-lg
                  >
                    <Link href={item.url} style={{ borderRadius: "0.5rem" }}>
                      <Image
                        src={isActive ? item.activeIcon : item.icon}
                        className="w-[18px] object-cover"
                        alt={`${item.title} icon`}
                      />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                );
              })}
            </SidebarMenu>

            {/* LOGOUT */}
            <SidebarMenu className="!border-0">
              <SidebarMenuItem className="!border-0">
                <SidebarMenuButton
                  asChild
                  tooltip="Logout"
                  className="flex items-center gap-2 px-4 cursor-pointer pb-10 !border-0"
                >
                  <div>
                    <ModalLeave
                      massageTitle={"Are you sure?"}
                      massageBody={"You want to leave this board “Zin two"}
                      massageUndo={"No, cancel"}
                      massageDo={"Yes, Leave"}
                      action={[<LeaveButton key="leave-button" />]}
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
