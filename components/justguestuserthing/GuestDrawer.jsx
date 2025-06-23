import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Link,
  Tooltip,
  Avatar,
  AvatarGroup,
} from "@heroui/react";
import "./guestdrawer.css";

import Image from "next/image";
import fong from "@/public/image/fong.png";
import fanua from "@/public/image/fanau.png";
import theara from "@/public/image/theara.png";
import minh from "@/public/image/minh.png";
import leap from "@/public/image/leap.png";
import vid from "@/public/image/vit.png";
import skan from "@/public/image/skan.png";
import visa from "@/public/image/visa.png";
import hun from "@/public/image/senghun.png";

import hrd from "@/assets/about-us-image/LogoHRD.jpg";
import webcash from "@/assets/sponser/webcash.jpg";
import kosign from "@/assets/sponser/kosign.png";
import kb from "@/assets/sponser/kb.png";

export default function ZentrioDrawerCompo() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        color="primary"
        endContent={
          <svg
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.75 1.25a.75.75 0 1 0-1.5 0v.823l-.392.044c-.9.121-1.658.38-2.26.982s-.861 1.36-.982 2.26C.5 6.225.5 7.328.5 8.695v.11l.117 3.337c.121.9.38 1.658.982 2.26s1.36.861 2.26.982c.867.117 1.969.117 3.337.117h1.658l3.337-.117c.9-.121 1.658-.38 2.26-.982s.861-1.36.982-2.26c.117-.867.117-1.969.117-3.337v-.11l-.117-3.337c-.121-.9-.38-1.658-.982-2.26s-1.36-.861-2.26-.982l-.44-.048V1.25a.75.75 0 0 0-1.5 0v.756L8.853 2H7.195q-.78-.002-1.445.006zm4.5 3v-.744L8.798 3.5H7.25l-1.5.007v.743a.75.75 0 1 1-1.5 0v-.67l-.192.023c-.734.099-1.122.279-1.399.556s-.457.665-.556 1.399C2.002 6.313 2 7.315 2 8.75l.103 3.192c.099.734.279 1.122.556 1.399s.665.457 1.399.556c.755.101 1.756.103 3.192.103h1.548l3.192-.103c.734-.099 1.122-.279 1.399-.556s.457-.665.556-1.399c.102-.755.103-1.757.103-3.192l-.103-3.192c-.099-.734-.279-1.122-.556-1.399s-.665-.457-1.399-.556l-.241-.028v.675a.75.75 0 0 1-1.5 0zm-5 3.5a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0m0 3.5a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0M8 8.5A.75.75 0 1 0 8 7a.75.75 0 1 0 0 1.5m.75 2.75a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0M11.5 8.5a.75.75 0 1 0 0-1.5.75.75 0 1 0 0 1.5m.75 2.75a.75.75 0 1 1-1.5 0 .75.75 0 1 1 1.5 0"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
        }
        variant="flat"
        onPress={onOpen}
      >
        See Zentrio
      </Button>

      <Drawer
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-default-400"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
              </DrawerHeader>

              <DrawerBody className="pt-16">
                <div className="flex w-full justify-center items-center pt-4">
                  <img
                    alt="Zentrio Project Management System"
                    className="aspect-video w-full object-cover rounded-xl transition-transform duration-300 hover:scale-100"
                    height={300}
                    src="https://i.pinimg.com/736x/3f/03/e3/3f03e3729367070cc115dd539f3795f3.jpg"
                  />
                </div>

                <div className="flex flex-col gap-2 py-4">
                  <h1 className="text-2xl font-bold leading-7">
                    Zentrio Task Management System
                  </h1>
                  <p className="text-sm text-default-500">
                    Complete project management solution for teams
                  </p>

                  <div className="mt-4 flex flex-col gap-3">
                    {/* User Roles Section */}
                    <div className="flex gap-3 items-center">
                      <div className="flex-none border-1 border-default-200/50 rounded-small text-center w-11 overflow-hidden">
                        <div className="text-tiny bg-primary-100 py-0.5 text-primary-600">
                          Roles
                        </div>
                        <div className="flex items-center justify-center font-semibold text-medium h-6 text-primary-600">
                          3
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="text-medium text-foreground font-medium">
                          User Roles Available
                        </p>
                        <p className="text-small text-default-500">
                          Project Manager, Team Leader, Members
                        </p>
                      </div>
                    </div>

                    {/* Kanban Board Section */}
                    <div className="flex gap-3 items-center">
                      <div className="flex items-center justify-center border-1 border-default-200/50 rounded-small w-11 h-11">
                        <svg
                          className="text-default-500"
                          height="20"
                          viewBox="0 0 16 16"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3zm1 0v10h10V3H3z"
                            fill="currentColor"
                          />
                          <path
                            d="M5 5h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <Link
                          isExternal
                          showAnchorIcon
                          anchorIcon={
                            <svg
                              className="group-hover:text-inherit text-default-400 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                              fill="none"
                              height="16"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              width="16"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7 17 17 7M7 7h10v10" />
                            </svg>
                          }
                          className="group gap-x-0.5 text-medium text-foreground font-medium"
                          href="#kanban-board"
                        >
                          Kanban Board System
                        </Link>
                        <p className="text-small text-default-500">
                          Development LifeCycle Management
                        </p>
                      </div>
                    </div>

                    {/* About Section */}
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-medium font-medium">
                        About Zentrio
                      </span>
                      <div className="text-medium text-default-500 flex flex-col gap-2">
                        <p>
                          Zentrio is a comprehensive Task Management tool
                          designed for people who struggle to organize and track
                          their tasks.
                        </p>
                        <p>
                          The system helps teams gather all resources for their
                          projects, including documentation (Google Sheets,
                          Slides, and Docs), links to resources, task
                          visualization with calendars, and a complete Kanban
                          page management system.
                        </p>
                        <p>
                          Features include role-based access control, project
                          timeline visualization, comprehensive reporting,
                          achievement tracking, and real-time notifications for
                          task assignments and deadlines.
                        </p>
                        <p className="mt-4">
                          Built for teams who need{" "}
                          <Link className="text-default-700" href="#features">
                            structured project management
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    {/* Core Features */}
                    <div className="flex flex-col mt-4 gap-3 items-start">
                      <span className="text-small text-default-500">
                        Core Features
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-primary-50 text-primary-700 px-2 py-1 rounded-small text-tiny">
                          Kanban Board
                        </div>
                        <div className="bg-secondary-50 text-secondary-700 px-2 py-1 rounded-small text-tiny">
                          Calendar Integration
                        </div>
                        <div className="bg-success-50 text-success-700 px-2 py-1 rounded-small text-tiny">
                          Documentation
                        </div>
                        <div className="bg-warning-50 text-warning-700 px-2 py-1 rounded-small text-tiny">
                          Reports & Analytics
                        </div>
                        <div className="bg-danger-50 text-danger-700 px-2 py-1 rounded-small text-tiny">
                          Notifications
                        </div>
                      </div>
                    </div>

                    {/* Development Team */}
                    <div className="flex flex-col gap-2 py-4">
                      <div className="flex flex-col mt-4 gap-3 items-start">
                        <span className="text-small text-default-500">
                          Development Team
                        </span>

                        <div className="flex -space-x-4 rtl:space-x-reverse">
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={fong}
                            alt=""
                          />
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={fanua}
                            alt=""
                          />
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={theara}
                            alt=""
                          />
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={leap}
                            alt=""
                          />
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={visa}
                            alt=""
                          />
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={hun}
                            alt=""
                          />
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={skan}
                            alt=""
                          />
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={minh}
                            alt=""
                          />
                          <Image
                            className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 object-cover"
                            src={vid}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    {/* our supporter */}
                    <span className="text-small text-default-500">
                      Our Sponsers
                    </span>
                    <div
                      className="slider"
                      style={{
                        "--width": "100px",
                        "--high": "100px",
                        "--quantity": 5,
                      }}
                    >
                      <div className="list">
                        {[...Array(2)].map((_, i) => (
                          <React.Fragment key={i}>
                            <div className="item">
                              <Image src={hrd} alt="hrd" />
                            </div>
                            <div className="item">
                              <Image src={kosign} alt="kosing" />
                            </div>
                            <div className="item">
                              <Image src={webcash} alt="webcash" />
                            </div>
                            <div className="item">
                              <Image src={kb} alt="kb" />
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerBody>

              <DrawerFooter className="flex flex-col gap-1">
                <Link className="text-default-400" href="#tutorial" size="sm">
                  Start Tutorial
                </Link>
                <Link
                  className="text-default-400"
                  href="#documentation"
                  size="sm"
                >
                  View Documentation
                </Link>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
