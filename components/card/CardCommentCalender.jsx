import { Card, CardHeader, CardBody } from "@heroui/react";
import { useState, useEffect, useCallback } from "react"; // Import useEffect
import Image from "next/image";
import commentlogo from "../../assets/Comment.png";
import profile from "../../public/image/minh.png";
import { SquarePen, AlarmClock, Trash2 } from "lucide-react";
import { calendarUpdateNoteAction } from "@/action/calendar.action";
import { deleteNoteInCalendarAction, getAllNoteInCalendarAction, updateNoteInCalendarAction } from "@/action/calendarV2.action";
import ModalDelete from "../modal/ModalDelete";

export default function CardTCommentCalender({
  selectedTaskId,
  taskColorMap = {},
  selectedTask,
  noteRefreshKey,
}) {
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use useCallback to memoize fetchNotesForTask to avoid unnecessary re-renders
  const fetchNotesForTask = useCallback(async () => {
    setIsLoading(true);
    setNotes([]); // Clear notes before fetching new ones

    if (!selectedTaskId) {
      console.warn(
        "CardTCommentCalender: No selectedTaskId, skipping note fetch."
      );
      setIsLoading(false);
      return;
    }

    try {
      console.log(
        "CardTCommentCalender - Fetching notes for Task ID:",
        selectedTaskId
      );

      const response = await getAllNoteInCalendarAction(selectedTaskId);

      setNotes(response?.payload || []);
      console.log(
        "CardTCommentCalender - Notes fetched successfully:",
        response?.payload
      );
    } catch (err) {
      console.error(
        "CardTCommentCalender - Error fetching notes for task:",
        err
      );
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTaskId, getAllNoteInCalendarAction]);

  useEffect(() => {
    fetchNotesForTask();
  }, [selectedTaskId, noteRefreshKey, fetchNotesForTask]); // Add fetchNotesForTask to dependencies

  

  const handleUpdateNoteInline = async (noteData) => {
    if (!editingNoteText.trim()) {
      setEditingNoteId(null);
      return;
    }

    try {
      const result = await calendarUpdateNoteAction({
        noteId: noteData.calendarId,
        noted: editingNoteText,
        startDate: noteData.notedAt,
        tillDate: noteData.tillDate,
        taskId: noteData.taskId,
      });

      console.log("Note updated successfully:", result);

      // Update the note locally
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.calendarId === noteData.calendarId
            ? { ...note, noted: editingNoteText }
            : note
        )
      );

      setEditingNoteId(null);
      setEditingNoteText("");
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  const handleDeleteNote = async (calendarId, taskId) => {
    if (!calendarId || !taskId) {
      console.warn("Missing calendarId or taskId.");
      return;
    }

    try {
      console.log("Deleting note:", { calendarId, taskId });

      const result = await deleteNoteInCalendarAction(calendarId, taskId);

      console.log("Note deleted successfully:", result);
      await fetchNotesForTask();

      setSelectedNote(null);
      setEditedNoteText("");
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  const displayedComments = notes;
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    console.log("Inside formatDate - Date Str:", dateStr);
    console.log("Inside formatDate - Date Object (toString):", d.toString());
    console.log(
      "Inside formatDate - Date Object (toISOString):",
      d.toISOString()
    );
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
  };
  const formatRange = (start, end) => {
    const options = { day: "numeric", month: "short" }; // e.g., "14 Jun"
    const startDate = new Date(start).toLocaleDateString("en-GB", options);
    const endDate = new Date(end).toLocaleDateString("en-GB", options);

    return `${startDate} - ${endDate}`;
  };
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ calendarId: null, taskId: null });
  
  return (
    <>
      <Card className="py-4 h-[400px] flex flex-col rounded-large shadow-sm">
        {/* Header */}
        <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
          <div className="flex gap-2">
            <Image
              src={commentlogo}
              className="w-6 h-6 object-contain"
              alt="comment-icon"
            />
            <h1 className="text-title text-h6 font-semibold">
              {selectedTaskId && selectedTask ? (
                <>
                  Comments in{" "}
                  <span className="text-primary">{selectedTask.title}</span>
                </>
              ) : (
                "All Comments"
              )}
            </h1>
          </div>
        </CardHeader>

        <CardBody className="py-3 px-4 space-y-3 overflow-y-auto flex-1 scrollbar-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-caption">Loading comments...</p>
            </div>
          ) : displayedComments.length === 0 ? ( // Show message if no comments
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-caption">
                {selectedTaskId
                  ? "No comments for this task."
                  : "Please select a task to view comments."}
              </p>
            </div>
          ) : (
            displayedComments.map((data, index) => {
              const commentColor = taskColorMap[data.taskId];

              return (
                <div
                  key={data.calendarId || index} // Use unique ID for key
                  className="flex items-start gap-3 p-5 rounded-large bg-slate-100 transition-colors"
                >
                  <img
                    src={data.useData?.imageUrl || profile}
                    className="w-7 h-7 object-cover rounded-full"
                    alt="profile"
                    width={28}
                    height={28}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-body-sm text-gray-900">
                        {data.useData?.username || "Kdey Pesith"}
                      </h3>
                      <div className="flex gap-3">
                        <button
                          className={`transition-colors ${
                            selectedTaskId && commentColor
                              ? `${commentColor.text} hover:opacity-70`
                              : "text-green-500 hover:text-green-600"
                          }`}
                        >
                          <SquarePen
                            size={15}
                            onClick={() => {
                              setEditingNoteId(data.calendarId);
                              setEditingNoteText(data.noted);
                            }}
                          />
                        </button>

                        <button
                          className={`transition-colors ${
                            selectedTaskId && commentColor
                              ? `${commentColor.text} hover:opacity-70`
                              : "text-red-500 hover:text-red-600"
                          }`}
                          onClick={() => {
                            setDeleteData({
                              calendarId: data.calendarId,
                              taskId: data.taskId,
                            });
                            setDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    {editingNoteId === data.calendarId ? (
                      <input
                        type="text"
                        value={editingNoteText}
                        onChange={(e) => setEditingNoteText(e.target.value)}
                        onBlur={() => handleUpdateNoteInline(data)} // save on blur
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.target.blur(); // triggers onBlur
                          }
                        }}
                        className="text-caption text-title/50 mb-2 leading-relaxed border-0 py-1 rounded w-full focus:outline-none focus:bg-transparent"
                        autoFocus
                      />
                    ) : (
                      <p
                        className="text-caption text-title/50 mb-2 leading-relaxed border-0  py-1 rounded w-full focus:outline-none focus:bg-transparent "
                        onClick={() => {
                          setEditingNoteId(data.calendarId);
                          setEditingNoteText(data.noted);
                        }}
                      >
                        {data.noted}
                      </p>
                    )}

                    <div className="flex items-center justify-end gap-1">
                      <AlarmClock
                        className={`w-4 h-4 transition-colors ${
                          selectedTaskId && commentColor
                            ? commentColor.text
                            : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-caption-tiny font-medium transition-colors ${
                          selectedTaskId && commentColor
                            ? commentColor.text
                            : "text-green-500"
                        }`}
                      >
                        {formatRange(data.notedAt, data.tillDate)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardBody>
      </Card>
      <ModalDelete
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        messageTitle="Confirm Delete"
        messageBody="Are you sure you want to delete this note?"
        messageUndo="Cancel"
        messageDo="Delete"
        action={() => {
          handleDeleteNote(deleteData.calendarId, deleteData.taskId);
          setDeleteModalOpen(false);
        }}
      />
    </>
  );
}
