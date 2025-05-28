"use client";

import BredCrum from "../bredcrum/Bredcrum";
import MyDatePicker from "../date/DatePicker";
import CardFolder, { CardFile } from "../card/CardDoc";
import ModalCreateDocu from "../modal/docu/ModalCreateDocu";
import { documentData } from "@/data/document/documentData";

export default function AllDocument() {
  const data = documentData;
  console.log("Received data in all:", data);

  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-1 gap-3">
        <div className="p-0">
          <nav className="text-h6 text-[#94A3B8]">
            <ol className="flex space-x-2">
              <li>
                <a href="#" className="hover:text-blueActive">
                  Workspace
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="#" className="hover:text-blueActive">
                  Hikko Design
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="#" className="hover:text-blueActive">
                  Board
                </a>
              </li>
            </ol>
          </nav>

          <div className=" grid grid-cols-2  ">
            <div>
              <p className="text-h1 text-titles font-semibold">Hikko Design</p>
            </div>

            <div className=" flex items-center justify-end  gap-3 ">
              <ModalCreateDocu />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center pb-5">
          <MyDatePicker />
        </div>

        {/* Folders Section */}
        <div className="grid grid-cols-6 gap-3 overflow-y-auto scrollbar-hidden pb-40 pt-10">
          {data && data.length > 0 ? (
            data
              .filter((el) => el.category === "Folder")
              .map((el, i) => (
                <CardFolder
                  key={`folder-${i}`}
                  title={el.title || "Untitled Folder"}
                  status={el.status || "personal"}
                  date={el.date || "2025-05-25"}
                />
              ))
          ) : (
            <p className="text-gray-500 col-span-6">No Folders</p>
          )}
        </div>

        {/* Files Section */}
        <div className="grid grid-cols-6 gap-3 overflow-y-auto scrollbar-hidden pb-40 pt-10">
          {data && data.length > 0 ? (
            data
              .filter((el) => el.category === "File")
              .map((el, i) => (
                <CardFile
                  key={`file-${i}`}
                  title={el.title || "Untitled File"}
                  status={el.status || "personal"}
                  date={el.date || "2025-05-25"}
                />
              ))
          ) : (
            <p className="text-gray-500 col-span-6">No Files</p>
          )}
        </div>
      </div>
    </div>
  );
}
