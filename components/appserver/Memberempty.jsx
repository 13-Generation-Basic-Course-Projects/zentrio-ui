// import iconSearch from "@/assets/search.png";
// import icon1 from "@/assets/icon1.png";
// import arrowdown from "@/assets/arrow-down.png";
// import member from "@/assets/memberSideBar.png";
import empty from "../../assets/emptyMember.png";
import Image from "next/image";
import { Button } from "@heroui/react";
export default function Memberempty() {
  return (
    <div className="p-4 ">
      <nav className="text-h6 text-[#94A3B8]">
        <ol className="flex space-x-2">
          <li>
            <a href="#" className=" hover:text-blueActive">
              Workspace
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-blueActive">
              Hikoko Design
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className=" hover:text-blueActive">
              Member
            </a>
          </li>
        </ol>
      </nav>
      <header className="text-h1 text-titles font-semibold">
        <p>Members</p>
      </header>
      <div className="flex flex-row justify-between ">
        <div className="flex items-center w-[600px] h-[45px] border border-gray-200 rounded-[16px] shadow-sm overflow-hidden bg-white text-input text-title">
          <div className="relative flex items-center gap-1 px-3 border-r border-gray-200">
            <div className="w-[16px] h-[16px]">
              {/* <Image src={icon1} alt="filter" /> */}
            </div>

            <select className="bg-transparent outline-none text-sm cursor-pointer appearance-none w-auto">
              <option value="all">All</option>
              <option value="week">Last week</option>
              <option value="month">Last month</option>
              <option value="year">Last year</option>
            </select>

            <div className="absolute right-2 pointer-events-none w-[10px] h-[6px]">
              {/* <Image
                src={arrowdown}
                alt="dropdown arrow"
                className="w-full h-full"
              /> */}
            </div>
          </div>

          <div className="flex items-center px-2 ">
            {/* <Image src={iconSearch} /> */}
          </div>
          <input
            type="text"
            placeholder="Search"
            className="flex-1 h-full px-2 bg-white text-gray-700 outline-none placeholder-gray-400"
          />
        </div>
        <Button
          size="lg"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300  hover:bg-gray-100"
        >
          {/* <Image src={member} alt="Member Icon" className="w-4 h-4" /> */}
          invite
        </Button>
      </div>

      <section className="flex justify-center items-center ">
        <div className="flex flex-col items-center space-y-4 text-center ">
          <div className="w-[300px] h-auto mt-20">
            <Image
              src={empty}
              alt="No members illustration"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="text-h2 font-semibold text-title/80">No Members Yet</p>
          <p className="text-h5 text-title/50 max-w-md">
            Invite or add new members to get started!
          </p>
        </div>
      </section>
    </div>
  );
}
