"use client";
import React from "react";

import SmallCalendar from "../testcomponent/SmallCalendar";
import CardWelcomeComponent from "../card/CardWelcome";
import CardBoard from "../card/CardBoard";
import CardMember from "../card/CardMember";
import Bar from "../bredcrum/Bar";
import { usePathname } from "next/navigation";
export default function Otherworkspace({
  Workspaceid,
  boards,
  updateFavAction,
  allMembersInOther,
}) {
  console.log("All members in other workspace : ", allMembersInOther);
  console.log("Join board in other workspace : ", boards);
  const pathname = usePathname();
  const includesPathOtherWorkSpace = pathname.includes(
    "/workspace/otherworkspace"
  );
  // console.log("is the the other workspace", includesPath);
  return (
    <>
      <div className=" w-full grid grid-cols-12 h-full">
        {/* board - this one scrolls */}
        <div className="col-span-9  flex flex-col overflow-hidden p-3 min-h-0">
          <Bar title={"joined Boards"} btn={"see all"} />
          <div className="grid grid-cols-3 gap-3 scrollbar-hidden px-2 pb-[200px] py-4 overflow-y-auto  flex-1 min-h-0">
            {boards.map((el, index) => (
              <CardBoard
                includesPathOtherWorkSpace={includesPathOtherWorkSpace}
                key={index}
                title={el?.title}
                role={el?.role || "tl"}
                workspaceId="123"
                projectId="456"
                boardId={el?.boardId}
                image={el?.cover}
                images={el?.image}
                isFavourite={el?.isFavourite}
                updateFavAction={updateFavAction}
                isFavBtn={false}
                otherBoardImage={el?.imageUrl}
              />
            ))}

            {/* your hidden add new board card here */}
            <div className="hidden flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition" />
          </div>
        </div>

        {/* event - no scroll */}
        <div className="col-span-3 p-2">
          <CardMember members={allMembersInOther} />
        </div>
      </div>
    </>
  );
}
