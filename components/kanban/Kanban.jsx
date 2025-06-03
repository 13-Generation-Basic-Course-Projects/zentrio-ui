"use client";

import React, { useState, useEffect } from "react";
import { StackedUser } from "../useravatar/StackUser";
import BredCrum from "../bredcrum/MyBredcrum";
import ModalDetailChecklist from "../modal/board/ModalDetailChecklist";

import {
  Plus,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  MessageSquare,
  Paperclip,
} from "lucide-react";
import CardDateChecklist from "../card/CardDateChecklist";
import ModalCreateChecklist from "../modal/board/ModalCreateChecklist";

// Assuming initialColumns structure similar to the reference, defining a basic one here
const initialColumnsData = [
  {
    id: "todo",
    title: "TODO",
    cards: [
      {
        id: "card-1",
        title: "Task 1 Title",
        description: "Hikko Project",
        label: { text: "High", color: "bg-red-200", textColor: "text-red-800" },
        comment: 3,
        attachment: 2,
        duration: "3 days",
        order: 0,
        expanded: true,
        subtasks: [
          {
            id: "subtask-1-1",
            title: "Subtask 1.1",
            description: "Design Landing Page",
            duration: "1 day",
            label: null,
            comment: 1,
            order: 0,
            completed: false,
          },
          {
            id: "subtask-1-2",
            title: "Subtask 1.2",
            description: "Develop API endpoints",
            duration: "2 days",
            label: {
              text: "API",
              color: "bg-blue-200",
              textColor: "text-blue-800",
            },
            comment: 0,
            order: 1,
            completed: true,
          },
        ],
        assignees: [
          "https://cdn.prod.website-files.com/5dd827bbc07b1656e06b16d8/623db0c2ec0384a4ffd2c4ab_mosh.jpeg",
        ],
      },
      {
        id: "card-2",
        title: "Task 2 Title",
        description: "Marketing Campaign",
        label: {
          text: "Medium",
          color: "bg-yellow-200",
          textColor: "text-yellow-800",
        },
        comment: 1,
        attachment: 0,
        duration: "5 days",
        order: 1,
        expanded: false,
        subtasks: [],
        assignees: ["https://randomuser.me/api/portraits/women/44.jpg"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "card-3",
        title: "Task 3 Title",
        description: "User Authentication",
        label: null,
        comment: 5,
        attachment: 1,
        duration: "4 days",
        order: 0,
        expanded: true,
        subtasks: [
          {
            id: "subtask-3-1",
            title: "Subtask 3.1",
            description: "Implement OAuth",
            duration: "3 days",
            label: null,
            comment: 2,
            order: 0,
            completed: false,
          },
        ],
        assignees: ["https://randomuser.me/api/portraits/men/32.jpg"],
      },
    ],
  },
  {
    id: "under-review",
    title: "Under Review",
    cards: [
      {
        id: "card-4",
        title: "Task 1 Title",
        description: "Hikko Project",
        label: { text: "High", color: "bg-red-200", textColor: "text-red-800" },
        comment: 3,
        attachment: 2,
        duration: "3 days",
        order: 0,
        expanded: true,
        subtasks: [
          {
            id: "subtask-1-1",
            title: "Subtask 1.1",
            description: "Design Landing Page",
            duration: "1 day",
            label: null,
            comment: 1,
            order: 0,
            completed: false,
          },
          {
            id: "subtask-1-2",
            title: "Subtask 1.2",
            description: "Develop API endpoints",
            duration: "2 days",
            label: {
              text: "API",
              color: "bg-blue-200",
              textColor: "text-blue-800",
            },
            comment: 0,
            order: 1,
            completed: true,
          },
        ],
        assignees: [
          "https://cdn.prod.website-files.com/5dd827bbc07b1656e06b16d8/623db0c2ec0384a4ffd2c4ab_mosh.jpeg",
        ],
      },
    ],
  },
  {
    id: "done",
    title: "COMPLETED",
    cards: [
      {
        id: "card-5",
        title: "Task 1 Title",
        description: "Hikko Project",
        label: { text: "High", color: "bg-red-200", textColor: "text-red-800" },
        comment: 3,
        attachment: 2,
        duration: "3 days",
        order: 0,
        expanded: true,
        subtasks: [
          {
            id: "subtask-1-1",
            title: "Subtask 1.1",
            description: "Design Landing Page",
            duration: "1 day",
            label: null,
            comment: 1,
            order: 0,
            completed: false,
          },
          {
            id: "subtask-1-2",
            title: "Subtask 1.2",
            description: "Develop API endpoints",
            duration: "2 days",
            label: {
              text: "API",
              color: "bg-blue-200",
              textColor: "text-blue-800",
            },
            comment: 0,
            order: 1,
            completed: true,
          },
        ],
        assignees: [
          "https://cdn.prod.website-files.com/5dd827bbc07b1656e06b16d8/623db0c2ec0384a4ffd2c4ab_mosh.jpeg",
        ],
      },
    ],
  },
];

// Placeholder components (replace with actual imports if available)
const UserAvater = ({ image }) => (
  <img
    src={image}
    alt="avatar"
    className="w-6 h-6 rounded-full border border-white -ml-2 first:ml-0"
  />
);

export default function KanbanBoard({ modal }) {
  const [columns, setColumns] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null); // { id, type: 'card' | 'subtask', sourceColumnId, sourceCardId (for subtask), sourceIndex }
  const [hoverInfo, setHoverInfo] = useState(null); // { targetColumnId, targetCardId (for subtask), targetIndex, type: 'card' | 'subtask' }

  const [newSubtaskCardId, setNewSubtaskCardId] = useState(null);
  const [newSubtaskText, setNewSubtaskText] = useState("");

  useEffect(() => {
    const sortedData = initialColumnsData.map((col) => ({
      ...col,
      cards: (col.cards || [])
        .sort((a, b) => a.order - b.order)
        .map((card) => ({
          ...card,
          subtasks: (card.subtasks || []).sort((a, b) => a.order - b.order),
        })),
    }));
    setColumns(sortedData);
  }, []);

  const findSubtaskDetails = (subtaskId) => {
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const column = columns[colIndex];
      for (
        let cardIndex = 0;
        cardIndex < (column.cards || []).length;
        cardIndex++
      ) {
        const card = column.cards[cardIndex];
        if (card.subtasks) {
          for (
            let subtaskIndex = 0;
            subtaskIndex < card.subtasks.length;
            subtaskIndex++
          ) {
            const subtask = card.subtasks[subtaskIndex];
            if (subtask.id === subtaskId) {
              return {
                columnId: column.id,
                cardId: card.id,
                subtaskIndex: subtaskIndex,
              };
            }
          }
        }
      }
    }
    return null;
  };

  const toggleTaskExpansion = (cardId) => {
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        cards: (column.cards || []).map((card) =>
          card.id === cardId ? { ...card, expanded: !card.expanded } : card
        ),
      }))
    );
  };

  const addSubtask = (cardId) => {
    if (!newSubtaskText.trim()) return;
    const newSubtaskId = `${cardId}-subtask-${Date.now()}`;
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        cards: (column.cards || []).map((card) =>
          card.id === cardId
            ? {
                ...card,
                subtasks: [
                  ...(card.subtasks || []),
                  {
                    id: newSubtaskId,
                    title: `Subtask ${(card.subtasks || []).length + 1}`,
                    description: newSubtaskText,
                    duration: null,
                    label: null,
                    comment: 0,
                    order: (card.subtasks || []).length,
                    completed: false,
                  },
                ],
                expanded: true,
              }
            : card
        ),
      }))
    );
    setNewSubtaskText("");
    setNewSubtaskCardId(null);
  };

  const toggleSubtaskComplete = (subtaskId) => {
    const details = findSubtaskDetails(subtaskId);
    if (!details) return;
    const { columnId, cardId, subtaskIndex } = details;

    setColumns((prev) => {
      const newCols = JSON.parse(JSON.stringify(prev));
      const targetCol = newCols.find((col) => col.id === columnId);
      const targetCard = targetCol?.cards.find((card) => card.id === cardId);

      if (
        targetCard &&
        targetCard.subtasks &&
        targetCard.subtasks[subtaskIndex]
      ) {
        targetCard.subtasks[subtaskIndex].completed =
          !targetCard.subtasks[subtaskIndex].completed;
      }
      return newCols;
    });
  };

  // --- Drag and Drop Handlers ---

  const handleDragStart = (e, item) => {
    e.stopPropagation();
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
    // Apply dragging styles via state/class, not direct manipulation if possible
    // For simplicity matching reference, direct style is used here
    setTimeout(() => {
      const element = document.getElementById(item.id);
      if (element) {
        // Apply styles from reference
        element.style.opacity = "0.5";
        element.style.transform = "rotate(2deg) scale(1.05)";
        element.style.transition =
          "transform 0.1s ease-in-out, opacity 0.1s ease-in-out"; // Faster transition for drag start
      }
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();
    if (draggedItem) {
      const element = document.getElementById(draggedItem.id);
      if (element) {
        // Remove drag styles
        element.style.opacity = "";
        element.style.transform = "";
        element.style.transition = ""; // Let CSS handle transitions now
      }
    }
    setDraggedItem(null);
    setHoverInfo(null);
  };

  const handleDragOver = (e, targetInfo) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

    // Validation (same as before)
    if (draggedItem.type === "card" && targetInfo.type === "subtask") {
      e.dataTransfer.dropEffect = "none";
      setHoverInfo(null);
      return;
    }
    if (
      draggedItem.type === "subtask" &&
      targetInfo.type === "card" &&
      targetInfo.isDropZone
    ) {
      e.dataTransfer.dropEffect = "none";
      setHoverInfo(null);
      return;
    }
    if (
      draggedItem.type === "subtask" &&
      targetInfo.type === "subtask" &&
      draggedItem.sourceCardId !== targetInfo.targetCardId
    ) {
      e.dataTransfer.dropEffect = "none";
      setHoverInfo(null);
      return;
    }

    e.dataTransfer.dropEffect = "move";

    if (JSON.stringify(targetInfo) !== JSON.stringify(hoverInfo)) {
      setHoverInfo(targetInfo);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || !hoverInfo) {
      handleDragEnd(e);
      return;
    }

    const {
      id: draggedId,
      type: draggedType,
      sourceColumnId,
      sourceCardId,
      sourceIndex,
    } = draggedItem;
    const {
      targetColumnId,
      targetCardId,
      targetIndex,
      type: dropTargetType,
    } = hoverInfo;

    // Prevent dropping onto self (simplified check)
    if (
      draggedId ===
      (dropTargetType === "card"
        ? columns.find((c) => c.id === targetColumnId)?.cards[targetIndex]?.id
        : columns
            .find((c) => c.id === targetColumnId)
            ?.cards.find((c) => c.id === targetCardId)?.subtasks[targetIndex]
            ?.id)
    ) {
      handleDragEnd(e);
      return;
    }

    let newColumns = JSON.parse(JSON.stringify(columns));
    let itemToMove;

    // Find and Remove item from source
    const sourceCol = newColumns.find((col) => col.id === sourceColumnId);
    if (!sourceCol) {
      console.error("Source column not found");
      handleDragEnd(e);
      return;
    }

    if (draggedType === "card") {
      if (sourceIndex < 0 || sourceIndex >= sourceCol.cards.length) {
        console.error("Source card index invalid");
        handleDragEnd(e);
        return;
      }
      itemToMove = sourceCol.cards.splice(sourceIndex, 1)[0];
    } else {
      // subtask
      const sourceCard = sourceCol.cards.find(
        (card) => card.id === sourceCardId
      );
      if (
        !sourceCard ||
        !sourceCard.subtasks ||
        sourceIndex < 0 ||
        sourceIndex >= sourceCard.subtasks.length
      ) {
        console.error("Source subtask index invalid or card/subtasks missing");
        handleDragEnd(e);
        return;
      }
      itemToMove = sourceCard.subtasks.splice(sourceIndex, 1)[0];
    }

    if (!itemToMove) {
      console.error("Failed to find item to move");
      handleDragEnd(e);
      return;
    }

    // Insert item into target
    const targetCol = newColumns.find((col) => col.id === targetColumnId);
    if (!targetCol) {
      console.error("Target column not found");
      handleDragEnd(e);
      return;
    }

    try {
      if (draggedType === "card" && dropTargetType === "card") {
        const maxIndex = targetCol.cards.length;
        const insertIndex = Math.max(0, Math.min(targetIndex, maxIndex));
        targetCol.cards.splice(insertIndex, 0, itemToMove);
      } else if (draggedType === "subtask" && dropTargetType === "subtask") {
        const targetCard = targetCol.cards.find(
          (card) => card.id === targetCardId
        );
        if (!targetCard)
          throw new Error("Target card for subtask drop not found");
        if (!targetCard.subtasks) targetCard.subtasks = [];
        const maxIndex = targetCard.subtasks.length;
        const insertIndex = Math.max(0, Math.min(targetIndex, maxIndex));
        targetCard.subtasks.splice(insertIndex, 0, itemToMove);
        targetCard.expanded = true;
      } else {
        console.warn("Invalid drop combination detected in handleDrop");
        handleDragEnd(e);
        return;
      }

      // Update order properties
      newColumns.forEach((column) => {
        column.cards.forEach((card, index) => {
          card.order = index;
          if (card.subtasks) {
            card.subtasks.forEach((subtask, subIndex) => {
              subtask.order = subIndex;
            });
          }
        });
      });

      setColumns(newColumns);
    } catch (error) {
      console.error("Error during drop:", error);
    }

    handleDragEnd(e);
  };

  // --- Column Header Styles ---
  const columnHeaderStyles = {
    todo: "border-black",
    "in-progress": "border-blue-500",
    "under-review": "border-yellow-500",
    done: "border-green-500",
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <BredCrum
        board={"Hikko Design"}
        feature={"Board"}
        header={"Hikko Design"}
        modal={modal}
      />
      <StackedUser />
      {/* Column Headers */}
      <div className=" pt-5 pb-2 grid grid-cols-4 gap-4">
        <div className="mb-4 border-b-4  pb-2  border-black flex items-center gap-3">
          <p className="text-2xl font-semibold">TODO</p>
          <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
            {columns.find((col) => col.id === "todo")?.cards.length || 0}
          </button>
        </div>
        <div className="mb-4 border-b-4 border-blue-500 pb-2 flex items-center gap-3">
          <p className="text-2xl font-bold">In Progress</p>
          <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
            {columns.find((col) => col.id === "in-progress")?.cards.length || 0}
          </button>
        </div>
        <div className="mb-4 border-b-4 border-[#FFB580] pb-2 flex items-center gap-3">
          <p className="text-2xl font-bold">Under Review</p>
          <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
            {columns.find((col) => col.id === "under-review")?.cards.length ||
              0}
          </button>
        </div>
        <div className="mb-4 border-b-4 border-green-500 pb-2 flex items-center gap-3">
          <p className="text-2xl font-bold">COMPLETED</p>
          <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
            {columns.find((col) => col.id === "done")?.cards.length || 0}
          </button>
        </div>
      </div>
      {/* Kanban Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 overflow-hidden">
        {(columns || []).map((column) => (
          <div
            key={column.id}
            className="flex flex-col min-h-0 w-full  rounded-lg p-1 h-full  px-2 py-5"
            onDragOver={(e) =>
              handleDragOver(e, {
                targetColumnId: column.id,
                targetIndex: (column.cards || []).length,
                type: "card",
                isDropZone: true,
              })
            }
            onDrop={handleDrop}
          >
            {/* Scrollable card container */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-hidden pr-1 pb-[300px]">
              {(column.cards || []).map((card, cardIndex) => {
                const isCardDragging = draggedItem?.id === card.id;
                // Check if the current card is the one being hovered over to make space
                const isCardHoverMakeSpace =
                  hoverInfo?.type === "card" &&
                  hoverInfo?.targetColumnId === column.id &&
                  hoverInfo?.targetIndex === cardIndex;
                // Check if a card is being dragged *over* this card's drop zone
                const isCardDropZoneHovered =
                  hoverInfo?.type === "card" &&
                  hoverInfo?.targetColumnId === column.id &&
                  hoverInfo?.targetIndex === cardIndex;
                // Check if a subtask is being dragged over this card (highlight card)
                const isSubtaskHoverTargetCard =
                  hoverInfo?.type === "subtask" &&
                  hoverInfo?.targetCardId === card.id;

                return (
                  <div
                    key={card.id}
                    id={card.id}
                    className="mb-3 bg-white rounded-xl px-2"
                  >
                    {/* Drop zone ABOVE card */}
                    <div
                      className={`h-2 w-full transition-all duration-300 ease-in-out rounded ${
                        isCardDropZoneHovered
                          ? "bg-blue-200 h-8 border-2 border-dashed border-blue-500"
                          : ""
                      }`}
                      onDragOver={(e) =>
                        handleDragOver(e, {
                          targetColumnId: column.id,
                          targetIndex: cardIndex,
                          type: "card",
                          isDropZone: true,
                        })
                      }
                      onDrop={handleDrop}
                    />

                    {/* Main Task Card */}
                    <div
                      className={` shadow-sm rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
                        isSubtaskHoverTargetCard ? "ring-2 ring-green-300" : ""
                      }`}
                      style={{
                        // Apply dragging styles directly for simplicity matching reference
                        opacity: isCardDragging ? 0.5 : 1,
                        transform: isCardDragging
                          ? "rotate(2deg) scale(1.05)"
                          : isCardHoverMakeSpace
                          ? "translateY(8px)"
                          : "none",
                        // Let transition class handle timing
                      }}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, {
                          id: card.id,
                          type: "card",
                          sourceColumnId: column.id,
                          sourceIndex: cardIndex,
                        })
                      }
                      onDragEnd={handleDragEnd}
                    >
                      {/* Task Header */}
                      <div className="p-3 cursor-grab active:cursor-grabbing">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0 mr-2">
                            <p
                              className="text-sm font-medium text-gray-800 truncate"
                              title={card.title}
                            >
                              {card.title}
                            </p>
                          </div>
                          <div className="flex items-center flex-shrink-0">
                            <div className="flex -space-x-2 mr-2">
                              {(card.assignees || []).map((assignee, idx) => (
                                <UserAvater key={idx} image={assignee} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                          <div className="flex items-center gap-3">
                            {card.comment > 0 && (
                              <span className="flex items-center gap-1">
                                <MessageSquare size={12} /> {card.comment}
                              </span>
                            )}
                            {card.attachment > 0 && (
                              <span className="flex items-center gap-1">
                                <Paperclip size={12} /> {card.attachment}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Subtasks Section */}
                      {card.expanded && (
                        <div
                          className="p-2 "
                          onDragOver={(e) =>
                            handleDragOver(e, {
                              targetColumnId: column.id,
                              targetCardId: card.id,
                              targetIndex: (card.subtasks || []).length,
                              type: "subtask",
                            })
                          }
                          onDrop={handleDrop}
                        >
                          {(card.subtasks || []).map(
                            (subtask, subtaskIndex) => {
                              const isSubtaskDragging =
                                draggedItem?.id === subtask.id;
                              // Check if the current subtask is the one being hovered over to make space
                              const isSubtaskHoverMakeSpace =
                                hoverInfo?.type === "subtask" &&
                                hoverInfo?.targetCardId === card.id &&
                                hoverInfo?.targetIndex === subtaskIndex;
                              // Check if a subtask is being dragged *over* this subtask's drop zone
                              const isSubtaskDropZoneHovered =
                                hoverInfo?.type === "subtask" &&
                                hoverInfo?.targetCardId === card.id &&
                                hoverInfo?.targetIndex === subtaskIndex;

                              return (
                                <div key={subtask.id} id={subtask.id}>
                                  {/* Drop zone ABOVE subtask */}
                                  <div
                                    className={`h-1 w-full transition-all duration-200 ease-in-out rounded ${
                                      isSubtaskDropZoneHovered
                                        ? "bg-green-200 h-6 border-2 border-dashed border-green-500"
                                        : ""
                                    }`}
                                    onDragOver={(e) =>
                                      handleDragOver(e, {
                                        targetColumnId: column.id,
                                        targetCardId: card.id,
                                        targetIndex: subtaskIndex,
                                        type: "subtask",
                                      })
                                    }
                                    onDrop={handleDrop}
                                  />
                                  {/* Subtask Item */}
                                  <div
                                    className={`mb-1 cursor-grab active:cursor-grabbing bg-white transition-all duration-200 ease-in-out rounded-xl shadow-sm`}
                                    style={{
                                      opacity: isSubtaskDragging ? 0.5 : 1,
                                      transform: isSubtaskDragging
                                        ? "scale(1.05)"
                                        : isSubtaskHoverMakeSpace
                                        ? "translateY(4px)"
                                        : "none",
                                    }}
                                    draggable
                                    onDragStart={(e) =>
                                      handleDragStart(e, {
                                        id: subtask.id,
                                        type: "subtask",
                                        sourceColumnId: column.id,
                                        sourceCardId: card.id,
                                        sourceIndex: subtaskIndex,
                                      })
                                    }
                                    onDragEnd={handleDragEnd}
                                  >
                                    <ModalDetailChecklist
                                      title="Hello"
                                      startDate={"25/05/25"}
                                      status={"Overdue"}
                                      // label={subtask.label}
                                      // comment={subtask.comment}
                                      image={
                                        "https://codewithmosh.com/_next/image?url=https%3A%2F%2Fcdn.filestackcontent.com%2F8MbtJ4hTAaOk3KPcptqZ&w=3840&q=75"
                                      }
                                    />
                                  </div>
                                </div>
                              );
                            }
                          )}
                          {/* Final drop zone at the end of subtasks */}
                          <div
                            className={`h-1 w-full transition-all duration-200 ease-in-out rounded ${
                              hoverInfo?.type === "subtask" &&
                              hoverInfo?.targetCardId === card.id &&
                              hoverInfo?.targetIndex ===
                                (card.subtasks || []).length
                                ? "bg-green-200 h-6 border-2 border-dashed border-green-500"
                                : ""
                            }`}
                            onDragOver={(e) =>
                              handleDragOver(e, {
                                targetColumnId: column.id,
                                targetCardId: card.id,
                                targetIndex: (card.subtasks || []).length,
                                type: "subtask",
                              })
                            }
                            onDrop={handleDrop}
                          />
                          {/* Add Subtask Input */}
                          <div className=" pb-3 pt-1 px-3">
                            <div className="grid grid-cols-12">
                              <div className="col-span-8 flex items-center">
                                <ModalCreateChecklist
                                  onSubmit={(subtaskData) =>
                                    addSubtask(card.id, subtaskData)
                                  }
                                  buttonText="New checklist"
                                  modalTitle="Create Checklist"
                                />
                              </div>
                              <div className="col-span-4 p-2">
                                <CardDateChecklist date={"April 25"} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* collape */}
                    <div className="flex items-center justify-center ">
                      <button
                        onClick={() => toggleTaskExpansion(card.id)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                      >
                        {card.expanded ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
              {/* Final drop zone at the end of the column */}
              <div
                className={`min-h-[10px] w-full transition-all duration-300 ease-in-out rounded ${
                  hoverInfo?.type === "card" &&
                  hoverInfo?.targetColumnId === column.id &&
                  hoverInfo?.targetIndex === (column.cards || []).length
                    ? "bg-blue-100 border-2 border-dashed border-blue-400 py-4"
                    : ""
                }`}
                onDragOver={(e) =>
                  handleDragOver(e, {
                    targetColumnId: column.id,
                    targetIndex: (column.cards || []).length,
                    type: "card",
                    isDropZone: true,
                  })
                }
                onDrop={handleDrop}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
