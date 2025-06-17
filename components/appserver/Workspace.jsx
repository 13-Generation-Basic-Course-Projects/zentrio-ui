import React from "react";
import Test from "../modal/Modal";
import TestOne from "../testcomponent/TestOne";
import { CardSimple, CardSimpleBySignleId } from "../card/Card";
import { Tree } from "../testcomponent/Tree";

export default function Workspace({ data, itembyid }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="grid grid-cols-2">
        <TestOne />
        <div className="flex justify-center items-center">
          <Tree />
        </div>
      </div>
      <div className="">
        <Test />
      </div>
      {/* loop */}
      <div className="px-3 grid grid-cols-3  gap-4 ">
        {data.map((item) => (
          <div key={item.workspaceId}>
            <CardSimple item={item} />
          </div>
        ))}

        {/* <CardSimpleBySignleId itembyid={itembyid} /> */}
      </div>

      {/* end loop */}
    </div>
  );
}
