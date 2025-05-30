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
import BredCrum from "../bredcrum/bredcrum";
import Link from "next/link";

export default function Memberpage() {
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
    // Removed duplicate "Senghun" entries and ensured unique memberId values
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
  const [hoverPopoverId, setHoverPopoverId] = useState(null);
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
        <ModalInviteMember />
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
                      ? "bg-gray-100"
                      : "bg-white"
                  } hover:bg-gray-50 transition-colors`}
                  onMouseEnter={() => setHoverPopoverId(member.memberId)}
                  onMouseLeave={() => setHoverPopoverId(null)}
                >
                  {/* Index Number */}
                  <td className="px-6 py-2">
                    {index + 1 + (currentPage - 1) * membersPerPage}
                  </td>

                  {/* Username with Hover Popup */}
                  <td className="px-6 py-2 relative">
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
                      <div className="flex items-center gap-2 cursor-pointer hover:underline">
                        <img
                          src={member.profileImage}
                          alt={`${member.username}'s profile`}
                          className="rounded-full w-[35px] h-[35px] object-cover"
                        />
                        <span>{member.username}</span>
                      </div>
                    </Link>

                    {/* Hover Details Popup */}
                    {hoverPopoverId === member.memberId && (
                      <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-gray-200 shadow-lg rounded-lg p-4 z-50">
                        <div className="flex items-center space-x-3 mb-3 ">
                          <img
                            src={member.profileImage}
                            alt={`${member.username}'s profile`}
                            className="rounded-full w-[60px] h-[60px] object-cover"
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {member.username}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {member.email}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">
                              Gender:
                            </span>
                            <span className="ml-2 text-gray-600">
                              {member.gender}
                            </span>
                          </div>

                          <div>
                            <span className="font-medium text-gray-700">
                              Roles:
                            </span>
                            <div className="ml-2 flex flex-wrap gap-1 mt-1">
                              {member.roleName.map((role, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                >
                                  {role}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="font-medium text-gray-700">
                              Tasks:
                            </span>
                            <div className="ml-2 flex flex-wrap gap-1 mt-1">
                              {member.task.map((task, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                                >
                                  {task}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <Link
                            href={{
                              pathname: `/profile/${member.memberId}`,
                              query: {
                                name: member.username,
                                profileImage: member.profileImage,
                              },
                            }}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Full Profile →
                          </Link>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Gender */}
                  <td className="px-6 py-4">{member.gender}</td>

                  {/* Email */}
                  <td className="px-6 py-4">{member.email}</td>

                  {/* Roles Popover */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span>{member.roleName[0]}</span>
                      {member.roleName.length > 1 && (
                        <Popover>
                          <PopoverTrigger className="cursor-pointer">
                            <Image src={arrowdown} alt="More roles" />
                          </PopoverTrigger>
                          <PopoverContent className="text-h6 bg-white border shadow-lg p-4">
                            <div className="space-y-2">
                              {member.roleName.map((role, i) => (
                                <div key={i}>{role}</div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </td>

                  {/* Tasks Popover */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span>{member.task[0]}</span>
                      {member.task.length > 1 && (
                        <Popover>
                          <PopoverTrigger className="cursor-pointer">
                            <Image src={arrowdown} alt="More tasks" />
                          </PopoverTrigger>
                          <PopoverContent className="text-h6 bg-white border shadow-lg p-4">
                            <div className="space-y-2">
                              {member.task.map((task, i) => (
                                <div key={i}>{task}</div>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </td>

                  {/* Action Popover */}
                  <td className="px-6 py-4">
                    <Popover
                      showArrow
                      backdrop="opaque"
                      offset={10}
                      placement="bottom"
                      isOpen={openPopoverId === member.memberId}
                      onOpenChange={() =>
                        setOpenPopoverId((prev) =>
                          prev === member.memberId ? null : member.memberId
                        )
                      }
                    >
                      <PopoverTrigger className="cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-gray-600 hover:text-black"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </PopoverTrigger>

                      <PopoverContent className="w-[150px] p-2">
                        <Button
                          className="w-full text-left text-red-600 hover:bg-red-100 bg-white"
                          onClick={() => {
                            setSelectedMemberId(member.memberId);
                            setOpenPopoverId(null);
                            onOpen(); // Confirm delete action modal
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 011 1v3H9V4a1 1 0 011-1ZM6 7h12v13a1 1 0 01-1 1H7a1 1 0 01-1-1V7z"
                              />
                            </svg>
                            Delete
                          </div>
                        </Button>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="overflow-x-hidden h-auto"
          >
            <ModalContent
              ref={targetRef}
              className="flex flex-col justify-center items-center"
            >
              {(onClose) => (
                <>
                  <ModalHeader {...moveProps}></ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <div className="w-[100px] h-[100px] rounded-full bg-progress-red/20 items-center flex justify-center">
                        <svg
                          className="text-progress-red/50 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="80"
                          height="80"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </div>
                      <p>Are you sure?</p>
                      <p className="w-auto whitespace-nowrap">
                        You want to delete{" "}
                        <span className="text-title font-semibold">
                          {members.find((m) => m.memberId === selectedMemberId)
                            ?.username || "this user"}
                        </span>{" "}
                        from board.
                      </p>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      variant="light"
                      className="bg-primary/80 text-white hover:bg-bgColor hover:text-title"
                      onPress={onClose}
                    >
                      No, Cancel
                    </Button>
                    <Button
                      className="bg-progress-red/50 text-white hover:bg-bgColor hover:text-primary"
                      onPress={() => {
                        deleteMemberById(selectedMemberId);
                        onClose();
                      }}
                    >
                      Yes, Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </section>
      {/* Pagination Buttons */}
      <div className="flex flex-col items-center justify-center gap-5 ">
        <p className="text-small text-default-500 text-center">
          {currentPage > totalPages
            ? "Have show all"
            : `Selected Page: ${currentPage}`}
        </p>
        <Pagination
          color="secondary"
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
        <div className="flex gap-2">
          <Button
            color="secondary"
            size="sm"
            variant="flat"
            onPress={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            Previous
          </Button>
          <Button
            color="primary"
            size="sm"
            variant="flat"
            onPress={() =>
              setCurrentPage(
                (prev) => (prev < totalPages ? prev + 1 : prev) // Stop incrementing beyond totalPages
              )
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
