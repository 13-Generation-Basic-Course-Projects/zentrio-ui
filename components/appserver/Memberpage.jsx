"use client";

import { useState, useRef } from "react";
import React from "react";
import Image from "next/image";
import iconSearch from "@/assets/search.png";
import icon1 from "@/assets/icon1.png";
import arrowdown from "@/assets/arrow-down.png";
import member from "@/assets/memberSideBar.png";
import ModalInviteMember from "../modal/ModalInviteMember";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useDraggable,
  Pagination,
} from "@heroui/react";
import BredCrum from "../bredcrum/MyBredcrum";
import Link from "next/link";
import PopupAction from "../popup/PopupAction";
import { IconpopupDelete } from "../icon/Iconpopup";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Memberpage({ boardId }) {
  const initialMembers = [
    {
      memberId: "24a8a3b8-2ad0-4dbc-a6b8-15362b1dfa1f",
      username: "Ly fong",
      gender: "Male",
      email: "fongly@gmail.com",
      roleName: ["Team Manger", "Team Leader", "Member"],
      task: [
        "Back-End Dev",
        "UX/UI remotedevelopers.io design",
        "Front-End Dev",
      ],
      profileImage:
        "https://i.pinimg.com/736x/3a/5e/92/3a5e9212dde4454a96b1503943176d8c.jpg",
    },
    {
      memberId: "d0a09f3b-843d-4f7b-8bc6-e3cc45068f1c",
      username: "Leang Chhengleap",
      gender: "Female",
      email: "chhengleap05@gmail.com",
      roleName: ["Team Leader", "Member"],
      task: ["Back-End Dev", "UX/UI design", "Front-End Dev"],
      profileImage:
        "https://i.pinimg.com/736x/72/5a/d7/725ad7a9f0edace87b3949e6202a3ae0.jpg",
    },
    {
      memberId: "d0c8552f-14b7-4b88-a764-f014786868c1",
      username: "Roskan",
      gender: "Male",
      email: "roskan213@gmail.com",
      roleName: ["Member"],
      task: ["Front-End Dev", "UX/UI design"],
      profileImage:
        "https://i.pinimg.com/736x/98/40/1a/98401adc9165a551483cd0b793b4a124.jpg",
    },
    {
      memberId: "1a2b3c4d-0001-0001-0001-000000000001",
      username: "Mony Visa",
      gender: "Male",
      email: "visa32@gmail.com",
      roleName: ["Member"],
      task: ["Front-End dev", "UX/UI design"],
      profileImage:
        "https://i.pinimg.com/736x/2c/93/d0/2c93d058c8f2c7301c26126e71847c23.jpg",
    },
    {
      memberId: "1a2b3c4d-0002-0002-0002-000000000002",
      username: "Chann Theara",
      gender: "Female",
      email: "theara078@gmail.com",
      roleName: ["Team Leader", "Member"],
      task: ["Back-End Dev", "Presentor"],
      profileImage:
        "https://i.pinimg.com/736x/d7/1d/d0/d71dd0393476651ec883eb5ee6bb10ea.jpg",
    },
    {
      memberId: "1a2b3c4d-0003-0003-0003-000000000003",
      username: "Fanau",
      gender: "Male",
      email: "fanau47@gmail.com",
      roleName: ["Team Manger", "Team Leader", "Member"],
      task: ["UX/UI design"],
      profileImage:
        "https://i.pinimg.com/736x/ae/7e/42/ae7e42961c6fb3ffd3c49b67cf544865.jpg",
    },
    {
      memberId: "1a2b3c4d-0004-0004-0004-000000000004",
      username: "Cheaminh",
      gender: "Male",
      email: "cheaminh8@gmail.com",
      roleName: ["Member"],
      task: ["Front-End dev", "Backup Slide"],
      profileImage:
        "https://i.pinimg.com/736x/f4/1a/09/f41a0938785fc0ee5802e2df16b5487a.jpg",
    },
    {
      memberId: "1a2b3c4d-0005-0005-0005-000000000005",
      username: "Davit",
      gender: "Male",
      email: "davit96@gmail.com",
      roleName: ["Member"],
      task: ["Back-End Dev"],
      profileImage:
        "https://i.pinimg.com/736x/bb/87/18/bb87180897cb4cb694cd692966a0ab15.jpg",
    },
    {
      memberId: "1a2b3c4d-0006-0006-0006-000000000006",
      username: "Senghun",
      gender: "Male",
      email: "senghun233@gmail.com",
      roleName: ["Member"],
      task: ["Front-End Dev"],
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0007-0007-0007-000000000007",
      username: "Senghun2",
      gender: "Male",
      email: "senghun234@gmail.com",
      roleName: ["Member"],
      task: ["Front-End Dev"],
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0008-0008-0008-000000000008",
      username: "Senghun3",
      gender: "Male",
      email: "senghun235@gmail.com",
      roleName: ["Member"],
      task: ["Front-End Dev"],
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0009-0009-0009-000000000009",
      username: "Senghun4",
      gender: "Male",
      email: "senghun236@gmail.com",
      roleName: ["Member"],
      task: ["Front-End Dev"],
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
    {
      memberId: "1a2b3c4d-0010-0010-0010-000000000010",
      username: "Senghun5",
      gender: "Male",
      email: "senghun237@gmail.com",
      roleName: ["Member"],
      task: ["Front-End Dev"],
      profileImage:
        "https://i.pinimg.com/736x/b2/66/f7/b266f7c8ecb53960c5eaa19d2a40dc41.jpg",
    },
  ];

  const [members, setMembers] = useState(initialMembers);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // For delete modal
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  const deleteMemberById = (id) => {
    setMembers((prev) => prev.filter((m) => m.memberId !== id));
  };

  const [currentPage, setCurrentPage] = React.useState(1);
  const membersPerPage = 5;

  // Calculate the data for the current page
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const totalPages = Math.ceil(members.length / membersPerPage);

  function handlePageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div className="p-4 ">
      {/* Breadcrumb */}
      <BredCrum board={"Hikko Design"} feature={"Members"} header={"Member"} />
      <div className="flex justify-between">
        <div className="flex items-center w-[600px] h-[45px] border border-gray-200 rounded-[16px] shadow-sm overflow-hidden bg-white text-input text-title">
          <div className="relative flex items-center gap-1 px-3 border-r border-gray-200">
            <Image src={icon1} alt="Filter" className="w-[16px] h-[16px]" />
            <select className="bg-transparent outline-none text-sm cursor-pointer appearance-none w-auto">
              <option value="all">All</option>
              <option value="week">Last week</option>
              <option value="month">Last month</option>
              <option value="year">Last year</option>
            </select>
            <Image
              src={arrowdown}
              alt="Dropdown arrow"
              className="absolute right-2 w-[10px] h-[6px] pointer-events-none"
            />
          </div>
          <div className="flex items-center px-2">
            <Image src={iconSearch} alt="Search" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-full px-2 bg-white text-gray-700 outline-none placeholder-gray-400"
          />
        </div>
        {/* Invite */}
        <ModalInviteMember boardId={boardId} />
      </div>

      <section className="overflow-hidden">
        <div className="relative min-h-[450px] mt-10 ">
          <table className="w-full text-body-sm text-left text-title ">
            <thead className="text-title/50 bg-primary/20 ">
              <tr>
                <th className="px-6 py-3 rounded-s-lg w-16">No.</th>
                <th className="px-6 py-3 w-48">Member Name</th>
                <th className="px-6 py-3 w-28">Gender</th>
                <th className="px-6 py-3 w-60">Email</th>
                <th className="px-6 py-3 w-48">Role</th>
                <th className="px-6 py-3 w-48">Current Task</th>
                <th className="px-6 py-3 rounded-e-lg w-16"></th>
              </tr>
            </thead>

            <tbody>
              {currentMembers.map((member, index) => (
                <tr
                  key={member.memberId}
                  className={`${
                    (index + indexOfFirstMember) % 2 !== 0
                      ? "bg-gray-50/50"
                      : "bg-white"
                  } hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all duration-300 ease-in-out group`}
                >
                  {/* Index Number */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
                      {index + 1 + (currentPage - 1) * membersPerPage}
                    </span>
                  </td>

                  {/* Username with Modern Hover Effect */}
                  <td className="px-6 py-4">
                    <Link
                      href={{
                        pathname: `/profile/${member.memberId}`,
                        query: {
                          name: member.username,
                          profileImage: member.profileImage,
                        },
                      }}
                      passHref
                    >
                      <div className="flex items-center gap-3 cursor-pointer group/user">
                        <div className="relative">
                          <img
                            src={member.profileImage}
                            alt={`${member.username}'s profile`}
                            className="rounded-full w-[40px] h-[40px] object-cover ring-2 ring-transparent group-hover/user:ring-blue-300 group-hover/user:ring-offset-2 transition-all duration-300 transform group-hover/user:scale-110"
                          />
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/20 to-purple-400/20 opacity-0 group-hover/user:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800 group-hover/user:text-blue-700 transition-colors duration-200">
                            {member.username}
                          </span>
                          <span className="text-xs text-gray-500 group-hover/user:text-blue-500 transition-colors duration-200">
                            Click to view profile
                          </span>
                        </div>
                      </div>
                    </Link>
                  </td>

                  {/* Gender */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors duration-200">
                      {member.gender}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4">
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                      {member.email}
                    </span>
                  </td>

                  {/* Roles Popover */}
                  <td className="px-6 py-4 border-none">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 group-hover:text-blue-700 transition-colors duration-200">
                        {member.roleName[0]}
                      </span>
                      {member.roleName.length > 1 && (
                        <Popover>
                          <PopoverTrigger className="cursor-pointer">
                            <div className="p-1 rounded-full hover:bg-blue-100 transition-colors duration-200">
                              <ChevronUp />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="text-h6 bg-white border shadow-lg p-4 rounded-lg">
                            <div className="space-y-2">
                              {member.roleName.map((role, i) => (
                                <div
                                  key={i}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                                >
                                  {role}
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </td>

                  {/* Tasks Popover */}
                  <td className="px-6 py-4 border-none">
                    <div className="flex items-center gap-2 !border-none">
                      <span className="text-gray-700 group-hover:text-green-700 transition-colors duration-200">
                        {member.task[0]}
                      </span>
                      {member.task.length > 1 && (
                        <Popover>
                          <PopoverTrigger className="cursor-pointer border-0">
                            <div className="p-1 rounded-full hover:bg-green-100 transition-colors duration-200 border-none">
                              <ChevronUp />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="text-h6 bg-white border-0 p-4 rounded-lg">
                            <div className="space-y-2">
                              {member.task.map((task, i) => (
                                <div
                                  key={i}
                                  className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm"
                                >
                                  {task}
                                </div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </td>

                  {/* Action Popover */}
                  <td className="px-6 py-4 ">
                    <PopupAction
                      title={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      }
                      massageTitle={"Are you sure?"}
                      massageBody={`You want to delete ${member.username} from baord `}
                      icon={<IconpopupDelete />}
                      bgcolor={"bg-slate-red"}
                      massageDo={"Yes, Delete"}
                      massageUndo={"No, Cancel"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Confirmation Modal */}
        </div>
      </section>

      {/* Modern Pagination */}
      <div className="flex flex-col items-center justify-center gap-6 mt-8">
        <div className="flex items-center gap-4">
          <Button
            color="default"
            variant="none"
            size="sm"
            className="px-4 py-2 font-medium hover:bg-gray-50 transition-colors duration-200"
            isDisabled={currentPage <= 1}
            onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Button>

          <Pagination
            color="primary"
            variant="none"
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
            className="gap-1"
            classNames={{
              wrapper:
                "gap-1 overflow-hidden h-8  border border-divider bg-content1 ",
              item: "w-8 h-8 text-small rounded-md bg-transparent hover:bg-default-100 transition-colors duration-200",
              cursor: "bg-primary text-white shadow-sm rounded-md font-medium",
            }}
            showControls={false}
          />

          <Button
            color="primary"
            variant="none"
            size="sm"
            className="px-4 py-2  font-medium hover:bg-primary/90 hover:text-white transition-colors duration-200"
            isDisabled={currentPage >= totalPages}
            onPress={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
          >
            Next
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
