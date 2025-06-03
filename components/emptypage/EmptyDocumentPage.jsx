"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Brash, DriveIcon, GoogleDocxIcon, GoogleIcon, GoogleSheetsIcon, GoogleSlideIcon, HumanSayHi } from "./ElementInDocuEmptyPage";

export default function WelcomePage() {
  return (
    <>
      <div className="w-full h-full">
        <div className="text-[12px]">
          <nav aria-label="breadcrumb" className="w-max">
            <ol className="flex w-full flex-wrap items-center rounded-md bg-slate-50 px-4 py-2">
              <li className="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                <a href="#">Docs</a>
                <span className="pointer-events-none mx-2 text-slate-800">
                  /
                </span>
              </li>
              <li className="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                <a href="#">Components</a>
                <span className="pointer-events-none mx-2 text-slate-800">
                  /
                </span>
              </li>
              <li className="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
                <a href="#">Breadcrumbs</a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-h1 font-semibold">Document</p>
          <Button className="w-[96px] h-[48px] rounded-[10px]">Sign in</Button>
        </div>
        <div className="h-[107px] flex justify-center items-center">
          <p className="w-[639px] text-h2 font-bold bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text">Take <span className="text-transparent">control</span> of your tasks and <span className="text-transparent">simplify</span> your day. </p>
        </div>
        <div className="h-full w-full relative">
          <div className="flex justify-center">
            <HumanSayHi />
          </div>
          {/* Google Slide */}
          <div className="absolute top-[15%] right-[10%]">
            <div className="w-[400px] h-[140px] flex items-end relative">
              <div className="absolute z-50 top-0 bg-white right-0 flex items-center justify-center rounded-[10px] px-2.5 h-[40px] w-fit">
                <div className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text">
                  <p className="text-h4 text-transparent">Seamless</p>
                </div>
              </div>
              <div className="pl-[25px]">
                <div className="w-[328px] bg-transparent rounded-[20px] border-gray-500/10 border-2 pt-[15px] pl-[25px]">
                  <div className="flex items-left">
                    <GoogleSlideIcon />
                    <p className="w-[125px] text-right text-title text-body font-bold">Google Slides</p>
                  </div>
                  <div className="flex">
                    <div className="w-[40px] block"></div>
                    <p className="text-body-sm text-title text-left pt-1 pb-3 w-full">Create engaging presentations with ease our UI.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Sheet */}
          <div className="absolute bottom-[10%] right-[10%]">
            <div className="w-[458px] h-[150px] flex items-center justify-end relative">
              <div className="absolute z-50 bottom-0 left-0 bg-white flex items-center justify-center rounded-[10px] px-[10px] h-[40px] w-fit">
                <div className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text">
                  <p className="text-h4 text-transparent">Synchronized</p>
                </div>
              </div>
              <div className="pl-[25px]">
                <div className="w-[328px] bg-transparent rounded-[20px] border-gray-500/10 border-2 pt-[15px] pl-[25px]">
                  <div className="flex items-center">
                    <GoogleSheetsIcon />
                    <p className="w-[135px] text-right text-title text-body font-bold">Google Sheets</p>
                  </div>
                  <div className="flex">
                    <div className="w-[65px] block"></div>
                    <p className="text-body-sm text-title pt-1 py-[12px]">Prepare detailed documents and collaborate in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google docs */}
          <div className="absolute top-[45%] left-[15%]">
            <div className="w-[368px] h-[140px] flex items-end relative">
              <div className="absolute z-50 top-0 bg-white flex items-center justify-center rounded-[10px] h-[40px] w-[100px]">
                <div className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text">
                  <p className="text-h4 text-transparent">Smart</p>
                </div>
              </div>
              <div className="pl-[25px]">
                <div className="w-[328px] bg-transparent rounded-[20px] border-gray-500/10 border-2 pt-[15px] pl-[25px]">
                  <div className="flex items-center">
                    <GoogleDocxIcon />
                    <p className="w-[115px] text-right text-title text-body font-bold">Google Docs</p>
                  </div>
                  <div className="flex">
                    <div className="w-[40px] block"></div>
                    <p className="text-body-sm text-title w-full pt-1 pb-3 text-left">Prepare detailed documents and collaborate in real-time.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Drive Icon */}
          <div className="absolute top-[75%] left-[30%]">
            <DriveIcon />
          </div>

          {/* Google Icon */}
          <div className="absolute right-[15%] top-[45%]">
            <GoogleIcon />
          </div>
        </div>
      </div>
    </>
  );
}
