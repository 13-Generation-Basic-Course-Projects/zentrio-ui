"use client";

import { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import moment from "moment"; 
import "@/styles/ganttchart.css"

export default function GanttChart() {
  const calendarRef = useRef(null);

  //   // Handle event drag and resize
  const handleEventChange = (info) => {
    // Calculate the new duration in days
    const startDate = moment(info.event.start);
    const endDate = moment(info.event.end);

    const duration = moment.duration(endDate.diff(startDate));
    const diffDays = duration.asDays();
    const roundedDays = Math.ceil(diffDays);

    const eventResources = info.event.getResources();
    const mainResource = eventResources[0]; // Assuming first resource is the main one
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
    info.event.setExtendedProp("duration", `${roundedDays} Days`);

    // Apply colors from the matched parent
    if (matchedParent?.color) {
      info.event.setProp("backgroundColor", matchedParent.color);
      info.event.setProp(
        "borderColor",
        matchedParent.borderColor || matchedParent.color
      );
    }

    alert(
      `"${
        info.event.title
      }" duration is now ${roundedDays} days from ${startDate.format(
        "DD-MMM-YYYY"
      )} to ${endDate.format(
        "DD-MMM-YYYY"
      )} and this event is in the ${resourceName}.`
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
      start: "2025-04-16T00:00:00",
      end: "2025-04-20T23:59:59",
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
      start: "2025-04-21T00:00:00",
      end: "2025-04-25T23:59:59",
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
      start: "2025-04-23T00:00:00",
      end: "2025-04-26T23:59:59",
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
      start: "2025-04-28T00:00:00",
      end: "2025-05-02T23:59:59",
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
      <div className="flex-grow overflow-hidden">
        <FullCalendar
          ref={calendarRef}
          plugins={[resourceTimelinePlugin, dayGridPlugin, interactionPlugin]}
          initialView="resourceTimelineCustom"
          headerToolbar={{
            left: "title",
            right: "today prev,next",
          }}
          slotMinWidth={80} // Ensure columns are wide enough
          initialDate="2025-04-15" // Start in the middle of April
          // selectable={true}
          editable={true}
          // height="1"
          eventDrop={handleEventChange}
          eventResize={handleEventChange}
          slotDuration="24:00:00"
          slotLabelFormat={{
            day: "numeric",
            weekday: "short",
          }}
          slotLabelContent={(arg) => {
            const date = arg.date;
            const weekday = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const day = date.getDate();

            return (
              <div style={{ textAlign: "center", width: "100%" }}>
                <div style={{ fontSize: "0.8rem" }}>{weekday}</div>
                <div style={{ fontWeight: "bold" }}>{day}</div>
              </div>
            );
          }}
          views={{
            resourceTimelineCustom: {
              type: "resourceTimeline",
              duration: { days: 35 }, // Show 45 days to ensure full range
              visibleRange: {
                start: "2025-04-01",
                end: "2025-05-01", // Extend past May 15 to ensure all dates show
              },
              slotDuration: "24:00:00",
            },
          }}
          nowIndicator={true}
          now={new Date()}
          // resourceAreaHeaderContent="Activity Name"
          eventContent={renderEventContent}
          resourceAreaWidth="0px"
          resources={resources}
          events={events}
        />
      </div>
    </div>
  );
}