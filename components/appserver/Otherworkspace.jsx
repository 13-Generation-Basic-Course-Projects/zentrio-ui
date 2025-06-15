import React from "react";

import SmallCalendar from "../testcomponent/SmallCalendar";
import CardWelcomeComponent from "../card/CardWelcome";
import CardBoard from "../card/CardBoard";
import CardMember from "../card/CardMember";
import Bar from "../bredcrum/Bar";
export default function Otherworkspace({
  Workspaceid,
  boards,
  updateFavAction,
}) {
  return (
    <>
      <div className=" w-full grid grid-cols-12 h-full">
        {/* board - this one scrolls */}
        <div className="col-span-9  flex flex-col overflow-hidden p-3 min-h-0">
          <Bar title={"My Boards"} btn={"see all"} />
          <div className="grid grid-cols-3 gap-3 scrollbar-hidden px-2 pb-[200px] py-4 overflow-y-auto  flex-1 min-h-0">
            {boards.map((el, index) => (
              <CardBoard
                key={index}
                title={el?.title}
                role={el?.role || "tl"}
                workspaceId="123"
                projectId="456"
                boardId={el?.boardId}
                image={
                  Workspaceid % 2 == 0 ? "bg-board-green" : "bg-board-primary"
                }
                isFavourite={el?.isFavourite}
                updateFavAction={updateFavAction}
              />
            ))}

            {/* your hidden add new board card here */}
            <div className="hidden flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition" />
          </div>
        </div>

        {/* event - no scroll */}
        <div className="col-span-3 p-2">
          <CardMember />
        </div>
      </div>
    </>
  );
}
