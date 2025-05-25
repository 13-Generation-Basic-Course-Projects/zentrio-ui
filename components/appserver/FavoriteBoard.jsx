import SmallCalendar from "../testcomponent/SmallCalendar";
import CardWelcomeComponent from "../card/CardWelcome";
import CardBoardFavorite from "../card/CardBoardFavorite";
import { boardbackground } from "../../data/boardbackground";

export default function MyFavoriteBoard() {
  // return (
  //   <div className="flex-1 pt-0 px-6 h-screen overflow-hidden">
  //     <div className="grid grid-cols-12  gap-6 h-full">
  //       {/* Left Side: Welcome + Boards */}
  //       <div className="col-span-9 flex flex-col p-2 overflow-hidden pt-10">
  //         <div>
  //           <CardWelcomeComponent />
  //         </div>

  //         {/* My Boards Section */}

  //         <div className="grid grid-cols-3 gap-3 overflow-y-scroll scrollbar-hidden   pr-2  pb-[200px] py-4">
  //           {Array.from({ length: 6 }).map((_, index) => (
  //             <CardBoardFavorite
  //               key={index}
  //               title={`hello favorite`}
  //               image={"bg-board-purple"}
  //             />
  //           ))}
  //         </div>
  //       </div>

  //       {/* Right Side: Calendar + Members */}
  //       <div className="col-span-3 flex flex-col gap-4 h-full pt-10">
  //         <div className="w-full  max-width-none">
  //           <SmallCalendar />
  //         </div>
  //         {/* member */}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className=" w-full grid grid-cols-12 h-full">
      {/* board - this one scrolls */}
      <div className="col-span-9  flex flex-col overflow-hidden p-3 min-h-0">
        <div className="grid grid-cols-3 gap-3 scrollbar-hidden pr-2 pb-[200px] py-4 overflow-y-auto  flex-1 min-h-0">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardBoardFavorite
              key={index}
              title={`hello favorite`}
              image={"bg-board-purple"}
            />
          ))}

          {/* your hidden add new board card here */}
          <div className="hidden flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition" />
        </div>
      </div>

      {/* event - no scroll */}
      <div className="col-span-3 ">member</div>
    </div>
  );
}
