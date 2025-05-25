import React from "react";
import { testSusupne } from "@/service/test.service";
import CardFolder, { CardFile } from "../card/CardDoc";

export default async function Privatedocument() {
  const data = await testSusupne();
  console.log(data);

  return (
    <div>
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
