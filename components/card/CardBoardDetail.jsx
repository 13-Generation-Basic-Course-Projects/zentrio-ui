// CardBoardDetail.js
"use client";
import React, { useEffect, useState } from "react";
import { Users, Star } from "lucide-react";
import { StackedProfiles } from "../icon/everyicon";
import { StackedUser } from "../useravatar/StackUser";
import { getMemberByBoardIdAction } from "@/action/board.action";
import Link from "next/link";

export default function CardBoardDetail({
  title,
  description,
  image,
  images,
  boardId,
  workspaceId,
  workspaceType = { workspaceType },
}) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let boardUrl = "#";
  if (workspaceType === "other") {
    if (boardId) {
      boardUrl = `/dashboard/otherworkspace/${boardId}/board`;
    }
  } else {
    if (workspaceId && boardId) {
      boardUrl = `/dashboard/${workspaceId}/${boardId}/board`;
    }
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const membersResponse = await getMemberByBoardIdAction({ boardId });
        const allMemberInBoard = membersResponse?.payload || [];
        setMembers(allMemberInBoard);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        setError("Failed to load members");
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [boardId]);
    ("member in card board detail: ", members);
    ("workspace id in card board detail: ", workspaceId);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>
      <Link href={boardUrl}>
        <div className="relative flex flex-row h-64">
          <div className="relative overflow-hidden w-80 flex-shrink-0">
            {images && images.startsWith("bg-") ? (
              <div
                className={`w-full h-full group-hover:scale-110 transition-transform duration-700 ${image}`}
                aria-label={`Card background for ${title}`}
              />
            ) : images ? (
              <img
                src={images || image }
                alt={title || "Board cover image"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div
                className="w-full h-full group-hover:scale-110 transition-transform duration-700 bg-gray-200"
                aria-label={`No image available for ${title}`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Content section */}
          <div className="flex-1 p-8">
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {title || "Board Title"}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {description || "No description available"}
                </p>
              </div>

              {/* Members section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold">Team Members</h3>
                </div>

                <div className="flex items-center gap-3">
                  <StackedUser image={members} />
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {members?.length || 0} active members
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
