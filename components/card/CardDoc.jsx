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
import { icon } from "../icon/allicon";
import ModalOptionDocument from "../modal/docu/ModalOptionDocument";

export default function CardFolder({ title, status, date }) {
  return (
    <Card className="rounded-xl text-blue-400 cursor-pointer hover:bg-blue-50 transition sm:w-[160px] md:w-full h-[160px] shadow-sm ">
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-end">
         <div className="hover:text-black text-gray-600">
        <ModalOptionDocument />
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="overflow-visible py-2 flex flex-col items-center space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="45"
          height="45"
          viewBox="0 0 48 48"
        >
          <linearGradient
            id="Om5yvFr6YrdlC0q2Vet0Ha_WWogVNJDSfZ5_gr1"
            x1="-7.018"
            x2="39.387"
            y1="9.308"
            y2="33.533"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fac017"></stop>
            <stop offset=".909" stopColor="#e1ab2d"></stop>
          </linearGradient>
          <path
            fill="url(#Om5yvFr6YrdlC0q2Vet0Ha_WWogVNJDSfZ5_gr1)"
            d="M44.5,41h-41C2.119,41,1,39.881,1,38.5v-31C1,6.119,2.119,5,3.5,5h11.597	c1.519,0,2.955,0.69,3.904,1.877L21.5,10h23c1.381,0,2.5,1.119,2.5,2.5v26C47,39.881,45.881,41,44.5,41z"
          ></path>
          <linearGradient
            id="Om5yvFr6YrdlC0q2Vet0Hb_WWogVNJDSfZ5_gr2"
            x1="5.851"
            x2="18.601"
            y1="9.254"
            y2="27.39"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fbfef3"></stop>
            <stop offset=".909" stopColor="#e2e4e3"></stop>
          </linearGradient>
          <path
            fill="url(#Om5yvFr6YrdlC0q2Vet0Hb_WWogVNJDSfZ5_gr2)"
            d="M2,25h20V11H4c-1.105,0-2,0.895-2,2V25z"
          ></path>
          <linearGradient
            id="Om5yvFr6YrdlC0q2Vet0Hc_WWogVNJDSfZ5_gr3"
            x1="2"
            x2="22"
            y1="19"
            y2="19"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fbfef3"></stop>
            <stop offset=".909" stopColor="#e2e4e3"></stop>
          </linearGradient>
          <path
            fill="url(#Om5yvFr6YrdlC0q2Vet0Hc_WWogVNJDSfZ5_gr3)"
            d="M2,26h20V12H4c-1.105,0-2,0.895-2,2V26z"
          ></path>
          <linearGradient
            id="Om5yvFr6YrdlC0q2Vet0Hd_WWogVNJDSfZ5_gr4"
            x1="16.865"
            x2="44.965"
            y1="39.287"
            y2="39.792"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#e3a917"></stop>
            <stop offset=".464" stopColor="#d79c1e"></stop>
          </linearGradient>
          <path
            fill="url(#Om5yvFr6YrdlC0q2Vet0Hd_WWogVNJDSfZ5_gr4)"
            d="M1,37.875V38.5C1,39.881,2.119,41,3.5,41h41c1.381,0,2.5-1.119,2.5-2.5v-0.625H1z"
          ></path>
          <linearGradient
            id="Om5yvFr6YrdlC0q2Vet0He_WWogVNJDSfZ5_gr5"
            x1="-4.879"
            x2="35.968"
            y1="12.764"
            y2="30.778"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".34" stopColor="#ffefb2"></stop>
            <stop offset=".485" stopColor="#ffedad"></stop>
            <stop offset=".652" stopColor="#ffe99f"></stop>
            <stop offset=".828" stopColor="#fee289"></stop>
            <stop offset="1" stopColor="#fed86b"></stop>
          </linearGradient>
          <path
            fill="url(#Om5yvFr6YrdlC0q2Vet0He_WWogVNJDSfZ5_gr5)"
            d="M44.5,11h-23l-1.237,0.824C19.114,12.591,17.763,13,16.381,13H3.5C2.119,13,1,14.119,1,15.5	v22C1,38.881,2.119,40,3.5,40h41c1.381,0,2.5-1.119,2.5-2.5v-24C47,12.119,45.881,11,44.5,11z"
          ></path>
          <radialGradient
            id="Om5yvFr6YrdlC0q2Vet0Hf_WWogVNJDSfZ5_gr6"
            cx="37.836"
            cy="49.317"
            r="53.875"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".199" stopColor="#fec832"></stop>
            <stop offset=".601" stopColor="#fcd667"></stop>
            <stop offset=".68" stopColor="#fdda75"></stop>
            <stop offset=".886" stopColor="#fee496"></stop>
            <stop offset="1" stopColor="#ffe8a2"></stop>
          </radialGradient>
          <path
            fill="url(#Om5yvFr6YrdlC0q2Vet0Hf_WWogVNJDSfZ5_gr6)"
            d="M44.5,40h-41C2.119,40,1,38.881,1,37.5v-21C1,15.119,2.119,14,3.5,14h13.256	c1.382,0,2.733-0.409,3.883-1.176L21.875,12H44.5c1.381,0,2.5,1.119,2.5,2.5v23C47,38.881,45.881,40,44.5,40z"
          ></path>
        </svg>

        <p className="text-base font-semibold text-title/80 truncate text-center px-2 ">
          {title}
        </p>
      </CardBody>

      {/* Footer */}
      <CardFooter className="pt-2 px-4">
        <div className="flex justify-between items-center w-full text-caption-tiny text-title/50">
          <div className="flex items-center space-x-1 justify-center">
            {status === "personal" ? (
              <Image
                src="https://www.svgrepo.com/show/425663/profile-people-account.svg"
                alt="Person Icon"
                width={10}
                height={10}
                className="rounded-full"
              />
            ) : (
              <Image
                src="https://www.svgrepo.com/show/116369/earth-globe-tool.svg"
                alt="Public Icon"
                width={10}
                height={10}
                className="rounded-full"
              />
            )}
            <span>{status}</span>
          </div>

          <span>{date}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
//just make for icon file
const icons = {
  pdf: "https://cdn-icons-png.flaticon.com/128/4726/4726010.png",
  docx: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
  xlsx: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
  pptx: "https://cdn-icons-png.flaticon.com/128/2875/2875416.png",
};
function FileIcon({ type, size = 45 }) {
  // Get the matching icon based on type, fallback to a default icon if not found
  const src = icons[type] || icons.docx; // Fallback to 'docx' icon as default

  return (
    <img
      src={src}
      alt={`${type || "folder"} icon`}
      width={size}
      height={size}
      className="object-contain"
    />
  );
}

export function CardFile({ title, status, date, type }) {
  return (
    <Card className="rounded-xl text-blue-400 cursor-pointer hover:bg-blue-50 transition sm:w-[160px] md:w-full h-[160px] shadow-sm">
      {/* Header */}
      <CardHeader className="pb-0 pt-2 px-4 flex justify-end">
        <div className="hover:text-black text-gray-600">
        <ModalOptionDocument />
        </div>
      </CardHeader>

      {/* Body */}
      <CardBody className="overflow-visible py-2 flex flex-col items-center space-y-2">
        <FileIcon type={type} />
        <div className="flex items-center w-full">
          <p className="truncate text-base font-semibold text-title/80 text-center px-2">
            {title} .{type}
          </p>
        </div>
      </CardBody>

      {/* Footer */}
      <CardFooter className="pt-2 px-4">
        <div className="flex justify-between items-center w-full text-[10px] text-title/50">
          <div className="flex items-center space-x-1 justify-center">
            {status === "personal" ? (
              <Image
                src="https://www.svgrepo.com/show/425663/profile-people-account.svg"
                alt="Person Icon"
                width={10}
                height={10}
                className="rounded-full"
              />
            ) : (
              <Image
                src="https://www.svgrepo.com/show/116369/earth-globe-tool.svg"
                alt="Public Icon"
                width={10}
                height={10}
                className="rounded-full"
              />
            )}
            <span>{status}</span>
          </div>
          <span>{date}</span>
        </div>
      </CardFooter>
    </Card>
  );
}