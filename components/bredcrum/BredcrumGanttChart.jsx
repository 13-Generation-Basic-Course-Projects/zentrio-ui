"use client";

import { updateGantChartBytIdAction } from "@/action/gantt.action";
import React, { useState, useRef, useEffect } from "react";

export default function BredCrumGanttChart({
  board,
  feature,
  user,
  header,
  modal,
  ganttChartId,
  boardId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableHeader, setEditableHeader] = useState(header);
  const [tempHeader, setTempHeader] = useState(header);
  const inputRef = useRef(null);

  console.log("Bredcrum ganttchart id :", ganttChartId);
  console.log("Bredcrum boardId :", boardId);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Handle double click to start editing
  const handleDoubleClick = () => {
    setIsEditing(true);
    setTempHeader(editableHeader);
  };

  // Handle save
  const handleSave = async () => {
    if (tempHeader.trim() !== editableHeader) {
      try {
        console.log("=== Component handleSave called ===");
        console.log("Original header:", editableHeader);
        console.log("New header:", tempHeader.trim());
        console.log("ganttChartId:", ganttChartId);
        console.log("boardId:", boardId);

        // Update the header in the database
        // Pass the title directly as the third parameter
        const result = await updateGantChartBytIdAction(
          ganttChartId,
          boardId,
          tempHeader.trim()
        );

        console.log("Action result:", result);

        // Update local state only if API call succeeds
        setEditableHeader(tempHeader.trim());
        console.log("Header updated successfully!");
      } catch (error) {
        console.error("Failed to update header:", error);
        // Revert to original value on error
        setTempHeader(editableHeader);
      }
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

  // Handle blur (when user clicks outside)
  const handleBlur = () => {
    handleSave();
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-grid-cols-2">
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
                {board}
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="#" className="hover:text-blueActive">
                {feature}
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="#" className="hover:text-blueActive">
                {user}
              </a>
            </li>
          </ol>
        </nav>

        <div className=" grid grid-cols-1 md:grid-cols-2  ">
          <div>
            <div>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={tempHeader}
                  onChange={(e) => setTempHeader(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={handleBlur}
                  className="text-h1 text-titles font-semibold outline-none"
                  maxLength={100}
                />
              ) : (
                <p
                  className="text-h1 text-titles font-semibold outline-none transition-colors duration-200"
                  onDoubleClick={handleDoubleClick}
                  title="Double-click to edit"
                >
                  {editableHeader}
                </p>
              )}
            </div>
          </div>
          {/* apis */}
          <div className=" flex items-center justify-start md:justify-end  gap-3 ">
            {modal &&
              modal.length > 0 &&
              modal.map((ModalComp, i) => (
                <div className="" key={i}>
                  {ModalComp}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
