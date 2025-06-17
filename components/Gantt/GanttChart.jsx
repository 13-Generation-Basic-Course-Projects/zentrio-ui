"use client";

import { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../styles/ganttchart.css";
import BredCrum from "../bredcrum/MyBredcrum";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GanttChart({ modal }) {
  const calendarRef = useRef(null);

  // Handle event drag and resize
  const handleEventChange = (info) => {
    const startDate = new Date(info.event.start);
    const endDate = new Date(info.event.end);

    // Calculate duration in days
    const diffTime = endDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const eventResources = info.event.getResources();
    const mainResource = eventResources[0] || null; // Handle case where no resources are assigned
    const resourceId = mainResource?.id;
    let matchedParent = null;

    // Find the parent resource directly or via its children
    for (const res of resources) {
      if (res.id === resourceId) {
        matchedParent = res;
        break;
      }
      if (res.children?.some((child) => child.id === resourceId)) {
        matchedParent = res;
        break;
      }
    }

    const resourceName = mainResource ? mainResource.title : "Unknown Resource";

    // Update duration
    info.event.setExtendedProp("duration", `${diffDays} Days`);

    // Apply colors from the matched parent
    if (matchedParent?.color) {
      info.event.setProp("backgroundColor", matchedParent.color);
      info.event.setProp(
        "borderColor",
        matchedParent.borderColor || matchedParent.color
      );
    }

    // Format dates as DD-MMM-YYYY (e.g., 16-Apr-2025)
    const formatDate = (date) =>
      date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    alert(
      `"${info.event.title}" duration is now ${diffDays} days from ${formatDate(
        startDate
      )} to ${formatDate(endDate)} and this event is in the ${resourceName}.`
    );
  };

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
        {
          id: "d1",
          title: "Room D1",
        },
        {
          id: "d2",
          title: "Room D2",
        },
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
    { id: "iconspace-7", title: "Maintenace" },
  ];

  const events = [
    {
      id: "1",
      resourceId: "iconspace-1",
      title: "Meeting",
      start: "2025-05-16T00:00:00",
      end: "2025-05-20T23:59:59",
      color: "#DBF9CE",
      borderColor: "#34D399",
      extendedProps: {
        duration: "5 Days",
      },
    },
    {
      id: "2",
      resourceId: "iconspace-2",
      title: "Frontend",
      start: "2025-05-21T00:00:00",
      end: "2025-05-25T23:59:59",
      color: "#FFF8EF",
      borderColor: "#FB923C",
      extendedProps: {
        duration: "5 Days",
      },
    },
    {
      id: "3",
      resourceId: "iconspace-3",
      title: "UX Research",
      start: "2025-05-23T00:00:00",
      end: "2025-05-26T23:59:59",
      color: "#FFEFF0",
      borderColor: "#F87171",
      extendedProps: {
        duration: "4 Days",
      },
    },
    {
      id: "4",
      resourceId: "iconspace-4",
      title: "UI Design",
      start: "2025-05-01T00:00:00",
      end: "2025-05-06T23:59:59",
      color: "#FBEFFF",
      borderColor: "#A78BFA",
      extendedProps: {
        duration: "6 Days",
      },
    },
    {
      id: "5",
      resourceId: "iconspace-5",
      title: "Web Team Progress Update",
      start: "2025-05-28T00:00:00",
      end: "2025-06-02T23:59:59",
      color: "#EFFCFF",
      borderColor: "#38BDF8",
      extendedProps: {
        duration: "5 Days",
      },
    },
  ];

  const renderEventContent = (eventInfo) => {
    return (
      <div
        className={`rounded-r-[10px] h-full p-0`}
        style={{
          padding: "0px",
          backgroundColor: eventInfo.event.backgroundColor,
          borderLeft: `4px solid ${eventInfo.event.borderColor}`,
        }}
      >
        <div className="w-full h-full flex justify-between items-center px-3 py-2">
          <div className="h-full">
            <h2 className="text-[16px] font-semibold text-gray-800">
              {eventInfo.event.title}
            </h2>
            <div className="text-xs text-gray-700">Iconspace Team</div>
          </div>
          <div className="h-full text-gray-700">
            {eventInfo.event.extendedProps.duration}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <BredCrum
        board={"Hikko Design"}
        feature={"Gantt Chart"}
        header={"Hikko Design"}
        modal={modal}
      />
      <div className="flex items-center justify-between bg-[#F3F7FB] px-6 py-3 rounded-t-[16px] mt-3">
        {/* Month and Year */}
        <div className="text-xl font-semibold text-gray-800">
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>

        {/* Duration Range */}
        <div className="text-sm text-gray-600 font-medium">
          Duration:{" "}
          <span className="font-bold">April 16, 2025 - April 28, 2025</span>
        </div>

        {/* Navigation buttons (hook into calendarRef) */}
        <div className="flex justify-center items-center space-x-2">
          <button
            className="text-title px-3 py-1 rounded hover:bg-gray-300"
            onClick={() => calendarRef.current?.getApi().today()}
          >
            Today
          </button>
          <button
            className="text-title px-3 py-1 rounded border hover:bg-gray-300"
            onClick={() => calendarRef.current?.getApi().prev()}
          >
            <ChevronLeft />
          </button>
          <button
            className="text-title px-3 py-1 rounded border hover:bg-gray-300"
            onClick={() => calendarRef.current?.getApi().next()}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto pt-5 scrollbar-hidden">
        <FullCalendar
          ref={calendarRef}
          plugins={[resourceTimelinePlugin, dayGridPlugin, interactionPlugin]}
          initialView="resourceTimelineCustom"
          // headerToolbar={{
          //   left: "title",
          //   center: "",
          //   right: "today prev,next",
          // }}
          headerToolbar={false}
          slotMinWidth={80} // Ensure columns are wide enough
          initialDate="2025-05-01" // Start in the middle of April
          editable={true}
          eventDrop={handleEventChange}
          eventResize={handleEventChange}
          slotDuration="24:00:00"
          slotLabelFormat={{
            day: "numeric",
            weekday: "short",
          }}
          slotLabelContent={(arg) => {
            const date = arg.date;
            const today = new Date();
            const isToday =
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            const weekday = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const day = date.getDate();

            return (
              // <div style={{ textAlign: "center", width: "100%" }}>
              //   <div style={{ fontSize: "0.8rem" }}>{weekday}</div>
              //   <div style={{ fontWeight: "bold" }}>{day}</div>
              // </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: isToday ? "bold" : "normal",
                  color: isToday ? "#fff" : "#1f2937", // Tailwind's gray-800
                  backgroundColor: isToday ? "#59BAD5" : "#F3F3F3", // Tailwind blue-500
                  borderRadius: "8px",
                  padding: "4px 6px",
                  width: "40px",
                  height: "40px",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <div>{day}</div>
                <div style={{ fontSize: "10px" }}>{weekday}</div>
              </div>
            );
          }}
          views={{
            resourceTimelineCustom: {
              type: "resourceTimeline",
              duration: { days: 60 }, // Show 35 days to ensure full range
              visibleRange: {
                start: "2025-05-01",
                end: "2025-06-01", // Extend past May 15 to ensure all dates show
              },
              slotDuration: "24:00:00",
            },
          }}
          nowIndicator={true}
          now={new Date()}
          eventContent={renderEventContent}
          resourceAreaWidth="0px"
          resources={resources}
          events={events}
        />
      </div>
    </div>
  );
}
