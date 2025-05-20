import { Button } from "@heroui/react";
import React from "react";

export default function AboutUs() {
  return (
    <div className="w-full">
      <header className="p-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-center">Zentrio</h1>
      </header>

      <div className="w-full px-4 py-6">
        <div className="max-w-screen-2xl mx-auto p-4 rounded-xl">
          {/* Hero Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-purple-300 p-4">
            {/* Left Card */}
            <div className="relative">
              <div className="bg-[#FFFF] p-6 shadow-md rounded-bl-[40px] rounded-tl-[40px]  rounded-tr-[40px]  relative overflow-hidden ">
                <h2 className="text-3xl font-bold mb-2">
                  We are from <br />
                  <span className="text-[#2F80ED]">
                    Korean Software HRD Center
                  </span>
                </h2>

                <p className="text-lg font-semibold mt-4">
                  13<sup>th</sup> Generation Student Basic Course.
                </p>
                <p className="text-gray-600 mt-2">
                  We're really confident with this project that can bring the
                  best tool for software development.
                </p>
                <button className="mt-6 px-5 py-2 bg-[#2F80ED] text-white rounded-full shadow hover:bg-blue-600 transition">
                  Get Started →
                </button>

                {/* Clip shape in bottom right */}
                <div className="card-corner-br"></div>
              </div>
            </div>

            {/* Right Card */}
            <div className="bg-[#EAF4FF] rounded-xl shadow-md p-6 flex flex-col items-center text-center relative">
              <div className="absolute top-4 left-4 text-sm text-gray-600">
                Our school
              </div>
              <h3 className="text-2xl font-semibold text-[#2F80ED] mb-4">
                Korea Software HRD Center
              </h3>
              <img
                src="/image/hrd-logo.png"
                alt="Webcash & KSHRD"
                className="w-32 sm:w-36 md:w-40 h-auto object-contain"
              />
            </div>

            {/* letter */}
            <div className="relative  h-[100px]">
              <svg
                className="w-full h-full"
                viewBox="0 0 300 300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="150"
                  cy="150"
                  r="100"
                  // stroke="blue"
                  strokeWidth="2"
                  fill="none"
                />
                <text className="fill-red text-[42px] font-medium">
                  <textPath href="#circlePath" startOffset="2%">
                    Learn more . Learn more . Learn more .
                  </textPath>
                </text>
                <path
                  id="circlePath"
                  d="M 150 30 A 120 120 0 1 1 150 270 A 120 120 0 1 1 150 30"
                  fill="none"
                  stroke="none"
                />
              </svg>

              {/* Center Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                  src="/image/arrow-down.png"
                  alt="Arrow Down"
                  width="12"
                  height="12"
                />
              </div>
            </div>
          </div>

          {/* Sections 1 */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-300 p-4 rounded mt-5">
              <div className="bg-gray-500 text-white p-4 rounded">
                <h1 className="text-xl">a1</h1>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h1 className="text-xl">b2</h1>
              </div>
            </div>
          </section>

          {/* Sections 5 */}
          <section>
            <div className="grid grid-cols-1 gap-4 p-4 rounded mt-5">
              <div className="text-white p-4 rounded">
                <div
                  className="relative w-full h-[515px] bg-center bg-cover rounded-[24px]"
                  style={{ backgroundImage: "url('/image/aboutus5.png')" }}
                >
                  <div className="grid grid-cols-2 absolute w-full p-5">
                    <div className="p-10 max-w-xl space-y-12">
                      <h2 className="text-[50.6px] font-bold mb-4 text-[#F3F7FB]">
                        Ready to Start Your Next Adventure
                      </h2>

                      <p className="text-[22.77px] text-[#EFFCFF]">
                        Join the Thrill today Unlocked and Discover the Thrill
                        of Adventure with Thrillz
                      </p>
                      <Button className="bg-white text-[#59BAD5] text-[15.18px] font-normal left-24 rounded-[30px]">
                        Get Start Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="bg-blue-300 p-6 text-center">
        <h2 className="font-medium text-xl">Sidebar/Footer Content</h2>
        <p className="text-sm text-gray-800">Add any additional info here.</p>
      </footer>
    </div>
  );
}
