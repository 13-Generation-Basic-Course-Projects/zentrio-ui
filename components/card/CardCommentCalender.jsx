import { Card, CardHeader, CardBody } from "@heroui/react";
import { useState, useEffect } from "react"; // Import useEffect
import Image from "next/image";
import commentlogo from "../../assets/Comment.png";
import profile from "../../public/image/minh.png";
import { SquarePen, AlarmClock, Trash2 } from "lucide-react";
import { calendarUpdateNoteAction } from "@/action/calendar.action";
import { getAllNoteInCalendarAction } from "@/action/calendarV2.action";

export default function CardTCommentCalender({
  selectedTaskId,
  taskColorMap = {},
  selectedTask,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState("");

  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    const fetchNotesForTask = async () => {
      setIsLoading(true);
      setNotes([]);

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
    };

    fetchNotesForTask();
  }, [selectedTaskId, getNoteAllInCalendarAction]);

  const handleClickNote = (noteData) => {
    console.log("click note Id : ", noteData.calendarId);
    setSelectedNote(noteData);
    setEditedNoteText(noteData.noted);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedNote || !editedNoteText.trim()) return; // Add check for empty text

    try {
      console.log("Updating note:", selectedNote);
      const result = await calendarUpdateNoteAction({
        noteId: selectedNote.calendarId,
        noted: editedNoteText,
        startDate: selectedNote.notedAt, // Ensure this is the correct field for start date
        tillDate: selectedNote.tillDate, // Ensure this is the correct field for till date
        taskId: selectedNote.taskId,
      });

      console.log("Note updated successfully:", result);
      setIsModalOpen(false);

      const response = await getNoteAllInCalendarAction({
        taskId: selectedTaskId,
      });
      setNotes(response?.payload || []);
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  const displayedComments = notes;
  
  console.log("CardComment - selectedTaskId:", selectedTaskId);
  console.log("CardComment - displayedComments:", notes); // Use displayedComments here

  return (
    <>
      <Card className="py-4 h-[400px] flex flex-col rounded-large shadow-sm">
        {/* Header */}
        <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
          <div className="flex items-center gap-2">
            <Image
              src={commentlogo}
              className="w-7 h-7 object-contain"
              alt="comment-icon"
            />
            <h1 className="text-title text-large font-semibold">
              {selectedTaskId && selectedTask
                ? `Comments in ${selectedTask.title}`
                : "All Comments"}{" "}
            </h1>
          </div>
        </CardHeader>

        <CardBody className="py-3 px-4 space-y-3 overflow-y-auto flex-1 scrollbar-hidden">
          {isLoading ? ( // Show loading indicator
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-sm">Loading comments...</p>
            </div>
          ) : displayedComments.length === 0 ? ( // Show message if no comments
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-sm">
                {selectedTaskId
                  ? "No comments for this task."
                  : "Please select a task to view comments."}
              </p>
            </div>
          ) : (
            // --- Map over the comments array to display each one ---
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
                      <h3 className="font-semibold text-sm text-gray-900">
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
                            onClick={() => handleClickNote(data)}
                          />
                        </button>
                        <button
                          className={`transition-colors ${
                            selectedTaskId && commentColor
                              ? `${commentColor.text} hover:opacity-70`
                              : "text-red-500 hover:text-red-600" // Changed to red for Trash
                          }`}
                          // Add an onClick handler for deletion if you implement it
                          // onClick={() => handleDeleteNote(data.calendarId)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                      {data.noted}
                    </p>
                    <div className="flex items-center justify-end gap-1">
                      <AlarmClock
                        className={`w-5 h-5 transition-colors ${
                          selectedTaskId && commentColor
                            ? commentColor.text
                            : "text-green-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium transition-colors ${
                          selectedTaskId && commentColor
                            ? commentColor.text
                            : "text-green-500"
                        }`}
                      >
                        {new Date(data.notedAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </CardBody>
      </Card>

      {/* Modal for editing comments */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-bgColor rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-title mb-4">
              Edit Comment
            </h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={editedNoteText}
                onChange={(e) => setEditedNoteText(e.target.value)}
                className="w-full border-none text-description rounded-medium p-2 mb-4"
                rows={4}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm bg-stroke rounded-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-primary text-white rounded-medium"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
