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

import calender from "../../assets/calendarSideBar.png";
import member from "../../assets/memberSideBar.png";
import board from "../../assets/boardSideBar.png";
import folder from "../../assets/folderSidBar.png";
import report from "@/assets/report.png";
import Link from "next/link";

// Add activeIcon for visual state
const items = [
  {
    title: "Test",
    url: "/test",
    icon: report,
    activeIcon: report,
  },
  {
    title: "Board",
    url: "/",
    icon: board,
    activeIcon: board,
  },
  {
    title: "Document",
    url: "/docs",
    icon: folder,
    activeIcon: folder,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: calender,
    activeIcon: calender,
  },
  {
    title: "Members",
    url: "/members",
    icon: member,
    activeIcon: member,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: report,
    activeIcon: report,
  },
];

export function SidebarTest() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-none ">
      <SidebarContent>
        <div className="border-0  p-4">
          <Image src={logo} className="w-[168px] object-cover" alt="logo" />
        </div>
        <SidebarGroup className="border-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem className="py-1" key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={
                          isActive
                            ? "bg-slate-blue rounded-lg  text-primary"
                            : ""
                        }
                      >
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
