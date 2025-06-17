import React from "react";
import MyDatePicker from "../date/Datepicker";
import publicIcon from "../../assets/public.png";
import Image from "next/image";
import BredCrum from "../bredcrum/MyBredcrum";
import { documentData } from "@/data/docu/documentData";
import CardFolder, { CardFile } from "../card/CardDoc";
export default function PublicDocument({ modal }) {
  const data = documentData;
  console.log(data);
  return (
    <div className="h-screen flex flex-col">
      <div className="grid grid-cols-1 gap-3 ">
        <BredCrum
          board={"Hikko Design"}
          feature={"Document"}
          header={"Document"}
          modal={modal}
        />
        <div className="flex items-center justify-center pb-5">
          <MyDatePicker />
        </div>
        {/* 1 */}

        <div className="flex items-center gap-3">
          <Image src={publicIcon} alt="personal" className="h-5 w-5" />
          <p className="">Public</p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-3 overflow-y-auto scrollbar-hidden pb-40 px-5 pt-10">
        {data
          .filter((el) => el.status === "public")
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
