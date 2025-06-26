import React from "react";

import Image from "next/image";
import personal from "../../assets/personal.png";
import MyDatePicker from "../date/MyDatePicker";
import BredCrum from "../bredcrum/MyBredcrum";
import { documentData } from "@/data/docu/documentData";
import CardFolder, { CardFile } from "../card/CardDoc";
export default function Privatedocument({ modal }) {
  console.log(documentData);

  const data = documentData;

  return (
    <div className="h-screen flex flex-col ">
      <div className="grid grid-cols-1 gap-3 ">
        <BredCrum
          board={"Hikko Design"}
          feature={"Document"}
          header={"Folder"}
          modal={modal}
        />
        <div className="flex items-center justify-center pb-5">
          <MyDatePicker />
        </div>
        {/* 1 */}

        <div className="flex items-center gap-3">
          <Image src={personal} alt="personal" className="h-5 w-5" />
          <p className="">Personal</p>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3 overflow-y-auto scrollbar-hidden pb-40 px-5  pt-10">
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
