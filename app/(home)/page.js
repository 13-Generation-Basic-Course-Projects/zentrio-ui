import { CalendarIcon } from "@/components/icon/everyicon";
import React from "react";
import calendarIcon from "@/public/image/calendar.svg";
import docsIcon from "@/public/image/docs.svg";
import sheetIcon from "@/public/image/sheet.svg";
import slideIcon from "@/public/image/slide.svg";
import chartIcon from "@/public/image/chart.svg";
import kanbanIcon from "@/public/image/kanban.svg";
import fourStateImg from "@/public/image/kanban.png";
import calendarImg from "@/assets/calendarlanding.svg";
import ganttChartImg from "@/assets/ganttchartlanding.svg";
import daigramImg from "@/assets/diagramlanding.svg";
import shareImg from "@/assets/share.png";
import Image from "next/image";
import { Button } from "@heroui/react";
import { NavbarLanding } from "@/components/layout/Navbar";

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
  return (
    <div className="w-full">
      <section className="relative h-auto bg-gradient-to-b from-[#bdeffc] to-slate overflow-hidden">
        <div className="mx-4 sm:mx-8 lg:mx-[50px] relative z-50">
          <NavbarLanding />
        </div>
        {/* Floating Chat Bubbles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40">
          {/* Top Left */}
          <div className="hidden sm:flex absolute top-[19%] left-[9%] items-center gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-5 py-3 rounded-full z-30">
            <span className="text-sm text-primary font-medium flex items-center gap-1 relative">
              <Image
                className="mx-2"
                src={shareImg}
                alt="share profile"
                width={20}
                height={20}
              />
              Sending a file project
              {/* Absolutely positioned image at bottom-left of text */}
              <img
                className="absolute bottom-3 left-[-40px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2024/04/09102942/real-or-fake-image-analysis-and-provenance-01.jpg"
                alt="profile user"
                width={60}
                height={60}
              />
            </span>
          </div>

          {/* Top Right */}
          <div className="hidden sm:flex absolute top-[35%] right-[6%] items-center gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-5 py-3 rounded-full z-30">
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
              src="https://hips.hearstapps.com/hmg-prod/images/itv-fake-release-date-plot-67f50504048bc.jpg?crop=0.563xw:1.00xh;0,0&resize=1200:*"
              alt="profile user"
              width={60}
              height={60}
            />
          </div>

          {/* Bottom Left */}
          <div className="hidden sm:flex absolute top-[70%] left-[10%] items-center gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-5 py-3 rounded-full z-30">
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
              src="https://www.adobe.com/acrobat/hub/media_173d13651460eb7e12c0ef4cf8410e0960a20f0ee.jpeg?width=750&format=jpeg&optimize=medium"
              alt="profile user"
              width={60}
              height={60}
            />
          </div>

          {/* Bottom Right */}
          <div className="hidden sm:flex absolute top-[70%] right-[10%] items-center gap-2 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-5 py-3 rounded-full z-30">
          <span className="text-sm text-primary font-medium flex items-center gap-1 relative">
              <Image
                className="mx-2"
                src={shareImg}
                alt="share profile"
                width={20}
                height={20}
              />
              Sending a file project
              {/* Absolutely positioned image at bottom-left of text */}
              <img
                className="absolute bottom-3 left-[-40px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                src="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2024/04/09102942/real-or-fake-image-analysis-and-provenance-01.jpg"
                alt="profile user"
                width={60}
                height={60}
              />
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 w-full text-center px-4 mx-0 mt-10 md:mt-20 lg:mx-[50px]">
          <div className="w-full flex flex-col justify-center items-center gap-[50px]">
            <div className="flex flex-col gap-[10px]">
              <div className="line-clamp-none md:line-clamp-3">
                <h1 className="text-h4 sm:text-h3 lg:text-[64px] font-bold mb-4 relative">
                  Empower Your Team with{" "} <br />
                  <span className="text-primary h-[81px] border-2 border-primary bg-slate-blue border-dashed rounded-[10px] px-[20px]">
                    Zentrio
                  </span>{" "}
                  <svg width="27" height="27" className="absolute left-[3.5%] bottom-[0%]" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.1441 5.5268C22.1869 5.42813 22.199 5.31888 22.1789 5.21324C22.1588 5.1076 22.1073 5.01045 22.0313 4.93441C21.9552 4.85837 21.8581 4.80694 21.7525 4.78682C21.6468 4.76669 21.5376 4.77879 21.4389 4.82155L4.10557 11.8632C4.00017 11.9062 3.91098 11.9812 3.85065 12.0777C3.79032 12.1742 3.76191 12.2872 3.76947 12.4008C3.77702 12.5144 3.82015 12.6227 3.89273 12.7103C3.96531 12.798 4.06366 12.8605 4.17382 12.8891L10.8081 14.6008C11.183 14.6972 11.5252 14.8922 11.7991 15.1656C12.0731 15.439 12.2688 15.7807 12.366 16.1554L14.0766 22.7919C14.1052 22.902 14.1677 23.0004 14.2554 23.073C14.343 23.1455 14.4513 23.1887 14.5649 23.1962C14.6785 23.2038 14.7915 23.1754 14.888 23.1151C14.9845 23.0547 15.0595 22.9655 15.1025 22.8601L22.1441 5.5268Z" fill="#59BAD5" stroke="#59BAD5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Collaboration
                </h1>
              </div>
              <p className="text-sm sm:text-base lg:text-body-sm text-description max-w-xl mx-auto mb-6">
                We bring your team together, no matter where they are. So we can
                collaborate easily with file sharing and project management in one
                place.
              </p>
            </div>
            <Button className="text-body w-[168.06px] h-[50.06px] font-semibold tracking-wide sm:text-sm lg:text-body bg-primary text-white px-4 sm:px-6 py-2 sm:py-3 rounded-[8px]">
              <span>Get Started</span>
              <svg width="11" height="10" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3572 9.63111L11.3808 1.29555C11.3779 1.1404 11.3443 0.987528 11.2821 0.845712C11.1633 0.559741 10.9363 0.33276 10.6504 0.214002C10.5085 0.151756 10.3557 0.118196 10.2005 0.115248L1.86496 0.13883C1.70952 0.13927 1.55552 0.170321 1.41174 0.230212C1.26797 0.290102 1.13723 0.377658 1.02701 0.487881C0.804406 0.710487 0.678849 1.01191 0.677961 1.32583C0.677072 1.63975 0.800927 1.94046 1.02228 2.16181C1.24363 2.38316 1.54434 2.50702 1.85826 2.50613L7.35142 2.48225L1.00683 8.82684C0.785132 9.04854 0.660086 9.34873 0.659202 9.66138C0.658317 9.97402 0.781667 10.2735 1.00211 10.494C1.22256 10.7144 1.52205 10.8378 1.83469 10.8369C2.14734 10.836 2.44753 10.7109 2.66923 10.4892L9.01382 4.14465L8.98994 9.63781C8.98886 9.79343 9.01861 9.94755 9.07746 10.0913C9.13631 10.235 9.2231 10.3655 9.33283 10.4752C9.44256 10.5849 9.57305 10.6717 9.71678 10.7306C9.8605 10.7894 10.0146 10.8192 10.1702 10.8181C10.3259 10.8183 10.4801 10.7877 10.6242 10.728C10.7683 10.6684 10.8993 10.5808 11.0096 10.4705C11.12 10.3601 11.2075 10.2291 11.2672 10.0851C11.3268 9.94102 11.3574 9.78673 11.3572 9.63111Z" fill="white"/>
              </svg>
            </Button>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-[20%]">
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
        </div>
      </section>

      <div className="mx-4 sm:mx-8 lg:mx-[50px]">
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
          <div className="text-center border-dashed border-title/50 border-r-[2px] border-l-[2px] px-[18%]">
            <h1 className="text-h1 sm:text-h1 lg:text-h1 text-primary font-extrabold pb-[10%]">
              10K+
            </h1>
            <p className="text-body-xs sm:text-body-sm lg:text-body-md text-description w-[300px]">
              Remote teams across industries rely on our platform for seamless collaboration.
            </p>
          </div>
          <div className="text-center">
            <h1 className="text-h1 sm:text-h1 lg:text-h1 text-primary font-extrabold pb-[10%]">
              98%
            </h1>
            <p className="text-body-xs sm:text-body-sm lg:text-body-md text-description w-[300px]">
              Users rate us highly for our platform's ease of use and workflow impact.
            </p>
          </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="grid grid-cols-1 gap-y-6 md:gap-4 items-center sm:grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-h4 sm:text-h3 lg:text-h2 font-semibold">
                Organize, Prioritize,{" "} <br />
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
              <Image alt="four states" src={fourStateImg} className="w-full" />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="grid grid-cols-1 gap-y-6 md:gap-x-6 items-center sm:grid-cols-1 md:grid-cols-2">
            {/* Text appears first on mobile (default), second on md */}
            <div className="order-2 sm:order-1">
              <Image alt="four states" src={calendarImg} className="" />
            </div>
            <div className="order-1 sm:order-2  md:pl-5 flex flex-col gap-[10px]">
              <h2 className="text-h4 sm:text-h3 lg:text-h2 font-semibold">
                <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">
                  Effortless,&nbsp;
                </span>
                Real-<br />Time Connectivity
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

        <section className="mt-16">
          <div className="grid grid-cols-1 gap-y-6 md:gap-x-6 items-center sm:grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-h4 sm:text-h3 lg:text-h2 font-semibold">
                <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">
                  Visualizing, <br />
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
                on their tasks.
              </p>
            </div>
            <div className="">
              <Image alt="four states" src={daigramImg} className="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}