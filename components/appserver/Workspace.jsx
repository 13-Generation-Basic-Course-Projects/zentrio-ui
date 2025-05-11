import React from "react";
import Test from "../modal/Modal";
import TestOne from "../testcomponent/TestOne";
import { CardSimple, CardSimpleBySignleId } from "../card/Card";

export default function Workspace({ data, itembyid }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="">
        <TestOne />
      </div>
      <div className="">
        <Test />
      </div>
      {/* loop */}
      <div className="px-3 grid grid-cols-3  gap-4">
        {/* {data.map((item) => (
          <div key={item.workspaceId}>
            <CardSimple item={item} />
          </div>
        ))} */}

        <CardSimpleBySignleId itembyid={itembyid} />
      </div>

      {/* end loop */}
    </div>
  );
}
