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

  // const mappedTasks = useMemo(() => {
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

  // Asynchronous function to handle saving/updating/deleting notes via API
  const handleNoteSave = async (
    currentEventId,
    currentDayKey,
    currentNoteValue,
    initialNoteValue
  ) => {
    const trimmedNoteValue = currentNoteValue.trim();

    // Do nothing if no change or new empty note
    if (!trimmedNoteValue && !initialNoteValue) {
      return;
    }

    const isNewNote = !initialNoteValue && trimmedNoteValue; // Check if it's a creation
    const isUpdatedNote =
      initialNoteValue && initialNoteValue !== trimmedNoteValue; // Check if existing note changed
    const isDeletedNote = initialNoteValue && !trimmedNoteValue; // Check if existing note was cleared
    // const formattedStartDate = new Date(
    //   `${currentDayKey}T00:00:00.000Z`
    // ).toISOString();

    const startDateObj = new Date(`${currentDayKey}T00:00:00.000Z`);
    startDateObj.setDate(startDateObj.getDate() +3 );
    const formattedStartDate = startDateObj.toISOString();
   
    const tillDateObj = new Date(`${currentDayKey}T23:59:59.999Z`);
    tillDateObj.setDate(tillDateObj.getDate() + 6);
    const formattedTillDate = tillDateObj.toISOString();

    try {
      if (isNewNote || isUpdatedNote) {
        console.log(
          `Attempting to ${
            isNewNote ? "create" : "update"
          } note for Task ID: ${currentEventId} on ${currentDayKey}`
        );
        const noted = trimmedNoteValue;
        const startDate = formattedStartDate ;
        const tillDate = formattedTillDate ;
        const taskId = currentEventId;

        await createNoteAction(
          noted,
          startDate, 
          tillDate, 
          taskId,
        );
        console.log(`Note ${isNewNote ? "created" : "updated"} successfully.`);
      } else if (isDeletedNote) {
        console.log(
          `Attempting to delete note for Task ID: ${currentEventId} on ${currentDayKey}`
        );
        // Implement your delete note action here if you have one
        // For example: await deleteNoteAction({ taskId: currentEventId, date: currentDayKey });
        console.log("Note deletion (local only for now) initiated.");
      }
    } catch (error) {
      console.error("Failed to save/update/delete note via API:", error);
    }
  };

  const [events, setEvents] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteDate, setEditingNoteDate] = useState(null);
  const [noteValue, setNoteValue] = useState("");
  const moveNoteToAnotherDay = (eventId, oldDayKey, newDayKey) => {
    setEvents((prevEvents) =>
      prevEvents.map((ev) => {
        if (ev.id === eventId) {
          const notes = { ...ev.extendedProps.notesByDate };
          if (notes[oldDayKey]) {
            notes[newDayKey] = notes[oldDayKey]; // Move note content
            delete notes[oldDayKey]; // Remove old note
          }
          return {
            ...ev,
            extendedProps: {
              ...ev.extendedProps,
              notesByDate: notes,
            },
          };
        }
        return ev;
      })
    );
  };

  const renderEventContent = ({ event, isStart }) => {
    const { type, color } = event.extendedProps;

    if (type !== "task") return null;

    const baseStyle = `rounded border-2 px-2 font-bold ${
      color?.text || "text-green-600"
    } ${color?.light || "bg-green-100"}`;

    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });

    const formattedDate = `${formatDate(event.start)} - ${formatDate(
      event.end
    )}`;

    if (!isStart) {
      return (
        <div
          className={`${baseStyle} h-[70px] text-[0.9rem] ${
            color?.border || "border-green-500"
          } p-1 flex flex-col rounded-medium`}
        ></div>
      );
    }
    const dayDate = event.range?.start
      ? new Date(event.range.start)
      : new Date(event.start);
    const dayKey = dayDate.toISOString().split("T")[0]; // e.g., "2025-06-10"

    const notesByDate = event.extendedProps.notesByDate || {};


    return (
      <div className="flex flex-col">
        {/* Task container (not draggable) */}
        <div
          className={`${baseStyle} p-1 flex flex-col rounded-medium border ${
            color?.border || "border-green-500"
          }`}
        >
          <div className="h-[70px] text-[0.9rem]">
            <div className="text-[0.65rem] font-medium bg-opacity-80 bg-white w-fit px-2 py-[2px] rounded-medium mb-1">
              {formattedDate}
            </div>

            {/* Task title (non-editable) */}
            <div className="flex items-center gap-1">
              <ClipboardList className="w-4 h-4" />
              <span className="truncate">{event.title}</span>
            </div>
          </div>
        </div>

        {/* Note per specific day */}
        <div
          className={`mt-1 mb-2 h-[30px] text-[0.7rem] flex items-center gap-1 rounded-medium border-2 px-2 py-1
    ${
      editingNoteId === event.id && editingNoteDate === dayKey
        ? "cursor-text border-primary/70"
        : "cursor-pointer border-dashed hover:border-primary/70"
    } ${color?.text || "text-primary"} ${color?.light || "bg-primary"}`}
          style={{ width: "15%", boxSizing: "border-box" }} // strict 15% width within parent
          onClick={(e) => {
            e.stopPropagation();
            setEditingNoteId(event.id);
            setEditingNoteDate(dayKey);
            setNoteValue(notesByDate[dayKey] || "");
          }}
        >
          {editingNoteId === event.id && editingNoteDate === dayKey ? (
            <div className="flex flex-row justify-between  items-center w-full">
              <input
                type="text"
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                onBlur={() => {
                  const initialNoteValue = notesByDate[dayKey] || "";
                  handleNoteSave(event.id, dayKey, noteValue, initialNoteValue);
                  // If the note value is edited on a new day (different from where it was before)
                  if (editingNoteDate !== dayKey) {
                    moveNoteToAnotherDay(event.id, editingNoteDate, dayKey);
                  }

                  // Update or set the note on this day
                  const updated = events.map((ev) =>
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
                  );
                  setEvents(updated);

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
            <div className="flex flex-row justify-between items-center w-full">
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
              eventContent={(arg) =>
                renderEventContent({ event: arg.event, isStart: arg.isStart })
              }
              initialView="dayGridMonth"
              events={events}
              height="auto"
              headerToolbar={{
                left: "today",
                center: "prev,title,next",
                right: "",
              }}
              dayHeaderFormat={{ weekday: "long" }} // <- full day names like "Monday"
              datesSet={() => {
                // Target all header cells (the day names like Monday, Tuesday, etc.)
                const headerCells = document.querySelectorAll(
                  ".fc-col-header-cell"
                );

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
            getNoteAllInCalendarAction={getNoteAllInCalendarAction}
          />
        </div>
      </div>
    </div>
  );
}
