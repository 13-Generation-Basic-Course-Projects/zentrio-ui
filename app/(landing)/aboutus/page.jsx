import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import React from "react";

export default function AboutUs() {
  return (
    <div className="w-full grid grid-cols-12 gap-4 p-4 min-h-screen bg-gray-50">
      <header className="col-span-12 bg-blue-200 py-4">
        <h1 className="text-2xl font-bold text-center">ZenTrio</h1>
      </header>

      <main className="col-span-12 space-y-10">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-300 p-4 rounded-md shadow text-center">
            <h2 className="text-lg font-semibold">ZenTrio</h2>
          </div>
          <div className="bg-red-200 p-4 rounded-md shadow text-center">
            <h2 className="text-lg font-semibold">ZenTrio</h2>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative rounded-md shadow h-auto  overflow-hidden p-6 sm:p-10">
            <div className="flex flex-col justify-center items-start space-y-6 max-w-xl">
              <p className="text-h2 font-bold text-gradient text-left">
                “ ZenTrio turns management into progress. “
              </p>
              <p className="text-gradient text-h1 text-left">PVH class</p>
              <p className="text-base text-h5 leading-relaxed uppercase text-left">
                ZenTrio Sponsored
              </p>
              <img
                src="../image/webcash.png"
                alt="Webcash Logo"
                className="w-full max-w-sm object-contain"
              />
            </div>
          </div>

          <div className="bg-red-200 p-6 rounded-md shadow h-auto flex items-center justify-center">
            <h2 className="text-lg font-semibold">ZenTrio</h2>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-white p-4 rounded col-span-2">
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
                    Join the Thrill today Unlocked and Discover the Thrill of
                    Adventure with Thrillz
                  </p>

                  <Button className="bg-white text-[#59BAD5] text-sm sm:text-base md:text-[15.18px] font-normal rounded-[30px] px-6 py-2">
                    Get Start Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="col-span-12">
        <Footer/>
      </footer>
    </div>
  );
}
