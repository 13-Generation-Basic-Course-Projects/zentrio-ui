"use client";

import { useState, useRef } from "react";
import React from "react";
import Image from "next/image";
import iconSearch from "@/assets/search.png";
import icon1 from "@/assets/icon1.png";
import arrowdown from "@/assets/arrow-down.png";
import ModalInviteMember from "../modal/ModalInviteMember";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  useDisclosure,
  useDraggable,
  Pagination,
} from "@heroui/react";
import BredCrum from "../bredcrum/MyBredcrum";
import Link from "next/link";
import { ChevronUp, Crown, Shield, User } from "lucide-react";
import ModalDelete from "../modal/ModalDelete";
import { preventImage } from "@/constant/preventimage";
import { formatRole } from "@/lib/roleFormart";
import { deleteMemberAction } from "@/action/board.action";
import { Autocomplete, AutocompleteItem } from "@heroui/react";

export default function Memberpage({
  boardMember,
  boardId,
  preventUserImage,
  matchingBoardForNotPM,
  workspaceId,
  allMemberInBoard,
  currentUserProfile,
  boardName
}) {
  if (boardMember.status >= 400 || boardMember.type === "about:blank") {
    return <NotFound />;
  }

  // Role utility functions
  const getRoleIcon = (roles) => {
    if (roles?.includes?.("ROLE_MANAGER") || roles === "ROLE_MANAGER")
      return <Crown className="w-3 h-3 text-amber-600" />;
    if (roles?.includes?.("ROLE_ADMIN") || roles === "ROLE_ADMIN")
      return <Shield className="w-3 h-3 text-red-600" />;
    if (roles?.includes?.("ROLE_LEADER") || roles === "ROLE_LEADER")
      return <Shield className="w-3 h-3 text-blue-600" />;
    return <User className="w-3 h-3 text-gray-600" />;
  };

  const getRoleColor = (roles) => {
    if (roles?.includes?.("ROLE_MANAGER") || roles === "ROLE_MANAGER")
      return "bg-amber-50 text-amber-700 border-amber-200";
    if (roles?.includes?.("ROLE_ADMIN") || roles === "ROLE_ADMIN")
      return "bg-red-50 text-red-700 border-red-200";
    if (roles?.includes?.("ROLE_LEADER") || roles === "ROLE_LEADER")
      return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  const formatRoleDisplay = (roles) => {
    if (Array.isArray(roles)) {
      return roles[0]?.replace("ROLE_", "") || "Member";
    }
    return typeof roles === "string" ? roles.replace("ROLE_", "") : "Member";
  };

  // Get role from matchingBoardForNotPM with priority logic
  const getUserRole = (roles) => {
    if (!roles || roles.length === 0) return "ROLE_MEMBER";

    // If has 3 roles (ROLE_LEADER, ROLE_MEMBER, ROLE_MANAGER), return ROLE_MANAGER
    if (roles.length === 3 && roles.includes("ROLE_MANAGER")) {
      return "ROLE_MANAGER";
    }

    // If has 2 roles (ROLE_LEADER, ROLE_MEMBER), return ROLE_LEADER
    if (roles.length === 2 && roles.includes("ROLE_LEADER")) {
      return "ROLE_LEADER";
    }

    // Default to highest priority role available
    if (roles.includes("ROLE_MANAGER")) return "ROLE_MANAGER";
    if (roles.includes("ROLE_LEADER")) return "ROLE_LEADER";
    return "ROLE_MEMBER";
  };

  const role =
    getUserRole(matchingBoardForNotPM?.role) || user.role || "ROLE_MEMBER";

  const [members, setMembers] = useState(
    Array.isArray(boardMember) ? boardMember : []
  ); //call from props

  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // For delete modal
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openModal = (id) => {
    console.log("Opening modal for userId:", id);
    setSelectedUserId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const deleteMemberById = (id) => {
    setMembers((prev) => prev.filter((m) => m.userId !== id));
  };

  // New state for search input and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState("all");

  // Filter members based on search term (username or email) and filter
const filteredMembers = members
  .filter((member) => {
    const search = searchTerm.toLowerCase();
    return (
      member.username.toLowerCase().includes(search) ||
      member.email.toLowerCase().includes(search)
    );
  })
  .sort((a, b) => {
    if (filterRange === "az") {
      return a.username.localeCompare(b.username);
    }
    if (filterRange === "za") {
      return b.username.localeCompare(a.username);
    }
    return 0;
  });

  const filterOptions = [
    { key: "all", label: "All" },
    { key: "az", label: "A → Z" },
    { key: "za", label: "Z → A" },
  ];


  // Pagination calculations use filteredMembers instead of all members
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);

  // Reset to page 1 if searchTerm changes (optional, but recommended)
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  /* use for animation on icon arrow */
  const [makeOpen, setMakeOpen] = useState(false);
  const [openPopoverId, setOpenPopoverId] = useState(null);
  //prevent pf
  const preventProfile = preventImage.noProfile;

  console.log("board id in memberpage", boardId);
  console.log("currentUserProfile", currentUserProfile);
  // checkrole
  // Function to find the role for a given boardId
  const findRoleByBoardId = (boardId, userProfile) => {
    // Check ownBoards
    const ownBoard = userProfile.payload.ownBoards.find(
      (board) => board.boardId === boardId
    );
    if (ownBoard) {
      return ownBoard.role;
    }

    // Check joinedBoards
    const joinedBoard = userProfile.payload.joinedBoards.find(
      (board) => board.boardId === boardId
    );
    if (joinedBoard) {
      return joinedBoard.role;
    }

    // Return null or a message if boardId is not found
    return "Board not found";
  };
  const userRoleBaseOnCurrentUser = findRoleByBoardId(
    boardId,
    currentUserProfile
  );

  console.log(
    "role for current user depend on boardid",
    userRoleBaseOnCurrentUser
  );
  return (
    <div className="p-4 ">
      {/* Breadcrumb */}
      <BredCrum board={boardName} feature={"Members"} header={"Member"} workspaceId={workspaceId} />
      <div className="flex justify-between">
        <div className="flex items-center w-[600px] h-[45px] border border-gray-200 rounded-[16px] overflow-hidden bg-white text-input text-title">
          <div className="relative flex items-center gap-2 border-r border-gray-200 pr-4 pl-3 py-2">
            <Image src={icon1} alt="Filter" className="w-4 h-4" />
            <div className="relative">
              <Autocomplete
                selectedKey={filterRange}
                onSelectionChange={(key) => setFilterRange(key)}
                onFocus={() => setMakeOpen(true)}
                onBlur={() => setMakeOpen(false)}
                placeholder="Filter"
                className="w-[160px] bg-white text-sm text-gray-700"
                size="sm"
              >
                {filterOptions.map((option) => (
                  <AutocompleteItem key={option.key} textValue={option.label}>
                    {option.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>

            </div>
          </div>

          <div className="flex items-center px-2">
            <Image src={iconSearch} alt="Search" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-full px-2 bg-white text-gray-700 outline-none placeholder-gray-400"
            value={searchTerm} // Bind searchTerm state
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
          />
        </div>
        {/* Invite */}
        {role == "ROLE_LEADER" || role == "MEMBER" ? (
          ""
        ) : (
          <ModalInviteMember
            boardId={boardId}
            workspaceId={workspaceId}
            allMemberInBoard={allMemberInBoard}
          />
        )}
      </div>

      <section className="overflow-hidden">
        <div className="relative min-h-[550px] mt-10 ">
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
                  key={member.userId}
                  className={`${(index + indexOfFirstMember) % 2 !== 0
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
                        pathname: `/profile/${member.userId}`,
                        query: {
                          name: member.username,
                          boardId: boardId,
                          profileImage: member.profileImage,
                        },
                      }}
                      passHref
                    >
                      <div className="flex items-center gap-3 cursor-pointer group/user">
                        <div className="relative">
                          {member?.profileImage ? (
                            <img
                              src={member.profileImage}
                              alt={`${member.username}'s profile`}
                              className="rounded-full w-[40px] h-[40px] object-cover ring-2 ring-transparent group-hover/user:ring-blue-300 group-hover/user:ring-offset-2 transition-all duration-300 transform group-hover/user:scale-110"
                            />
                          ) : (
                            <img
                              src={preventProfile}
                              alt={`${member.username}'s profile`}
                              className="rounded-full w-[40px] h-[40px] object-cover ring-2 ring-transparent group-hover/user:ring-blue-300 group-hover/user:ring-offset-2 transition-all duration-300 transform group-hover/user:scale-110"
                            />
                          )}
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
                  {/* Enhanced Roles Display */}
                  <td className="px-6 py-4 border-none">
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(member.roles)} transition-colors duration-200`}>
                        {getRoleIcon(member.roles)}
                        <span>{formatRoleDisplay(member.roles)}</span>
                      </div>
                      {member.roles.length > 1 && (
                        <Popover
                          open={openPopoverId === member.userId}
                          onOpenChange={(open) => {
                            setOpenPopoverId(open ? member.userId : null);
                            setMakeOpen(open);
                          }}
                        >
                          <PopoverTrigger className="cursor-pointer">
                            <div className="p-1 rounded-full hover:bg-blue-100 transition-colors duration-200">
                              <ChevronUp
                                className={`w-4 h-4 transform transition-transform duration-300 ${openPopoverId === member.userId
                                    ? "rotate-180 text-blue-600"
                                    : "text-gray-500"
                                  }`}
                              />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="text-h6 bg-white border shadow-lg p-4 rounded-lg">
                            <div className="space-y-2">
                              {member.roles.map((role, i) => (
                                <div
                                  key={i}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getRoleColor(role)}`}
                                >
                                  {getRoleIcon(role)}
                                  <span>{formatRoleDisplay(role)}</span>
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
                        {member.tasks[0]}
                      </span>
                      {member.tasks.length > 1 && (
                        <Popover>
                          <PopoverTrigger className="cursor-pointer border-0">
                            <div className="p-1 rounded-full hover:bg-green-100 transition-colors duration-200 border-none">
                              <ChevronUp />
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="text-h6 bg-white border-0 p-4 rounded-lg">
                            <div className="space-y-2">
                              {member.tasks.map((task, i) => (
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
                  {/* Action for delete */}
                  <td className="px-6 py-4">
                    {userRoleBaseOnCurrentUser === "ROLE_MANAGER" &&
                      member.userId !== currentUserProfile.payload.user.userId ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        onClick={() => openModal(member.userId)}
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Render ModalDelete once */}
          {isModalOpen && selectedUserId && (
            <ModalDelete
              isOpen={isModalOpen}
              onClose={closeModal}
              messageTitle="Are you sure?"
              messageBody={`Do you want to delete ${members.find((m) => m.userId === selectedUserId)?.username ||
                "this member"
                } from the board?`}
              messageUndo="No, Cancel"
              messageDo="Yes, Delete"
              action={deleteMemberAction}
              boardId={boardId}
              userId={selectedUserId}
              onDeleteSuccess={deleteMemberById}
            />
          )}
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