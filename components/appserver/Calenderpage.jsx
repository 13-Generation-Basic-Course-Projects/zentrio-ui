"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleMore,
  ClipboardList,
} from "lucide-react";

import BredCrum from "../bredcrum/MyBredcrum";
import ModalCreateGanttBar from "../modal/board/ModalCreateGanttBar";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";
import { dropdown } from "@heroui/theme";
import { Button } from "@heroui/react";
import {
  createNoteInCalendarAction,
  getAllNoteInCalendarAction,
} from "@/action/calendarV2.action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/*
 * Use normalizeDateToDay to compare dates ignoring time.
 * Adjust selected end date by subtracting 1 day for inclusiveness.
 */

// function normalizeDateToDay(date) {
//   const d = new Date(date);
//   d.setHours(0, 0, 0, 0);
//   return d.getTime();
// }
const normalizeDateToDay = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date); // convert string or invalid input
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export default function MyCalender({ tasks }) {
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
  const calendarRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [noteValue, setNoteValue] = useState("");
  const [commentBarInput, setCommentBarInput] = useState(null); // { visible, start, end }
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [noteRefreshKey, setNoteRefreshKey] = useState(0); // NEW STATE: To trigger comment card refresh
  const [events, setEvents] = useState([]);

  const handleNoteSave = async (
    currentEventId,
    startDateStr, // from commentBarInput.start (string like '2025-06-13')
    endDateStr, // from commentBarInput.end
    currentNoteValue,
    initialNoteValue
  ) => {
    const trimmedNoteValue = currentNoteValue.trim();

    if (!trimmedNoteValue && !initialNoteValue) return;

    const isNewNote = !initialNoteValue && trimmedNoteValue;
    const isUpdatedNote =
      initialNoteValue && initialNoteValue !== trimmedNoteValue;
    const isDeletedNote = initialNoteValue && !trimmedNoteValue;

    // Normalize start date to 00:00:00.000Z UTC
    const startDateObj = new Date(`${startDateStr}T00:00:00.000Z`);
    const formattedStartDate = startDateObj.toISOString();

    // Normalize end date to 23:59:59.999Z UTC (end of day)
    const tillDateObj = new Date(`${endDateStr}T23:59:59.999Z`);
    const formattedTillDate = tillDateObj.toISOString();

    try {
      if (isNewNote || isUpdatedNote) {
        await createNoteInCalendarAction(
          trimmedNoteValue,
          formattedStartDate,
          formattedTillDate,
          currentEventId
        );
        console.log(`Note ${isNewNote ? "created" : "updated"} successfully.`);
      } else if (isDeletedNote) {
        console.log(
          `Note deletion for Task ID: ${currentEventId} on ${startDateStr} - ${endDateStr}`
        );
        // Call your API or service to delete the note here:
        // await deleteNoteInCalendarAction(currentEventId, formattedStartDate, formattedTillDate);
      }

      // Update events state (inject or remove comment event)
      setEvents((prevEvents) => {
        // Remove existing comment for this task and date range start
        const filtered = prevEvents.filter(
          (ev) =>
            !(
              ev.extendedProps.type === "comment" &&
              ev.extendedProps.sourceTaskId === currentEventId &&
              ev.start === startDateStr
            )
        );

        if (!isDeletedNote) {
          filtered.push({
            id: `comment-${currentEventId}-${startDateStr}`,
            title: trimmedNoteValue,
            start: startDateStr,
            end: endDateStr,
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

      setNoteRefreshKey((prev) => prev + 1); // Trigger UI refresh if needed
    } catch (error) {
      console.error("Failed to save/update/delete note via API:", error);
    }
  };

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!selectedTaskId) {
      setNotes([]);
      return;
    }

    async function fetchNotes() {
      try {
        const allNoted = await getAllNoteInCalendarAction(selectedTaskId);
        setNotes(allNoted.payload); // ✅ Fix here
        console.log("Notes fetched:", allNoted.payload);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]);
      }
    }

    fetchNotes();
  }, [selectedTaskId]);

  console.log("Use noted to find: ", notes); // ✅ Now logs an array

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
        const relatedNotes =
          notes?.filter((note) => note.taskId === task.taskId) || [];

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
            notes: relatedNotes,
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
  }, [tasks, colorList, notes]);

  // const handleTaskClick = (dateStr, taskId) => {
  //   const task = mappedTasks.find((t) => t.id === taskId);
  //   if (task) {
  //     setEvents([task]);
  //     setSelectedTaskId(taskId); // <-- set selected task here
  //     setSelectedTask(task);
  //     calendarRef.current?.getApi().gotoDate(dateStr);
  //   }
  // };

  const commentEvents = notes.map((note, index) => {
    const color = {
      text: "text-blue-600",
      light: "bg-blue-100",
      border: "border-blue-500",
      bg: "bg-blue-100", // for backgroundColor
    };

    return {
      id: `comment-${index}`,
      title: "Comment",
      start: note.notedAt,
      end: note.tillDate || note.notedAt,
      extendedProps: {
        type: "comment",
        color,
        notes: [note],
      },
      backgroundColor: "#BFDBFE",
      borderColor: "#3B82F6",
    };
  });


  const handleTaskClick = (dateStr, taskId) => {
    const task = mappedTasks.find((t) => t.id === taskId);
    if (!task) return;

    setSelectedTaskId(taskId); // Triggers note fetch via useEffect
    setSelectedTask(task);
    calendarRef.current?.getApi().gotoDate(dateStr);

    // After notes are fetched (already in useEffect), you can map them into comment events.
    // We'll do a temporary workaround by delaying a bit so notes are loaded.
    setTimeout(() => {
      const relatedNotes = notes.filter((note) => note.taskId === taskId);

      const commentEvents = relatedNotes.map((note, i) => ({
        id: `${taskId}-comment-${i}`,
        title: `Note: ${note.noted.slice(0, 20)}...`,
        start: note.notedAt,
        end: note.notedAt,
        extendedProps: {
          type: "comment",
          notes: [note], // pass note inside array for renderEventContent
          color: taskColorMap[taskId], // reuse task color
        },
        backgroundColor: "transparent",
        borderColor: "transparent",
      }));

      setEvents([task, ...commentEvents]);
    }, 100); // 100ms wait for notes to be fetched
  };



  const renderEventContent = ({ event, isStart }) => {
    const { type, color, notesByDate = {} , notes=[]} = event.extendedProps;

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

   
    if (type === "comment") {
      return (
        <div
          className={`mt-1 text-[0.7rem] flex flex-col gap-1 rounded border-2 border-dashed px-2 py-1 ${
            color?.text || "text-blue-600"
          } ${color?.light || "bg-blue-100"}`}
        >
          <div className="flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            <span className="font-semibold">Note:</span>
          </div>
          {notes.map((note, i) => (
            <div key={i} className="ml-5 truncate">
              • {note.noted}
            </div>
          ))}
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

        
      </div>
    );
  };
  

  const handleDateNav = (action) => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    if (action === "today") calendarApi.today();
    else if (action === "prev") calendarApi.prev();
    else if (action === "next") calendarApi.next();

    setCurrentTitle(calendarApi.view.title);
  };

  const handleDateSelect = (info) => {
    const selectedStart = new Date(info.startStr);
    const selectedEnd = new Date(info.endStr);

    // Normalize dates to ignore time part
    const selStart = normalizeDateToDay(selectedStart);
    const selEnd = normalizeDateToDay(
      new Date(selectedEnd.getTime() - 24 * 60 * 60 * 1000) // adjust end date to be inclusive
    );

    // Ensure a task is selected before allowing comments
    if (!selectedTaskId) {
      toast.error("⚠️ Selection must be within a task duration.", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Find the selected task from mappedTasks using correct id property
    const matchingTask = mappedTasks.find((task) => {
      if (task.id === selectedTaskId) {
        const taskStart = normalizeDateToDay(new Date(task.start));
        const taskEnd = normalizeDateToDay(new Date(task.end));

        // Check if the selected date range falls within the task duration
        return (
          selStart.getTime() >= taskStart.getTime() &&
          selEnd.getTime() <= taskEnd.getTime()
        );
      }
      return false;
    });

    // If no matching task or date range is outside task duration, show alert
    if (!matchingTask) {
      toast.error("⚠️ Selection must be within a task duration.", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    if (!matchingTask) {
      toast.error("⚠️ Selection must be within a task duration.", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    setCommentBarInput({
      visible: true,
      start: info.startStr,
      end: info.endStr,
      taskId: matchingTask.id,
    });
  };

  return (
    <div className="p-4 h-screen flex flex-col overflow-hidden">
      <BredCrum board="Hikko Design" feature="Calender" header="Calender" />
      {/* Move header outside the grid */}
      <div className="flex space-x-[500px] items-center mt-4 px-2 mb-6">
        <button
          onClick={() => handleDateNav("today")}
          className="rounded-full px-4 py-1 shadow-sm bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition"
        >
          Today
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleDateNav("prev")}
            className="rounded-full p-2 shadow-sm bg-white text-gray-500 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold text-gray-600">
            {currentTitle}
          </h2>
          <button
            onClick={() => handleDateNav("next")}
            className="rounded-full p-2 shadow-sm bg-white text-gray-500 hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
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
              headerToolbar={false}
              initialView="dayGridMonth"
              events={events}
              // events={allEvents}
              eventContent={renderEventContent}
              datesSet={(arg) => setCurrentTitle(arg.view.title)}
              height="auto"
              /* it make comment can select */
              selectable={true}
              // select={(info) => handleDateSelect(info)}
              select={(info, jsEvent) => handleDateSelect({ ...info, jsEvent })}
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

      {/* Render dropdown for comment input */}
      {commentBarInput?.visible && (
        <div className="mt-4 p-3 bg-white border rounded-xl shadow-md z-10">
          <h2 className="text-sm mb-2 text-primary font-semibold">
            Add note for {new Date(commentBarInput.start).toLocaleDateString()}{" "}
            - {new Date(commentBarInput.end).toLocaleDateString()}
          </h2>
          <input
            type="text"
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            onBlur={() => {
              handleNoteSave(
                commentBarInput.taskId,
                commentBarInput.start,
                commentBarInput.end,
                noteValue,
                "" // previous note value if editing, or "" for new
              );
              setCommentBarInput(null);
              setNoteValue("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleNoteSave(
                  commentBarInput.taskId,
                  commentBarInput.start,
                  commentBarInput.end,
                  noteValue,
                  ""
                );
                setCommentBarInput(null);
                setNoteValue("");
              }
            }}
            autoFocus
            placeholder="Write your note here..."
            className="w-full p-2 border rounded-md outline-none text-sm"
          />
        </div>
      )}

      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
}
