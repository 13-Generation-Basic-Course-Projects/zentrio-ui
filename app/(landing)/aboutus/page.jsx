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
          <div className="grid grid-cols-12 gap-2 bg-purple-300 p-6 relative items-center">
            {/* Left Card */}
            

            {/* Circular Text Centered */}
            <div className="col-span-12 md:col-span-2 flex justify-center items-end z-10">
              <div className="relative w-[120px] h-[120px]">
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 150 30 A 120 120 0 1 1 150 270 A 120 120 0 1 1 150 30"
                      fill="none"
                      stroke="none"
                    />
                  </defs>
                  <text className="fill-black text-[14px] font-medium">
                    <textPath href="#circlePath" startOffset="2%">
                      Learn more · Learn more · Learn more ·
                    </textPath>
                  </text>
                </svg>
                {/* Center Arrow */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    src="/image/arrow-down.png"
                    alt="Arrow Down"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
            </div>

            {/* Right Card */}
            
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
                  className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[515px] bg-center bg-cover rounded-[24px]"
                  style={{ backgroundImage: "url('/image/aboutus5.png')" }}
                >
                  <div className="absolute w-full h-full flex items-center p-5">
                    <div className="p-4 sm:p-6 md:p-10 max-w-xl space-y-6">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[50.6px] font-bold text-[#F3F7FB]">
                        Ready to Start Your Next Adventure
                      </h2>

                      <p className="text-base sm:text-lg md:text-xl lg:text-[22.77px] text-[#EFFCFF] leading-relaxed">
                        Join the Thrill today Unlocked and Discover the Thrill
                        of Adventure with Thrillz
                      </p>

                      <Button className="bg-white text-[#59BAD5] text-sm sm:text-base md:text-[15.18px] font-normal rounded-[30px] px-6 py-2">
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
