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

export default function MyCalender({ tasks, createNoteAction }) {
  const calendarRef = useRef(null);

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

  const mappedTasks = useMemo(() => {
    const uniqueIds = new Set();
    return tasks
      .filter((task) => {
        if (uniqueIds.has(task.taskId)) return false;
        uniqueIds.add(task.taskId);
        return true;
      })
      .map((task, index) => {
        const color = colorList[index % colorList.length];
        return {
          id: task.taskId,
          title: task.title,
          start: task.createdAt,
          end: task.finishedAt ?? task.createdAt,
          extendedProps: {
            // type: "task",
            type: task.type || "task",
            content: task.description,
            color,
          },
        };
      });
  }, [tasks]);

  const [newEventData, setNewEventData] = useState({
    noted: "",
    // description: "",
    type: "comment",
    start: "",
    end: "",
  });

  const handleTaskClick = (dateStr, taskId) => {
    const task = mappedTasks.find((t) => t.id === taskId);
    if (task) {
      setEvents([task]);
      setSelectedTaskId(taskId); // <-- set selected task here
      calendarRef.current?.getApi().gotoDate(dateStr);
    }
  };

  const [events, setEvents] = useState([]);
  const renderEventContent = ({ event }) => {
    const { type, content, color } = event.extendedProps;
    const baseStyle = `rounded border-2 px-2 font-bold ${
      color?.text || "text-green-600"
    } ${color?.light || "bg-green-100"}`;

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
          className={`${baseStyle} h-[70px] text-[0.9rem] ${
            color?.border || "border-green-500"
          } p-1 flex flex-col rounded-medium`}
        >
          <div className="text-[0.65rem] font-medium bg-opacity-80 bg-white w-fit px-2 py-[2px] rounded-medium mb-1">
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
          onContextMenu={(e) => {
            e.preventDefault();
            setContextMenu({
              visible: true,
              x: e.clientX,
              y: e.clientY,
              eventId: event.id,
            });
          }}
          className={`mt-1 mb-2 h-[30px] text-[0.7rem] flex items-center gap-1 rounded-medium border-2 border-dashed px-2 py-1 ${
            color?.text || "text-primary"
          } ${color?.light || "bg-primary"}`}
        >
          <MessageCircleMore className="w-4 h-4" />
          <span className="truncate">
            {event.extendedProps.noted || "No note"}
          </span>
        </div>
      );
    }

    return null;
  };

  /*
   * use for handler modal comment
   */
  const [isOpen, setIsOpen] = useState(false);
  /*
   * state use for comments dropdown
   */
  const [commentDropdown, setCommentDropdown] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventData: {
      noted: "",
      start: "",
      end: "",
      type: "comment",
    },
  });

  /*
   * Handler for select date to comment base on each task have selected
   */
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
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
      setShowPopup(true); // Show alert to select a task first
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
      setShowPopup(true); // Show alert about invalid comment range
      return;
    }

    // If validation passed, open comment input dropdown near the click position
    const x = info.jsEvent?.clientX || window.innerWidth / 2;
    const y = info.jsEvent?.clientY || window.innerHeight / 2;

    setCommentDropdown({
      visible: true,
      x,
      y,
      eventData: {
        noted: "",
        start: info.startStr,
        end: info.endStr,
        type: "comment",
      },
    });
  };

  /*
   * handle on action for create note
   */
  const handleCommentSubmit = async () => {
    try {
      const color = colorList[Math.floor(Math.random() * colorList.length)];

      const newEvent = {
        id: Date.now().toString(),
        title: "Comment",
        noted: commentDropdown.eventData.noted,
        start: commentDropdown.eventData.start,
        end: commentDropdown.eventData.end,
        extendedProps: {
          type: "comment",
          taskId: selectedTaskId,
          color,
        },
      };

      // 🔁 Call backend API to persist note
      await createNoteAction({
        noted: newEvent.noted,
        startDate: newEvent.start,
        tillDate: newEvent.end,
        taskId: selectedTaskId,
      });

      // ✅ Update calendar UI
      setEvents((prev) => [...prev, newEvent]);
      setCommentDropdown({ ...commentDropdown, visible: false });

      console.log("Note successfully created!");
    } catch (error) {
      console.error("Failed to create note:", error);
      // Optionally show a user-friendly message
    }
  };

  /*
   * handle on action for update note
   */
  const commentInputRef = useRef(null);
  useEffect(() => {
    if (isOpen && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [isOpen]);
  
  const handleUpdateComment = async () => {
    try {
      const color = colorList[Math.floor(Math.random() * colorList.length)];

      // Update on the backend
      await createNoteAction({
        noted: newEventData.noted,
        startDate: newEventData.start,
        tillDate: newEventData.end,
        taskId: newEventData.extendedProps?.taskId || selectedTaskId,
      });

      // Update the local calendar event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === newEventData.id
            ? {
                ...event,
                noted: newEventData.noted,
                start: newEventData.start,
                end: newEventData.end,
                extendedProps: {
                  ...event.extendedProps,
                  color,
                },
              }
            : event
        )
      );

      setIsOpen(false); // close modal
      console.log("Comment updated!");
    } catch (err) {
      console.error("Failed to update comment:", err);
    }
  };

  /*
   * for right click state
   */
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventId: null,
  });

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
              initialView="dayGridMonth"
              events={events}
              eventContent={renderEventContent}
              height="auto"
              selectable={true}
              select={(info, jsEvent) => handleDateSelect({ ...info, jsEvent })}
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
                    btn.style.color = "#4b5563"; // text-gray-600
                    btn.style.fontWeight = "500";
                    btn.style.border = "1px solid #e5e7eb"; // border-gray-200
                    btn.style.borderRadius = "9999px"; // rounded-full
                    btn.style.padding = "6px 16px"; // px-4 py-1
                    btn.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.05)"; // shadow-sm
                    btn.style.transition = "background-color 0.2s ease";
                    btn.style.textTransform = "capitalize"; // Capitalize first letter

                    btn.onmouseenter = () => {
                      btn.style.backgroundColor = "#59bad5"; // hover:#59bad5
                      btn.style.color = "#FFF";
                    };
                    btn.onmouseleave = () => {
                      btn.style.backgroundColor = "#ffffff";
                    };
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
                  }
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
          <CardTCommentCalender tasks={tasks} />
        </div>
      </div>

      {/* alert error popup range comment */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white px-6 py-4 rounded-medium shadow-sm w-[350px] space-y-3">
            <h3 className="text-red-600 font-semibold text-body-lg">
              ⚠️ Invalid Selection
            </h3>
            <p className="text-gray-700 text-caption">
              Comments can only be added within the duration of a task.
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowPopup(false)}
                className="px-4 py-1 text-btn rounded-medium bg-primary text-white hover:bg-[#FFF] border hover:border-primary hover:text-title"
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Render the Context Menu (when right click it give this option) */}
      {contextMenu.visible && (
        <div
          style={{
            position: "fixed",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "white",
            // border: "1px solid #ccc",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            borderRadius: "0px 12px 12px 12px",
            zIndex: 10000,
            width: "100px",
          }}
          onMouseLeave={() =>
            setContextMenu({ ...contextMenu, visible: false })
          }
        >
          <button
            className="w-full px-3 py-2 text-left hover:bg-gray-100 text-caption-tiny rounded-medium"
            onClick={handleUpdateComment}
          >
            Update
          </button>
          <button
            className="w-full px-3 py-2 text-left hover:bg-gray-100 text-red-600 text-caption-tiny rounded-medium"
            onClick={() => {
              setEvents((prev) =>
                prev.filter((e) => e.id !== contextMenu.eventId)
              );
              setContextMenu({ ...contextMenu, visible: false });
            }}
          >
            Delete
          </button>
        </div>
      )}
      {/* Render dropdown for comment input */}
      {commentDropdown.visible && (
        <div
          className="fixed bg-white p-4 rounded-medium shadow-xl border w-[300px] z-50"
          style={{ top: commentDropdown.y + 120 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-body-sm font-semibold text-blue-600 flex items-center gap-2 mb-2">
            <MessageCircleMore className="w-4 h-4" />
            Create Comment (Note)
          </h2>

          <input
            className="w-full border border-blue-300 rounded-medium px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-caption-tiny"
            placeholder="Write your note here ✍️"
            ref={commentInputRef}
            value={commentDropdown.eventData.noted}
            onChange={(e) =>
              setCommentDropdown({
                ...commentDropdown,
                eventData: {
                  ...commentDropdown.eventData,
                  noted: e.target.value,
                },
              })
            }
          />

          <div className="flex justify-end gap-2">
            <Button
              // color="primary"
              radius="full"
              type="submit"
              onClick={() =>
                setCommentDropdown((prev) => ({ ...prev, visible: false }))
              }
              className="px-3 py-1 text-btn-sm rounded-medium bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              radius="full"
              type="submit"
              onClick={handleCommentSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
