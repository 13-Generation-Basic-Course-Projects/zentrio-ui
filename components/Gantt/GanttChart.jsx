"use client";

import { useRef, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/ganttchart.css"; // Ensure this path is correct
import BredCrum from "../bredcrum/MyBredcrum"; // Ensure this path is correct
import { ChevronLeft, ChevronRight } from "lucide-react";

// Helper function to calculate duration in days
const calculateDurationDays = (start, end) => {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);
    // Check for invalid dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error(
        "Invalid date format for duration calculation:",
        start,
        end
      );
      return 0; // Or handle as appropriate
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

// Predefined color palette for dynamic assignment
const colorPalette = [
  { background: "#DBF9CE", border: "#34D399" }, // Mint Green
  { background: "#FFF8EF", border: "#FB923C" }, // Light Orange
  { background: "#FFEFF0", border: "#F87171" }, // Light Red
  { background: "#FBEFFF", border: "#A78BFA" }, // Light Purple
  { background: "#EFFCFF", border: "#38BDF8" }, // Light Blue
  { background: "#E0F2FE", border: "#0EA5E9" }, // Sky Blue
  { background: "#F1F5F9", border: "#64748B" }, // Light Slate
  { background: "#FEFCE8", border: "#FACC15" }, // Light Yellow
  { background: "#F0FDFA", border: "#2DD4BF" }, // Light Teal
  { background: "#FCE7F3", border: "#EC4899" }, // Light Pink
];

// Function to format face string to title case (e.g., REQUIREMENT_ANALYSIS -> Requirement Analysis)
const formatFaceTitle = (face) => {
  if (!face || typeof face !== "string") return "Unknown Phase";
  return face
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

export default function GanttChart({ modal, ganttbar, ganttChartName }) {
  const calendarRef = useRef(null);
  console.log("log gant bar again ", ganttbar);

  // Use useMemo to process ganttbar data only when it changes
  const { resources, events, dynamicFaceMap } = useMemo(() => {
    // Access data from ganttbar.payload, ensure it's an array
    const data = Array.isArray(ganttbar?.payload) ? ganttbar.payload : [];
    console.log("Processing ganttbar.payload data: ", data);

    if (data.length === 0) {
      console.log("No valid data found in ganttbar.payload");
      // Return default empty resources but still allow calendar to render
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
            teamLeader: Array.isArray(item.teamLeader) ? item.teamLeader : [],
            face: faceKey,
            formattedFace: formatFaceTitle(faceKey),
          },
        };
      })
      .filter((event) => event !== null);

    processedResources.sort((a, b) => a.title.localeCompare(b.title));

    console.log("Dynamically Processed Resources:", processedResources);
    console.log("Processed Events:", processedEvents);

    return {
      resources: processedResources,
      events: processedEvents,
      dynamicFaceMap,
    };
  }, [ganttbar]);

  // Handle event drag and resize
  const handleEventChange = (info) => {
    const startDate = new Date(info.event.start);
    const endDate = new Date(info.event.end);
    const durationDays = calculateDurationDays(startDate, endDate);

    const eventResources = info.event.getResources();
    const mainResource = eventResources[0] || null;
    const resourceId = mainResource?.id;
    const matchedResource = resources.find((res) => res.id === resourceId);
    const resourceName = matchedResource
      ? matchedResource.title
      : "Unknown Resource";

    info.event.setExtendedProp(
      "duration",
      `${durationDays} Day${durationDays !== 1 ? "s" : ""}`
    );

    // Update event colors and face if resource changed
    if (
      matchedResource &&
      resourceId !== info.oldEvent?.getResources()[0]?.id
    ) {
      const newFace = Object.keys(dynamicFaceMap).find(
        (key) => dynamicFaceMap[key].id === resourceId
      );
      if (newFace) {
        const newResourceInfo = dynamicFaceMap[newFace];
        info.event.setProp("backgroundColor", newResourceInfo.color);
        info.event.setProp("borderColor", newResourceInfo.borderColor);
        info.event.setExtendedProp("face", newFace);
      }
    }

    // Show toast notification instead of alert
    toast.success(
      `"${
        info.event.title
      }" updated successfully! Duration: ${durationDays} days (${formatDate(
        startDate
      )} - ${formatDate(endDate)}) in ${resourceName}`,
      {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );

    console.log("Event Changed:", {
      id: info.event.id,
      newStart: info.event.startStr,
      newEnd: info.event.endStr,
      newResourceId: resourceId,
    });
  };

  // Custom event rendering with phase information
  const renderEventContent = (eventInfo) => {
    const teamLeaders = eventInfo.event.extendedProps.teamLeader || [];
    const phaseName =
      eventInfo.event.extendedProps.formattedFace || "Unknown Phase";

    return (
      <div
        className={`rounded-r-[10px] h-full p-0 overflow-hidden cursor-pointer`}
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

            {/* Display Team Leader images */}
            {teamLeaders.length > 0 && (
              <div className="flex items-center space-x-1 mt-1">
                {teamLeaders.slice(0, 3).map((leader, index) => (
                  <img
                    key={leader.username + index} // Use a more unique key if possible
                    src={leader.imageUrl}
                    alt={leader.username}
                    title={leader.username}
                    className="w-4 h-4 rounded-full border border-white bg-gray-200" // Added bg for loading
                    onError={(e) => {
                      e.target.style.display = "none";
                    }} // Hide if image fails
                  />
                ))}
                {teamLeaders.length > 3 && (
                  <span className="text-xs text-gray-600 bg-gray-200 rounded-full px-1">
                    +{teamLeaders.length - 3}
                  </span>
                )}
              </div>
            )}
            {/* Fallback text if no team leaders */}
            {teamLeaders.length === 0 && (
              <div className="text-xs text-gray-500 italic">
                No assigned leader
              </div>
            )}
          </div>
          <div className=" flex flex-col justify-end gap-4  text-xs text-gray-700 whitespace-nowrap font-medium">
            <div>{eventInfo.event.extendedProps.duration}</div>
            {/* Phase badge */}
            <div className=" flex items-center  gap-2 mb-1">
              <span
                className="inline-block px-2 py-0.5 text-xs font-medium rounded-full text-white truncate overflow-hidden whitespace-nowrap max-w-[100px]"
                style={{ backgroundColor: eventInfo.event.borderColor }}
                title={phaseName} // 👈 shows full text on hover
              >
                {phaseName}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Determine the overall date range from events
  const { minDate, maxDate } = useMemo(() => {
    if (!events || events.length === 0) {
      // Default range if no events: current month
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return {
        minDate: startOfMonth.toISOString().split("T")[0],
        maxDate: endOfMonth.toISOString().split("T")[0],
      };
    }

    let min = new Date(events[0].start);
    let max = new Date(events[0].end);

    events.forEach((event) => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      if (start < min) min = start;
      // Ensure end date contributes to max range correctly
      const effectiveEnd = new Date(end);
      // If end time is midnight, consider it the start of that day for range calculation
      if (
        effectiveEnd.getHours() === 0 &&
        effectiveEnd.getMinutes() === 0 &&
        effectiveEnd.getSeconds() === 0
      ) {
        effectiveEnd.setDate(effectiveEnd.getDate() - 1);
      }
      if (effectiveEnd > max) max = effectiveEnd;
    });

    // Add some padding to the range (e.g., a few days before and after)
    min.setDate(min.getDate() - 3);
    max.setDate(max.getDate() + 4); // Added one extra day padding at end

    return {
      minDate: min.toISOString().split("T")[0],
      maxDate: max.toISOString().split("T")[0],
    };
  }, [events]);

  // Calculate duration string for the header
  const durationString = useMemo(() => {
    if (!events || events.length === 0) {
      // Show current month when no events
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return `${formatDate(startOfMonth)} - ${formatDate(endOfMonth)}`;
    }
    // Use the calculated min/max dates for the header string
    const start = new Date(minDate);
    const end = new Date(maxDate);
    // Adjust end date back if it was padded
    end.setDate(end.getDate() - 4);
    return `${formatDate(start)} - ${formatDate(end)}`;
  }, [minDate, maxDate, events]);

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Assuming BredCrum component exists and props are correct */}
      <BredCrum
        board={"Project Dashboard"} // Example: Make dynamic if needed
        feature={"Gantt Chart"}
        header={
          ganttChartName != "No data available" ? ganttChartName : "Gantt Chart"
        } // Example: Make dynamic if needed
        modal={modal}
      />
      <div className="flex items-center justify-between bg-[#F3F7FB] px-6 py-3 rounded-t-[16px] mt-3 border-b border-gray-200">
        {/* Month and Year (Dynamic based on current view center) */}
        <div className="text-lg font-semibold text-gray-800">
          {calendarRef.current
            ? calendarRef.current.getApi().view.title
            : new Date(minDate || Date.now()).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
        </div>

        {/* Duration Range */}
        <div className="text-sm text-gray-600 font-medium">
          Overall Range:{" "}
          <span className="font-semibold text-gray-700">{durationString}</span>
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-center items-center space-x-2">
          <button
            title="Go to Today"
            className="text-gray-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors duration-150"
            onClick={() => calendarRef.current?.getApi().today()}
          >
            Today
          </button>
          <button
            title="Previous Period"
            className="text-gray-600 px-2 py-1 rounded border border-gray-300 hover:bg-gray-200 transition-colors duration-150"
            onClick={() => calendarRef.current?.getApi().prev()}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            title="Next Period"
            className="text-gray-600 px-2 py-1 rounded border border-gray-300 hover:bg-gray-200 transition-colors duration-150"
            onClick={() => calendarRef.current?.getApi().next()}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-hidden pt-1 relative">
        {/* Always render FullCalendar, but show empty state overlay when no events */}
        <FullCalendar
          key={`${minDate}-${maxDate}-${resources.length}-${events.length}`} // More robust key for re-renders
          ref={calendarRef}
          plugins={[resourceTimelinePlugin, interactionPlugin]} // Removed dayGridPlugin if not used
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source" // Use your actual key if applicable
          initialView="resourceTimelineMonthCustom" // Default view
          headerToolbar={false} // Using custom header
          slotMinWidth={50} // Adjust column width as needed
          slotMinHeight={80}
          editable={true}
          eventDrop={handleEventChange}
          eventResize={handleEventChange}
          slotDuration={{ days: 1 }} // Each slot is one day
          slotLabelInterval={{ days: 1 }} // Label each day slot
          slotLabelFormat={{
            day: "numeric",
            weekday: "short",
            omitCommas: true,
          }}
          slotLabelClassNames="text-xs text-gray-500"
          slotLaneClassNames="border-b border-gray-100"
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
              <div
                className={`flex flex-col items-center justify-center w-10 h-10 rounded-lg mx-auto my-1  ${
                  isToday
                    ? "bg-primary rounded-xl text-white font-bold p-2"
                    : "bg-gray-100 rounded-xl text-gray-700 p-2"
                }`}
              >
                <div className="text-[10px] uppercase">{weekday}</div>
                <div className="text-sm font-medium">{day}</div>
              </div>
            );
          }}
          views={{
            resourceTimelineMonthCustom: {
              type: "resourceTimeline",
              duration: { days: 31 }, // Default duration
              visibleRange: {
                // Dynamically set based on data
                start: minDate,
                end: maxDate,
              },
              slotDuration: { days: 1 },
            },
            // Add other views if needed (e.g., week, year)
          }}
          viewDidMount={(viewInfo) => {
            // Optional: Update header title when view changes
            // This requires state management (useState) for the header title
            console.log("View Title:", viewInfo.view.title);
          }}
          nowIndicator={true}
          now={new Date().toISOString()} // Ensure 'now' is in correct format
          eventContent={renderEventContent}
          resourceAreaWidth="0px" // Hide the resource area completely
          resourceAreaHeaderContent="" // Remove header content
          resourceAreaClassNames="hidden" // Hide resource area
          resourceLabelClassNames="hidden" // Hide resource labels
          resources={resources}
          events={events}
          resourceOrder="title" // Order resources alphabetically
          eventMaxStack={2} // Limit number of stacked events shown per day
          eventOverlap={false} // Prevent events visually overlapping in time
          aspectRatio={2.5} // Adjust overall aspect ratio
          height="100%" // Let container control height
          //scrollTime="00:00:00"
          // contentHeight="auto"
          eventClick={(info) => {
            const ganttBarId = info.event.id;
            const eventTitle = info.event.title;
            handleDeleteGanttBar(ganttBarId, eventTitle);
          }}
        />

        {/* Empty state overlay when no events */}
        {events.length === 0 && ganttbar !== undefined && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
            <div className="text-center">
              <div className="text-lg font-medium text-gray-600 mb-2">
                {ganttChartName != "No data available"
                  ? ganttChartName
                  : "please create Gantt Chart first"}
              </div>
              <div className="text-sm text-gray-500">No tasks scheduled</div>
            </div>
          </div>
        )}

        {/* Loading state */}
        {ganttbar === undefined && (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-90 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <div className="text-lg font-medium text-gray-600">
                Loading Gantt data...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer
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
      />
    </div>
  );
}
