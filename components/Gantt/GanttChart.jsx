"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ganttchart.css";
import BredCrumGanttChart from "../bredcrum/BredcrumGanttChart";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Helper function to calculate duration in days
const calculateDurationDays = (start, end) => {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error(
        "Invalid date format for duration calculation:",
        start,
        end
      );
      return 0;
    }
    const diffTime = endDate - startDate;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (error) {
    console.error("Error calculating duration:", error);
    return 0;
  }
};

// Helper function to format dates
const formatDate = (date) => {
  try {
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", date, error);
    return "Invalid Date";
  }
};

// Helper function to get full month range
const getFullMonthRange = (events) => {
  if (!events || events.length === 0) {
    // Default to current month if no events
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return {
      minDate: startOfMonth.toISOString().split("T")[0],
      maxDate: new Date(endOfMonth.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // Add one day for FullCalendar
    };
  }

  // Find the earliest and latest months from events
  let earliestDate = new Date(events[0].start);
  let latestDate = new Date(events[0].end);

  events.forEach((event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    if (start < earliestDate) earliestDate = start;
    if (end > latestDate) latestDate = end;
  });

  // Get the start of the earliest month
  const startOfEarliestMonth = new Date(
    earliestDate.getFullYear(),
    earliestDate.getMonth(),
    1
  );

  // Get the end of the latest month
  const endOfLatestMonth = new Date(
    latestDate.getFullYear(),
    latestDate.getMonth() + 1,
    0
  );

  return {
    minDate: startOfEarliestMonth.toISOString().split("T")[0],
    maxDate: new Date(endOfLatestMonth.getTime() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // Add one day for FullCalendar
  };
};

// Predefined color palette for dynamic assignment
const colorPalette = [
  { background: "#DBF9CE", border: "#34D399" },
  { background: "#FFF8EF", border: "#FB923C" },
  { background: "#FFEFF0", border: "#F87171" },
  { background: "#FBEFFF", border: "#A78BFA" },
  { background: "#EFFCFF", border: "#38BDF8" },
  { background: "#E0F2FE", border: "#0EA5E9" },
  { background: "#F1F5F9", border: "#64748B" },
  { background: "#FEFCE8", border: "#FACC15" },
  { background: "#F0FDFA", border: "#2DD4BF" },
  { background: "#FCE7F3", border: "#EC4899" },
];

// Function to format face string to title case
const formatFaceTitle = (face) => {
  if (!face || typeof face !== "string") return "Unknown Phase";
  return face
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function GanttChart({
  modal,
  ganttbar,
  ganttChartName,
  workspaceId,
  ganttChartId,
  boardId,
  boardData
}) {
  const calendarRef = useRef(null);
  const [viewTitle, setViewTitle] = useState("");
  const [viewRange, setViewRange] = useState({ start: null, end: null });
  const [isInitialized, setIsInitialized] = useState(false);

    ("log gant bar again ", boardData);

  // Stable reference for ganttbar to prevent unnecessary recalculations
  const stableGanttbar = useMemo(() => {
    return ganttbar;
  }, [ganttbar?.payload?.length, ganttbar?.payload]);

  // Use useMemo to process ganttbar data only when it changes
  const { resources, events, dynamicFaceMap } = useMemo(() => {
    const data = Array.isArray(stableGanttbar?.payload)
      ? stableGanttbar.payload
      : [];
      ("Processing ganttbar.payload data: ", data);

    if (data.length === 0) {
        ("No valid data found in ganttbar.payload");
      return {
        resources: [{ id: "default-phase", title: "" }],
        events: [],
        dynamicFaceMap: {},
      };
    }

    const uniqueFaces = new Set();
    data.forEach((item) => {
      if (
        item.face &&
        typeof item.face === "string" &&
        item.face.trim() !== ""
      ) {
        uniqueFaces.add(item.face.trim());
      } else {
        uniqueFaces.add("UNKNOWN");
      }
    });

    const dynamicFaceMap = {};
    const processedResources = [];
    let colorIndex = 0;

    const unknownResourceProps = {
      id: "resource-unknown",
      title: "",
      color: "#F3F4F6",
      borderColor: "#9CA3AF",
    };
    dynamicFaceMap["UNKNOWN"] = unknownResourceProps;

    uniqueFaces.forEach((face) => {
      if (face === "UNKNOWN") return;

      const colorPair = colorPalette[colorIndex % colorPalette.length];
      const resourceId = `resource-${face
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`;

      dynamicFaceMap[face] = {
        id: resourceId,
        title: "",
        color: colorPair.background,
        borderColor: colorPair.border,
      };

      processedResources.push({
        id: resourceId,
        title: "",
      });
      colorIndex++;
    });

    let unknownResourceAdded = false;

    const processedEvents = data
      .map((item) => {
        const faceKey =
          item.face && typeof item.face === "string" && item.face.trim() !== ""
            ? item.face.trim()
            : "UNKNOWN";
        const resourceInfo = dynamicFaceMap[faceKey];

        if (faceKey === "UNKNOWN" && !unknownResourceAdded) {
          processedResources.push({
            id: unknownResourceProps.id,
            title: unknownResourceProps.title,
          });
          unknownResourceAdded = true;
        }

        const durationDays = calculateDurationDays(
          item.startedAt,
          item.finishedAt
        );
        const startValid = !isNaN(new Date(item.startedAt).getTime());
        const endValid = !isNaN(new Date(item.finishedAt).getTime());

        if (!startValid || !endValid) {
          console.warn(
            `Skipping event due to invalid dates: ${item.title} (ID: ${item.ganttBarId})`
          );
          return null;
        }

        const uniqueTeamLeaders = Array.isArray(item.teamLeader)
          ? [
              ...new Map(
                item.teamLeader.map((leader) => [leader.userId, leader])
              ).values(),
            ]
          : [];

        return {
          id: item.ganttBarId,
          resourceId: resourceInfo.id,
          title: item.title || "Untitled Event",
          start: item.startedAt,
          end: item.finishedAt,
          backgroundColor: resourceInfo.color,
          borderColor: resourceInfo.borderColor,
          extendedProps: {
            duration: `${durationDays} Day${durationDays !== 1 ? "s" : ""}`,
            teamLeader: uniqueTeamLeaders,
            face: faceKey,
            formattedFace: formatFaceTitle(faceKey),
            ganttChartId: item.ganttChartId,
          },
        };
      })
      .filter((event) => event !== null);

    processedResources.sort((a, b) => a.title.localeCompare(b.title));

      ("Dynamically Processed Resources:", processedResources);
      ("Processed Events:", processedEvents);

    return {
      resources: processedResources,
      events: processedEvents,
      dynamicFaceMap,
    };
  }, [stableGanttbar]);

  // Memoize the event content renderer to prevent recreating on every render
  const renderEventContent = useCallback((eventInfo) => {
    const teamLeaders = eventInfo.event.extendedProps.teamLeader || [];
    const phaseName =
      eventInfo.event.extendedProps.formattedFace || "Unknown Phase";

    return (
      <div
        className="rounded-r-[10px] h-full p-0 overflow-hidden cursor-default"
        style={{
          backgroundColor: eventInfo.event.backgroundColor,
          borderLeft: `4px solid ${eventInfo.event.borderColor}`,
        }}
        title={`${eventInfo.event.title}\nPhase: ${phaseName}\nDuration: ${eventInfo.event.extendedProps.duration}`}
      >
        <div className="w-full h-full flex justify-between items-center px-3 py-1">
          <div className="flex-grow mr-2 overflow-hidden">
            <h2 className="text-[14px] font-semibold text-gray-800 truncate">
              {eventInfo.event.title}
            </h2>

            {teamLeaders.length > 0 && (
              <div className="flex items-center space-x-1 mt-1">
                {teamLeaders.slice(0, 3).map((leader, index) => (
                  <img
                    key={leader.userId + index}
                    src={leader.imageUrl}
                    alt={leader.username}
                    title={leader.username}
                    className="w-4 h-4 rounded-full border border-white bg-gray-200"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ))}
                {teamLeaders.length > 3 && (
                  <span className="text-xs text-gray-600 bg-gray-200 rounded-full px-1">
                    +{teamLeaders.length - 3}
                  </span>
                )}
              </div>
            )}
            {teamLeaders.length === 0 && (
              <div className="text-xs text-gray-500 italic">
                No assigned leader
              </div>
            )}
          </div>
          <div className="flex flex-col justify-end gap-4 text-xs text-gray-700 whitespace-nowrap font-medium">
            <div>{eventInfo.event.extendedProps.duration}</div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-block px-2 py-0.5 text-xs font-medium rounded-full text-white truncate overflow-hidden whitespace-nowrap max-w-[100px]"
                style={{ backgroundColor: eventInfo.event.borderColor }}
                title={phaseName}
              >
                {phaseName}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  // Modified date range calculation to show full months
  const { minDate, maxDate } = useMemo(() => {
    return getFullMonthRange(events);
  }, [events]);

  // Memoize duration string calculation for current visible range
  const currentViewRange = useMemo(() => {
    if (!viewRange.start || !viewRange.end) {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`;
    }
    const end = new Date(viewRange.end);
    end.setDate(end.getDate() - 1);
    return `${formatDate(viewRange.start)} - ${formatDate(end)}`;
  }, [viewRange]);

  // Calculate overall project duration from events
  const overallProjectRange = useMemo(() => {
    if (!events || events.length === 0) {
      return "No events scheduled";
    }

    let projectMin = new Date(events[0].start);
    let projectMax = new Date(events[0].end);

    events.forEach((event) => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      if (start < projectMin) projectMin = start;
      if (end > projectMax) projectMax = end;
    });

    return `${formatDate(projectMin)} - ${formatDate(projectMax)}`;
  }, [events]);

  // Handle dates set with useCallback
  const handleDatesSet = useCallback((dateInfo) => {
    setViewTitle(dateInfo.view.title);
    setViewRange({
      start: dateInfo.startStr.split("T")[0],
      end: dateInfo.endStr.split("T")[0],
    });
      ("View Title Updated:", dateInfo.view.title);
      (
      "View Range Updated:",
      `${dateInfo.startStr.split("T")[0]} - ${dateInfo.endStr.split("T")[0]}`
    );
  }, []);

  // Handle event click with useCallback
  const handleEventClick = useCallback((info) => {
    toast.info("This Gantt chart is read-only. You cannot modify tasks.", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  // Navigation handlers with useCallback
  const handleToday = useCallback(() => {
    calendarRef.current?.getApi().today();
  }, []);

  const handlePrev = useCallback(() => {
    calendarRef.current?.getApi().prev();
  }, []);

  const handleNext = useCallback(() => {
    calendarRef.current?.getApi().next();
  }, []);

  // Initialize view title and range only once
  useEffect(() => {
    if (calendarRef.current && !isInitialized) {
      const calendarApi = calendarRef.current.getApi();
      setViewTitle(calendarApi.view.title);
      setViewRange({
        start: calendarApi.view.activeStart.toISOString().split("T")[0],
        end: calendarApi.view.activeEnd.toISOString().split("T")[0],
      });
      setIsInitialized(true);
    } else if (!calendarRef.current && !isInitialized) {
      setViewRange({ start: minDate, end: maxDate });
      setIsInitialized(true);
    }
  }, [calendarRef, minDate, maxDate, isInitialized]);

  // Memoize FullCalendar props to prevent unnecessary re-renders
  const calendarProps = useMemo(
    () => ({
      plugins: [resourceTimelinePlugin, interactionPlugin],
      schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
      initialView: "resourceTimelineMonthCustom",
      headerToolbar: false,
      slotMinWidth: 50,
      slotMinHeight: 80,
      editable: false,
      eventClick: handleEventClick,
      slotDuration: { days: 1 },
      slotLabelInterval: { days: 1 },
      slotLabelFormat: {
        day: "numeric",
        weekday: "short",
        omitCommas: true,
      },
      slotLabelClassNames: "text-xs text-gray-500",
      slotLaneClassNames: "border-b border-gray-100",
      slotLabelContent: (arg) => {
        const date = arg.date;
        const today = new Date();
        const isToday =
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear();

        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
        const day = date.getDate();

        return (
          <div
            className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg mx-auto my-1 ${
              isToday
                ? "bg-primary rounded-xl text-white font-bold p-2"
                : "bg-gray-100 rounded-xl text-gray-700 p-2"
            }`}
          >
            <div className="text-[10px] uppercase">{weekday}</div>
            <div className="text-sm font-medium">{day}</div>
          </div>
        );
      },
      views: {
        resourceTimelineMonthCustom: {
          type: "resourceTimeline",
          duration: { months: 1 }, // Changed to show full months
          visibleRange: {
            start: minDate,
            end: maxDate,
          },
          slotDuration: { days: 1 },
        },
      },
      datesSet: handleDatesSet,
      nowIndicator: true,
      now: new Date().toISOString(),
      eventContent: renderEventContent,
      resourceAreaWidth: "0px",
      resourceAreaHeaderContent: "",
      resourceAreaClassNames: "hidden",
      resourceLabelClassNames: "hidden",
      resources: resources,
      events: events,
      resourceOrder: "title",
      eventMaxStack: 2,
      eventOverlap: false,
      aspectRatio: 2.5,
      height: "100%",
    }),
    [
      handleEventClick,
      minDate,
      maxDate,
      handleDatesSet,
      renderEventContent,
      resources,
      events,
    ]
  );

  return (
    <div className="flex flex-col h-screen bg-white">
      <BredCrumGanttChart
         board={boardData?.payload.title || "Hikko Design"}
        feature={"Gantt Chart"}
        header={
          ganttChartName !== "No data available"
            ? ganttChartName
            : "Gantt Chart"
        }
        ganttChartId={ganttChartId}
        boardId={boardId}
        modal={modal}
        workspaceId={workspaceId}
      />
      <div className="flex items-center justify-between bg-[#F3F7FB] px-6 py-3 rounded-t-[16px] mt-3 border-b border-gray-200">
        <div className="text-lg font-semibold text-gray-800">
          {viewTitle ||
            new Date(minDate || Date.now()).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
        </div>
        <div className="flex flex-col items-center text-sm text-gray-600 font-medium hidden">
          <div className="mb-1">
            Current View:{" "}
            <span className="font-semibold text-gray-700">
              {currentViewRange}
            </span>
          </div>
          <div>
            Project Range:{" "}
            <span className="font-semibold text-gray-700">
              {overallProjectRange}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center space-x-2">
          <button
            title="Go to Today"
            className="text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors duration-150"
            onClick={handleToday}
          >
            Today
          </button>
          <button
            title="Previous Period"
            className="text-gray-600 px-2 py-1 rounded border border-gray-300 hover:bg-gray-200 transition-colors duration-150"
            onClick={handlePrev}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            title="Next Period"
            className="text-gray-600 px-2 py-1 rounded border border-gray-300 hover:bg-gray-200 transition-colors duration-150"
            onClick={handleNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-hidden pt-1 relative">
        <FullCalendar ref={calendarRef} {...calendarProps} />
        {events.length === 0 && ganttbar !== undefined && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-600 mb-2">
                {ganttChartName !== "No data available"
                  ? ganttChartName
                  : "please create Gantt Chart first"}
              </div>
              <div className="text-sm text-gray-500">No tasks scheduled</div>
            </div>
          </div>
        )}
        {ganttbar === undefined && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-90 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <div className="text-lg font-medium text-gray-600">
                Loading Gantt data...
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </div>
  );
}
