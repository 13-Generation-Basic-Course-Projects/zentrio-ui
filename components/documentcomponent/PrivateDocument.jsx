import React from "react";
// import { testSusupne } from "@/service/test.service";

import CardFolder, { CardFile } from "../card/CardDoc";
import Image from "next/image";
import personal from "../../assets/personal.png";
import MyDatePicker from "../date/Datepicker";
import BredCrum from "../bredcrum/Bredcrum";
import { documentData } from "@/data/document/documentData";
import { Input } from "@heroui/input";
export default async function Privatedocument({ modal }) {
  const data =  documentData;
  console.log(data);

  return (
    <div className="h-screen flex flex-col ">
      <div className="grid grid-cols-1 gap-3 ">
        <BredCrum
          board={"Hikko Design"}
          feature={"Board"}
          header={"Hikko Design"}
          modal={modal}
        />
        <div className="flex items-center justify-center pb-5">
          <MyDatePicker />

          {/* for search */}
          <div className="w-[340px] rounded-2xl flex justify-center items-center  text-white ">
            <Input
              isClearable
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
              }}
              placeholder="Type to search..."
              radius="lg"
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
        </div>
        {/* 1 */}

        <div className="flex items-center gap-3">
          <Image src={personal} alt="personal" className="h-5 w-5" />
          <p className="text-h5 font-semibold">Personal</p>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 overflow-y-auto scrollbar-hidden pb-40 pt-10">
        {data
          .filter((el) => el.status === "personal")
          .map((el, i) => {
            if (el.category === "Folder" || el.type === "folder") {
              return (
                <CardFolder
                  key={i}
                  title={el.title}
                  status={el.status}
                  date={el.date}
                />
              );
            } else {
              return (
                <CardFile
                  key={i}
                  title={el.title}
                  status={el.status}
                  date={el.date}
                  type={el.type}
                />
              );
            }
          })}
      </div>
    </div>
  );
}


// for icon search
export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
