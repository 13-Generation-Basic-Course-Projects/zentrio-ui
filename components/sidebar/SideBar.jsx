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
            stroke={active ? "#59BAD5" : "#787486"}
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
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.72482 16.6811H9.93348C10.2374 16.6811 10.4837 16.9548 10.4837 17.2924C10.4837 17.6301 10.2374 17.9038 9.93348 17.9038H4.72482C2.83437 17.8993 1.30287 16.1976 1.29884 14.0971V6.04365C1.29689 5.0319 1.65675 4.06074 2.29924 3.34379C2.94174 2.62685 3.81424 2.22286 4.72482 2.2207H7.55657C8.62215 2.2207 9.48598 3.18051 9.48598 4.36449C9.48996 4.87135 9.85879 5.28116 10.315 5.28558H13.1467C15.0372 5.29007 16.5687 6.99174 16.5727 9.09223C16.5769 9.43719 16.3328 9.72294 16.0225 9.73618C15.8786 9.74285 15.7386 9.68397 15.6347 9.57318C15.5308 9.46238 15.4722 9.30927 15.4723 9.14929C15.4821 8.45544 15.2419 7.78603 14.8051 7.29001C14.3683 6.794 13.7712 6.51254 13.1467 6.50828H10.315C9.24938 6.50828 8.38556 5.54847 8.38556 4.36449C8.37371 3.86401 8.00715 3.46392 7.55657 3.4597H4.72482C3.44045 3.4597 2.39926 4.61657 2.39926 6.04365V14.0971C2.39926 15.5242 3.44045 16.6811 4.72482 16.6811Z"
          fill={active ? "#59BAD5" : "#787486"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.4989 9.19005H13.917C14.3625 9.18132 14.7925 9.37128 15.111 9.71747C15.4294 10.0637 15.6098 10.5372 15.6117 11.0322V11.5947C15.6117 12.7426 14.7741 13.6732 13.7409 13.6732C12.7078 13.6732 11.8702 12.7426 11.8702 11.5947V11.0322C11.8701 10.0274 12.5947 9.20783 13.4989 9.19005ZM13.7116 12.4506C14.137 12.4506 14.4819 12.0674 14.4819 11.5947V11.0322C14.4779 10.6888 14.2261 10.4127 13.917 10.4127H13.4989C13.1909 10.4127 12.9413 10.6901 12.9413 11.0322V11.5947C12.9413 12.0674 13.2862 12.4506 13.7116 12.4506Z"
          fill={active ? "#59BAD5" : "#787486"}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0101 14.0971C15.7283 14.1129 16.3393 14.6832 16.4773 15.4665L16.5434 15.8415C16.6387 16.3622 16.5204 16.903 16.2206 17.3169C15.9407 17.7053 15.5166 17.9304 15.0688 17.9282H12.3471C11.9019 17.9279 11.4809 17.703 11.2026 17.3169C10.8973 16.9059 10.7759 16.3635 10.8725 15.8415L10.9459 15.4665C11.0813 14.6816 11.6938 14.1099 12.4131 14.0971H15.0101ZM15.0688 16.7055C15.1851 16.7001 15.2941 16.641 15.3696 16.5425C15.4587 16.4125 15.4934 16.2463 15.4649 16.086L15.3989 15.7111C15.365 15.494 15.2007 15.3318 15.0028 15.3198H12.4131C12.2168 15.3325 12.055 15.4953 12.0243 15.7111L11.9583 16.086C11.9221 16.2464 11.9576 16.4163 12.0536 16.5425C12.1243 16.6432 12.2322 16.7031 12.3471 16.7055H15.0688Z"
          fill={active ? "#59BAD5" : "#787486"}
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
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.6747 3.33398C15.2914 3.33398 16.5914 4.64232 16.5914 6.25065C16.5914 7.82565 15.3414 9.10898 13.7831 9.16732C13.7164 9.15898 13.6414 9.15898 13.5664 9.16732"
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.46758 12.134C1.45091 13.484 1.45091 15.684 3.46758 17.0256C5.75924 18.559 9.51758 18.559 11.8092 17.0256C13.8259 15.6757 13.8259 13.4757 11.8092 12.134C9.52591 10.609 5.76758 10.609 3.46758 12.134Z"
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.2832 16.666C15.8832 16.541 16.4499 16.2993 16.9165 15.941C18.2165 14.966 18.2165 13.3577 16.9165 12.3827C16.4582 12.0327 15.8999 11.7993 15.3082 11.666"
            stroke={active ? "#59BAD5" : "#787486"}
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
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.66602 1.66602L18.3327 1.66602"
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 18L7.75 15L10 13"
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 18V13"
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M6 10V6"
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M10 10V4"
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14 10V8"
            stroke={active ? "#59BAD5" : "#787486"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M16 18L10 13"
            stroke={active ? "#59BAD5" : "#787486"}
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
                      } py-5 px-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!px-2`}
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