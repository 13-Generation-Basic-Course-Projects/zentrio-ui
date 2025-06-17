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
        <div className="grid grid-cols-3 gap-3 scrollbar-hidden px-2 pb-[200px] py-4 overflow-y-auto flex-1 min-h-0">
          {/* Empty State Container */}
          <div className="col-span-3 flex items-center justify-center h-full">
            <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-lg max-w-2xl w-full">
              {/* Left: 3D Icon */}
              <img
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg"
                alt="No boards"
                width={256}
                height={256}
                className="object-contain"
              />
              {/* Right: Text */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  Nothing Here Yet
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                  It looks like this section is empty. Start by adding some
                  content or explore other features to get started!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* event - no scroll */}
      <div className="col-span-3 p-2">
        <CardMember data={"null"} />
      </div>
    </div>
  );
}
