import SmallCalendar from "../testcomponent/SmallCalendar";
import CardWelcomeComponent from "../card/CardWelcome";
import CardBoard from "../card/CardBoard";
import CardBoardEmpty from "../card/CardBoardEmpty";

export default function Myworkspace({ Workspaceid }) {
  return (
    <div className="flex-1 pt-0 px-6 h-screen overflow-hidden">
      <div className="grid grid-cols-12  gap-6 h-full">
        {/* Left Side: Welcome + Boards */}
        <div className="col-span-8 flex flex-col p-2 overflow-hidden pt-10">
          <div>
            <CardWelcomeComponent />
          </div>

          {/* My Boards Section */}

          <div className="grid grid-cols-3 gap-3 overflow-y-scroll scrollbar-hidden   pr-2  pb-[30px] py-4">
            {Array.from({ length: 5 * Workspaceid }).map((_, index) => (
              <CardBoard
                key={index}
                title={`hello ${Workspaceid}`}
                image="https://images.ctfassets.net/hrltx12pl8hq/6bmW9PJSlK94iaGzxiFmyz/4a4195674a90600699468b44f9e0d38d/4_vector.webp"
              />
            ))}

            {/* your hidden add new board card here */}
            <div className="hidden flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition" />
          </div>
        </div>

        {/* Right Side: Calendar + Members */}
        <div className="col-span-4 flex flex-col gap-4 h-full pt-10">
          <div className="w-full">
            <SmallCalendar />
          </div>

          <div className="flex-1 bg-white rounded-xl p-8 shadow-md flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Members</h2>
              <button className="text-xs text-gray-400 hover:underline">
                See all
              </button>
            </div>

            {/* Centered message */}
            <div className="flex-1 flex items-center justify-center text-gray-400">
              No members yet
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
