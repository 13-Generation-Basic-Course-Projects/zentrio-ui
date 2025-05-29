import React from "react";
import { testSusupne } from "@/service/test.service";
import CardFolder, { CardFile } from "../card/CardDoc";
import Image from "next/image";
import personal from "../../assets/personal.png";
import MyDatePicker from "../date/Datepicker";
import BredCrum from "../bredcrum/Bredcrum";
import { documentData } from "@/data/docu/documentData";
export default async function Privatedocument({ modal }) {
  //const data = await testSusupne();
  console.log(documentData);
  //console.log(data);
  const data = documentData;

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
        </div>
        {/* 1 */}

        <div className="flex items-center gap-3">
          <Image src={personal} alt="personal" className="h-5 w-5" />
          <p className="">Personal</p>
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
