import React from "react";
import { testSusupne } from "@/service/test.service";
import CardFolder, { CardFile } from "../card/CardDoc";
import Image from "next/image";
import personal from "../../assets/personal.png";
import MyDatePicker from "../date/Datepicker";
export default async function Privatedocument() {
  const data = await testSusupne();
  console.log(data);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 h-[150px]">
        <div className="flex items-center justify-center">
          <MyDatePicker />
        </div>
        {/* 1 */}

        <div className="flex items-center gap-3">
          <Image src={personal} alt="personal" className="h-5 w-5" />
          <p className="">Personal</p>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-3">
        {data.map((el, i) => (
          <CardFile
            key={i}
            title={"nigga"}
            status={"true"}
            date={"2025-05-25"}
          />
        ))}
      </div>
    </div>
  );
}
