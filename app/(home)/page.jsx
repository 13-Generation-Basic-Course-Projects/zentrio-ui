import React from "react";
import calendarIcon from "@/public/image/calendar.svg";
import docsIcon from "@/public/image/docs.svg";
import sheetIcon from "@/public/image/sheet.svg";
import slideIcon from "@/public/image/slide.svg";
import chartIcon from "@/public/image/chart.svg";
import kanbanIcon from "@/public/image/kanban.svg";
import fourStateImg from "@/public/image/four-states.svg";
import calendarImg from "@/assets/calendarlanding.svg";
import ganttChartImg from "@/assets/ganttchartlanding.svg";
import daigramImg from "@/assets/diagramlanding.svg";
import shareImg from "@/assets/share.png";
import Image from "next/image";
import { Button } from "@heroui/react";
import { NavbarLanding } from "@/components/layout/Navbar";

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

const stats = [
  {
    id: 1,
    value: "80%",
    description: "Seamless collaboration and effective task management.",
  },
  {
    id: 2,
    value: "10K+",
    description:
      "Remote teams across industries rely on our platform for seamless collaboration.",
  },
  {
    id: 3,
    value: "98%",
    description:
      "Users rate us highly for our platform's ease of use and workflow impact.",
  },
];

//useage : http://localhost:3000/
export default function Home() {
  return (
    <div className="w-full">
      <section className="relative h-[990px] bg-gradient-to-b from-[#bdeffc] to-slate-50 overflow-hidden">
        <div className="mx-[50px]">
          <NavbarLanding />
        </div>
        {/* Floating Chat Bubbles */}
        <div className="absolute top-[80px] left-0 w-full h-full pointer-events-none">
          {/* Top Left */}
          <div className="hidden sm:flex absolute top-[100px] left-4 sm:left-12 items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full">
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
              <Image
                className="absolute bottom-3 left-[-40px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                src="/avatars/avatar1.jpg"
                alt="profile user"
                width={60}
                height={60}
              />
            </span>
          </div>

          {/* Top Right */}
          <div className="hidden sm:flex absolute top-[200px] right-6 sm:right-16 items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full">
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
            <Image
                className="absolute bottom-3 right-[-25px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                src="/avatars/avatar1.jpg"
                alt="profile user"
                width={60}
                height={60}
            />
          </div>

          {/* Bottom Left */}
          <div className="hidden sm:flex absolute bottom-[300px] left-[100px] items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full">
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
            <Image
                className="absolute bottom-3 right-[-25px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                src="/avatars/avatar1.jpg"
                alt="profile user"
                width={60}
                height={60}
            />
          </div>

          {/* Bottom Right */}
          <div className="hidden sm:flex absolute bottom-[300px] right-[200px] items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full">
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
            <Image
                className="absolute bottom-3 right-[-25px] translate-y-full mt-1 w-12 h-12 rounded-full border-8 border-white"
                src="/avatars/avatar1.jpg"
                alt="profile user"
                width={60}
                height={60}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full text-center px-4 mx-0 mt-20 md:mx-[50px]">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="line-clamp-none md:line-clamp-3">
              <h1 className="text-h3 sm:text-2 lg:text-h1 font-bold mb-4 line-clamp-none md:line-clamp-2">
                Empower Your Team with{" "}
                <span className="text-primary border-2 border-primary border-dashed px-2.5 py-1 inline-block">
                  Zentrio
                </span>{" "}
                Collaboration
              </h1>
            </div>
            <p className="text-base sm:text-lg text-description max-w-xl mx-auto mb-6">
              We bring your team together, no matter where they are. So we can
              collaborate easily with file sharing and project management in one
              place.
            </p>
            <Button className="text-sm sm:text-base bg-primary text-white px-6 py-3 rounded-[8px]">
              Get Started
            </Button>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-16">
          <p className="text-center text-body-sm mb-4">
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
                  className="w-8 h-8"
                />
                <p className="text-body-sm font-semibold ms-1">{tool.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mx-[50px]">
        <section className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <h1 className="text-h1 text-primary font-bold">{stat.value}</h1>
                <p className="text-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 gap-y-6 md:gap-x-4 items-center sm:grid-cols-1 md:grid-cols-2">
            <div className="">
              <h2 className="text-h2 font-semibold">
                Organize, Prioritize,{" "}
                <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">
                  Achieve Goals
                </span>
              </h2>
              <p className="text-description">
                Streamline your workflow with powerful, intuitive tools that
                ensure every team member stays organized, aligned, and focused
                on their tasks.
              </p>
            </div>
            <div>
              <Image
                alt="four states"
                src={fourStateImg}
                className="h-[500px]  w-full md:h-[500px]"
              />
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 gap-y-6 md:gap-x-6 items-center sm:grid-cols-1 md:grid-cols-2">
            {/* Text appears first on mobile (default), second on md */}
            <div className="order-2 sm:order-1">
              <Image
                alt="four states"
                src={calendarImg}
                className="h-[500px] w-[500px] md:w-full md:h-[500px]"
              />
            </div>
            <div className="order-1 sm:order-2">
              <h2 className="text-h2 font-semibold">
                <span className="bg-gradient-to-r from-[#59BAD5] via-[#ABAAFF] to-[#59BAD5] bg-clip-text text-transparent">
                  Effortless,
                </span>
                Real-Time Connectivity
              </h2>
              <p className="text-description">
                Experience smooth, real-time communication and collaboration
                with your team. Stay connected effortlessly and keep projects
                moving forward without delay.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="grid grid-cols-1 gap-y-6 md:gap-x-6 items-center sm:grid-cols-1 md:grid-cols-2">
            <div>
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
            <div>
              <Image
                alt="four states"
                height={500}
                src={ganttChartImg}
                width={500}
              />
            </div>
          </div>
        </section>

        <section>
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
            <div>
              <Image
                alt="four states"
                height={400}
                src={daigramImg}
                width={1200}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
