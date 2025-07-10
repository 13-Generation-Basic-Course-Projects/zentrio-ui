import { CalendarIcon } from "@/components/icon/everyicon";
import React from "react";
import calendarIcon from "@/public/image/calendar.svg";
import docsIcon from "@/public/image/docs.svg";
import sheetIcon from "@/public/image/sheet.svg";
import slideIcon from "@/public/image/slide.svg";
import chartIcon from "@/public/image/chart.svg";
import kanbanIcon from "@/public/image/kanban.svg";
import fourStateImg from "@/public/image/kanban.png";
import calendarImg from "@/assets/calendar.png";
import ganttChartImg from "@/assets/ganttchartlanding.svg";
import daigramImg from "@/assets/diagramlanding.svg";
import shareImg from "@/assets/share.png";
import Image from "next/image";
import { Button } from "@heroui/react";
import { NavbarLanding } from "@/components/layout/Navbar";
import Link from "next/link";
import "animate.css";
import AnimatedSection from "@/components/animation/AnimatedSection";
import Logout from "../(auth)/_components/Logout";
import TypewriterEffectSmoothDemo from "@/components/animation/TypewriterEffectSmoothDemo";

//useage : http://localhost:3000/

const tools = [
  {
    id: 1,
    src: calendarIcon,
    alt: "Google Calendar",
    label: "Google Calendar",
  },
  { id: 2, src: docsIcon, alt: "Google Docs", label: "Google Docs" },
  { id: 3, src: sheetIcon, alt: "Google Sheets", label: "Google Sheets" },
  { id: 4, src: slideIcon, alt: "Google Slides", label: "Google Slides" },
  { id: 5, src: chartIcon, alt: "Gantt Chart", label: "Gantt Chart" },
  { id: 6, src: kanbanIcon, alt: "Kanban", label: "Kanban" },
];

// //useage : http://localhost:3000/
export default function Home() {
  "GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID;
  return (
    <div className="w-full ">
      <section className="relative h-auto bg-gradient-to-b from-[#bdeffc] to-slate overflow-hidden">
        {/* <div className="absolute top-4 right-10 hidden">
          <Logout />
        </div> */}
        <div className=" lg:mx-[50px] relative z-50 max-w-screen-xl xl:mx-auto">
          <NavbarLanding />
        </div>
        {/* Floating Chat Bubbles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40 ">
          <div className="relative w-full h-full max-w-screen-xl xl:mx-auto">
            {/* Top Left */}
            <div className="animate__animated animate__fadeInDown animate__slow hidden sm:flex absolute top-[25%] left-[9%] items-center gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-5 py-3 rounded-full z-30 max-w-screen-xl xl:mx-auto">
              <span className="text-sm text-primary font-medium flex items-center gap-1 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Work with heart
                {/* Absolutely positioned image at bottom-left of text */}
                <img
                  className="absolute bottom-3 left-[-40px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                  src="https://i.pinimg.com/236x/a3/1f/8e/a31f8e06e89d4ec031ba7150687030ce.jpg"
                  alt="profile user"
                  width={60}
                  height={60}
                />
              </span>
            </div>

            {/* Top Right */}
            <div className="animate__animated animate__fadeInUp animate__slow hidden sm:flex absolute top-[35%] right-[6%] items-center gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-5 py-3 rounded-full z-30">
              <span className="text-sm text-primary font-medium flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                  />
                </svg>
                Smart Work
              </span>
              <img
                className="absolute bottom-3 right-[-25px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                src="https://m.media-amazon.com/images/I/81AnsmwzaGL.png"
                alt="profile user"
                width={60}
                height={60}
              />
            </div>

            {/* Bottom Left */}
            <div className="animate__animated animate__fadeInDown animate__slow hidden sm:flex absolute top-[70%] left-[10%] items-center gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-5 py-3 rounded-full z-30">
              <span className="text-sm text-primary font-medium flex items-center gap-1">
                <Image
                  className="mx-2"
                  src={shareImg}
                  alt="share profile"
                  width={20}
                  height={20}
                />
                Sending a file project
              </span>
              <img
                className="absolute bottom-3 right-[-25px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                src="https://i.pinimg.com/474x/a3/1f/8e/a31f8e06e89d4ec031ba7150687030ce.jpg"
                alt="profile user"
                width={60}
                height={60}
              />
            </div>

            {/* Bottom Right */}
            <div className="animate__animated animate__fadeInUp animate__slow hidden sm:flex absolute top-[70%] right-[10%] items-center gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-5 py-3 rounded-full z-30 ">
              <span className="text-sm text-primary font-medium flex items-center gap-1 relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
                  />
                </svg>
                Stay focus with the Ganttchart
                {/* Absolutely positioned image at bottom-left of text */}
                <img
                  className="absolute bottom-3 left-[-40px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                  src="https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/3d/32/20/3d322049-015a-0e3b-e512-583ac627d478/source/512x512bb.jpg"
                  alt="profile user"
                  width={60}
                  height={60}
                />
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 w-full text-center px-4 mx-0 mt-10 md:mt-20 lg:mx-[50px] max-w-screen-xl xl:mx-auto">
          <div className="w-full flex flex-col justify-center items-center gap-[50px]">
            <div className="flex flex-col gap-[10px]">
              <div className="line-clamp-none md:line-clamp-3">
                {/* <h1 className="text-h4 sm:text-h3 lg:text-[64px] font-bold mb-4 relative">
                  Empower Your Team with <br />
                  <span className="text-primary h-[81px] border-2 border-primary bg-slate-blue border-dashed rounded-[10px] px-[20px]">
                    Zentrio
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
                </h1> */}
                <TypewriterEffectSmoothDemo />
              </div>
              <p className="text-sm sm:text-base lg:text-body-sm text-description max-w-xl mx-auto mb-6">
                We bring your team together, no matter where they are. So we can
                collaborate easily with file sharing and project management in
                one place.
              </p>
            </div>
            <Link href="/workspace">
              <Button className="text-body w-[168.06px] h-[50.06px] font-semibold tracking-wide sm:text-sm lg:text-body bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-[8px]">
                <span>Get Started</span>
                <svg
                  width="11"
                  height="10"
                  viewBox="0 0 12 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.3572 9.63111L11.3808 1.29555C11.3779 1.1404 11.3443 0.987528 11.2821 0.845712C11.1633 0.559741 10.9363 0.33276 10.6504 0.214002C10.5085 0.151756 10.3557 0.118196 10.2005 0.115248L1.86496 0.13883C1.70952 0.13927 1.55552 0.170321 1.41174 0.230212C1.26797 0.290102 1.13723 0.377658 1.02701 0.487881C0.804406 0.710487 0.678849 1.01191 0.677961 1.32583C0.677072 1.63975 0.800927 1.94046 1.02228 2.16181C1.24363 2.38316 1.54434 2.50702 1.85826 2.50613L7.35142 2.48225L1.00683 8.82684C0.785132 9.04854 0.660086 9.34873 0.659202 9.66138C0.658317 9.97402 0.781667 10.2735 1.00211 10.494C1.22256 10.7144 1.52205 10.8378 1.83469 10.8369C2.14734 10.836 2.44753 10.7109 2.66923 10.4892L9.01382 4.14465L8.98994 9.63781C8.98886 9.79343 9.01861 9.94755 9.07746 10.0913C9.13631 10.235 9.2231 10.3655 9.33283 10.4752C9.44256 10.5849 9.57305 10.6717 9.71678 10.7306C9.8605 10.7894 10.0146 10.8192 10.1702 10.8181C10.3259 10.8183 10.4801 10.7877 10.6242 10.728C10.7683 10.6684 10.8993 10.5808 11.0096 10.4705C11.12 10.3601 11.2075 10.2291 11.2672 10.0851C11.3268 9.94102 11.3574 9.78673 11.3572 9.63111Z"
                    fill="white"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </div>

        {/* Tools Section */}
        {/* <div className="mt-[20%] max-w-screen-xl xl:mx-auto">
          <p className="text-center text-body-xs sm:text-body-sm lg:text-body-md mb-6">
            Get all the tools your team needs
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center px-4">
            {tools.map((tool) => (
              <div key={tool.id} className="flex items-center">
                <Image
                  src={tool.src}
                  width={32}
                  height={32}
                  alt={tool.alt}
                  className="w-6 sm:w-8 h-6 sm:h-8"
                />
                <p className="text-body-xs sm:text-body-sm font-semibold ms-1">
                  {tool.label}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* new code */}
        {/* Tools Section */}
        {/* Tools Section */}
        <div className="mt-[15%] sm:mt-[12%] lg:mt-[10%] xl:mt-[8%] max-w-screen-xl xl:mx-auto">
          <p className="text-center text-body-xs sm:text-body-sm lg:text-body-md xl:text-body-lg mb-4 sm:mb-6 lg:mb-8 px-4">
            Get all the tools your team needs
          </p>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex flex-col items-center justify-center sm:flex-row sm:justify-start w-full p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center sm:text-left"
                >
                  <div className="flex-shrink-0 mb-1 sm:mb-0">
                    <Image
                      src={tool.src}
                      width={32}
                      height={32}
                      alt={tool.alt}
                      className="w-6 sm:w-6 md:w-7 lg:w-8 h-6 sm:h-6 md:h-7 lg:h-8 mx-auto sm:mx-0"
                    />
                  </div>
                  <p className="text-body-xs sm:text-body-sm lg:text-body-md font-semibold sm:ml-2 leading-tight">
                    {tool.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-4 sm:mx-8 lg:mx-[50px] max-w-screen-xl xl:mx-auto">
        <section className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
            <div className="text-center">
              <h1 className="text-h1 sm:text-h1 lg:text-h1 text-primary font-extrabold pb-[10%]">
                80%
              </h1>
              <p className="text-body-xs sm:text-body-sm lg:text-body-md text-description w-[300px]">
                Seamless collaboration and effective task management.
              </p>
            </div>
            <div className="text-center border-dashed border-r-[3px] border-l-[3px] px-[18%]">
              <h1 className="text-h1 sm:text-h1 lg:text-h1 text-primary font-extrabold pb-[10%]">
                10K+
              </h1>
              <p className="text-body-xs sm:text-body-sm lg:text-body-md text-description w-[300px]">
                Remote teams across industries rely on our platform for seamless
                collaboration.
              </p>
            </div>
            <div className="text-center">
              <h1 className="text-h1 sm:text-h1 lg:text-h1 text-primary font-extrabold pb-[10%]">
                98%
              </h1>
              <p className="text-body-xs sm:text-body-sm lg:text-body-md text-description w-[300px]">
                Users rate us highly for our platform's ease of use and workflow
                impact.
              </p>
            </div>
          </div>
        </section>

        <AnimatedSection animation="animate__fadeInLeft">
          <section className="mt-16">
            <div className="grid grid-cols-1 gap-y-6 md:gap-4 items-center sm:grid-cols-1 md:grid-cols-2">
              <div>
                <h2 className="text-h4 sm:text-h3 lg:text-h2 font-semibold">
                  Organize, Prioritize,{" "}
                  <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">
                    Achieve Goals
                  </span>
                </h2>
                <p className="text-body-xs sm:text-body-sm lg:text-body-md text-description">
                  Streamline your workflow with powerful, intuitive tools that
                  ensure every team member stays organized, aligned, and focused
                  on their tasks.
                </p>
              </div>
              <div>
                <Image
                  alt="four states"
                  src={fourStateImg}
                  className="w-full"
                />
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="animate__fadeInRight">
          <section className="mt-16">
            <div className="grid grid-cols-1 gap-y-6 md:gap-x-6 items-center sm:grid-cols-1 md:grid-cols-2">
              {/* Text appears first on mobile (default), second on md */}
              <div className="order-2 sm:order-1">
                <Image alt="four states" src={calendarImg} className="" />
              </div>
              <div className="order-1 sm:order-2  md:pl-5">
                <h2 className="text-h4 sm:text-h3 lg:text-h2 font-semibold">
                  <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">
                    Effortless,
                  </span>
                  Real-Time Connectivity
                </h2>
                <p className="text-description">
                  Experience smooth, real-time communication and collaboration
                  with <br /> your team. Stay connected effortlessly and keep
                  projects moving
                  <br />
                  forward without delay.
                </p>
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="animate__fadeInLeft">
          <section className="mt-16">
            <div className="grid grid-cols-1 gap-y-6 md:gap-x-6 items-center sm:grid-cols-1 md:grid-cols-2">
              <div>
                <h2 className="text-h4 sm:text-h3 lg:text-h2 font-semibold">
                  <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">
                    Visualizing,
                  </span>
                  Your Time-Line
                </h2>
                <p className="text-description">
                  Streamline your workflow with powerful, intuitive tools <br />{" "}
                  that ensure every team member stays organized, aligned, <br />{" "}
                  and focused on their tasks.
                </p>
              </div>
              <div className="">
                <Image
                  alt="four states"
                  className="w-full "
                  src={ganttChartImg}
                />
              </div>
            </div>
          </section>
        </AnimatedSection>

        <AnimatedSection animation="animate__zoomIn">
          <section className="mt-16">
            <div className="grid grid-cols-1 gap-y-6 items-center justify-items-center">
              <div className="text-center">
                <h2 className="text-h2 font-semibold">
                  <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">
                    Visualizing,
                  </span>
                  Your Time-Line
                </h2>
                <p className="text-description">
                  Streamline your workflow with powerful, intuitive tools that
                  ensure every team member stays organized, aligned, and focused
                  on their tasks. <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">Zentrio</span> is currently built for laptop screens.
                  Mobile version coming soon — stay tuned
                </p>
              </div>
              <div className="">
                <Image alt="four states" src={daigramImg} className="" />
              </div>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </div>
  );
}