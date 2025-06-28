"use client";

import { Card, CardContent } from "../ui/card";
import { UsersRound, Crown, Shield, User, Circle } from "lucide-react";

export default function CardAllMembers({ boardMember, preventUserImage }) {
  const getRoleIcon = (roles) => {
    if (roles?.includes?.("ROLE_MANAGER") || roles === "ROLE_MANAGER")
      return <Crown className="w-3 h-3 text-amber-600" />;
    if (roles?.includes?.("ROLE_LEADER") || roles === "ROLE_LEADER")
      return <Shield className="w-3 h-3 text-blue-600" />;
    return <User className="w-3 h-3 text-gray-600" />;
  };

  const getRoleColor = (roles) => {
    if (roles?.includes?.("ROLE_MANAGER") || roles === "ROLE_MANAGER")
      return "bg-amber-50 text-amber-700 border-amber-200";
    if (roles?.includes?.("ROLE_LEADER") || roles === "ROLE_LEADER")
      return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  const formatRole = (roles) => {
    if (Array.isArray(roles)) {
      return roles[0]?.replace("ROLE_", "") || "Member";
    }
    return typeof roles === "string" ? roles.replace("ROLE_", "") : "Member";
  };

  return (
    <div className=" mx-auto p-2 ">
      <Card className="shadow-lg border-1 bg-white rounded-xl">
        <CardContent className="p-6 ">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 ">
            <div className="flex items-center gap-3 ">
              <div className="p-2 bg-[#59BAD5] rounded-xl">
                <UsersRound className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">All Members</h2>
                <p className="text-sm text-gray-500">
                  Team collaboration overview
                </p>
              </div>
            </div>
            <span className="bg-[#59BAD5] hover:bg-[#4AA5C1] text-white text-sm font-medium px-3 py-1.5 rounded-full transition-colors">
              {boardMember?.length || 0}{" "}
              {boardMember?.length === 1 ? "Member" : "Members"}
            </span>
          </div>

          {/* Members List */}
          <div className="space-y-3 max-h-[355px] overflow-y-auto pr-2 scrollbar-thin scrollbar-hidden scrollbar-track-gray-100">
            {boardMember?.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <UsersRound className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No members found</p>
              </div>
            ) : (
              boardMember?.map((member, index) => (
                <div
                  key={member.userId || index}
                  className="group flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#59BAD5]/5 hover:to-[#59BAD5]/10 transition-all duration-200 border border-transparent hover:border-[#59BAD5]/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-gray-100 group-hover:ring-[#59BAD5]/30 transition-all duration-200">
                        {member.profileImage || preventUserImage ? (
                          <img
                            src={member.profileImage || preventUserImage}
                            alt={member.username || member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#59BAD5] to-[#4AA5C1] flex items-center justify-center text-white font-semibold text-sm">
                            {(member.username || member.name || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                      {/* Status indicator */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm">
                        <Circle className="w-full h-full text-green-500 fill-current" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#59BAD5] transition-colors">
                          {member.username || member.name || "Unknown User"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${getRoleColor(
                            member.roles
                          )}`}
                        >
                          {getRoleIcon(member.roles)}
                          {formatRole(member.roles)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-[#59BAD5] rounded-full"></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
