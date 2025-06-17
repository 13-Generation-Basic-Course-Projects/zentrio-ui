"use client";

import { useState } from "react";
import { Card } from "@heroui/card";
import { CardContent } from "../ui/card";
import {
  LetterText,
  Images,
  Paperclip,
  Plus,
  Zap,
  Users,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CardCreateModal from "./CardCreateModal";

export default function CardCreateAnnouncement({
  boardId,
  boardMember,
  Announcements,
  preventUserImage,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);

  console.log("CardCreateAnnouncement", boardMember);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const managerMember = boardMember?.find((member) =>
    member.roles?.some((role) => role === "ROLE_MANAGER")
  );

  const quickActions = [
    {
      id: "article",
      icon: LetterText,
      label: "Article",
      description: "Share detailed updates",
      color: "from-[#59BAD5] to-[#4AB5D1]",
      bgColor: "hover:bg-[#59BAD5]/5",
    },
    {
      id: "photo",
      icon: Images,
      label: "Photo",
      description: "Visual announcements",
      color: "from-[#5FC4DA] to-[#59BAD5]",
      bgColor: "hover:bg-[#5FC4DA]/5",
    },
  ];

  return (
    <div className=" mx-auto px-4 py-2 ">
      <Card className="w-full bg-white shadow-lg border-0 rounded-3xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          {/* Modern Header with Gradient */}
          <div className="bg-gradient-to-r from-[#59BAD5] via-[#4AB5D1] to-[#3BB0CD] p-6 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="text-lg font-bold">Create Announcement</h3>
                  <p className="text-white/80 text-sm">
                    Share updates with your team
                  </p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="hidden md:flex items-center space-x-6 text-white/90">
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {Announcements?.length || 0}
                  </div>
                  <div className="text-xs">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {boardMember?.length || 0}
                  </div>
                  <div className="text-xs">Members</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Profile and Input Section */}
            <div className="flex items-center gap-4 mb-6">
              {managerMember && (
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-r from-[#59BAD5] to-[#4AB5D1] p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                      <img
                        src={managerMember.profileImage || preventUserImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}

              <div className="flex-1">
                <div
                  className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl px-6 py-4 cursor-pointer hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 transform hover:scale-[1.02] border border-transparent hover:border-indigo-200 group"
                  onClick={toggleModal}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
                      What would you like to announce today?
                    </span>
                    <div className="w-8 h-8 bg-[#59BAD5]/20 rounded-full flex items-center justify-center group-hover:bg-[#59BAD5]/30 transition-colors">
                      <Plus className="w-4 h-4 text-[#59BAD5]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
