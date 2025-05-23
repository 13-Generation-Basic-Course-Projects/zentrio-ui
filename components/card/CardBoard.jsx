"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  IconDelete,
  StackedProfiles,
  StarIconOutline,
  StarIconSolid,
} from "../icon/everyicon";
import iconMember from "@/assets/memberSideBar.png";

import Image from "next/image";


export default function CardBoard({ title, color }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <div className="mx-auto mt-10 w-full max-w-auto">
      <Card className="py-4">
        {/* Header */}
        <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
          <p className="text-h2 font-semibold text-primary truncate">{title}</p>

          <button
            onClick={() => setFavorited(!favorited)}
            className="text-yellow-500 hover:text-yellow-600"
            aria-label="Toggle favorite"
          >
            {favorited ? (
              <StarIconSolid className="w-10 h-10 text-yellow-500" />
            ) : (
              <StarIconOutline className="w-10 h-10 text-yellow-500" />
            )}
          </button>
        </CardHeader>

        {/* Body */}
        <CardBody className="overflow-visible py-2">
          <img
            src={color}
            alt={`Card background for ${title}`}
            className="object-cover rounded-xl w-full h-48"
          />
        </CardBody>

        {/* Footer */}
        <CardFooter className="pt-2 px-4 flex flex-col items-start space-y-4">
          <StackedProfiles />

          <div className="flex w-full justify-between text-sm text-gray-600">
            <div className="flex flex-row justify-center items-center space-x-2">
              <Image
                src={iconMember}
                className="w-[16px] h-[16px]"
                alt="Members icon"
              />
              <p>13 Members</p>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2 text-progress-red">
              <IconDelete />
              <button className="hover:underline">Remove</button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
