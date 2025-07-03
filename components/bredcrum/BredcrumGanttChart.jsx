"use client";

import { updateGanttChartByIdAction } from "@/action/gantt.action";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

export default function BredCrumGanttChart({
  board = "",
  feature = "",
  user = "",
  header = "Untitled",
  modal = [],
  ganttChartId,
  boardId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableHeader, setEditableHeader] = useState(header);
  const [tempHeader, setTempHeader] = useState(header);
  const inputRef = useRef(null);

  // Debug props on mount (optional, can remove if not needed)
  useEffect(() => {
    console.log("BredCrumGanttChart props:", { ganttChartId, boardId, header });
  }, [ganttChartId, boardId, header]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      console.log("Focusing input");
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Handle double click
  const handleDoubleClick = (e) => {
    console.log("Double-click triggered on:", e.target);
    setIsEditing(true);
    setTempHeader(editableHeader);
  };

  // Handle save
  const handleSave = async () => {
    const trimmedHeader = tempHeader?.trim() || "";
    if (trimmedHeader === editableHeader) {
      setIsEditing(false);
      return;
    }

    if (!ganttChartId || !boardId || !trimmedHeader) {
      toast.error("Invalid parameters. Please try again.");
      setTempHeader(editableHeader);
      setIsEditing(false);
      return;
    }

    const result = await updateGanttChartByIdAction({
      ganttChartId,
      boardId,
      data: { title: trimmedHeader },
    });
    console.log("result", result);
    if (result.data.title !== "Forbidden" && result.data.title !== "Bad Request") {
      setEditableHeader(trimmedHeader);
      toast.success("Header updated successfully!");
    } else if (result.data.title === "Forbidden" ||  result.data.title === "Bad Request") {
      toast.error(result.error || "You are not authorized to update this header.Only Project Manager can update the header");
      setTempHeader(editableHeader);
    }
    setIsEditing(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setTempHeader(editableHeader);
    setIsEditing(false);
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  // Handle blur
  const handleBlur = () => {
    handleSave();
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="grid grid-cols-1">
        <nav className="text-h6 text-[#94A3B8]">
          <ol className="flex space-x-2">
            <li>
              <a href="#" className="hover:text-blueActive">
                Workspace
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="#" className="hover:text-blueActive">
                {board || "Board"}
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="#" className="hover:text-blueActive">
                {feature || "Feature"}
              </a>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full">
          <div>
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={tempHeader}
                onChange={(e) => setTempHeader(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleBlur}
                className="text-h1 text-titles font-semibold outline-none  px-2 py-1"
                maxLength={100}
              />
            ) : (
              <p
                className="text-h1 text-titles font-semibold outline-none transition-colors duration-200 cursor-pointer "
                onDoubleClick={handleDoubleClick}
                title="Double-click to edit"
                style={{ pointerEvents: "auto", position: "relative", zIndex: 10 }}
              >
                {editableHeader || "Untitled"}
              </p>
            )}
          </div>
          <div className="flex items-center justify-start md:justify-end gap-3">
            {Array.isArray(modal) &&
              modal.map((ModalComp, i) => <div key={i}>{ModalComp}</div>)}
          </div>
        </div>
      </div>
    </>
  );
}

BredCrumGanttChart.propTypes = {
  board: PropTypes.string,
  feature: PropTypes.string,
  user: PropTypes.string,
  header: PropTypes.string,
  modal: PropTypes.arrayOf(PropTypes.element),
  ganttChartId: PropTypes.string.isRequired,
  boardId: PropTypes.string.isRequired,
};

BredCrumGanttChart.defaultProps = {
  board: "",
  feature: "",
  user: "",
  header: "Untitled",
  modal: [],
};