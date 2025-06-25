"use client";

import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
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

const normalizeDateToDay = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export default function MyCalender({ tasks, workspaceId }) {
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
  const [commentBarInput, setCommentBarInput] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [noteRefreshKey, setNoteRefreshKey] = useState(0);
  const [events, setEvents] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches all notes for all tasks and updates local state
   */
  const fetchAllNotes = useCallback(async () => {
    if (!tasks || tasks.length === 0) return;

    setIsLoading(true);
    try {
      const allNotes = [];

      for (const task of tasks) {
        try {
          const response = await getAllNoteInCalendarAction(task.taskId);
          const taskNotes = Array.isArray(response?.payload)
            ? response?.payload
            : [];
          allNotes.push(...taskNotes);
        } catch (error) {
          console.error(" Error fetching notes for task:", task.taskId, error);
        }
      }

      setNotes(allNotes);
      // console.log(" Fetched all notes:", allNotes);
    } catch (error) {
      console.error(" Error in fetchAllNotes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [tasks]);

  /**
   * Refetches notes for a specific task after note operations
   */
  const refetchTaskNotes = useCallback(async (taskId) => {
    try {
      const response = await getAllNoteInCalendarAction(taskId);
      const taskNotes = Array.isArray(response?.payload)
        ? response.payload
        : [];

      // Update notes state by replacing notes for this specific task
      setNotes((prevNotes) => {
        const otherTaskNotes = prevNotes.filter(
          (note) => note.taskId !== taskId
        );
        return [...otherTaskNotes, ...taskNotes];
      });

      // console.log(` Refetched notes for task ${taskId}:`, taskNotes);
      return taskNotes;
    } catch (error) {
      console.error(` Error refetching notes for task ${taskId}:`, error);
      return [];
    }
  }, []);

  const { mappedTasks, taskColorMap } = useMemo(() => {
    const uniqueIds = new Set();
    const mapForCalendar = [];
    const mapForColors = {};

    let colorIndex = 0;

    tasks.forEach((task) => {
      if (!uniqueIds.has(task?.taskId)) {
        uniqueIds.add(task?.taskId);
        const color = colorList[colorIndex % colorList.length];
        colorIndex++;

        mapForColors[task?.taskId] = color;
        const relatedNotes =
          notes?.filter((note) => note?.taskId === task?.taskId) || [];

        mapForCalendar.push({
          id: task.taskId,
          title: task.title,
          start: task.startedAt,
          end: task.finishedAt,
          allDay: false,
          extendedProps: {
            type: task.type || "task",
            content: task.description,
            color,
            notes: relatedNotes,
          },
          backgroundColor: color.bg.replace("bg-", "#"),
          borderColor: color.border.replace("border-", "#"),
        });
      }
    });

    return {
      mappedTasks: mapForCalendar,
      taskColorMap: mapForColors,
    };
  }, [tasks, colorList, notes]);

  // Initial data fetch
  useEffect(() => {
    fetchAllNotes();
  }, [fetchAllNotes]);

  // Update events when active task changes
  useEffect(() => {
    if (activeTaskId && selectedTask) {
      updateEventsForTask(activeTaskId);
    }
  }, [notes, activeTaskId, selectedTask]);

  /**
   * Updates calendar events for a specific task
   */
  const updateEventsForTask = useCallback(
    (taskId) => {
      const task = mappedTasks.find((t) => t.id === taskId);
      if (!task) return;

      const relatedNotes =
        notes?.filter((note) => note.taskId === taskId) || [];

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
            noted: note.noted,
            sourceTaskId: taskId,
          },
          backgroundColor: "transparent",
          borderColor: "transparent",
        };
      });

      // Adjust task end date (+1 day) to show last day
      const adjustedTask = {
        ...task,
        end: new Date(
          new Date(task.end).setDate(new Date(task.end).getDate() + 2)
        )
          .toISOString()
          .split("T")[0],
        extendedProps: {
          ...task.extendedProps,
          realEnd: task.end,
        },
      };

      setEvents([adjustedTask, ...commentEvents]);
    },
    [notes, mappedTasks, commentColorOptions]
  );

  /**
   * Handles saving/updating/deleting notes with real-time updates
   */
  const handleNoteSave = async (
    currentEventId,
    startDateStr,
    endDateStr,
    currentNoteValue,
    initialNoteValue
  ) => {
    const trimmedNoteValue = currentNoteValue.trim();

    if (!trimmedNoteValue && !initialNoteValue) return;

    const isNewNote = !initialNoteValue && trimmedNoteValue;
    const isUpdatedNote =
      initialNoteValue && trimmedNoteValue !== initialNoteValue;
    const isDeletedNote = initialNoteValue && !trimmedNoteValue;

    const startDateObj = new Date(`${startDateStr}T17:00:00.000Z`);
    const tillDateObj = new Date(`${endDateStr}T23:00:00.000Z`);

    const selectedDate = new Date(`${endDateStr}T00:00:00.000Z`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const formattedStartDate = startDateObj.toISOString();
    const formattedTillDate = tillDateObj.toISOString();

    try {
      setIsLoading(true);

      // Handle create/update
      if (isNewNote || isUpdatedNote) {
        const response = await createNoteInCalendarAction(
          trimmedNoteValue,
          formattedStartDate,
          formattedTillDate,
          currentEventId
        );

        if (response?.error) {
          toast.error(response.error.detail || "Error saving note", {
            position: "top-right",
            autoClose: 4000,
          });
          return { success: false, message: response.error.detail };
        }

        toast.success(
          `Note ${isNewNote ? "created" : "updated"} successfully!`,
          {
            position: "top-right",
            autoClose: 4000,
          }
        );
      }

      if (isDeletedNote) {
        toast.success("Note deleted successfully!");
      }

      await refetchTaskNotes(currentEventId);
      setNoteRefreshKey((prev) => prev + 1);

      return { success: true };
    } catch (error) {
      const errorMsg =
        error?.response?.data?.detail ||
        error?.message ||
        "Unknown error occurred";
      console.error("Failed to save/update/delete note:", error);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 4000,
      });
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };
  /* 
   EVENT HANDLERS
  */

  const handleTaskClick = (dateStr, taskId) => {
    const task = mappedTasks.find((t) => t.id === taskId);
    if (!task) return;

    setSelectedTaskId(taskId);
    setSelectedTask(task);
    setActiveTaskId(taskId);
    calendarRef.current?.getApi().gotoDate(dateStr);

    // Update events will be handled by useEffect
  };

  const handleDateNav = (action) => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    if (action === "today") calendarApi.today();
    else if (action === "prev") calendarApi.prev();
    else if (action === "next") calendarApi.next();

    setCurrentTitle(calendarApi.view.title);
  };

  const handleCancel = () => {
    setCommentBarInput({
      visible: false,
      start: null,
      end: null,
      taskId: null,
    });
    setNoteValue("");
  };

  const handleDateSelect = (info) => {
    const selectedStart = new Date(info.startStr);
    const selectedEnd = new Date(info.endStr);

    const selStart = normalizeDateToDay(selectedStart);
    const selEnd = normalizeDateToDay(
      new Date(selectedEnd.getTime() - 86400000)
    );

    if (!selectedTaskId) {
      handleCancel();
      toast.error("Selection must be within a task duration.", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    const matchingTask = mappedTasks.find((task) => {
      if (task.id === selectedTaskId) {
        const taskStart = normalizeDateToDay(new Date(task.start));
        const taskEnd = normalizeDateToDay(new Date(task.end));
        return (
          selStart.getTime() >= taskStart.getTime() &&
          selEnd.getTime() <= taskEnd.getTime()
        );
      }
      return false;
    });

    if (!matchingTask) {
      handleCancel();
      toast.error("Selection must be within a task duration.", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    setCommentBarInput({
      visible: true,
      start: info.startStr,
      end: new Date(selectedEnd.getTime() - 86400000)
        .toISOString()
        .split("T")[0],
      taskId: matchingTask.id,
    });
  };

  /* 
   RENDER FUNCTIONS
  */

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

    const displayEnd = new Date(realEnd || event.end);
    console.log("Display end in calendar is: ", displayEnd);
    const formattedDate = `${formatDate(event.start)} - ${formatDate(
      displayEnd
    )}`;
    // console.log("formattedDate in calendar is: ", formattedDate);

    // COMMENT EVENT BLOCK
    if (type === "comment") {
      if (!isStart) {
        return (
          <div
            className={`mt-1 text-[0.7rem] rounded-small border-2 border-dashed px-2 py-[12px] ${
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
          className={`mt-1 text-[0.7rem] rounded-small border-2 border-dashed px-2 py-[6px] ${
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
    function normalizeDateToDay(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const renderDate = event._instance?.range?.start;
    const currentRenderDate = normalizeDateToDay(new Date(renderDate));
    const startDate = normalizeDateToDay(new Date(event.start));

    // Adjust end time back by 1ms to make it inclusive on the correct date
    const rawEndDate = new Date(event.end || event.start);
    const adjustedEndDate = new Date(rawEndDate.getTime() -2
   );
    const endDate = normalizeDateToDay(adjustedEndDate);

    console.log("Start date:", startDate);
    console.log("Adjusted end date:", adjustedEndDate);
    console.log("Display end in calendar is:", endDate);

    // Filter: only show between start and adjusted end (inclusive)
    if (
      currentRenderDate.getTime() < startDate.getTime() ||
      currentRenderDate.getTime() > endDate.getTime()
    ) {
      return null;
    }
    
    
    
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

  return (
    <div className="p-4 h-screen flex flex-col overflow-hidden relative">
      <BredCrum
        board="Hikko Design"
        feature="Calender"
        header="Calender"
        workspaceId={workspaceId}
      />

      {/* Main content grid */}
      <div className="flex flex-1 overflow-hidden scrollbar-hidden gap-4">
        {/* Calendar Section */}
        <div className="flex-1 overflow-y-auto scrollbar-hidden max-w-[75%]">
          {/* Top navigation */}
          <div className="grid grid-cols-2 mt-4 mb-6 px-2 sticky top-0 z-10 bg-white">
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

          <div className="relative">
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
        </div>

        {/* Sidebar Section */}
        <div className="w-[25%] flex flex-col gap-5 overflow-y-auto scrollbar-hidden absolute top-12 right-1 p-4">
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
            onNoteUpdate={refetchTaskNotes} // Pass the refetch function
          />
        </div>

        {/* Note input overlay */}
        {commentBarInput?.visible &&
          (() => {
            const startDate = new Date(commentBarInput.start);
            const rawEndDate = new Date(commentBarInput.end);
            const endDate = new Date(rawEndDate);
            const isSingleDay =
              startDate.toISOString().slice(0, 10) ===
              endDate.toISOString().slice(0, 10);

            const handleSave = async () => {
              const trimmed = noteValue.trim();
              if (!trimmed) {
                handleCancel();
                toast.error("Note cannot be empty!");
                return;
              }

              const result = await handleNoteSave(
                commentBarInput.taskId,
                commentBarInput.start,
                commentBarInput.end,
                trimmed,
                ""
              );

              if (result?.success) {
                handleCancel();
              }
            };

            return (
              <div className="absolute z-50 w-[50%] bottom-32 left-0 right-36 mx-auto">
                <input
                  type="text"
                  value={noteValue}
                  onChange={(e) => setNoteValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSave();
                    } else if (e.key === "Escape") {
                      handleCancel();
                    }
                  }}
                  autoFocus
                  placeholder={`Add note for ${startDate.toLocaleDateString()}${
                    !isSingleDay ? ` - ${endDate.toLocaleDateString()}` : ""
                  }`}
                  className="w-full px-3 py-2 text-body-sm border border-gray-300 rounded-medium outline-none text-sm focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
              </div>
            );
          })()}
      </div>

      <ToastContainer position="top-center" autoClose={4000} />
    </div>
  );
}
