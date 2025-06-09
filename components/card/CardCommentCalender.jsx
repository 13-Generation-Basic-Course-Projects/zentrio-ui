import { Card, CardHeader, CardBody } from "@heroui/react";
import { useState } from "react";
import Image from "next/image";
import commentlogo from "../../assets/Comment.png";
import profile from "../../public/image/minh.png";
import { SquarePen, AlarmClock } from "lucide-react";
import { calendarUpdateNoteAction } from "@/action/calendar.action";

export default function CardTCommentCalender({ note, selectedTaskId, taskColorMap }) {
  console.log("this is note : ", note);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editedNoteText, setEditedNoteText] = useState("");

  const handleClickNote = (noteData) => {
    console.log("click note Id : ", noteData.calendarId);

    setSelectedNote(noteData);
    setEditedNoteText(noteData.noted);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedNote) return;

    try {
      console.log("Hellooooo", selectedNote);
      const result = await calendarUpdateNoteAction({
        noteId: selectedNote.calendarId,
        noted: editedNoteText,
        startDate: selectedNote.notedAt,
        tillDate: selectedNote.tillDate,
        taskId: selectedNote.taskId
      });

      console.log("Note updated successfully:", result);

      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  // Filter comments based on selected task
  const filteredComments = selectedTaskId 
    ? note?.payload.filter(comment => comment.taskId === selectedTaskId) || []
    : note?.payload || [];

  return (
    <>
      <Card className="py-4 h-[335px] flex flex-col rounded-large shadow-sm">
        {/* Header */}
        <CardHeader className="pb-0 pt-2 px-6 flex-col items-start">
          <div className="flex items-center gap-2">
            <Image
              src={commentlogo}
              className="w-7 h-7 object-contain"
              alt="comment-icon"
            />
            <h1 className="text-title text-h5 font-semibold">
              {selectedTaskId ? "Task Comments" : "All Comments"}
            </h1>
          </div>
        </CardHeader>

        <CardBody className="py-3 px-4 space-y-3 overflow-y-auto flex-1">
          {filteredComments.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-body-sm">
                {selectedTaskId
                  ? "No comments for this task"
                  : "No comments available"}
              </p>
            </div>
          ) : (
            filteredComments.map((data, index) => {
              const commentColor = taskColorMap[data.taskId];

              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-5 rounded-large bg-slate-100 transition-colors"
                >
                  <Image
                    src={data.userId?.userProfile || profile}
                    className="w-7 h-7 object-cover rounded-full"
                    alt="profile"
                    width={28}
                    height={28}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-gray-900">
                        {data.userId?.username || "Kdey Pesith"}
                      </h3>
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

      {/* Modal */}
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