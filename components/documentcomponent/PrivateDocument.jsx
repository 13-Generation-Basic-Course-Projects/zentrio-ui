import React from "react";
import { testSusupne } from "@/service/test.service";
export default async function PublicDocument() {
  const data = await testSusupne();
  console.log(data);

  return (
    <div>
      {data.map((el) => (
        <li key={el.id}>{el.title}</li>
      ))}
    </div>
  );
}
