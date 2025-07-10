"use client";

import { TypewriterEffectSmooth } from "../ui/typewriter-effect";

export default function TypewriterEffectSmoothDemo() {
  // Only Zentrio types out
  const words = [
    { text: "Empower Your Team with" },
    // { text: "Collaboration" },
  ];

  return (
    <>
      <h1 className="text-h4 sm:text-h3 lg:text-[64px] font-bold mb-4 relative">
        <TypewriterEffectSmooth words={words} /> <br />
        <span className="text-primary h-[81px] border-2 border-primary bg-slate-blue border-dashed rounded-[10px] px-[20px]">
          ZenTrio
        </span>{" "}
        <svg
          width="27"
          height="27"
          className="absolute left-[3.5%] bottom-[0%]"
          viewBox="0 0 27 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.1441 5.5268C22.1869 5.42813 22.199 5.31888 22.1789 5.21324C22.1588 5.1076 22.1073 5.01045 22.0313 4.93441C21.9552 4.85837 21.8581 4.80694 21.7525 4.78682C21.6468 4.76669 21.5376 4.77879 21.4389 4.82155L4.10557 11.8632C4.00017 11.9062 3.91098 11.9812 3.85065 12.0777C3.79032 12.1742 3.76191 12.2872 3.76947 12.4008C3.77702 12.5144 3.82015 12.6227 3.89273 12.7103C3.96531 12.798 4.06366 12.8605 4.17382 12.8891L10.8081 14.6008C11.183 14.6972 11.5252 14.8922 11.7991 15.1656C12.0731 15.439 12.2688 15.7807 12.366 16.1554L14.0766 22.7919C14.1052 22.902 14.1677 23.0004 14.2554 23.073C14.343 23.1455 14.4513 23.1887 14.5649 23.1962C14.6785 23.2038 14.7915 23.1754 14.888 23.1151C14.9845 23.0547 15.0595 22.9655 15.1025 22.8601L22.1441 5.5268Z"
            fill="#59BAD5"
            stroke="#59BAD5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Collaboration
      </h1>
    </>
  );
}