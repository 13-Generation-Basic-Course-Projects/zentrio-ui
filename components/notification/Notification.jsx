"use client";

import ActiveIcon from "@/assets/notification/activeIcon.png";
import SettingIcon from "@/assets/notification/settingIcon.png";
import TrashIcon from "@/assets/notification/trashIcon.png";
import Image from "next/image";
import { notifications } from "@/data/allDataV2";
import { useState } from "react";

export function Notification() {
  const [isActive, setIsActive] = useState(false);

  const notifi = notifications;
  console.log(notifi);
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-slate-blue">
        <div className="w-[450px] h-fit bg-white shadow-sm rounded-[22px]">
          {/* Header */}
          <div className="flex items-center justify-between px-[15px]">
            <div className="h-fit">
              <p className="text-body-lg text-title py-[28px] font-medium h-fit">
                Notification
              </p>
            </div>
            <div className="h-fit">
              <Image
                src={SettingIcon}
                alt="SettingIcon"
                className="w-[22px] h-fit"
              />
            </div>
          </div>

          {/* User */}
          <div className="overflow-y-scroll h-[400px]">
            <div className="flex justify-between items-start bg-slate-blue-more py-[20px]">
              <div className="flex gap-[15px] pl-[15px]">
                <div>
                  <Image
                    src={ActiveIcon}
                    alt="ActiveIcon"
                    className="w-[40px] h-fit"
                  />
                </div>
                <div className="flex flex-col gap-[3.5px]">
                  <p className="text-[15px] text-title">Seam Chiminh</p>
                  <p className="text-body-sm text-description">
                    welcome to Zentrio system
                  </p>
                  <p className="text-body-sm text-description">
                    created Task Back-End.
                  </p>
                  <p className="text-body-sm text-description">5 May</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center pr-[15px]">
                <Image
                  src={ActiveIcon}
                  alt="ActiveIcon"
                  className="w-[7px] h-fit"
                />
                <Image
                  src={TrashIcon}
                  alt="TrashIcon"
                  className="w-[20px] h-fit mt-[10px] cursor-pointer"
                />
              </div>
            </div>
            {/* <div className="flex justify-between items-start bg-slate-blue-more py-[20px]">
                        <div className="flex gap-[15px] pl-[15px]">
                            <div>
                                <Image
                                    src={ActiveIcon}
                                    alt="ActiveIcon"
                                    className="w-[40px] h-fit"
                                />
                            </div>
                            <div className="flex flex-col gap-[3.5px]">
                                <p className="text-[15px] text-title">Seam Chiminh</p>
                                <p className="text-body-sm text-description">welcome to Zentrio system</p>
                                <p className="text-body-sm text-description">created Task Back-End.</p>
                                <p className="text-body-sm text-description">5 May</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center pr-[15px]">
                            <Image
                                src={ActiveIcon}
                                alt="ActiveIcon"
                                className="w-[7px] h-fit"
                            />
                            <Image
                                src={TrashIcon}
                                alt="TrashIcon"
                                className="w-[20px] h-fit mt-[10px] cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-start bg-slate-blue-more py-[20px]">
                        <div className="flex gap-[15px] pl-[15px]">
                            <div>
                                <Image
                                    src={ActiveIcon}
                                    alt="ActiveIcon"
                                    className="w-[40px] h-fit"
                                />
                            </div>
                            <div className="flex flex-col gap-[3.5px]">
                                <p className="text-[15px] text-title">Seam Chiminh</p>
                                <p className="text-body-sm text-description">welcome to Zentrio system</p>
                                <p className="text-body-sm text-description">created Task Back-End.</p>
                                <p className="text-body-sm text-description">5 May</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center pr-[15px]">
                            <Image
                                src={ActiveIcon}
                                alt="ActiveIcon"
                                className="w-[7px] h-fit"
                            />
                            <Image
                                src={TrashIcon}
                                alt="TrashIcon"
                                className="w-[20px] h-fit mt-[10px] cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-start bg-slate-blue-more py-[20px]">
                        <div className="flex gap-[15px] pl-[15px]">
                            <div>
                                <Image
                                    src={ActiveIcon}
                                    alt="ActiveIcon"
                                    className="w-[40px] h-fit"
                                />
                            </div>
                            <div className="flex flex-col gap-[3.5px]">
                                <p className="text-[15px] text-title">Seam Chiminh</p>
                                <p className="text-body-sm text-description">welcome to Zentrio system</p>
                                <p className="text-body-sm text-description">created Task Back-End.</p>
                                <p className="text-body-sm text-description">5 May</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center pr-[15px]">
                            <Image
                                src={ActiveIcon}
                                alt="ActiveIcon"
                                className="w-[7px] h-fit"
                            />
                            <Image
                                src={TrashIcon}
                                alt="TrashIcon"
                                className="w-[20px] h-fit mt-[10px] cursor-pointer"
                            />
                        </div>
                    </div> */}
          </div>

          {/* footerNotification */}
          <div className="flex justify-between px-[15px] py-[33px]">
            <p className="text-description cursor-pointer">
              See All Notification
            </p>
            <p
              className={
                isActive
                  ? `text-description cursor-pointer`
                  : `text-blueActive cursor-pointer`
              }
              onClick={() => setIsActive(!isActive)}
            >
              Mark All As Read
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
