import React from "react";
import Image from "next/image";
export default function TestDocument({ title }) {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
            <div>
              <div className="max-w-lg md:max-w-none">
                <p className="mt-4 text-gray-700">{title} page</p>
              </div>
            </div>

            <div>
              <img
                src={` https://thunderdungeon.com/wp-content/uploads/2024/11/Im-just-a-chill-guy-memes-10-20241120-600x750.jpg `}
                className="rounded"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
