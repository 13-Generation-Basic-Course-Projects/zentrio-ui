"use client";

import { useState } from "react";
import { Card } from "@heroui/card";
import { CardContent } from "../ui/card";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardCreateModal from "./CardCreateModal";

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
      <Card className="w-full bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
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
                <span>{Announcements?.length || 0} posts</span>
                <span>{boardMember?.length || 0} members</span>
              </div>
            </div>
          </div>

          {/* Compact Main Content */}
          <div className="p-3">
            <div className="flex items-center gap-3">
              {managerMember && (
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-[#59BAD5] to-[#4AB5D1] p-0.5">
                    <img
                      src={managerMember.profileImage || preventUserImage}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full bg-white p-0.5"
                    />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
                </div>
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

            {/* Enhanced Action Buttons */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className={`p-6 h-auto flex flex-col items-center gap-3 rounded-2xl border-2 border-gray-100 hover:border-[#59BAD5]/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#59BAD5]/10 group ${action.bgColor}`}
                    onClick={toggleModal}
                    onMouseEnter={() => setHoveredAction(action.id)}
                    onMouseLeave={() => setHoveredAction(null)}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                        action.color
                      } flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                        hoveredAction === action.id ? "scale-110" : ""
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                        {action.label}
                      </div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors mt-1">
                        {action.description}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div> */}
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
