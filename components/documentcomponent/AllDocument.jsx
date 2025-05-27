import React from "react";
import CardFolder, { CardFile } from "../card/CardDoc";
import Image from "next/image";
import MyDatePicker from "../date/Datepicker";
import BredCrum from "../bredcrum/Bredcrum";

import personal from "../../assets/personal.png";
import publicIcon from "../../assets/public.png";

export default function AllDocument({
  privateData = [],
  publicData = [],
  modal,
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="grid grid-cols-1 gap-3">
        <BredCrum
          board="All Documents"
          feature="Board"
          header="All Documents"
        //   modal={modal}
        />
        <div className="flex items-center justify-center pb-5">
          <MyDatePicker />
        </div>

        {/* Public Section */}
        <div className="flex items-center gap-3 mt-4">
          <Image src={publicIcon} alt="public" className="h-5 w-5" />
          <p className="font-semibold">Public</p>
        </div>
        <div className="grid grid-cols-6 gap-3 overflow-y-auto scrollbar-hidden pb-5">
          {publicData.length > 0 ? (
            publicData.map((el, i) => (
              <React.Fragment key={`public-${i}`}>
                <CardFolder
                  title={el.title || "Untitled Folder"}
                  status={el.status || "true"}
                  date={el.date || "2025-05-25"}
                />
                <CardFile
                  title={el.title || "Untitled File"}
                  status={el.status || "true"}
                  date={el.date || "2025-05-25"}
                />
              </React.Fragment>
            ))
          ) : (
            <p className="text-gray-500 col-span-6">No Public Documents</p>
          )}
        </div>

        {/* Private Section */}
        <div className="flex items-center gap-3 mt-8">
          <Image src={personal} alt="private" className="h-5 w-5" />
          <p className="font-semibold">Private</p>
        </div>
        <div className="grid grid-cols-6 gap-3 overflow-y-auto scrollbar-hidden pb-5">
          {privateData.length > 0 ? (
            privateData.map((el, i) => (
              <React.Fragment key={`private-${i}`}>
                <CardFolder
                  title={el.title || "Untitled Folder"}
                  status={el.status || "true"}
                  date={el.date || "2025-05-25"}
                />
                <CardFile
                  title={el.title || "Untitled File"}
                  status={el.status || "true"}
                  date={el.date || "2025-05-25"}
                />
              </React.Fragment>
            ))
          ) : (
            <p className="text-gray-500 col-span-6">No Private Documents</p>
          )}
        </div>
      </div>
    </div>
  );
}
