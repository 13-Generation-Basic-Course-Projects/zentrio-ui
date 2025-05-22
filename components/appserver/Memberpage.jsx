"use client";

import {useState} from "react"; 
import React from "react";
import iconSearch from "@/assets/search.png";
import icon1 from "@/assets/icon1.png";
import arrowdown from "@/assets/arrow-down.png";
import member from "@/assets/memberSideBar.png";
import threeDot from "@/assets/threeDot.png";
import iconDelete from "@/assets/delete.png";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import Image from "next/image";

export default function Memberpage() {
  const members = [
    {
      memberId: "24a8a3b8-2ad0-4dbc-a6b8-15362b1dfa1f",
      username: "Ly fong",
      gender: "Male",
      email: "user@gmail.com",
      roleName: "ROLE_MANAGER",
      task: "Front-End Dev",
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "d0a09f3b-843d-4f7b-8bc6-e3cc45068f1c",
      username: "Leang Chhengleap",
      gender: "Female",
      email: "user@gmail.com",
      roleName: "ROLE_MEMBER",
      task: ["Back-End Dev","UX/UI Design", "front-End Dev"],
      profileImage:
        "https://i.pinimg.com/736x/d7/1d/d0/d71dd0393476651ec883eb5ee6bb10ea.jpg",
    },
    {
      memberId: "d0c8552f-14b7-4b88-a764-f014786868c1",
      username: "Roskan",
      gender: "Male",
      email: "user@gmail.com",
      roleName: "ROLE_LEADER",
      task: ["Front-End Dev", "UI Fixes"],
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0001-0001-0001-000000000001",
      username: "Mony Visa",
      gender: "Male",
      email: "user1@gmail.com",
      roleName: "ROLE_MEMBER",
      task: "Checklist",
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0002-0002-0002-000000000002",
      username: "Chann Theara",
      gender: "Female",
      email: "user@gmail.com",
      roleName: "ROLE_MEMBER",
      task: "Back-End Dev",
      profileImage:
        "https://i.pinimg.com/736x/d7/1d/d0/d71dd0393476651ec883eb5ee6bb10ea.jpg",
    },
    {
      memberId: "1a2b3c4d-0003-0003-0003-000000000003",
      username: "Fanau",
      gender: "Male",
      email: "user1@gmail.com",
      roleName: "ROLE_MEMBER",
      task: "Checklist",
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0004-0004-0004-000000000004",
      username: "Cheaminh",
      gender: "Male",
      email: "user1@gmail.com",
      roleName: "ROLE_MEMBER",
      task: "Checklist",
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0005-0005-0005-000000000005",
      username: "Davit",
      gender: "Male",
      email: "user1@gmail.com",
      roleName: "ROLE_MEMBER",
      task: "Checklist",
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0006-0006-0006-000000000006",
      username: "Senghun",
      gender: "Male",
      email: "user1@gmail.com",
      roleName: "ROLE_MEMBER",
      task: "Checklist",
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
  ];
  

  return (
    <div className="p-6 space-y-4">
      <nav className="text-h6 text-[#94A3B8]">
        <ol className="flex space-x-2">
          <li>
            <a href="#" className=" hover:text-blueActive">
              Workspace
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-blueActive">
              Hikoko Design
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className=" hover:text-blueActive">
              Member
            </a>
          </li>
        </ol>
      </nav>

      <header className="text-h1 text-titles font-semibold">
        <p>Members</p>
      </header>
      <div className="flex flex-row justify-between ">
        <div className="flex items-center w-[600px] h-[45px] border border-gray-200 rounded-[16px] shadow-sm overflow-hidden bg-white text-input text-title">
          <div className="relative flex items-center gap-1 px-3 border-r border-gray-200">
            <div className="w-[16px] h-[16px]">
              <Image src={icon1} alt="filter" />
            </div>

            <select className="bg-transparent outline-none text-sm cursor-pointer appearance-none w-auto">
              <option value="all">All</option>
              <option value="week">Last week</option>
              <option value="month">Last month</option>
              <option value="year">Last year</option>
            </select>

            <div className="absolute right-2 pointer-events-none w-[10px] h-[6px]">
              <Image
                src={arrowdown}
                alt="dropdown arrow"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="flex items-center px-2 ">
            <Image src={iconSearch} />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-full px-2 bg-white text-gray-700 outline-none placeholder-gray-400"
          />
        </div>
        <Button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[8px] shadow-sm hover:bg-gray-100">
          <Image src={member} alt="Member Icon" className="w-4 h-4" />
          invite
        </Button>
      </div>

      {/* Member table */}
      <section>
        <div className="relative overflow-x-auto mt-10">
          <table className="w-full text-h6 text-left rtl:text-right text-title">
            <thead className="text-h6 text-[#64748B] bg-primary/20">
              <tr>
                <th className="px-6 py-3 rounded-s-lg">No.</th>
                <th className="px-6 py-3">Member Name</th>
                <th className="px-6 py-3">Gender</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Current Task</th>
                <th className="px-6 py-3 rounded-e-lg"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, index) => (
                <tr key={member.memberId} className="bg-white dark:bg-gray-800">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <img
                      src={member.profileImage}
                      alt={`${member.name}'s profile`}
                      className="rounded-full w-[50px] h-[50px] bg-cover"
                    />
                    {member.username}
                  </td>
                  <td className="px-6 py-4">{member.gender}</td>
                  <td className="px-6 py-4">{member.email}</td>
                  <td className="px-6 py-4">{member.roleName}</td>

                  <td className="px-6 py-4">
                    {Array.isArray(member.task) ? (
                      <div className="relative">
                        <div className="flex items-center gap-4">
                          {member.task[0]}
                          {member.task.length > 1 && (
                            <Popover>
                              <PopoverTrigger className="cursor-pointer">
                                <Image src={arrowdown} alt="Show more tasks" />
                              </PopoverTrigger>
                              <PopoverContent className="text-h6 bg-white border shadow-lg p-4 ">
                                <div className="text-left space-y-2">
                                  {member.task.map((task, i) => (
                                    <div key={i}>{task}</div>
                                  ))}
                                </div>
                              </PopoverContent>
                            </Popover>
                          )}
                        </div>
                      </div>
                    ) : (
                      member.task
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <Popover
                      showArrow
                      backdrop="opaque"
                      offset={10}
                      placement="bottom"
                    >
                      <PopoverTrigger className="cursor-pointer ">
                        <span>
                          <Image
                            src={threeDot}
                            alt="more actions"
                            className="w-[3px] h-[15px]"
                          />
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="w-[150px]">
                        <div className="px-1 py-2 w-full">
                          <div className="flex items-center gap-2 text-small font-normal text-title ">
                            <Image
                              src={iconDelete}
                              alt="Delete icon"
                              className="w-[15px] h-[15px]"
                            />

                            <span>
                              <button>Delete</button>
                            </span>
                          </div>
                          <div className="mt-2 flex flex-col gap-2 w-full"></div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
