//useage : http://localhost:3000/aboutus

import { Button } from "@/components/ui/button";

import React from "react";
import aboutus1 from "@/public/image/Rectangle_header1.png";
import aboutus2 from "@/public/image/Rectangle_header2.png";
import letterRound from "@/public/image/roundLetter1.png";
import letterRound2 from "@/public/image/roundLetter2.png";
import ourInstructor from "@/public/image/ourInstructor.png";
import ksgh from "@/public/image/ksgh.png";
import cherNak from "@/public/image/teacherNak.png";
import cherDara from "@/public/image/teacherDara.png";
import hrd from "@/public/image/hrdaboutus.png";
import webcash from "@/public/image/webcash.png";
import aboutus5 from "@/public/image/aboutus5.png";

import square1 from "@/public/image/square1.png";
import square2 from "@/public/image/square2.png";
import square3 from "@/public/image/square3.png";
import square4 from "@/public/image/square4.png";
import letterRound3 from "@/public/image/roundLetter3.png";
import imgs1 from "@/public/image/img-s1.png";
import imgs2 from "@/public/image/img-s2.png";
import imgs3 from "@/public/image/img-s3.png";
import imgs4 from "@/public/image/img-s4.png";

import fong from "@/public/image/fong.png";
import leap from "@/public/image/leap.png";
import theara from "@/public/image/theara.png";
import vit from "@/public/image/vit.png";
import roskan from "@/public/image/roskan.png";
import fanau from "@/public/image/fanau.png";
import minh from "@/public/image/minh.png";
import senghun from "@/public/image/senghun.png";
import visa from "@/public/image/visa.png";

import arrowdown from "@/public/image/arrow-down.png";
import arrowright from "@/public/image/arrow-right.png";
import "@/styles/box.css";

import Image from "next/image";

export default function AboutUs() {
  return (
    <div className=" grid grid-cols-12 gap-4 p-4 min-h-screen bg-gray-50 ">
      <main className="col-span-12 space-y-28">
        <section className="relative flex justify-center items-center gap-4 ">
          <div className="relative grid grid-cols-2 w-full">
            <div className="relative w-full">
              <Image
                src={aboutus1}
                alt="Webcash Logo"
                className="h-full w-full object-cover"
              />
              <div className="absolute top-10 left-0 right-0 px-6">
                <div className="space-y-4 ml-16  text-title">
                  <p className="text-h1 font-semibold">
                    We are from Korean Software HRD Center
                  </p>
                  <p className="text-h3">
                    13th Generation Student Basic Course.
                  </p>
                  <p className="text-base max-w-md">
                    We’re really confident with this project that can bring the
                    best tool for software development.
                  </p>
                  <Button>Get Start</Button>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <Image
                src={aboutus2}
                alt="Webcash Logo"
                className="h-full w-full object-contain z-0"
              />

              <div
                className="absolute inset-0 bg-center bg-cover z-10 bottom-5"
                style={{ backgroundImage: `url(${hrd.src})` }}
              />
              <div
                className="absolute top-12 z-10 left-1/3 transform -translate-x-1/2 backdrop-blur-md border border-[#E2E8F0]/50 rounded-xl
        flex flex-col px-6 py-2 shadow-md w-auto text-left bg-[#FFFFFF]/50"
              >
                <p className="text-h6 text-blueActive">Our school</p>
                <p className="text-h1 text-primary">Korea Software</p>
                <p className="text-h2 text-primary">HRD Center</p>
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 bottom-0 translate-y-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-center bg-cover rounded-full z-20">
            <div className="relative">
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
                <text className="fill-red text-h1 font-medium">
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
                <Image
                  src={arrowdown}
                  alt="Arrow Down"
                  width="12"
                  height="12"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative h-auto  overflow-hidden p-6 sm:p-10 flex  items-center right-0 justify-center">
            <div className="flex flex-col justify-center space-y-6 max-w-xl right-1">
              <p className="text-h1 font-bold text-gradient text-left">
                ZenTrio Founder
              </p>

              <p className="text-base text-h4 leading-relaxed text-left">
                Jump in and let’s see how ZenTrio can make your workday feel
                lighter. Let’s simplify your projects and get stuff done
                together.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-[1300px] mx-auto mr-20">
            <div className="relative items-center justify-center flex flex-col">
              <div
                className="boxTop mx-auto bg-cover bg-center "
                style={{ backgroundImage: `url(${ourInstructor.src})` }}
              ></div>

              <div
                className="boxBottom mx-auto bg-cover bg-center "
                style={{ backgroundImage: `url(${ksgh.src})` }}
              ></div>

              <div className="hidden md:block absolute items-center left-[15%] top-[51%] transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px]  bg-cover rounded-full z-20">
                <div className="relative">
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
                    <text className="fill-red text-h1 font-medium">
                      <textPath href="#circlePath" startOffset="0%">
                        Our best mentor and nice at KSHRD .
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
                    <Image
                      src={arrowright}
                      alt="Arrow Down"
                      width="12"
                      height="12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-rows-2 gap-4 ">
              <div className="relative w-auto max-w-full  mx-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  alt="Teacher Nak"
                  src={cherNak}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-md border border-white/20 rounded-xl flex flex-col items-center px-3 py-1 shadow-md w-[200px]">
                  <div className="text-h6 text-white/80">Kheng Sovannak</div>
                  <div className="text-h6 text-white/80">IT Instructor</div>
                </div>
              </div>

              <div className="relative w-[296px] max-w-full h-[199px] mx-auto rounded-xl overflow-hidden shadow-lg">
                <Image
                  alt="Teacher dara"
                  src={cherDara}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-transparent backdrop-blur-md border border-white/20 rounded-xl flex flex-col items-center px-3 py-1 shadow-md w-[200px]">
                  <div className="text-h6 text-white/80">Tan Dara</div>
                  <div className="text-h6 text-white/80">IT Instructor</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div className="h-auto flex items-center justify-center w-full">
            <div className="relative grid grid-cols-2 grid-rows-2 w-full gap-y-8 gap-x-8 ">
              <div className="relative">
                <Image
                  src={square1}
                  alt="Webcash Logo"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-10 left-0 right-0 px-4">
                  <div className="space-y-4 ml-10 mr-20 w-[85%] text-title">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-4">
                      {/* Left Image */}
                      <div>
                        <Image
                          src={imgs1}
                          alt="Core Stage"
                          className="object-cover w-full h-auto"
                        />
                      </div>

                      {/* Right Text */}
                      <div>
                        <p className="text-h4 font-semibold text-primary">
                          4 Core Stages
                        </p>
                      </div>
                    </div>

                    <p className="text-h6 text-title/50 text-center">
                      Todo, progress, Review, Completed
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={square2}
                  alt="Webcash Logo"
                  className="h-full w-full object-cover"
                />

                <div className="absolute top-10 left-0 right-0 px-4">
                  <div className="space-y-4 ml-10 mr-20 w-[85%] text-title">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-4">
                      {/* Left Image */}
                      <div>
                        <Image
                          src={imgs2}
                          alt="Core Stage"
                          width={500}
                          height={300}
                          className="object-cover w-full h-auto"
                        />
                      </div>

                      {/* Right Text */}
                      <div>
                        <p className="text-h4 font-semibold text-primary">
                          Personal Calendar
                        </p>
                      </div>
                    </div>

                    <p className="text-h6 text-title/50 text-center">
                      manage daily tasks, deadlines, and project plans
                      efficiently.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={square3}
                  alt="Webcash Logo"
                  className="h-full w-full object-cover"
                />

                <div className="absolute top-10 left-0 right-0 px-4">
                  <div className="space-y-4 ml-10 mr-20 w-[85%] text-title">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-4">
                      {/* Left Image */}
                      <div>
                        <Image
                          src={imgs3}
                          alt="Core Stage"
                          width={500}
                          height={300}
                          className="object-cover w-full h-auto"
                        />
                      </div>

                      {/* Right Text */}
                      <div>
                        <p className="text-h4 font-semibold text-primary uppercase">
                          Real-Time Alerts
                        </p>
                      </div>
                    </div>

                    <p className="text-h6 text-title/50 text-center">
                      Notifications on task activity
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Image
                  src={square4}
                  alt="Webcash Logo"
                  className="h-full w-full object-cover"
                />

                <div className="absolute top-10 left-0 right-0 px-4">
                  <div className="space-y-4 ml-10 mr-20  text-title">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-4">
                      {/* Left Image */}
                      <div>
                        <Image
                          src={imgs4}
                          alt="Core Stage"
                          width={500}
                          height={300}
                          className="object-cover w-full h-auto"
                        />
                      </div>

                      {/* Right Text */}
                      <div>
                        <p className="text-h4 font-semibold text-primary uppercase">
                          Google Tools Integrated
                        </p>
                      </div>
                    </div>

                    <p className="text-h6 text-title/50 text-center">
                      Using Google Docs, Sheets, and Slides
                    </p>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute items-center left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px]  bg-cover rounded-full z-20">
                <div className="relative">
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
                    <text className="fill-red text-[38px] font-medium">
                      <textPath href="#circlePath" startOffset="2%">
                        Features · Features ·Features ·Features ·
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
                    <Image
                      src={arrowdown}
                      alt="Arrow Down"
                      width="12"
                      height="12"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative p-6  h-auto flex items-center justify-center">
            <div className="flex flex-col justify-center items-start space-y-6 max-w-xl">
              <p className="text-h1 font-bold text-gradient text-left">
                Effortless project management for teams.
              </p>

              <p className="text-base text-h4 leading-relaxed  text-left">
                Jump in and see how ZenTrio lightens your workday and gets
                things done.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div className="relative flex justify-center">
            <div className="flex flex-col justify-center items-start space-y-6 max-w-xl">
              <p className="text-h1 font-bold text-gradient text-left">
                “ ZenTrio turns management into progress. “
              </p>
              <p className="text-gradient text-h1 text-left">PVH class</p>
              <p className="text-base text-h4 leading-relaxed uppercase text-left">
                ZenTrio Sponsored
              </p>
              <Image
                src={webcash}
                alt="Webcash Logo"
                className="w-full max-w-sm object-contain"
              />
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="grid grid-flow-col grid-rows-2 gap-4 ">
              <div className="box-content w-[197px] h-[374px]  border-4 rounded-full bg-black overflow-hidden group">
                <Image
                  src={cherDara}
                  alt="Example"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="row-span-1"></div>
              <div className="flex flex-col gap-4 justify-end items-end p-4 ">
            
                <div className="box-content w-[200px] h-[200px] rounded-full overflow-hidden group mr-8">
                  <Image
                    src={cherDara}
                    alt="Circular"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="box-content w-[281px] h-[168px] rounded-full overflow-hidden group">
                  <Image
                    src={cherDara}
                    alt="Oval"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 col-span-2">
                <div className="flex flex-row gap-4 items-center">
                  <div className="box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
                    <Image
                      src={cherDara}
                      alt="Example"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  <div className="box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
                    <Image
                      src={cherDara}
                      alt="Example"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-4 items-start">
                  <div className="box-content w-[161px] h-[150px] rounded-full rounded-br-none overflow-hidden group">
                    <Image
                      src={cherDara}
                      alt="Example"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="box-content w-[281px] h-[168px] rounded-full overflow-hidden group">
                    <Image
                      src={cherDara}
                      alt="Example"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              <div className="row-span-2  justify-start items-center flex flex-col mr-10">
                <div className="box-content w-[220px] h-[240px] rounded-tl-[100px] rounded-bl-[150px] rounded-tr-[50px] rounded-br-[50px] overflow-hidden group">
                  <Image
                    src={cherDara}
                    alt="Example"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="box-content w-[197px] h-[374px] rounded-full overflow-hidden group">
                  <Image
                    src={cherDara}
                    alt="Example"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="text-white p-4 rounded col-span-2">
            <div
              className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[515px] bg-center bg-cover rounded-[24px]"
              style={{ backgroundImage: `url(${aboutus5.src})` }}
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
    </div>
  );
}
