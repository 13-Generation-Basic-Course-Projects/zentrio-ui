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
}) => {
  const finishedAtRaw = finishedAt;
  const FormattedFinishDate = finishedAtRaw.split("T")[0];
  console.log("imageChecklist", imageChecklist);
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
          <div className="text-body-sm mt-4 flex flex-row items-center space-x-2 ">
            <div>
              {status === "In Progress" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="#FBBF24" // Yellow for In Progress
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15h-1v-1h1v1zm0-3h-1V7h1v7z" />
                </svg>
              )}

              {status === "Completed" && (
                <svg
                  viewBox="0 0 15 15"
                  fill="#00f576" // Green for Completed
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5ZM7.0718 10.7106L11.3905 5.31232L10.6096 4.68762L6.92825 9.2893L4.32012 7.11586L3.67993 7.88408L7.0718 10.7106Z"
                      fill="#00f576"
                    />
                  </g>
                </svg>
              )}

              {status === "Overdue" && (
                <svg
                  viewBox="0 0 24 24"
                  fill="#EF4444" // Red for Overdue
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13l-1.41 1.41L12 13.41l-3.59 3.59L7 15l3.59-3.59L7 7.83 8.41 6.41 12 10l3.59-3.59L17 7.83l-3.59 3.58L17 15z" />
                </svg>
              )}
            </div>

            <p
              className={`${
                status === "In Progress"
                  ? "text-yellow-500"
                  : status === "Completed"
                  ? "text-green-500"
                  : status === "Overdue"
                  ? "text-red-500"
                  : "text-black"
              }`}
            >
              {status}
            </p>
          </div>
        </CardHeader>
        {/* Body */}
        {
          <CardBody className="overflow-visible py-2">
            <img
              src={imageChecklist}
              alt={`Card background for ${title}`}
              className="object-cover rounded-xl w-full h-32"
            />
          </CardBody>
        }

        {/* Footer */}
        <div className="flex justify-between items-center p-4">
          <div className=" p-2 bg-orange-300 text-white ">Feedback</div>
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
