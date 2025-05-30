"use client";

import { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@/styles/ganttchart.css";
import BredCrum from "../bredcrum/Bredcrum";

export default function GanttChart({ modal }) {
  const calendarRef = useRef(null);

  const resources = [
    {
      id: "iconspace-1",
      title: "Planning",
      color: "#DBF9CE",
      borderColor: "#34D399",
    },
    {
      id: "iconspace-2",
      title: "Requirment Analysis",
      color: "#FFF8EF",
      borderColor: "#FB923C",
    },
    {
      id: "iconspace-3",
      title: "Design",
      color: "#FFEFF0",
      borderColor: "#F87171",
      children: [
        { id: "d1", title: "Room D1" },
        { id: "d2", title: "Room D2" },
      ],
    },
    {
      id: "iconspace-4",
      title: "Implementation",
      color: "#FBEFFF",
      borderColor: "#A78BFA",
    },
    {
      id: "iconspace-5",
      title: "Testing",
      color: "#EFFCFF",
      borderColor: "#38BDF8",
    },
    { id: "iconspace-6", title: "Deployment" },
    { id: "iconspace-7", title: "Maintenance" },
  ];

  const events = [
    {
      id: "1",
      resourceId: "iconspace-1",
      title: "Meeting",
      start: "2025-04-16",
      end: "2025-04-20",
      color: "#DBF9CE",
      borderColor: "#34D399",
      extendedProps: { duration: "5 Days" },
    },
    {
      id: "2",
      resourceId: "iconspace-2",
      title: "Frontend",
      start: "2025-04-21",
      end: "2025-04-25",
      color: "#FFF8EF",
      borderColor: "#FB923C",
      extendedProps: { duration: "5 Days" },
    },
    {
      id: "3",
      resourceId: "iconspace-3",
      title: "UX Research",
      start: "2025-04-23",
      end: "2025-04-26",
      color: "#FFEFF0",
      borderColor: "#F87171",
      extendedProps: { duration: "4 Days" },
    },
    {
      id: "4",
      resourceId: "iconspace-4",
      title: "UI Design",
      start: "2025-05-01",
      end: "2025-05-06",
      color: "#FBEFFF",
      borderColor: "#A78BFA",
      extendedProps: { duration: "6 Days" },
    },
    {
      id: "5",
      resourceId: "iconspace-5",
      title: "Web Team Progress Update",
      start: "2025-04-28",
      end: "2025-05-02",
      color: "#EFFCFF",
      borderColor: "#38BDF8",
      extendedProps: { duration: "5 Days" },
    },
  ];

  const handleEventChange = (info) => {
    const startDate = new Date(info.event.start);
    const endDate = new Date(info.event.end);
    const diffDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    const eventResources = info.event.getResources();
    const mainResource = eventResources[0] || null;
    const resourceId = mainResource?.id;

    let matchedParent = null;
    for (const res of resources) {
      if (
        res.id === resourceId ||
        res.children?.some((child) => child.id === resourceId)
      ) {
        matchedParent = res;
        break;
      }
    }

    info.event.setExtendedProp("duration", `${diffDays} Days`);
    if (matchedParent?.color) {
      info.event.setProp("backgroundColor", matchedParent.color);
      info.event.setProp(
        "borderColor",
        matchedParent.borderColor || matchedParent.color
      );
    }

    const formatDate = (date) =>
      date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    alert(
      `"${info.event.title}" duration is now ${diffDays} days from ${formatDate(
        startDate
      )} to ${formatDate(endDate)} and this event is in the ${
        mainResource?.title || "Unknown Resource"
      }.`
    );
  };

  const renderEventContent = (eventInfo) => (
    <div
      className="rounded-r-[10px] h-full p-0"
      style={{
        padding: "0px",
        backgroundColor: eventInfo.event.backgroundColor,
        borderLeft: `4px solid ${eventInfo.event.borderColor}`,
      }}
    >
      <div className="w-full h-full flex justify-between items-center px-3 py-2">
        <div>
          <h2 className="text-[16px] font-semibold text-gray-800">
            {eventInfo.event.title}
          </h2>
          <div className="text-xs text-gray-700">Iconspace Team</div>
        </div>
        <div className="text-gray-700">
          {eventInfo.event.extendedProps.duration}
        </div>
      </div>
    </div>
  );

  //test
  const [dateLabel, setDateLabel] = useState("Today");

  const handleNext = () => {
    setDateLabel((prev) => {
      if (prev === "Yesterday") return "Today";
      if (prev === "Today") return "Tomorrow";
      return "Tomorrow";
    });
  };

  const handlePrev = () => {
    setDateLabel((prev) => {
      if (prev === "Tomorrow") return "Today";
      if (prev === "Today") return "Yesterday";
      return "Yesterday";
    });
  };
  return (
    <div className="flex flex-col h-screen">
      <BredCrum
        board={"Hikko Design"}
        feature={"Gantt Chart"}
        header={"Hikko Design"}
        modal={modal}
      />
      <div className="max-w-screen-full bg-gray-100 rounded-tl-large rounded-tr-large text-title">
        <div className="flex flex-row justify-between p-5">
          <p className="text-h6">Month, Year</p>
          <div className="flex flex-wrap space-x-8">
            <p className="text-title/50">
              Duration :
              <span className="ml-2 text-title font-bold text-h6">
                Month, Day, Year - Month, Day, Year
              </span>
            </p>
            <div className="flex flex-wrap space-x-2 items-center">
              <p className="text-title/50">{dateLabel}</p>
              <div className="flex space-x-1">
                <IconButton direction="left" onClick={handlePrev} />
                <IconButton direction="right" onClick={handleNext} />
              </div>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}


const IconButton = ({ direction, onClick }) => {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      className="p-1 hover:bg-primary  rounded"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          opacity="0.8"
          x="0.25"
          y="0.25"
          width="17.5"
          height="17.5"
          rx="1.75"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <path
          d="M10.459 11.9173L7.54232 9.00065L10.459 6.08398"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
