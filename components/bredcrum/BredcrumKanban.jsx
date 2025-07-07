"use client";

import { updateBoardByIdAction } from "@/action/workspace.action";
import { getBoardByBoardIdAction } from "@/action/board.action";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BredCrumKanban({
  board = "",
  feature = "",
  boardId,
  workspaceId,
  modal = [],
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableHeader, setEditableHeader] = useState(board);
  const [tempHeader, setTempHeader] = useState(board);
  const inputRef = useRef(null);

  // Sync editableHeader with board prop if it changes
  useEffect(() => {
    setEditableHeader(board);
    setTempHeader(board);
  }, [board]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Handle double click to enable editing
  const handleDoubleClick = () => {
    setIsEditing(true);
    setTempHeader(editableHeader);
  };

  // Handle save action
  const handleSave = async () => {
    const trimmedHeader = tempHeader.trim();
    if (trimmedHeader === editableHeader) {
      setIsEditing(false);
      return;
    }

    if (!boardId || !trimmedHeader) {
      setTempHeader(editableHeader);
      setIsEditing(false);
      return;
    }

    try {
      const boardById = await getBoardByBoardIdAction(boardId);
      if (!boardById?.payload) {
        setTempHeader(editableHeader);
        setIsEditing(false);
        return;
      }

      const payload = {
        title: trimmedHeader,
        description: boardById.payload.description || "",
        cover: boardById.payload.cover || "",
        workspaceId: workspaceId || "",
      };

      const result = await updateBoardByIdAction(boardId, payload);
      if (result?.status === "success") {
        setEditableHeader(trimmedHeader);
      } else if (
        result.data.title === "Forbidden" ||
        result.data.title === "Bad Request"
      ) {
        toast.error(
          result.error ||
            "You are not authorized to update this header.Only Project Manager can update the header"
        );
      } else {
        const errorMessage =
          result?.error || result?.message || "Failed to update board title.";

        setTempHeader(editableHeader);
      }
    } catch (error) {
      setTempHeader(editableHeader);
    } finally {
      setIsEditing(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setTempHeader(editableHeader);
    setIsEditing(false);
  };

  // Handle key press (Enter to save, Escape to cancel)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  // Handle input blur to save
  const handleBlur = () => {
    handleSave();
  };

  return (
    <>
      <div className="grid grid-cols-1">
        <nav className="text-h6 text-[#94A3B8] mb-2">
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

        <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center">
          <div>
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={tempHeader}
                onChange={(e) => setTempHeader(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleBlur}
                className="text-h1 text-titles font-semibold outline-none px-2 py-1 "
                maxLength={100}
              />
            ) : (
              <p
                className="text-h1 text-titles font-semibold cursor-pointer  px-2 py-1 rounded transition-colors duration-200"
                onDoubleClick={handleDoubleClick}
                title="Double-click to edit"
              >
                {editableHeader || "Untitled"}
              </p>
            )}
          </div>
          <div className="flex items-center justify-start md:justify-end gap-3 mt-2 md:mt-0">
            {Array.isArray(modal) &&
              modal.map((ModalComp, i) => <div key={i}>{ModalComp}</div>)}
          </div>
        </div>
      </div>
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
    </>
  );
}

BredCrumKanban.propTypes = {
  board: PropTypes.string,
  feature: PropTypes.string,
  boardId: PropTypes.string.isRequired,
  workspaceId: PropTypes.string,
  modal: PropTypes.arrayOf(PropTypes.element),
};

BredCrumKanban.defaultProps = {
  board: "",
  feature: "",
  workspaceId: "",
  modal: [],
};
