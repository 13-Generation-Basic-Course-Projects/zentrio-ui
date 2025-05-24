import SmallCalendar from "../testcomponent/SmallCalendar";
import CardWelcomeComponent from "../card/CardWelcome";
import CardBoard from "../card/CardBoard";
import CardBoardEmpty from "../card/CardBoardEmpty";

export default function MyworkspaceEmpty() {
  return (
    <div className="flex-1 mt-10 px-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: Welcome + Boards */}
        <div className="col-span-8">
          <CardWelcomeComponent />

          {/* My Boards Section */}
          <div>
            <div className="grid grid-cols-3 gap-3">
              {/* 2 */}
              <CardBoard
                title={"hello"}
                image={
                  "https://images.ctfassets.net/hrltx12pl8hq/6bmW9PJSlK94iaGzxiFmyz/4a4195674a90600699468b44f9e0d38d/4_vector.webp"
                }
              />
              {/* 2.5 */}
              <CardBoardEmpty />
              {/* 3 */}
              <div className=" hidden flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition"></div>
            </div>
          </div>
        </div>

        {/* Right Side: Calendar + Members */}
        <div className="col-span-4  ">
          <div className="w-full grow">
            <SmallCalendar />
          </div>

          <div className="h-[400px] bg-white rounded-xl p-8 shadow-md flex flex-col">
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
