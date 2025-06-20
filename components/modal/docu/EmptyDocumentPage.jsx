"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Brash,
  DriveIcon,
  GoogleDocxIcon,
  GoogleIcon,
  GoogleSheetsIcon,
  GoogleSlideIcon,
  HumanSayHi,
} from "./ElementInDocuEmptyPage";
import BredCrum from "@/components/bredcrum/MyBredcrum";
import ModalSignIn from "./ModalSignIn";

export default function WelcomePage({ workspaceId }) {
  return (
    <div className="h-full ">
      {/* Breadcrumb Section */}
      <div className="p-5">
        <BredCrum
          board={"Hikko Design"}
          feature={"Document"}
          header={"Document"}
          modal={[<ModalSignIn />]}
          workspaceId={workspaceId}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-80px)] overflow-hidden relative ">
        {/* Header Text */}
        <h1 className="text-[35px] font-bold text-center mt-8 text-[#143A47]">
          Take <span className="text-primary"> control </span> of your tasks and{" "}
          <span className="text-primary"> simplify </span> your day.
        </h1>

        {/* Central Illustration */}
        <div className="absolute z-10">
          <HumanSayHi />
        </div>

        {/* Card Container */}
        <div className="relative w-full  mx-auto h-full flex items-center justify-center">
          {/* Google Docs Card - Left Middle */}
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
                    <p className="w-[115px] text-right text-title text-body font-bold">
                      Google Docs
                    </p>
                  </div>
                  <div className="flex">
                    <div className="w-[40px] block"></div>
                    <p className="text-body-sm text-title w-full pt-1 pb-3 text-left">
                      Prepare detailed documents and collaborate in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
                    <p className="w-[125px] text-right text-title text-body font-bold">
                      Google Slides
                    </p>
                  </div>
                  <div className="flex">
                    <div className="w-[40px] block"></div>
                    <p className="text-body-sm text-title text-left pt-1 pb-3 w-full">
                      Create engaging presentations with ease our UI.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[30%] right-[5%]">
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
                    <p className="w-[135px] text-right text-title text-body font-bold">
                      Google Sheets
                    </p>
                  </div>
                  <div className="flex">
                    <div className="w-[65px] block"></div>
                    <p className="text-body-sm text-title pt-1 py-[12px]">
                      Prepare detailed documents and collaborate in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative Icons */}
          <div className="absolute bottom-[25%] left-[25%] ">
            <DriveIcon />
          </div>
          <div className="absolute top-[40%] right-[15%] ">
            <GoogleIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
