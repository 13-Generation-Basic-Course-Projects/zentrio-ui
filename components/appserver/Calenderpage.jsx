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
  const commentColorOptions = [
    { text: "text-blue-600", light: "bg-blue-100" },
    { text: "text-green-600", light: "bg-green-100" },
    { text: "text-yellow-600", light: "bg-yellow-100" },
    { text: "text-rose-600", light: "bg-rose-100" },
    { text: "text-purple-600", light: "bg-purple-100" },
    { text: "text-pink-600", light: "bg-pink-100" },
    { text: "text-indigo-600", light: "bg-indigo-100" },
    { text: "text-red-600", light: "bg-red-100" },
    { text: "text-teal-600", light: "bg-teal-100" },
    { text: "text-cyan-600", light: "bg-cyan-100" },

    { text: "text-lime-600", light: "bg-lime-200" },
    { text: "text-emerald-600", light: "bg-emerald-300" },
    { text: "text-violet-600", light: "bg-violet-400" },
    { text: "text-fuchsia-600", light: "bg-fuchsia-300" },
    { text: "text-orange-600", light: "bg-orange-300" },
    { text: "text-amber-600", light: "bg-amber-200" },
    { text: "text-sky-600", light: "bg-sky-300" },
    { text: "text-zinc-600", light: "bg-zinc-300" },
    { text: "text-gray-600", light: "bg-gray-200" },
    { text: "text-stone-600", light: "bg-stone-200" },
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
    startDateStr,
    endDateStr,
    currentNoteValue,
    initialNoteValue
  ) => {
    const trimmedNoteValue = currentNoteValue.trim();

    // Early exit if nothing is added or changed
    if (!trimmedNoteValue && !initialNoteValue) return;

    const isNewNote = !initialNoteValue && trimmedNoteValue;
    const isUpdatedNote =
      initialNoteValue && trimmedNoteValue !== initialNoteValue;
    const isDeletedNote = initialNoteValue && !trimmedNoteValue;

    const startDateObj = new Date(`${startDateStr}T00:00:00.000Z`);
    const endDateObj = new Date(`${endDateStr}T00:00:00.000Z`);

    // Set tillDate to 23:59:59.999 of end day
    const tillDateObj = new Date(endDateObj);
    tillDateObj.setHours(23, 59, 59, 999);

    // Prevent past-dated notes
    if (tillDateObj < new Date()) {
      toast.error("Cannot create or update notes in the past!");
      return;
    }

    const formattedStartDate = startDateObj.toISOString();
    const formattedTillDate = tillDateObj.toISOString();

    try {
      // 📝 Handle create/update
      if (isNewNote || isUpdatedNote) {
        const response = await createNoteInCalendarAction(
          trimmedNoteValue,
          formattedStartDate,
          formattedTillDate,
          currentEventId
        );

        if (response?.error) {
          toast.error(response.error.detail || "Error saving note");
          return { success: false, message: response.error.detail };
        }

        console.log(`Note ${isNewNote ? "created" : "updated"} successfully.`);
      }

      // 🗑️ Handle delete (API call commented out for now)
      if (isDeletedNote) {
        console.log(
          `Note deleted for Task ID: ${currentEventId} on ${startDateStr} - ${endDateStr}`
        );
        // await deleteNoteInCalendarAction(currentEventId, formattedStartDate, formattedTillDate);
      }

      // 🔁 Update local calendar events
      setEvents((prevEvents) => {
        // Remove old comment (if exists)
        const updated = prevEvents.filter(
          (ev) =>
            !(
              ev.extendedProps.type === "comment" &&
              ev.extendedProps.sourceTaskId === currentEventId &&
              ev.start === startDateStr
            )
        );

        // Add new/updated comment if not deleting
        if (!isDeletedNote) {
          updated.push({
            id: `comment-${currentEventId}-${startDateStr}`,
            title: trimmedNoteValue,
            start: startDateStr,
            end: endDateStr,
            allDay: true,
            extendedProps: {
              type: "comment",
              noted: trimmedNoteValue,
              sourceTaskId: currentEventId,
              color: {
                text: "text-green-600",
                light: "bg-green-100",
              },
            },
          });
        }

        return updated;
      });

      // Trigger UI to re-render if needed
      setNoteRefreshKey((prev) => prev + 1);

      return { success: true };
    } catch (error) {
      const errorMsg =
        error?.response?.data?.detail ||
        error?.message ||
        "Unknown error occurred";
      console.error("Failed to save/update/delete note:", error);
      toast.error(errorMsg);
      return { success: false, message: errorMsg };
    }
  };
  

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      const allNotes = [];

      for (const task of tasks) {
        try {
          const response = await getAllNoteInCalendarAction(task.taskId);
          const taskNotes = Array.isArray(response?.payload)
            ? response.payload
            : [];

          allNotes.push(...taskNotes);
        } catch (error) {
          console.error("Error fetching notes for task:", task.taskId, error);
        }
      }

      setNotes(allNotes);
    };

    if (tasks.length > 0) {
      fetchAllNotes();
    }
  }, [tasks]);

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
          start: task.startedAt,
          end: task.finishedAt ?? task.startedAt,
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

  

  const [activeTaskId, setActiveTaskId] = useState(null);
  const handleTaskClick = (dateStr, taskId) => {
    const task = mappedTasks.find((t) => t.id === taskId);
    if (!task) return;

    setSelectedTaskId(taskId);
    setSelectedTask(task);
    setActiveTaskId(taskId);
    calendarRef.current?.getApi().gotoDate(dateStr);

    const relatedNotes = notes?.filter((note) => note.taskId === taskId) || [];

    const commentEvents = relatedNotes.map((note, i) => {
      const randomColor =
        commentColorOptions[
          Math.floor(Math.random() * commentColorOptions.length)
        ];

      return {
        id: `${taskId}-comment-${i}`,
        title: `Note: ${note.noted?.slice(0, 20) || "No Content"}...`,
        start: note.notedAt,
        end: note.tillDate,
        extendedProps: {
          type: "comment",
          notes: [note],
          color: randomColor,
        },
        backgroundColor: "transparent",
        borderColor: "transparent",
      };
    });

    // ✅ Adjust task end date (+1 day) to show last day
    const adjustedTask = {
      ...task,
      end: new Date(
        new Date(task.end).setDate(new Date(task.end).getDate() + 1)
      )
        .toISOString()
        .split("T")[0],
      extendedProps: {
        ...task.extendedProps,
        realEnd: task.end,
      },
    };

    setEvents([adjustedTask, ...commentEvents]);
  };
  

  const renderEventContent = ({ event, isStart }) => {
    const { type, color, notes = [], realEnd } = event.extendedProps;

    if (type !== "task" && type !== "comment") return null;

    const baseStyle = `h-[70px] p-1 rounded-small border-2 px-2 font-bold ${
      color?.text || "text-green-600"
    } ${color?.light || "bg-green-100"}`;

    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
      });

    const displayEnd = new Date(realEnd || event.end); // Use realEnd if available
    const formattedDate = `${formatDate(event.start)} - ${formatDate(
      displayEnd
    )}`;

    // COMMENT EVENT BLOCK
    if (type === "comment") {
      if (!isStart) {
        return (
          <div
            className={`mt-1 text-[0.7rem] rounded border-4 border-dashed px-2 py-[12px] ${
              color?.text || "text-blue-600"
            } ${color?.light || "bg-blue-100"}`}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.5rem",
            }}
          ></div>
        );
      }

      return (
        <div
          className={`mt-1 text-[0.7rem] rounded border-3 border-dashed px-2 py-[6px] ${
            color?.text || "text-blue-600"
          } ${color?.light || "bg-blue-100"}`}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem",
          }}
        >
          <MessageCircleMore className="w-4 h-4 flex-shrink-0" />
          <div
            className="text-[0.7rem] leading-snug break-words whitespace-pre-wrap flex-1"
            style={{ wordBreak: "break-word" }}
          >
            {notes[0]?.noted || event.extendedProps.noted}
          </div>
        </div>
      );
    }

    // TASK EVENT BLOCK
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
          className={`${baseStyle} border ${
            color?.border || "border-green-500"
          } rounded-medium`}
          style={{
            height: "70px",
            display: "grid",
            gridTemplateRows: "auto 1fr",
            gap: 0,
          }}
        >
          <div className="text-[0.65rem] font-medium bg-white bg-opacity-80 w-fit px-2 py-[2px] rounded-small">
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
    <div className="p-4 h-screen flex flex-col overflow-hidden relative">
      <BredCrum board="Hikko Design" feature="Calender" header="Calender" />

      {/* Main content grid */}
      <div className="flex flex-1 overflow-hidden scrollbar-hidden gap-4">
        {/* Calendar Section */}
        <div className="flex-1 overflow-y-auto scrollbar-hidden max-w-[75%]">
          {/* Top navigation */}
          <div className="grid grid-cols-2 mt-4 mb-6 px-2">
            <div>
              <button
                onClick={() => handleDateNav("today")}
                className="rounded-full px-4 py-1 shadow-sm bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition"
              >
                Today
              </button>
            </div>
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
            dayHeaderFormat={{ weekday: "long" }}
            events={events}
            eventContent={renderEventContent}
            datesSet={(arg) => setCurrentTitle(arg.view.title)}
            height="auto"
            contentHeight={200}
            selectable={true}
            select={(info, jsEvent) => handleDateSelect({ ...info, jsEvent })}
            displayEventTime={false}
          />
        </div>

        {/* Sidebar Section */}
        <div className="w-[25%] flex flex-col gap-5 overflow-y-auto scrollbar-hidden absolute top-16 right-1">
          <CardTaskCalender
            tasks={mappedTasks}
            activeTaskId={activeTaskId}
            onTaskClick={(dateStr, taskId) => handleTaskClick(dateStr, taskId)}
          />
          <CardTCommentCalender
            selectedTaskId={selectedTaskId}
            selectedTask={selectedTask}
            taskColorMap={taskColorMap}
            noteRefreshKey={noteRefreshKey}
          />
        </div>

        {/* Dropdown-style note input */}
        {commentBarInput?.visible &&
          (() => {
            const startDate = new Date(commentBarInput.start);
            const rawEndDate = new Date(commentBarInput.end);

            // Adjust endDate for display
            const endDate = new Date(rawEndDate);
            endDate.setMilliseconds(endDate.getMilliseconds() - 1);

            const isSingleDay =
              startDate.toISOString().slice(0, 10) ===
              endDate.toISOString().slice(0, 10);

            const handleSave = () => {
              if (!noteValue.trim()) {
                toast.error("Note cannot be empty!");
                return;
              }

              handleNoteSave(
                commentBarInput.taskId,
                commentBarInput.start,
                commentBarInput.end,
                noteValue,
                ""
              );
              setCommentBarInput(null);
              setNoteValue("");
            };

            return (
              <div className="absolute bottom-20 left-4 right-4 z-50 bg-white rounded-xl shadow-md p-4 border w-[500px] mx-auto">
                <h2 className="text-sm mb-2 text-primary font-semibold">
                  Add note for {startDate.toLocaleDateString()}{" "}
                  {!isSingleDay && `- ${endDate.toLocaleDateString()}`}
                </h2>
                <input
                  type="text"
                  value={noteValue}
                  onChange={(e) => setNoteValue(e.target.value)}
                  onBlur={() => {
                    if (noteValue.trim()) {
                      handleSave();
                    } else {
                      toast.error("Note cannot be empty!");
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (noteValue.trim()) {
                        handleSave();
                      } else {
                        toast.error("Note cannot be empty!");
                      }
                    }
                  }}
                  autoFocus
                  placeholder="Write your note here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-medium outline-none text-sm focus:ring-2 focus:ring-primary"
                />
              </div>
            );
          })()}
      </div>

      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
}
