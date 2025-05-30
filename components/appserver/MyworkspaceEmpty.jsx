import SmallCalendar from "../testcomponent/SmallCalendar";
import CardWelcomeComponent from "../card/CardWelcome";
import CardBoardEmpty from "../card/CardBoardAdd";
import CardMember from "../card/CardMember";
import Bar from "../bredcrum/Bar";

export default function MyworkspaceEmpty() {
  return (
    <div className=" w-full grid grid-cols-12 h-full">
      {/* board - this one scrolls */}
      <div className="col-span-9  flex flex-col overflow-hidden p-3 min-h-0">
        <Bar title={"My Boards"} />
        <div className="grid grid-cols-3 gap-3 scrollbar-hidden px-2 pb-[200px] py-4 overflow-y-auto  flex-1 min-h-0">
          <CardBoardEmpty />

          {/* your hidden add new board card here */}
          <div className="hidden flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition" />
        </div>
      </div>

      
        {/* event - no scroll */}
        <div className="col-span-3 p-2">
          <CardMember data={"null"}/>
        </div>
    </div>
  );
}
