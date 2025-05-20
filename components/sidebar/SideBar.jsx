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
import { LeaveIcon } from "../icon/everyicon";
// Add activeIcon for visual state
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
  {
    title: "nh test lg lg 1 auth",
    url: "/test",
    icon: report,
    activeIcon: report,
  },
];

export function SidebarTest() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-none ">
      <SidebarContent className="h-screen flex flex-col">
        <div className="p-4">
          <Image src={logo} className="w-[168px] object-cover" alt="logo" />
        </div>

        <SidebarGroup className="flex-1 flex flex-col">
          <SidebarGroupContent className="flex-1 flex flex-col justify-between ">
            {/* TOP MENU */}
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
                            ? "bg-slate-blue rounded-lg text-primary"
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

            {/* BOTTOM LOGOUT */}
            <SidebarMenu>
              <div className="flex items-center gap-2 px-4 py-2 cursor-pointer pb-10">
                <LeaveIcon strokwidth={2} size={4} color={"red"} />
                <span className="text-red-500 font-medium">Logout</span>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
