import { Card, CardHeader, CardBody } from "@heroui/react";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Image from "next/image";
import commentlogo from "../../assets/Comment.png";
import profile from "../../public/image/minh.png";
import { SquarePen, AlarmClock, Trash2 } from "lucide-react";
// import { calendarUpdateNoteAction } from "@/action/calendar.action";
import {
  deleteNoteInCalendarAction,
  getAllNoteInCalendarAction,
  updateNoteInCalendarAction,
} from "@/action/calendarV2.action";
import ModalDelete from "../modal/ModalDelete";

// Memoized date formatting functions - moved outside component
const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

const formatRange = (start, end) => {
  const options = { day: "numeric", month: "short" };
  const startDate = new Date(start).toLocaleDateString("en-GB", options);
  const endDate = new Date(end).toLocaleDateString("en-GB", options);
  return `${startDate} - ${endDate}`;
};

export default function CardTCommentCalender({
  selectedTaskId,
  taskColorMap = {},
  selectedTask,
  noteRefreshKey,
}) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({
    calendarId: null,
    taskId: null,
  });

  // Refs to prevent unnecessary re-fetches
  const prevSelectedTaskIdRef = useRef();
  const prevNoteRefreshKeyRef = useRef();
  const isLoadingRef = useRef(false);

  // Memoized fetch function to prevent recreation on every render
  const fetchNotesForTask = useCallback(async (taskId) => {
    // Prevent concurrent fetches
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    if (!taskId) {
      console.warn(
        "CardTCommentCalender: No selectedTaskId, skipping note fetch."
      );
      setNotes([]);
      setIsLoading(false);
      isLoadingRef.current = false;
      return;
    }

    try {
      console.log("CardTCommentCalender - Fetching notes for Task ID:", taskId);

      const response = await getAllNoteInCalendarAction(taskId);
      const newNotes = response?.payload || [];

      setNotes(newNotes);
      console.log(
        "CardTCommentCalender - Notes fetched successfully:",
        newNotes
      );
    } catch (err) {
      console.error(
        "CardTCommentCalender - Error fetching notes for task:",
        err
      );
      setNotes([]);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, []); // Empty dependency array since we're not using any external variables

  // Optimized useEffect with proper dependency checking
  useEffect(() => {
    const taskIdChanged = prevSelectedTaskIdRef.current !== selectedTaskId;
    const refreshKeyChanged = prevNoteRefreshKeyRef.current !== noteRefreshKey;

    if (taskIdChanged || refreshKeyChanged) {
      prevSelectedTaskIdRef.current = selectedTaskId;
      prevNoteRefreshKeyRef.current = noteRefreshKey;

      // Clear notes immediately when task changes
      if (taskIdChanged) {
        setNotes([]);
      }

      fetchNotesForTask(selectedTaskId);
    }
  }, [selectedTaskId, noteRefreshKey, fetchNotesForTask]);

  // Memoized update handler
  const handleUpdateNoteInline = useCallback(
    async (noteData) => {
      if (!editingNoteText.trim()) {
        setEditingNoteId(null);
        return;
      }

      //this action have been updated
      try {
        const result = await updateNoteInCalendarAction({
          calendarId: noteData.calendarId,
          noted: editingNoteText,
          startDate: noteData.notedAt,
          tillDate: noteData.tillDate,
          taskId: noteData.taskId,
        });

        console.log("Note updated successfully:", result);

        // Optimized local state update
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
    },
    [editingNoteText]
  );

  // Memoized delete handler
  const handleDeleteNote = useCallback(
    async (calendarId, taskId) => {
      if (!calendarId || !taskId) {
        console.warn("Missing calendarId or taskId.");
        return;
      }

      try {
        console.log("Deleting note:", { calendarId, taskId });

        const result = await deleteNoteInCalendarAction(calendarId, taskId);
        console.log("Note deleted successfully:", result);

        // Optimistically remove from local state instead of refetching
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.calendarId !== calendarId)
        );

        setDeleteModalOpen(false);
      } catch (err) {
        console.error("Failed to delete note:", err);
        // Optionally refetch on error
        fetchNotesForTask(selectedTaskId);
      }
    },
    [fetchNotesForTask, selectedTaskId]
  );

  // Memoized edit handlers
  const handleStartEdit = useCallback((calendarId, currentText) => {
    setEditingNoteId(calendarId);
    setEditingNoteText(currentText);
  }, []);

  const handleDeleteModalOpen = useCallback((calendarId, taskId) => {
    setDeleteData({ calendarId, taskId });
    setDeleteModalOpen(true);
  }, []);

  // Memoized header content
  const headerContent = useMemo(
    () => (
      <div className="flex gap-2">
        <Image
          src={commentlogo}
          className="w-6 h-6 object-contain"
          alt="comment-icon"
        />
        <h1 className="text-title text-h6 font-semibold">
          {selectedTaskId && selectedTask ? (
            <>
              Notes in{" "}
              <span className="text-primary">{selectedTask.title}</span>
            </>
          ) : (
            "All Comments"
          )}
        </h1>
      </div>
    ),
    [selectedTaskId, selectedTask]
  );

  // Memoized loading/empty state
  const emptyState = useMemo(() => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p className="text-caption">Loading comments...</p>
        </div>
      );
    }

    if (notes.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p className="text-caption">
            {selectedTaskId
              ? "No comments for this task."
              : "Please select a task to view comments."}
          </p>
        </div>
      );
    }

    return null;
  }, [isLoading, notes.length, selectedTaskId]);

  // Memoized comments list
  const commentsList = useMemo(() => {
    if (isLoading || notes.length === 0) return null;

    return notes.map((data, index) => (
      <CommentItem
        key={data.calendarId || index}
        data={data}
        commentColor={taskColorMap[data.taskId]}
        selectedTaskId={selectedTaskId}
        editingNoteId={editingNoteId}
        editingNoteText={editingNoteText}
        setEditingNoteText={setEditingNoteText}
        onStartEdit={handleStartEdit}
        onUpdateNote={handleUpdateNoteInline}
        onDeleteModalOpen={handleDeleteModalOpen}
      />
    ));
  }, [
    notes,
    isLoading,
    taskColorMap,
    selectedTaskId,
    editingNoteId,
    editingNoteText,
    handleStartEdit,
    handleUpdateNoteInline,
    handleDeleteModalOpen,
  ]);

  return (
    <>
      <Card className="py-4 h-[400px] flex flex-col rounded-large shadow-sm">
        <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
          {headerContent}
        </CardHeader>

        <CardBody className="py-3 px-4 space-y-3 overflow-y-auto flex-1 scrollbar-hidden">
          {emptyState || commentsList}
        </CardBody>
      </Card>

      <ModalDelete
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        messageTitle="Confirm Delete"
        messageBody="Are you sure you want to delete this note?"
        messageUndo="Cancel"
        messageDo="Delete"
        action={() =>
          handleDeleteNote(deleteData.calendarId, deleteData.taskId)
        }
      />
    </>
  );
}

// Memoized comment item component
const CommentItem = React.memo(
  ({
    data,
    commentColor,
    selectedTaskId,
    editingNoteId,
    editingNoteText,
    setEditingNoteText,
    onStartEdit,
    onUpdateNote,
    onDeleteModalOpen,
  }) => {
    const handleEditClick = useCallback(() => {
      onStartEdit(data.calendarId, data.noted);
    }, [data.calendarId, data.noted, onStartEdit]);

    const handleDeleteClick = useCallback(() => {
      onDeleteModalOpen(data.calendarId, data.taskId);
    }, [data.calendarId, data.taskId, onDeleteModalOpen]);

    const handleBlur = useCallback(() => {
      onUpdateNote(data);
    }, [data, onUpdateNote]);

    const handleKeyDown = useCallback((e) => {
      if (e.key === "Enter") {
        e.target.blur();
      }
    }, []);

    const handleTextChange = useCallback(
      (e) => {
        setEditingNoteText(e.target.value);
      },
      [setEditingNoteText]
    );

    const isEditing = editingNoteId === data.calendarId;
    const dateRange = useMemo(
      () => formatRange(data.notedAt, data.tillDate),
      [data.notedAt, data.tillDate]
    );

    return (
      <div className="flex items-start gap-3 p-5 rounded-large bg-slate-100 transition-colors">
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
                onClick={handleEditClick}
              >
                <SquarePen size={15} />
              </button>

              <button
                className={`transition-colors ${
                  selectedTaskId && commentColor
                    ? `${commentColor.text} hover:opacity-70`
                    : "text-red-500 hover:text-red-600"
                }`}
                onClick={handleDeleteClick}
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          {isEditing ? (
            <input
              type="text"
              value={editingNoteText}
              onChange={handleTextChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="text-caption text-title/50 mb-2 leading-relaxed border-0 py-1 rounded w-full focus:outline-none focus:bg-transparent"
              autoFocus
            />
          ) : (
            <p
              className="text-caption text-title/50 mb-2 leading-relaxed border-0 py-1 rounded w-full focus:outline-none focus:bg-transparent cursor-pointer"
              onClick={handleEditClick}
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
              {dateRange}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

CommentItem.displayName = "CommentItem";
