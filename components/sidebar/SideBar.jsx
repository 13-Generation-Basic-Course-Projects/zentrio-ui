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
import calender from "../../assets/calendarSideBar.png";
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
      activeIcon: (active) => (
        <svg
          width={22}
          height={22}
          viewBox="0 0 17 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 6.77778H2.5M14.5 6.77778C15.3284 6.77778 16 7.42448 16 8.22222V11.1111C16 12.7066 14.6569 14 13 14H4C2.34315 14 1 12.7066 1 11.1111V8.22222C1 7.42448 1.67157 6.77778 2.5 6.77778M14.5 6.77778V5.33333C14.5 4.53559 13.8284 3.88889 13 3.88889M2.5 6.77778V5.33333C2.5 4.53559 3.17157 3.88889 4 3.88889M13 3.88889H4M13 3.88889V2.44444C13 1.6467 12.3284 1 11.5 1H5.5C4.67157 1 4 1.6467 4 2.44444V3.88889M7 8.94444H10"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Calendar",
      url: `/dashboard/${workspaceId}/${projectId}/calendar?role=${role}`,
      icon: calender,
      activeIcon: (active) => (
        <svg
           width={22}
          height={22}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66675 1.6665V4.1665"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.3333 1.6665V4.1665"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.91675 7.5752H17.0834"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 7.08317V14.1665C17.5 16.6665 16.25 18.3332 13.3333 18.3332H6.66667C3.75 18.3332 2.5 16.6665 2.5 14.1665V7.08317C2.5 4.58317 3.75 2.9165 6.66667 2.9165H13.3333C16.25 2.9165 17.5 4.58317 17.5 7.08317Z"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.0788 11.4167H13.0863"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.0788 13.9167H13.0863"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99632 11.4167H10.0038"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99632 13.9167H10.0038"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.91185 11.4167H6.91933"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.91185 13.9167H6.91933"
            stroke={active ? "#59BAD5" : "#143A47"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
     {
      title: "Document",
      url: `/dashboard/${workspaceId}/${projectId}/docu?role=${role}`,
      icon: folder,
      activeIcon: (active) => (
     <svg
  width={22}
  height={22}
  viewBox="0 0 22 22"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M0.992188 7.08951V14.4119C0.992188 15.4646 1.40563 16.4742 2.14156 17.2186C2.87748 17.963 3.87562 18.3812 4.91638 18.3812H8.84057H10.4922M0.992188 7.08951V5.47698C0.992188 4.68744 1.30227 3.93023 1.85421 3.37194C2.40616 2.81365 3.15476 2.5 3.93533 2.5H6.78037C7.10247 2.49994 7.42143 2.56406 7.71904 2.68869C8.01665 2.81332 8.28707 2.99603 8.51486 3.22638L10.0669 4.79624M0.992188 7.08951H6.78429C7.1064 7.08957 7.42536 7.02546 7.72297 6.90082C8.02057 6.77619 8.29099 6.59348 8.51878 6.36313L10.0669 4.79624M19.1416 8.76555C19.1416 7.71283 18.7281 6.70322 17.9922 5.95883C17.2563 5.21444 16.2581 4.79624 15.2174 4.79624H10.0669"
    stroke={active ? "#59BAD5" : "black"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M17.0078 11.002C18.1145 11.002 19.0078 11.8953 19.0078 13.002C19.0078 14.1086 18.1145 15.002 17.0078 15.002C15.9011 15.002 15.0078 14.1086 15.0078 13.002C15.0078 11.8953 15.9011 11.002 17.0078 11.002Z"
    stroke={active ? "#59BAD5" : "black"}
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <path
    d="M21.0078 18.3C21.0078 17.7 19.2935 16.5 17.0078 16.5C14.7221 16.5 13.0078 17.7 13.0078 18.3C13.0078 18.3 13.0078 19.5 17.0078 19.5C21.0078 19.5 21.0078 18.3 21.0078 18.3Z"
    stroke={active ? "#59BAD5" : "black"}
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>



    ),
    },
    {
      title: "Members",
      url: `/dashboard/${workspaceId}/${projectId}/member?role=${role}`,
      icon: member,
      activeIcon: (active) => (
        <svg
          width={22}
        height={22}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.63412 9.05768C7.55078 9.04935 7.45078 9.04935 7.35912 9.05768C5.37578 8.99102 3.80078 7.36602 3.80078 5.36602C3.80078 3.32435 5.45078 1.66602 7.50078 1.66602C9.54245 1.66602 11.2008 3.32435 11.2008 5.36602C11.1924 7.36602 9.61745 8.99102 7.63412 9.05768Z"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.6747 3.33398C15.2914 3.33398 16.5914 4.64232 16.5914 6.25065C16.5914 7.82565 15.3414 9.10898 13.7831 9.16732C13.7164 9.15898 13.6414 9.15898 13.5664 9.16732"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.46758 12.134C1.45091 13.484 1.45091 15.684 3.46758 17.0256C5.75924 18.559 9.51758 18.559 11.8092 17.0256C13.8259 15.6757 13.8259 13.4757 11.8092 12.134C9.52591 10.609 5.76758 10.609 3.46758 12.134Z"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.2832 16.666C15.8832 16.541 16.4499 16.2993 16.9165 15.941C18.2165 14.966 18.2165 13.3577 16.9165 12.3827C16.4582 12.0327 15.8999 11.7993 15.3082 11.666"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Reports",
      url: `/dashboard/${workspaceId}/${projectId}/report?role=${role}`,
      icon: report,
      activeIcon: (active) => (
        <svg
         width={22}
        height={22}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.925 12.4993H15.0833C16.6667 12.4993 17.5 11.7771 17.5 10.4049V1.66602H2.5V10.4049C2.50833 11.7771 3.34167 12.4993 4.925 12.4993Z"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.66602 1.66602L18.3327 1.66602"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 18L7.75 15L10 13"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 18V13"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6 10V6"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10 10V4"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14 10V8"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M16 18L10 13"
            stroke={active ? "#59BAD5" : "black"}
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const filteredItems = isTl
    ? items.filter((item) => item.title !== "Reports")
    : items;

  return (
    <Sidebar collapsible="icon" className="border-none rounded-tr-3xl bg-white">
      <SidebarContent className="h-screen flex flex-col !border-0 rounded-tr-xl">
        <div className="p-4 !border-0 flex justify-between items-center">
          <Link href="/workspace">
            <Image src={logo} className="w-[118px] object-cover" alt="logo" />
          </Link>
          <SidebarTrigger />
        </div>

        <SidebarGroup className="flex-1 flex flex-col !border-0">
          <SidebarGroupContent className="flex-1 flex flex-col justify-between !border-0">
            {/* TOP MENU */}
            <SidebarMenu className="!border-0">
              {filteredItems.map((item) => {
                const isActive = pathname === item.url.split("?")[0]; // compare path only
                return (
                  <SidebarMenuItem className="py-1 !border-0" key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={`${
                        isActive
                          ? "bg-slate-blue text-primary hover:text-primary "
                          : ""
                      } py-5 px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!px-5 group-data-[collapsible=icon]:!py-5`}
                      style={{ borderRadius: "0.5rem" }}
                    >
                      <Link href={item.url} style={{ borderRadius: "0.5rem" }} className="flex items-center justify-start group-data-[collapsible=icon]:justify-center w-full">
                        {typeof item.activeIcon === "function" ? (
                          <div className="flex items-center justify-center min-w-[22px]">
                            {item.activeIcon(isActive)}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center min-w-[22px]">
                            <Image
                              src={isActive ? item.activeIcon : item.icon}
                              className="w-[18px] object-cover"
                              alt={`${item.title} icon`}
                            />
                          </div>
                        )}
                        <span className="pl-3 group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>

            {/* LOGOUT */}
            <SidebarMenu className="!border-0">
              <SidebarMenuItem className="!border-0">
                <SidebarMenuButton
                  asChild
                  tooltip="Logout"
                  className="flex items-center gap-2 px-4 cursor-pointer pb-10 !border-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!px-2"
                >
                  <div className="flex items-center justify-start group-data-[collapsible=icon]:justify-center w-full">
                    <ModalLeave
                      massageTitle={"Are you sure?"}
                      massageBody={"You want to leave this board Zin two"}
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