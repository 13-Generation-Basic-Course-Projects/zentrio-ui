"use client";

import { useState } from "react";
import { Card } from "@heroui/card";
import { CardContent } from "../ui/card";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardCreateModal from "./CardCreateModal";
import Link from "next/link";

export default function CardCreateAnnouncement({
  boardId,
  boardMember,
  Announcements,
  preventUserImage,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const managerMember = boardMember?.find((member) =>
    member.roles?.some((role) => role === "ROLE_MANAGER")
  );

  return (
    <div className="mx-auto px-2 py-1">
      <Card className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <CardContent className="p-0">
          {/* Compact Header */}
          <div className="bg-gradient-to-r from-[#59BAD5] to-[#4AB5D1] p-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-sm font-semibold">New Announcement</h3>
                </div>
              </div>

              {/* Compact stats */}
              <div className="flex items-center space-x-3 text-white/90 text-xs">
                <span>{Announcements?.payload?.length || 0} posts</span>
                <span>{boardMember?.length || 0} members</span>
              </div>
            </div>
          </div>

          {/* Compact Main Content */}
          <div className="p-3">
            <div className="flex items-center gap-3">
              {managerMember && (
                <Link
                  href={{
                    pathname: `/profile/${managerMember.userId}`,
                    query: {
                      name: managerMember.username,
                      boardId: boardId,
                      profileImage: managerMember.profileImage,
                    },
                  }}
                  className="relative w-11 h-11"
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-r from-[#59BAD5] to-[#4AB5D1] p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img
                        src={managerMember.profileImage || preventUserImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full p-0.5"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0.5 right-0 w-3 h-3 bg-green-500 rounded-full border-[2px] border-white" />
                </Link>
              )}

              <div className="flex-1">
                <div
                  className="bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.01] border border-transparent hover:border-[#59BAD5]/20 group"
                  onClick={toggleModal}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm group-hover:text-gray-800">
                      What's new today?
                    </span>
                    <div className="w-6 h-6 bg-[#59BAD5]/20 rounded-full flex items-center justify-center group-hover:bg-[#59BAD5]/30 transition-colors">
                      <Plus className="w-3 h-3 text-[#59BAD5]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <CardCreateModal
              onClose={toggleModal}
              boardId={boardId}
              boardMember={boardMember}
              Announcements={Announcements}
              preventUserImage={preventUserImage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
