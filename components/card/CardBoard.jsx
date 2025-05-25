"use client";
import Link from "next/link";
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

export default function CardBoard({ title, image }) {
  const [favorited, setFavorited] = useState(false);

  return (
    <Link href="/dashboard/1/1/board">
      <Card className="py-4  h-[340px] rounded-xl shadow-lg  ">
        {/* Header */}
        <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-center">
          <p className="text-body-sm font-semibold text-primary truncate">
            {title}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault(); // stop link
              e.stopPropagation(); // stop event bubbling
              setFavorited(!favorited);
            }}
            className="text-yellow-500 hover:text-yellow-600  p-3"
            aria-label="Toggle favorite"
          >
            {favorited ? <StarIconSolid /> : <StarIconOutline />}
          </button>
        </CardHeader>

        {/* Body */}
        <CardBody className="overflow-visible py-2">
          {image && image.startsWith("bg-") ? (
            <div
              className={`rounded-xl w-full h-32 bg-cover bg-center ${image}`}
              aria-label={`Card background for ${title}`}
            />
          ) : (
            <img
              src={image}
              alt={`Card background for ${title}`}
              className="object-cover rounded-xl w-full h-32"
            />
          )}
        </CardBody>

        {/* Footer */}
        <CardFooter className="pt-2 px-4 flex flex-col items-start space-y-4">
          <StackedProfiles />

          <div className="flex w-full justify-between text-sm text-gray-600">
            <div className="flex flex-row justify-center items-center ">
              <Image
                src={iconMember}
                className="w-[16px] h-[16px]"
                alt="Members icon"
              />
              <p className="text-body-sm"> 13 Members</p>
            </div>
            <div className="flex flex-row justify-center items-center  text-progress-red p-3">
              <IconDelete />
              <button className="hover:underline text-body-sm ">Remove</button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
