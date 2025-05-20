"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import LoginForm from "@/app/(auth)/_components/LoginForm";
import calender from "../../assets/calendarSideBar.png";
import member from "../../assets/memberSideBar.png";
import board from "../../assets/boardSideBar.png";
import folder from "../../assets/folderSidBar.png";
import report from "@/assets/report.png";

import logo from "@/public/image/Zentrio-Logo.png";

import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Test",
    url: "/test",
    icon: report,
  },
  {
    title: "Board",
    url: "/",
    icon: board,
  },
  {
    title: "Document",
    url: "/",
    icon: folder,
  },

  {
    title: "Calendar",
    url: "#",
    icon: calender,
  },
  {
    title: "Members",
    url: "#",
    icon: member,
  },
  {
    title: "Reports",
    url: "#",

    icon: report,
  },
];

export function SidebarTest() {
  return (
    <Sidebar>
      <SidebarContent>
        <div className="  p-4">
          <Image src={logo} className=" w-[168px] object-cover" alt="logo" />
        </div>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="py-1" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <Image
                        src={item.icon}
                        className=" w-[18px] object-cover"
                        alt="logo"
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
