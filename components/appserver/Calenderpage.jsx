"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleMore,
  ClipboardList,
  Plus,
  X,
  Calendar as CalendarIcon,
} from "lucide-react";

import BredCrum from "../bredcrum/MyBredcrum";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";
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

export default function MyCalendar({ tasks, workspaceId, boardName }) {
  const colorList = [
    {
      bg: "bg-red-500",
      text: "text-red-500",
      light: "bg-red-100",
      border: "border-red-500",
      highlight: "bg-red-200",
    },
    {
      bg: "bg-blue-500",
      text: "text-blue-500",
      light: "bg-blue-100",
      border: "border-blue-500",
      highlight: "bg-blue-200",
    },
    {
      bg: "bg-green-500",
      text: "text-green-500",
      light: "bg-green-100",
      border: "border-green-500",
      highlight: "bg-green-200",
    },
    {
      bg: "bg-purple-500",
      text: "text-purple-500",
      light: "bg-purple-100",
      border: "border-purple-500",
      highlight: "bg-purple-200",
    },
    {
      bg: "bg-orange-500",
      text: "text-orange-500",
      light: "bg-orange-100",
      border: "border-orange-500",
      highlight: "bg-orange-200",
    },
  ];

  const commentColorOptions = [
    { text: "text-blue-600", light: "bg-blue-100", highlight: "bg-blue-50" },
    { text: "text-green-600", light: "bg-green-100", highlight: "bg-green-50" },
    {
      text: "text-yellow-600",
      light: "bg-yellow-100",
      highlight: "bg-yellow-50",
    },
    { text: "text-rose-600", light: "bg-rose-100", highlight: "bg-rose-50" },
    {
      text: "text-purple-600",
      light: "bg-purple-100",
      highlight: "bg-purple-50",
    },
    { text: "text-pink-600", light: "bg-pink-100", highlight: "bg-pink-50" },
    {
      text: "text-indigo-600",
      light: "bg-indigo-100",
      highlight: "bg-indigo-50",
    },
    { text: "text-red-600", light: "bg-red-100", highlight: "bg-red-50" },
    { text: "text-teal-600", light: "bg-teal-100", highlight: "bg-teal-50" },
    { text: "text-cyan-600", light: "bg-cyan-100", highlight: "bg-cyan-50" },
  ];

  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteRefreshKey, setNoteRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteValue, setNoteValue] = useState("");
  const [noteStartDate, setNoteStartDate] = useState(null);
  const [noteEndDate, setNoteEndDate] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calendar utilities
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const isToday = (date) => {
    return isSameDay(date, new Date());
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
          console.error("Error fetching notes for task:", task.taskId, error);
        }
      }

      setNotes(allNotes);
    } catch (error) {
      console.error("Error in fetchAllNotes:", error);
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

      setNotes((prevNotes) => {
        const otherTaskNotes = prevNotes.filter(
          (note) => note.taskId !== taskId
        );
        return [...otherTaskNotes, ...taskNotes];
      });

      return taskNotes;
    } catch (error) {
      console.error(`Error refetching notes for task ${taskId}:`, error);
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
          start: new Date(task.startedAt),
          end: new Date(task.finishedAt),
          extendedProps: {
            type: task.type || "task",
            content: task.description,
            color,
            notes: relatedNotes,
          },
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

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Event handlers
  const handleTaskClick = (dateStr, taskId) => {
    const task = mappedTasks.find((t) => t.id === taskId);
    if (!task) return;

    setSelectedTaskId(taskId);
    setSelectedTask(task);
    setActiveTaskId(taskId);

    // Navigate to the task's start date
    const taskDate = new Date(dateStr);
    setCurrentDate(new Date(taskDate.getFullYear(), taskDate.getMonth(), 1));
  };

  const handleDateClick = (date) => {
    if (!selectedTaskId) {
      toast.error("Please select a task first to add notes.", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    const task = mappedTasks.find((t) => t.id === selectedTaskId);
    if (!task) return;

    const taskStart = normalizeDateToDay(task.start);
    const taskEnd = normalizeDateToDay(task.end);
    const clickedDate = normalizeDateToDay(date);

    // Check if clicked date is within task range
    if (clickedDate < taskStart || clickedDate > taskEnd) {
      toast.error("You can only add notes within the task duration.", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    if (!isSelecting) {
      // Start selection
      setIsSelecting(true);
      setSelectionStart(date);
      setSelectionEnd(date);
    } else {
      // End selection
      const startDate = selectionStart < date ? selectionStart : date;
      const endDate = selectionStart < date ? date : selectionStart;

      setNoteStartDate(startDate);
      setNoteEndDate(endDate);
      setShowNoteInput(true);
      setIsSelecting(false);
      setSelectionStart(null);
      setSelectionEnd(null);
    }
  };

  const handleDateHover = (date) => {
    if (isSelecting && selectionStart) {
      setSelectionEnd(date);
    }
    setHoveredDate(date);
  };

  const handleNoteSave = async () => {
    const trimmedNoteValue = noteValue.trim();

    if (!trimmedNoteValue) {
      toast.error("Note cannot be empty!");
      return;
    }

    if (!selectedTaskId || !noteStartDate || !noteEndDate) {
      toast.error("Please select a task and date range.");
      return;
    }

    const startDateObj = new Date(noteStartDate);
    startDateObj.setHours(17, 0, 0, 0);
    const endDateObj = new Date(noteEndDate);
    endDateObj.setHours(23, 0, 0, 0);

    try {
      setIsLoading(true);

      const response = await createNoteInCalendarAction(
        trimmedNoteValue,
        startDateObj.toISOString(),
        endDateObj.toISOString(),
        selectedTaskId
      );

      if (response?.error) {
        toast.error(response.error.detail || "Error saving note", {
          position: "top-right",
          autoClose: 4000,
        });
        return;
      }

      toast.success("Note created successfully!", {
        position: "top-right",
        autoClose: 4000,
      });

      await refetchTaskNotes(selectedTaskId);
      setNoteRefreshKey((prev) => prev + 1);

      // Reset note input
      setShowNoteInput(false);
      setNoteValue("");
      setNoteStartDate(null);
      setNoteEndDate(null);
    } catch (error) {
      const errorMsg =
        error?.response?.data?.detail ||
        error?.message ||
        "Unknown error occurred";
      console.error("Failed to save note:", error);
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelNoteInput = () => {
    setShowNoteInput(false);
    setNoteValue("");
    setNoteStartDate(null);
    setNoteEndDate(null);
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const cancelSelection = () => {
    setIsSelecting(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  // Check if date is in task range
  const isDateInTaskRange = (date) => {
    if (!selectedTaskId) return false;

    const task = mappedTasks.find((t) => t.id === selectedTaskId);
    if (!task) return false;

    const taskStart = normalizeDateToDay(task.start);
    const taskEnd = normalizeDateToDay(task.end);
    const currentDate = normalizeDateToDay(date);

    return currentDate >= taskStart && currentDate <= taskEnd;
  };

  // Check if date is in selection range
  const isInSelectionRange = (date) => {
    if (!isSelecting || !selectionStart || !selectionEnd) return false;

    const start = selectionStart < selectionEnd ? selectionStart : selectionEnd;
    const end = selectionStart < selectionEnd ? selectionEnd : selectionStart;
    const currentDate = normalizeDateToDay(date);

    return (
      currentDate >= normalizeDateToDay(start) &&
      currentDate <= normalizeDateToDay(end)
    );
  };

  // Get notes for selected task and date
  const getNotesForDate = (date) => {
    if (!selectedTaskId) return [];

    return notes.filter((note) => {
      if (note.taskId !== selectedTaskId) return false;

      const noteStart = normalizeDateToDay(new Date(note.notedAt));
      const noteEnd = normalizeDateToDay(new Date(note.tillDate));
      const currentDate = normalizeDateToDay(date);

      return currentDate >= noteStart && currentDate <= noteEnd;
    });
  };

  // Check if date is start or end of task
  const getTaskPosition = (date) => {
    if (!selectedTaskId) return null;

    const task = mappedTasks.find((t) => t.id === selectedTaskId);
    if (!task) return null;

    const taskStart = normalizeDateToDay(task.start);
    const taskEnd = normalizeDateToDay(task.end);
    const currentDate = normalizeDateToDay(date);

    if (isSameDay(currentDate, taskStart) && isSameDay(currentDate, taskEnd)) {
      return "single";
    } else if (isSameDay(currentDate, taskStart)) {
      return "start";
    } else if (isSameDay(currentDate, taskEnd)) {
      return "end";
    } else if (currentDate > taskStart && currentDate < taskEnd) {
      return "middle";
    }

    return null;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      );
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="p-2 sm:p-4 h-screen flex flex-col overflow-hidden relative">
      <BredCrum
        board={boardName}
        feature="Calendar"
        header="Calendar"
        workspaceId={workspaceId}
      />

      {/* Main content grid - Responsive layout */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden gap-2 sm:gap-4 relative">
        {/* Calendar Section */}
        <div className="w-full lg:w-3/4 overflow-y-auto">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={goToToday}
                className="rounded-full px-3 sm:px-4 py-1 shadow-sm bg-white text-gray-600 font-medium border border-gray-200 hover:bg-gray-50 transition text-sm touch-manipulation"
              >
                Today
              </button>
              {isSelecting && (
                <button
                  onClick={cancelSelection}
                  className="rounded-full px-3 sm:px-4 py-1 shadow-sm bg-red-100 text-red-600 font-medium border border-red-200 hover:bg-red-200 transition text-sm touch-manipulation"
                >
                  Cancel Selection
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={goToPreviousMonth}
                className="rounded-full p-2 shadow-sm bg-white text-gray-500 hover:bg-gray-100 transition touch-manipulation"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 min-w-0 text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>

              <button
                onClick={goToNextMonth}
                className="rounded-full p-2 shadow-sm bg-white text-gray-500 hover:bg-gray-100 transition touch-manipulation"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-2 sm:p-3 text-center text-xs sm:text-sm font-medium text-gray-600"
                >
                  {isMobile ? day.slice(0, 1) : day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((date, index) => {
                if (!date) {
                  return (
                    <div
                      key={index}
                      className="h-20 sm:h-24 lg:h-28 border-b border-r border-gray-100"
                    ></div>
                  );
                }

                const isTodayDate = isToday(date);
                const isInTaskRange = isDateInTaskRange(date);
                const isInSelection = isInSelectionRange(date);
                const taskPosition = getTaskPosition(date);
                const notesForDate = getNotesForDate(date);
                const selectedTaskColor = selectedTaskId
                  ? taskColorMap[selectedTaskId]
                  : null;

                return (
                  <div
                    key={date.toISOString()}
                    onClick={() => handleDateClick(date)}
                    onMouseEnter={() => handleDateHover(date)}
                    className={`h-20 sm:h-24 lg:h-28 border-b border-r border-gray-100 p-1 sm:p-2 cursor-pointer transition-colors touch-manipulation relative ${
                      isInSelection
                        ? "bg-blue-100 border-blue-300"
                        : isTodayDate
                        ? "bg-yellow-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Date number */}
                    <div
                      className={`text-xs sm:text-sm font-medium mb-1 ${
                        isTodayDate
                          ? "text-blue-600 font-bold"
                          : "text-gray-700"
                      }`}
                    >
                      {date.getDate()}
                    </div>

                    {/* Task highlight bar - Samsung style */}
                    {/* Task highlight bar - Samsung style */}
                    {selectedTaskId && isInTaskRange && selectedTaskColor && (
                      <div className="absolute top-0 left-0 right-0 h-1">
                        <div
                          className={`h-full ${selectedTaskColor.bg} ${
                            taskPosition === "start"
                              ? "rounded-l-full"
                              : taskPosition === "end"
                              ? "rounded-r-full"
                              : taskPosition === "single"
                              ? "rounded-full"
                              : "" // No rounding for middle days
                          }`}>

                        </div>

                        
                      </div>
                    )}

                    {/* Notes display */}
                    {selectedTaskId && notesForDate.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {notesForDate
                          .slice(0, isMobile ? 1 : 2)
                          .map((note, noteIndex) => {
                            const noteColor =
                              commentColorOptions[
                                noteIndex % commentColorOptions.length
                              ];
                            return (
                              <div
                                key={`${note.id}-${noteIndex}`}
                                className={`text-[0.6rem] sm:text-[0.7rem] px-1 py-0.5 rounded border-2 border-dashed ${noteColor.light} ${noteColor.text}`}
                                title={note.noted}
                              >
                                <div className="flex items-center gap-1">
                                  <MessageCircleMore className="w-2 h-2 sm:w-3 sm:h-3 flex-shrink-0" />
                                  <span className="truncate">{note.noted}</span>
                                </div>
                              </div>
                            );
                          })}

                        {notesForDate.length > (isMobile ? 1 : 2) && (
                          <div className="text-[0.6rem] text-gray-500 px-1">
                            +{notesForDate.length - (isMobile ? 1 : 2)} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 space-y-2">
            {!selectedTaskId && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  Select a task from the sidebar to view it on the calendar and
                  add notes.
                </p>
              </div>
            )}

            {selectedTaskId && !isSelecting && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  Click on a date within the task duration to start selecting a
                  range for adding notes.
                </p>
              </div>
            )}

            {selectedTaskId && isSelecting && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  Click on another date to complete your selection and add a
                  note.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Section */}
        <div className="w-full lg:w-1/4 flex flex-col gap-3 sm:gap-5 overflow-y-auto scrollbar-hidden p-2 sm:p-4 h-full">
          <div>
            <CardTaskCalender
              tasks={mappedTasks}
              activeTaskId={activeTaskId}
              onTaskClick={(dateStr, taskId) =>
                handleTaskClick(dateStr, taskId)
              }
            />
          </div>
          <div>
            <CardTCommentCalender
              selectedTaskId={selectedTaskId}
              selectedTask={selectedTask}
              taskColorMap={taskColorMap}
              noteRefreshKey={noteRefreshKey}
              onNoteUpdate={refetchTaskNotes}
            />
          </div>
        </div>
      </div>

      {/* Note Input Modal */}
      {showNoteInput && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Add Note
                </h3>
                <button
                  onClick={cancelNoteInput}
                  className="text-gray-400 hover:text-gray-600 touch-manipulation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {noteStartDate &&
                  noteEndDate &&
                  (isSameDay(noteStartDate, noteEndDate)
                    ? formatDate(noteStartDate)
                    : `${formatDate(noteStartDate)} - ${formatDate(
                        noteEndDate
                      )}`)}
              </p>
            </div>

            <div className="p-4">
              <textarea
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                placeholder="Enter your note..."
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2 justify-end">
              <button
                onClick={cancelNoteInput}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition touch-manipulation"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleNoteSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition touch-manipulation"
                disabled={isLoading || !noteValue.trim()}
              >
                {isLoading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Global styles */}
      <style jsx global>{`
        .touch-manipulation {
          touch-action: manipulation;
        }

        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  );
}
