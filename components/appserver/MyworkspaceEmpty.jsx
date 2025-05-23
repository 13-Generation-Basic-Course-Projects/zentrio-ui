import SmallCalendar from "../testcomponent/SmallCalendar";
import CardWelcomeComponent from "../card/CardWelcome";

export default function Myworkspace() {
  return (
    <main className="flex-1 mt-10 px-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Side: Welcome + Boards */}
        <div className="col-span-8">
          <CardWelcomeComponent />

          {/* My Boards Section */}
          <div>
            <h2 className="text-h5 font-semibold pb-3 border-b border-gray-200 mb-6">
              My Boards
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition">
                <div className="flex items-center justify-center w-14 h-14 text-h1 text-primary border-2 border-dashed border-primary rounded-full leading-none">
                  + 
                </div>
                <div className="text-primary mt-2 font-medium">
                  Create New Board
                </div>
              </div>

              <div className="flex flex-col items-center border-2 border-dashed border-blue-400 rounded-xl p-10 text-center text-blue-400 cursor-pointer hover:bg-blue-50 transition">
                
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Calendar + Members */}
        <div className="col-span-4 space-y-6">
          <div className="w-full">
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
    </main>
  );
}
