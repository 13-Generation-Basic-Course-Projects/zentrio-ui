"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  IconDelete,
  StackedProfileChecklist,
  StackedProfiles,
} from "../icon/everyicon";
import CalendarIcon from "@/assets/calendarSidebar.png";
import CommentIcon from "@/assets/commentIcon.svg";
import Image from "next/image";
import { chageStatusCheckListWhenHaveTeamLeaderAction } from "@/action/board.action";
import { useState } from "react";
import TagStatusChecklist from "../tag/TagStatus";

export const CardCheckList = ({
  title,
  startDate,
  status,
  image,
  label,
  comment,
  member,
  id,
  finishedAt,
  commentCount,
  leaderId,
  imageChecklist,
  totalCommentLength,
  matchingFeedback,
}) => {
  const finishedAtRaw = finishedAt;
  const FormattedFinishDate = finishedAtRaw.split("T")[0];
  //   ("imageChecklist", member);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="">
      <Card className="py-4 rounded-xl cursor-pointer hover:bg-blue-50 transition shadow-sm w-full">
        {/* Header */}
        <CardHeader className="pb-0 pt-2 px-4 flex items-start flex-col">
          <div className="flex w-full justify-between items-center">
            <p className="text-h6 font-semibold text-title truncate">{title}</p>
          </div>
          <p className="text-caption font-semibold text-title/50 truncate mt-2">
            Start Date: {startDate}
          </p>
          
          <TagStatusChecklist status={status} />

        </CardHeader>
        {/* Body */}
        {
          <CardBody className="overflow-visible py-2">
            <div className="relative w-full h-32">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              )}
              <img
                src={imageChecklist}
                alt={`Card background for ${title}`}
                className={`object-cover rounded-xl w-full h-32 transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageLoading(false);
                  setImageError(true);
                }}
                style={{ display: imageError ? "none" : "block" }}
              />
              {imageError && (
                <div className="w-full h-32 bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    Image not available
                  </span>
                </div>
              )}
            </div>
          </CardBody>
        }

        {/* Footer */}
        <div className=" flex items-center justify-between p-4">
          {/* nh test sent nh ot torn map data tee */}
          {matchingFeedback.length < 1 ? (
            <div></div>
          ) : (
            <p className=" p-2 bg-orange-500 text-white rounded-xl ">
              Feedback
            </p>
          )}
          <StackedProfileChecklist member={member} hidden={1} />
        </div>
        <div className="border-b m-4 items-center border-2"></div>
        <CardFooter className="pt-2 px-4 flex flex-col items-start space-y-4">
          <div className="flex w-full justify-between text-sm text-gray-600">
            <div className="flex flex-row justify-center items-center space-x-2">
              <Image
                src={CommentIcon}
                className="w-[16px] h-[16px]"
                alt="Comments icon"
              />
              <p className="text-body-sm font-semibold">{commentCount}</p>
            </div>
            <div className="flex flex-row justify-center items-center space-x-2">
              <Image
                src={CalendarIcon}
                className="w-[16px] h-[16px]"
                alt="Calendar icon"
              />
              <p className="text-body-sm/50">{FormattedFinishDate}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
