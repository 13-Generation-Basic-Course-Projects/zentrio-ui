import React from "react";
import Test from "../modal/Modal";
import TestOne from "../testcomponent/TestOne";
import { CardSimple } from "../card/Card";
export default function Workspace({ data }) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <Test />
      </div>
      <div className="flex justify-center items-center">
        <TestOne />
      </div>
      {/* loop */}
      <div className="px-3 grid grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.id}>
            <CardSimple item={item} />
          </div>
        ))}
      </div>

      {/* end loop */}
    </div>
  );
}
