// app/components/card/CardMember.jsx
"use client";

import React from "react";
import { Card, CardHeader, CardBody, Button, Image } from "@heroui/react";
// import Image from "next/image";

const CardMember = ({ members = [] }) => {
  console.log("Members in CardMember:", members);

  return (
    <div>
      <Card className="w-full mx-auto shadow-sm h-[400px] bg-white/80 dark:bg-gray-800/80">
        <CardHeader className="flex justify-between items-center px-6 py-4 pb-2">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
            Members
          </h2>
          <Button
            variant="light"
            size="md"
            className="text-gray-500 dark:text-gray-300 p-0 h-auto min-w-0"
          >
            See All
          </Button>
        </CardHeader>

        <CardBody className="px-6 py-4 overflow-y-auto max-h-[300px] scrollbar-hidden">
          {members?.length === 0 || !members ? (
            <div className="flex flex-col justify-center items-center gap-4 p-4 z-10 min-h-[calc(300px-2rem)]">
              {/* 3D Icon */}
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/ios/50/nothing-found.png"
                alt="nothing-found"
              />
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
                  key={member.userId || index} // Use userId for unique key
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    {member?.profileImage ? (
                      <img
                        src={member?.profileImage}
                        alt={member?.username}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs font-medium text-gray-600 bg-gray-200 w-full h-full flex items-center justify-center">
                        {member?.username?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {member?.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-300">
                      {member?.roles[0] || "Member"}
                    </p>
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
