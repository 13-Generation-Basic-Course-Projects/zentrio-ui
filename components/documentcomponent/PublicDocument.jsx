import React from "react";
import { testSusupne } from "@/service/test.service";
export default async function PersonalDocument() {
  const data = await testSusupne();
  console.log(data);

  return (
    <div>
      {data.map((el) => (
        <li key={el.id}>{el.id}</li>
      ))}
    </div>
  );
}
