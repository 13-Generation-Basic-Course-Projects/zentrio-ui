"use client";

import BredCrum from "../bredcrum/MyBredcrum";
import CardTaskCalender from "../card/CardTaskCalender";
import CardTCommentCalender from "../card/CardCommentCalender";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import { useRef, useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircleMore,
  ClipboardList,
  X,
  Send,
  Calendar,
  User,
  Clock,
} from "lucide-react";

import { getAllNotesFromCalendarByCurrentUserAction } from "@/action/calendar.action";

// Comment Modal Component
const CommentModal = ({ isOpen, onClose, task, onSubmit, loading }) => {
  const [comment, setComment] = useState("");
  const [tillDate, setTillDate] = useState("");

  if (!isOpen || !task) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await onSubmit({
      taskId: task.id,
      noted: comment.trim(),
      tillDate: tillDate || null,
    });

    setComment("");
    setTillDate("");
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Add Comment</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Task Info */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-start gap-3">
            <div className={`w-3 h-3 rounded-full mt-2 ${task.extendedProps?.color?.bg}`}></div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-2">{task.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(task.start)} - {formatDate(task.end)}</span>
                </div>
              </div>
              {task.extendedProps?.taskData?.description && (
                <p className="text-sm text-gray-600 mt-2">
                  {task.extendedProps.taskData.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment *
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Till Date
            </label>
            <input
              type="datetime-local"
              value={tillDate}
              onChange={(e) => setTillDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              If not specified, will default to current date/time
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !comment.trim() || !tillDate}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function MyCalender({ tasks, boardId }) {
  console.log("fetch task", tasks);

  const calendarRef = useRef(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [note, setNote] = useState(null);
  const [loadingNotes, setLoadingNotes] = useState(false);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(false);

  console.log("fetch note", note);

  // color random
  const colorList = [
    {
      bg: "bg-blue-500",
      text: "text-blue-500",
      light: "bg-blue-100",
      border: "border-blue-500",
    },
    {
      bg: "bg-red-500",
      text: "text-red-500",
      light: "bg-red-100",
      border: "border-red-500",
    },
    {
      bg: "bg-orange-500",
      text: "text-orange-500",
      light: "bg-orange-100",
      border: "border-orange-500",
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
  ];

  // Create task color mapping for consistency
  const taskColorMap = useMemo(() => {
    const taskList = Array.isArray(tasks?.payload) ? tasks.payload : [];
    const uniqueIds = new Set();
    const filteredTasks = taskList.filter((task) => {
      if (uniqueIds.has(task.taskId)) return false;
      uniqueIds.add(task.taskId);
      return true;
    });

    const colorMap = {};
    filteredTasks.forEach((task, index) => {
      colorMap[task.taskId] = colorList[index % colorList.length];
    });
    return colorMap;
  }, [tasks]);

  // map task to calendar
  const mappedTasks = useMemo(() => {
    const taskList = Array.isArray(tasks?.payload) ? tasks.payload : [];

    const uniqueIds = new Set();
    return taskList
      .filter((task) => {
        if (uniqueIds.has(task.taskId)) return false;
        uniqueIds.add(task.taskId);
        return true;
      })
      .map((task) => {
        const color = taskColorMap[task.taskId];
        return {
          id: task.taskId,
          title: task.title,
          start: task.startedAt || task.createdAt,
          end: task.finishedAt || task.createdAt,
          extendedProps: {
            type: "task",
            content: task.description,
            color,
            taskData: task,
          },
        };
      });
  }, [tasks, taskColorMap]);

  // Map comments to calendar events - show only one "Comment" event per task that has comments
  const mappedComments = useMemo(() => {
    if (!note?.payload || !selectedTaskId) return [];
    
    console.log("Filtering comments for taskId:", selectedTaskId);
    console.log("All comments:", note.payload);
    
    const taskComments = note.payload.filter(comment => {
      console.log("Comparing comment.taskId:", comment.taskId, "with selectedTaskId:", selectedTaskId);
      return String(comment.taskId) === String(selectedTaskId);
    });
    
    console.log("Filtered comments:", taskComments);
    
    if (taskComments.length === 0) return [];
    
    // Show only one "Comment" event for the task
    const firstComment = taskComments[0];
    const taskColor = taskColorMap[selectedTaskId];
    
    return [{
      id: `comment-${selectedTaskId}`,
      title: "Comment",
      start: firstComment.notedAt,
      end: firstComment.tillDate || firstComment.notedAt,
      extendedProps: {
        type: "comment",
        content: "Comment",
        color: taskColor,
        commentCount: taskComments.length,
      },
    }];
  }, [note, selectedTaskId, taskColorMap]);

  // Filter events based on selected task
  const filteredEvents = useMemo(() => {
    if (!selectedTaskId) return [];
    
    const selectedTask = mappedTasks.filter(task => task.id === selectedTaskId);
    return [...selectedTask, ...mappedComments];
  }, [mappedTasks, mappedComments, selectedTaskId]);

  const handleTaskClick = async (taskId) => {
    console.log("Task clicked:", taskId);
    console.log("Available tasks:", tasks?.payload?.map(t => ({ taskId: t.taskId, title: t.title })));
    
    setSelectedTaskId(taskId);
    setLoadingNotes(true);
    
    try {
      const fetchedNotes = await getAllNotesFromCalendarByCurrentUserAction(taskId);
      setNote(fetchedNotes);
      console.log("Available comments:", fetchedNotes?.payload?.map(c => ({ taskId: c.taskId, noted: c.noted })));
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNote(null);
    } finally {
      setLoadingNotes(false);
    }
    
    // Navigate to the task date
    const task = mappedTasks.find((t) => t.id === taskId);
    if (task) {
      calendarRef.current?.getApi().gotoDate(task.start);
    }
  };

  const handleShowAllTasks = () => {
    setSelectedTaskId(null);
    setNote(null);
  };

  // Handle event click on calendar
  const handleEventClick = (clickInfo) => {
    const { event } = clickInfo;
    const { type } = event.extendedProps;

    if (type === "task") {
      setSelectedTask(event);
      setIsModalOpen(true);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (commentData) => {
    setSubmittingComment(true);
    
    try {
      // Create the comment payload matching your API structure
      const payload = {
        noted: commentData.noted,
        startDate: new Date().toISOString(),
        tillDate: commentData.tillDate || new Date().toISOString(),
        taskId: commentData.taskId,
      };

      // Make POST request to your API endpoint
      const response = await fetch('/api/calendar/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const result = await response.json();
      console.log('Comment posted successfully:', result);

      // Refresh notes for the current task
      if (selectedTaskId) {
        const refreshedNotes = await getAllNotesFromCalendarByCurrentUserAction(selectedTaskId);
        setNote(refreshedNotes);
      }

      // Close modal and show success message
      setIsModalOpen(false);
      setSelectedTask(null);
      
      // You can add a toast notification here
      alert('Comment posted successfully!');

    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const renderEventContent = ({ event }) => {
    const { type, content, color } = event.extendedProps;
    const baseStyle = `rounded border-2 font-bold gap-1 ${color?.text} ${color?.light} cursor-pointer hover:opacity-80 transition-opacity`;

    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
    };
    const formattedDate = `${formatDate(event.start)} - ${formatDate(
      event.end
    )}`;

    if (type === "task") {
      return (
        <div
          className={`${baseStyle} h-[90px] text-[0.95rem] ${color?.border} p-1 flex flex-col`}
        >
          <div className="text-[0.70rem] font-bold bg-opacity-80 bg-white w-fit px-2 py-[2px] rounded">
            {formattedDate}
          </div>
          <div className="flex items-center gap-1">
            <ClipboardList className="w-4 h-4" />
            <span className="truncate">{event.title}</span>
          </div>
        </div>
      );
    }

    if (type === "comment") {
      return (
        <div
          className={`${baseStyle} mt-2 h-[40px] text-[0.75rem] ${color?.border} p-1 flex items-center gap-1`}
        >
          <MessageCircleMore className="w-4 h-4" />
          <span className="truncate">Comment</span>
        </div>
      );
    }

    return null;
  };

  // handle action custom header calendar
  const handleDateNav = (action) => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return;

    if (action === "today") calendarApi.today();
    else if (action === "prev") calendarApi.prev();
    else if (action === "next") calendarApi.next();

    setCurrentTitle(calendarApi.view.title);
  };

  return (
    <>
      <div className="p-4 h-screen flex flex-col overflow-hidden">
        {/* FullCalendar 12-col grid */}
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-9 h-full overflow-hidden">
            <BredCrum board="Hikko Design" feature="Calender" header="Calender" />

            {/* custom header calendar */}
            <div className="flex justify-between items-center mt-4 px-2 mb-6">
              <div className="flex items-center gap-4">
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
              events={filteredEvents}
              eventContent={renderEventContent}
              eventClick={handleEventClick}
              datesSet={(arg) => setCurrentTitle(arg.view.title)}
              height="auto"
            />
          </div>

          <div className="col-span-3 h-full overflow-y-auto p-2 flex flex-col gap-4">
            <CardTaskCalender 
              tasks={tasks} 
              onTaskClick={handleTaskClick} 
              taskColorMap={taskColorMap}
              selectedTaskId={selectedTaskId}
            />
            <CardTCommentCalender 
              note={note} 
              selectedTaskId={selectedTaskId}
              taskColorMap={taskColorMap}
              loading={loadingNotes}
            />
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onSubmit={handleCommentSubmit}
        loading={submittingComment}
      />
    </>
  );
}