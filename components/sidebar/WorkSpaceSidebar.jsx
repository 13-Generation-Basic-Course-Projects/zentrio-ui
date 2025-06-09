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
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { LeaveIcon } from "../icon/everyicon";
import SaveWorkspace from "../button/SaveWorkspace";
import ModalCreateWorkspace from "../modal/ModalCreateWorkspace";
import ModalOptionWorkspace from "../modal/workspace/ModalOptionWorkspace";
import { Button } from "@heroui/react";
import { useState } from "react";

export default function WorkSpaceSideBar({
  workspaceData,
  workspaceUsersData,
  createWorkspace,
  deleteWorkspace,
  updateNameWorkspace,
}) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  const [selectedId, setSelectedId] = useState("");

  return (
    <Sidebar
      collapsible="icon"
      className="border-none rounded-tr-2xl bg-white  "
    >
      <SidebarContent className="h-screen flex flex-col !border-0  overflow-hidden ">
        <div className="p-4 !border-0 flex justify-between items-center ">
          <Link href="/">
            <Image src={logo} className="w-[118px] object-cover" alt="logo" />
          </Link>
          <Button
            isIconOnly
            onClick={toggleSidebar}
            className=" hidden bg-transparent min-w-fit w-fit h-fit rounded-none !px-0 !py-0"
          >
            <svg
              width="22"
              height="25"
              viewBox="0 0 25 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.96522 5.52079C5.12183 5.52079 4.31298 5.85583 3.71662 6.45219C3.12025 7.04856 2.78522 7.8574 2.78522 8.70079V19.2992C2.78522 20.1426 3.12025 20.9514 3.71662 21.5478C4.31298 22.1442 5.12183 22.4792 5.96522 22.4792H7.71842V5.52079H5.96522ZM5.96522 3.40039C4.55978 3.40039 3.21191 3.9587 2.21812 4.95249C1.22432 5.94628 0.666016 7.29416 0.666016 8.69959V19.2992C0.665858 19.9952 0.80281 20.6844 1.06905 21.3275C1.33529 21.9705 1.7256 22.5549 2.21769 23.0471C2.70978 23.5393 3.29402 23.9297 3.93702 24.1961C4.58003 24.4625 5.26921 24.5996 5.96522 24.5996H19.3668C20.0629 24.5996 20.7522 24.4624 21.3953 24.196C22.0384 23.9295 22.6227 23.539 23.1148 23.0466C23.6069 22.5543 23.9972 21.9698 24.2633 21.3266C24.5295 20.6834 24.6663 19.9941 24.666 19.298V8.69959C24.666 7.29416 24.1077 5.94628 23.1139 4.95249C22.1201 3.9587 20.7723 3.40039 19.3668 3.40039H5.96522ZM9.83882 5.52079V22.4792H19.3668C20.2102 22.4792 21.019 22.1442 21.6154 21.5478C22.2118 20.9514 22.5468 20.1426 22.5468 19.2992V8.69959C22.5468 7.8562 22.2118 7.04736 21.6154 6.45099C21.019 5.85463 20.2102 5.51959 19.3668 5.51959H9.83882V5.52079Z"
                fill="#59BAD5"
              />
            </svg>
          </Button>
          {/* <SidebarTrigger /> */}
        </div>

        <SidebarGroup className="flex flex-col flex-1 !border-0 px-5 overflow-y-auto scrollbar-hidden">
          <SidebarGroupContent className="flex flex-col flex-1 !border-0 gap-6">
            {/* TOP + MIDDLE MENU Combined */}
            <SidebarMenu className="space-y-1 flex flex-col gap-2 !border-0">
              <SaveWorkspace />
              {/* 1 */}
              <div className="flex items-center justify-between">
                <p className="  text-body-sm  font-extrabold">My Workspace</p>
                <ModalCreateWorkspace createWorkspace={createWorkspace} />
              </div>
              {Array.isArray(workspaceData.payload) &&
                workspaceData.payload
                  .slice() // create a copy to avoid mutating original array
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by createdAt descending
                  .map((item, i) => {
                    const isActive = pathname.includes(item?.workspaceId);
                    return (
                      <SidebarMenuItem key={i} className="!border-0 p-0">
                        <SidebarMenuButton
                          style={{ borderRadius: "0.5rem" }}
                          asChild
                          tooltip={item?.title || "Untitled Workspace"}
                          className={`group flex w-full items-center justify-between rounded-lg transition-colors duration-200 p-0
                            ${
                              isActive
                                ? "bg-slate-100 text-gray-700"
                                : "hover:bg-slate-100 text-gray-700"
                            }`}
                        >
                          <div className="flex items-center justify-between w-full gap-2">
                            {item?.workspaceId ? (
                              <Link
                                href={`/workspace/${item.workspaceId}`}
                                className="flex items-center gap-2 flex-1 overflow-hidden"
                              >
                                <span
                                  style={{ backgroundColor: "#59BAD5" }}
                                  className="h-5 w-5 rounded-full inline-block flex-shrink-0"
                                />
                                <span className="truncate text-left sm:text-body-sm text-gray-800">
                                  {item?.title || "Untitled Workspace"}
                                </span>
                              </Link>
                            ) : (
                              <div className="flex items-center gap-2 flex-1 overflow-hidden">
                                <span
                                  style={{ backgroundColor: "#59BAD5" }}
                                  className="h-5 w-5 rounded-full inline-block flex-shrink-0"
                                />
                                <span className="truncate text-left sm:text-body-sm text-gray-800">
                                  {item?.title || "Invalid Workspace"}
                                </span>
                              </div>
                            )}

                            {/* Options Menu */}
                            <ModalOptionWorkspace
                              workspaceTitle={item?.title}
                              workspaceId={item?.workspaceId}
                              deleteWorkspace={deleteWorkspace}
                              updateNameWorkspace={updateNameWorkspace}
                              selectedId={selectedId}
                              setSelectedId={setSelectedId}
                            />
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}

              {/* 2 */}
              <p className="text-body-sm  font-extrabold">Other Workspace</p>
              {Array.isArray(workspaceUsersData.payload) &&
                workspaceUsersData.payload.map((item, i) => {
                  const isActive = pathname.includes(item?.workspaceId);
                  // For shared workspaces, assign color by index
                  const colorClass =
                    workspaceColors[item.workspaceId] ||
                    colorOptions[i % colorOptions.length].className;
                  const activeColorClass =
                    activeColorMap[colorClass] || "bg-slate-blue text-primary";
                  return (
                    <SidebarMenuItem key={i} className="!border-0 p-0 hidden">
                      <SidebarMenuButton
                        style={{ borderRadius: "0.5rem" }}
                        asChild
                        tooltip={item?.title || "Untitled Workspace"}
                        className={`group flex w-full items-center justify-between rounded-lg transition-colors duration-200 p-0
                          ${
                            isActive
                              ? "bg-slate-100 text-gray-700"
                              : "hover:bg-slate-100 text-gray-700"
                          }`}
                      >
                        <div className="flex items-center justify-between w-full gap-2">
                          {item?.workspaceId ? (
                            <Link
                              href={`/workspace/${item.workspaceId}`}
                              className="flex items-center gap-2 flex-1 overflow-hidden"
                            >
                              <span
                                className={`${colorClass} h-5 w-5 rounded-full inline-block flex-shrink-0`}
                              />
                              <span className="truncate text-left sm:text-body-sm text-gray-800">
                                {item?.title || "Untitled Workspace"}
                              </span>
                            </Link>
                          ) : (
                            <div className="flex items-center gap-2 flex-1 overflow-hidden">
                              <span
                                style={{ backgroundColor: "#59BAD5" }}
                                className="h-5 w-5 rounded-full flex-shrink-0"
                              />

                              {item?.workspaceId ? (
                                <Link
                                  href={`/workspace/${item.workspaceId}`}
                                  className="truncate text-left sm:text-body-sm text-gray-800 flex-1"
                                >
                                  {item?.title || "Untitled Workspace"}
                                </Link>
                              ) : (
                                <span className="truncate text-left sm:text-body-sm text-gray-800 flex-1">
                                  {item?.title || "Invalid Workspace"}
                                </span>
                              )}
                            </div>
                            {/* Right: Option menu */}
                            {item && (
                              <span>
                                <ModalOptionWorkspace
                                  workspaceUserTitle={item.title}
                                  workspaceUserId={item.workspaceId}
                                  deleteUserWorkspace={deleteWorkspace}
                                  updateNameUserWorkspace={updateNameWorkspace}
                                  selectedId={selectedId}
                                  setSelectedId={setSelectedId}
                                />
                              </span>
                            )}
                          </div>
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
      {/* Top-right pink blob for rounded corner */}
    </Sidebar>
  );
}
