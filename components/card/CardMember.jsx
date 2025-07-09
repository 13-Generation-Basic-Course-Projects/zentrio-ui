"use client";

import React from "react";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import { Crown, Shield, User, Circle, UsersRound } from "lucide-react";

const CardMember = ({ members = [], preventUserImage }) => {
    ("Members in CardMember:", members);

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
      return roles[0]?.replace("ROLE_", "").replace(/_/g, " ") || "Member";
    }
    return typeof roles === "string"
      ? roles.replace("ROLE_", "").replace(/_/g, " ")
      : "Member";
  };

  return (
    <div>
      <Card className="w-full mx-auto border shadow-sm h-[400px] bg-white/80 dark:bg-gray-800/80">
        <CardHeader className="flex justify-between items-center px-6 py-4 pb-2">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
            Members
          </h2>
          <Button
            variant="light"
            size="md"
            className="text-gray-500 dark:text-gray-300 p-0 h-auto min-w-0"
          >
            
          </Button>
        </CardHeader>

        <CardBody className="px-6 py-4 overflow-y-auto max-h-[300px] scrollbar-hidden">
          {members?.length === 0 || !members ? (
            <div className="flex flex-col justify-center items-center gap-4 p-4 z-10 min-h-[calc(300px-2rem)]">
              {/* Using Lucide icon for "Nothing Found" for consistency */}
              <UsersRound className="w-16 h-16 text-gray-400" />
              {/* Text */}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-100">
                  No Members Found
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  This workspace has no members yet. Invite some to get started!
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-3">
              {members?.map((member, index) => (
                <div
                  key={member.userId || index}
                  className="group flex items-center justify-between p-2 rounded-lg hover:bg-gradient-to-r hover:from-gray-50/5 hover:to-gray-50/10 dark:hover:from-gray-700/5 dark:hover:to-gray-700/10 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {/* Profile Image */}
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-gray-100 group-hover:ring-[#59BAD5]/30 transition-all duration-200">
                        {(member.profileImage &&
                          member.profileImage !== "default_user_image_path") ||
                        preventUserImage ? (
                          <img
                            src={member.profileImage || preventUserImage}
                            alt={member.username || member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                preventUserImage ||
                                "https://placehold.co/48x48/CCCCCC/FFFFFF?text=U";
                            }}
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
                      {/* NO MORE */}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {member?.username || member?.name || "Unknown User"}
                      </p>
                      <div className="mt-1">
                        {/* Role display with icon and color */}
                        {member?.roles && member.roles.length > 0 && (
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${getRoleColor(
                              member.roles[0]
                            )}`}
                          >
                            {getRoleIcon(member.roles[0])}
                            {formatRole(member.roles)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-[#59BAD5] rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CardMember;
