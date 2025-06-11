"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { MessageCircleMore, ClipboardList } from "lucide-react";

import BredCrum from "../bredcrum/MyBredcrum";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";
import { Button } from "@heroui/react";

/*
 * Use normalizeDateToDay to compare dates ignoring time.
 * (use in handleSelectDate)
 */
const normalizeDateToDay = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date); // convert string or invalid input
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export default  function MyCalender({
  tasks,
  createNoteAction,
  getNoteAllInCalendarAction,
}) {
  const calendarRef = useRef(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [noteRefreshKey, setNoteRefreshKey] = useState(0); // NEW STATE: To trigger comment card refresh

  const colorList = [
    {
      bg: "bg-red-500",
      text: "text-red-500",
      light: "bg-red-100",
      border: "border-red-500",
    },
    {
      bg: "bg-blue-500",
      text: "text-blue-500",
      light: "bg-blue-100",
      border: "border-blue-500",
    },
    {
      bg: "bg-green-500",
      text: "text-green-500",
      light: "bg-green-100",
      border: "border-green-500",
    },
    {
      bg: "bg-purple-500",
      text: "text-purple-500",
      light: "bg-purple-100",
      border: "border-purple-500",
    },
    {
      bg: "bg-orange-500",
      text: "text-orange-500",
      light: "bg-orange-100",
      border: "border-orange-500",
    },
  ];

  //   const uniqueIds = new Set();
  //   return tasks
  //     .filter((task) => {
  //       if (uniqueIds.has(task.taskId)) return false;
  //       uniqueIds.add(task.taskId);
  //       return true;
  //     })
  //     .map((task, index) => {
  //       const color = colorList[index % colorList.length];
  //       return {
  //         id: task.taskId,
  //         title: task.title,
  //         start: task.createdAt,
  //         end: task.finishedAt ?? task.createdAt,
  //         extendedProps: {
  //           // type: "task",
  //           type: task.type || "task",
  //           content: task.description,
  //           color,
  //         },
  //       };
  //     });
  // }, [tasks]);
  // Map tasks for FullCalendar AND create the taskColorMap
  const { mappedTasks, taskColorMap } = useMemo(() => {
    const uniqueIds = new Set();
    const mapForCalendar = [];
    const mapForColors = {}; // This will be our taskColorMap

    let colorIndex = 0; // Keep track of color for unique tasks

    tasks.forEach((task) => {
      // Ensure we only process each unique task ID once for color assignment
      if (!uniqueIds.has(task.taskId)) {
        uniqueIds.add(task.taskId);
        const color = colorList[colorIndex % colorList.length];
        colorIndex++; // Move to next color for the next unique task

        // Store the color for this taskId in our mapForColors
        mapForColors[task.taskId] = color;

        // Add to mapped tasks for FullCalendar
        mapForCalendar.push({
          id: task.taskId,
          title: task.title,
          start: task.createdAt,
          end: task.finishedAt ?? task.createdAt,
          extendedProps: {
            type: task.type || "task",
            content: task.description,
            color, // Assign color to the FullCalendar event
          },
          // You might also want to set backgroundColor, borderColor for FullCalendar events
          // based on your color object if you want them visible on the calendar itself
          backgroundColor: color.bg.replace("bg-", "#"), // FullCalendar expects hex or name
          borderColor: color.border.replace("border-", "#"),
        });
      }
    });

    return {
      mappedTasks: mapForCalendar,
      taskColorMap: mapForColors, // Return the generated map
    };
  }, [tasks, colorList]);

  const handleTaskClick = (dateStr, taskId) => {
    const task = mappedTasks.find((t) => t.id === taskId);
    if (task) {
      setEvents([task]);
      setSelectedTaskId(taskId); // <-- set selected task here
      setSelectedTask(task);
      calendarRef.current?.getApi().gotoDate(dateStr);
    }
  };

  const handleNoteSave = async (
    currentEventId,
    currentDayKey,
    currentNoteValue,
    initialNoteValue
  ) => {
    const trimmedNoteValue = currentNoteValue.trim();

    if (!trimmedNoteValue && !initialNoteValue) return;

    const isNewNote = !initialNoteValue && trimmedNoteValue;
    const isUpdatedNote =
      initialNoteValue && initialNoteValue !== trimmedNoteValue;
    const isDeletedNote = initialNoteValue && !trimmedNoteValue;

    const startDateObj = new Date(`${currentDayKey}T00:00:00.000Z`);
    startDateObj.setDate(startDateObj.getDate() + 4);
    const formattedStartDate = startDateObj.toISOString();

    const tillDateObj = new Date(`${currentDayKey}T23:59:59.999Z`);
    tillDateObj.setDate(tillDateObj.getDate() + 6);
    const formattedTillDate = tillDateObj.toISOString();

    try {
      if (isNewNote || isUpdatedNote) {
        const noted = trimmedNoteValue;
        const startDate = formattedStartDate;
        const tillDate = formattedTillDate;
        const taskId = currentEventId;

        await createNoteAction(noted, startDate, tillDate, taskId);
        console.log(`Note ${isNewNote ? "created" : "updated"} successfully.`);
      } else if (isDeletedNote) {
        console.log(
          `Note deletion for Task ID: ${currentEventId} on ${currentDayKey}`
        );
        // Optional: await deleteNoteAction(...)
      }

      // Refresh UI by injecting/removing "comment" event
      setEvents((prevEvents) => {
        const filtered = prevEvents.filter(
          (ev) =>
            !(
              ev.extendedProps.type === "comment" &&
              ev.extendedProps.sourceTaskId === currentEventId &&
              ev.start === currentDayKey
            )
        );

        if (!isDeletedNote) {
          filtered.push({
            id: `comment-${currentEventId}-${currentDayKey}`,
            title: trimmedNoteValue,
            start: currentDayKey,
            end: currentDayKey,
            allDay: true,
            extendedProps: {
              type: "comment",
              noted: trimmedNoteValue,
              color: {
                text: "text-green-600",
                light: "bg-green-100",
              },
              sourceTaskId: currentEventId,
            },
          });
        }

        return filtered;
      });

      setNoteRefreshKey((prev) => prev + 1); // Trigger refresh if needed
    } catch (error) {
      console.error("Failed to save/update/delete note via API:", error);
    }
  };
  

  const [events, setEvents] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteDate, setEditingNoteDate] = useState(null);
  const [noteValue, setNoteValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const handleEventDrop = (info) => {
    const { event } = info;

    if (event.extendedProps.type === "comment") {
      const newDate = new Date(event.startStr);
      const sourceTask = events.find(
        (ev) => ev.id === event.extendedProps.sourceTaskId
      );

      if (sourceTask) {
        const taskStart = new Date(sourceTask.start);
        const taskEnd = new Date(sourceTask.end);

        if (newDate < taskStart || newDate > taskEnd) {
          info.revert(); // Revert the drop
          return;
        }
      }

      // Valid drop
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === event.id
            ? {
                ...ev,
                start: newDate.toISOString().split("T")[0],
                end: newDate.toISOString().split("T")[0],
              }
            : ev
        )
      );
    }
  };
  
  const handleDateSelect = (info) => {
    const selectedStart = new Date(info.startStr);
    const selectedEnd = new Date(info.endStr);

    const isWithinAnyTask = mappedTasks.some((task) => {
      const taskStart = normalizeDateToDay(task.start);
      const taskEnd = normalizeDateToDay(task.end);
      const selStart = normalizeDateToDay(selectedStart);
      const selEnd = normalizeDateToDay(
        new Date(selectedEnd.getTime() - 24 * 60 * 60 * 1000)
      );

      return selStart >= taskStart && selEnd <= taskEnd;
    });

    if (!isWithinAnyTask) {
      setShowPopup(true);
      return;
    }

  };
  const renderEventContent = ({ event, isStart }) => {
    const { type, color, notesByDate = {} } = event.extendedProps;

    if (type !== "task" && type !== "comment") return null;

    const baseStyle = `rounded border-2 px-2 font-bold ${
      color?.text || "text-green-600"
    } ${color?.light || "bg-green-100"}`;
    const dayDate = event.range?.start
      ? new Date(event.range.start)
      : new Date(event.start);
    const dayKey = dayDate.toISOString().split("T")[0];

    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });

    const formattedDate = `${formatDate(event.start)} - ${formatDate(
      event.end
    )}`;

    // COMMENT BLOCK ONLY
    if (type === "comment") {
      return (
        <div
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({
              visible: true,
              x: e.clientX,
              y: e.clientY,
              eventId: event.id,
            });
          }}
          className={`mt-1 h-[30px] text-[0.7rem] flex items-center gap-1 rounded border-2 border-dashed px-2 py-1 ${
            color?.text || "text-green-600"
          } ${color?.light || "bg-green-100"}`}
        >
          <MessageCircleMore className="w-4 h-4" />
          <span className="truncate">
            {event.extendedProps.noted || "No note"}
          </span>
        </div>
      );
    }

    // TASK BLOCK ONLY
    if (!isStart) {
      return (
        <div
          className={`${baseStyle} h-[70px] text-[0.9rem] border ${
            color?.border || "border-green-500"
          } p-1`}
        />
      );
    }
    return (
      <div className="flex flex-col gap-1">
        <div
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className={`${baseStyle} p-1 border ${
            color?.border || "border-green-500"
          } rounded-medium`}
        >
          <div className="text-[0.65rem] font-medium bg-white bg-opacity-80 w-fit px-2 py-[2px] rounded mb-1">
            {formattedDate}
          </div>
          <div className="flex items-center gap-1 text-[0.9rem] h-[60px]">
            <ClipboardList className="w-4 h-4" />
            <span className="truncate">{event.title}</span>
          </div>
        </div>

        {/* Inline Note Field */}
        <div
          className={`text-[0.7rem] flex items-center gap-1 rounded-medium border-2 px-2 py-1
            ${
              editingNoteId === event.id && editingNoteDate === dayKey
                ? "cursor-text border-primary/70"
                : "cursor-pointer border-dashed hover:border-primary/70"
            }
            ${color?.text || "text-primary"} ${color?.light || "bg-primary"}`}
          style={{ width: "15%", boxSizing: "border-box" }}
          onClick={(e) => {
            e.stopPropagation();
            setEditingNoteId(event.id);
            setEditingNoteDate(dayKey);
            setNoteValue(notesByDate[dayKey] || "");
          }}
        >
          {editingNoteId === event.id && editingNoteDate === dayKey ? (
            <div className="flex justify-between items-center w-full">
              <input
                type="text"
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                onBlur={() => {
                  const initialNoteValue = notesByDate[dayKey] || "";
                  handleNoteSave(event.id, dayKey, noteValue, initialNoteValue);

                  if (editingNoteDate !== dayKey) {
                    moveNoteToAnotherDay(event.id, editingNoteDate, dayKey);
                  }

                  setEvents((prev) =>
                    prev.map((ev) =>
                      ev.id === event.id
                        ? {
                            ...ev,
                            extendedProps: {
                              ...ev.extendedProps,
                              notesByDate: {
                                ...ev.extendedProps.notesByDate,
                                [dayKey]: noteValue,
                              },
                            },
                          }
                        : ev
                    )
                  );

                  setEditingNoteId(null);
                  setEditingNoteDate(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.target.blur();
                }}
                autoFocus
                className="bg-transparent px-1 text-[0.7rem] border-0 outline-none w-full"
              />
              <MessageCircleMore className="w-4 h-4" />
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <span className="truncate" title={notesByDate[dayKey]}>
                {notesByDate[dayKey] || "Click to add note"}
              </span>
              <MessageCircleMore className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    );
  };
  


  return (
    <div className="p-4 h-screen flex flex-col overflow-hidden">
      <BredCrum board="Hikko Design" feature="Calender" header="Calender" />
      {/* Full 12-col grid */}
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="col-span-9 max-h-[700px]  pr-2">
          <div className="h-full overflow-y-auto scrollbar-hidden">
            <FullCalendar
              ref={calendarRef}
              plugins={[
                resourceTimelinePlugin,
                dayGridPlugin,
                interactionPlugin,
                timeGridPlugin,
              ]}
              // eventContent={(arg) =>
              //   renderEventContent({ event: arg.event, isStart: arg.isStart })
              // }
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              events={events}
              eventDrop={handleEventDrop}
              select={handleDateSelect}
              eventContent={renderEventContent}
              height="auto"
              headerToolbar={{
                left: "today",
                center: "prev,title,next",
                right: "",
              }}
              dayHeaderFormat={{ weekday: "long" }} // <- full day names like "Monday"
              datesSet={() => {
                const headerCells = document.querySelectorAll(
                  ".fc-col-header-cell"
                );
                headerCells.forEach((cell) => {
                  cell.style.textAlign = "center";
                  cell.style.verticalAlign = "middle";
                  cell.style.fontWeight = "200";
                });
                headerCells.forEach((cell) => {
                  cell.style.textAlign = "center"; // center text
                  cell.style.verticalAlign = "middle";
                  cell.style.fontWeight = "200";
                  cell.style.padding = "18px 0";
                });

                // Optional: style the text inside the header cell
                const headerTextSpans = document.querySelectorAll(
                  ".fc-col-header-cell-cushion"
                );
                headerTextSpans.forEach((span) => {
                  span.style.display = "block";
                  span.style.color = "primary"; // optional primary color
                });

                // Remove toolbar background
                const toolbar = document.querySelector(".fc-header-toolbar");
                if (toolbar) {
                  toolbar.style.backgroundColor = "transparent";
                  toolbar.style.border = "none"; // Optional: remove any border
                  toolbar.style.boxShadow = "none"; // Optional: remove shadow
                }

                // Style header buttons (optional)
                const buttons = document.querySelectorAll(".fc-button");
                buttons.forEach((btn) => {
                  const label = btn.innerText.toLowerCase();

                  if (label === "today") {
                    // Match your custom Tailwind-like styles
                    btn.style.backgroundColor = "#ffffff";
                    btn.style.color = "#000"; // text-black
                    btn.style.fontWeight = "500";
                    btn.style.border = "1px solid #e5e7eb"; // border-gray-200
                    btn.style.borderRadius = "9999px"; // rounded-full
                    btn.style.padding = "6px 16px"; // px-4 py-1
                    btn.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)"; // shadow-sm
                    btn.style.transition = "background-color 0.2s ease";
                    btn.style.textTransform = "capitalize"; // Capitalize first letter
                  } else {
                    // Style for Prev/Next
                    btn.style.backgroundColor = "transparent";
                    btn.style.color = "#000";
                    btn.style.borderRadius = "50%";
                    btn.style.padding = "0"; // Remove padding to keep fixed size consistent
                    btn.style.fontWeight = "500";
                    btn.style.boxShadow = "none";
                    btn.style.cursor = "pointer";
                    btn.style.fontSize = "14px"; // Font size for icon/text
                    btn.style.width = "30px"; // Fixed width
                    btn.style.height = "30px"; // Fixed height
                    btn.style.lineHeight = "30px"; // Vertically center text within height
                    btn.style.textAlign = "center"; // Horizontally center text
                    btn.style.border = "1px solid #e5e7eb"; // border-gray-200
                  }
                  btn.onmouseenter = () => {
                    btn.style.backgroundColor = "#59bad5"; // hover:#59bad5
                    btn.style.color = "#FFF";
                  };
                  btn.onmouseleave = () => {
                    btn.style.backgroundColor = "#fff";
                    btn.style.color = "#000";
                  };
                });
                // Style toolbar title (optional)
                const title = document.querySelector(".fc-toolbar-title");
                if (title) {
                  title.style.color = "#000";
                  title.style.fontWeight = "200";
                  title.style.fontSize = "16px";
                }
              }}
            />
          </div>
        </div>

        <div className="col-span-3 h-full pl-2 flex flex-col gap-5">
          <CardTaskCalender
            tasks={mappedTasks}
            onTaskClick={(dateStr, taskId) => handleTaskClick(dateStr, taskId)}
          />
          <CardTCommentCalender
            selectedTaskId={selectedTaskId}
            selectedTask={selectedTask}
            taskColorMap={taskColorMap}
            noteRefreshKey={noteRefreshKey}
          />
        </div>
      </div>
      {/* alert popup range comment */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-xl shadow-xl w-[350px] space-y-3">
            <h3 className="text-red-600 font-semibold text-lg">
              ⚠️ Invalid Selection
            </h3>
            <p className="text-gray-700 text-sm">
              Comments can only be added within the duration of a task.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
