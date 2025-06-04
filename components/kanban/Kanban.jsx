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

// Placeholder component (unchanged)
const UserAvater = ({ image }) => (
  <img
    src={image}
    alt="avatar"
    className="w-6 h-6 rounded-full border border-white -ml-2 first:ml-0"
  />
);

// Function to transform API data into columns format
const transformApiToColumns = (apiData) => {
  // Initialize columns
  const columns = [
    { id: "todo", title: "TODO", cards: [] },
    { id: "in-progress", title: "In Progress", cards: [] },
    { id: "under-review", title: "Under Review", cards: [] },
    { id: "done", title: "COMPLETED", cards: [] },
  ];

  // Map API stage to column ID
  const stageToColumnMap = {
    COMPLETED: "done",
    UNDER_REVIEW: "under-review",
    IN_PROGRESS: "in-progress",
  };

  // Transform tasks into cards
  apiData.forEach((task) => {
    const columnId = stageToColumnMap[task.stage] || "todo"; // Default to 'todo' if stage is unknown

    // Calculate duration
    let duration = "N/A";
    if (task.startedAt && task.finishedAt) {
      const start = new Date(task.startedAt);
      const end = new Date(task.finishedAt);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      duration = `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    }

    const card = {
      id: task.taskId,
      title: task.title,
      description: task.description,
      label: null, // API doesn't provide; set default
      comment: 0, // API doesn't provide; set default
      attachment: 0, // API doesn't provide; set default
      duration: duration,
      order: task.taskOrder,
      expanded: false, // Default
      subtasks: [], // API doesn't provide; set default
      assignees: [task.creator.imageUrl], // Use creator's image URL
    };

    const column = columns.find((col) => col.id === columnId);
    if (column) {
      column.cards.push(card);
    }
  });

  // Sort cards by order
  columns.forEach((column) => {
    column.cards.sort((a, b) => a.order - b.order);
  });

  return columns;
};

export default function KanbanBoard({ modal, tasks }) {
  const [columns, setColumns] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [newSubtaskCardId, setNewSubtaskCardId] = useState(null);
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch and transform API data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch("/api/tasks"); // Adjust URL as needed
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const apiData = await response.json();
        const transformedColumns = transformApiToColumns(apiData);
        setColumns(transformedColumns);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // If tasks prop is provided (for testing), use it; otherwise, fetch
    if (tasks?.payload) {
      const transformedColumns = transformApiToColumns(tasks.payload);
      setColumns(transformedColumns);
      setLoading(false);
    } else {
      fetchTasks();
    }
  }, [tasks]);

  // Rest of your existing functions (unchanged)
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

  const addSubtask = (cardId, subtaskData) => {
    if (!subtaskData?.description?.trim()) return;
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
                    description: subtaskData.description,
                    duration: subtaskData.duration || null,
                    label: subtaskData.label || null,
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

  // Drag-and-drop handlers (unchanged)
  const handleDragStart = (e, item) => {
    e.stopPropagation();
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
    setTimeout(() => {
      const element = document.getElementById(item.id);
      if (element) {
        element.style.opacity = "0.5";
        element.style.transform = "rotate(2deg) scale(1.05)";
        element.style.transition =
          "transform 0.1s ease-in-out, opacity 0.1s ease-in-out";
      }
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();
    if (draggedItem) {
      const element = document.getElementById(draggedItem.id);
      if (element) {
        element.style.opacity = "";
        element.style.transform = "";
        element.style.transition = "";
      }
    }
    setDraggedItem(null);
    setHoverInfo(null);
  };

  const handleDragOver = (e, targetInfo) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

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

      // Optionally, update the backend with the new column/stage
      if (draggedType === "card") {
        const taskId = itemToMove.id;
        const newStage = Object.keys({
          done: "COMPLETED",
          "under-review": "UNDER_REVIEW",
          "in-progress": "IN_PROGRESS",
          todo: "TODO",
        }).find((key) => key === targetColumnId);
        if (newStage) {
          // Update backend (example)
          fetch(`/api/tasks/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stage: newStage }),
          }).catch((err) => console.error("Failed to update task stage:", err));
        }
      }
    } catch (error) {
      console.error("Error during drop:", error);
    }

    handleDragEnd(e);
  };

  // Column header styles (unchanged)
  const columnHeaderStyles = {
    todo: "border-black",
    "in-progress": "border-blue-500",
    "under-review": "border-yellow-500",
    done: "border-green-500",
  };

  // Render loading or error states
  if (loading) {
    return <div>Loading tasks...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

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
      <div className="pt-5 pb-2 grid grid-cols-4 gap-4">
        {(columns || []).map((column) => (
          <div
            key={column.id}
            className={`mb-4 border-b-4 pb-2 flex items-center gap-3 ${
              columnHeaderStyles[column.id]
            }`}
          >
            <p className="text-2xl font-semibold">{column.title}</p>
            <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
              {column.cards?.length || 0}
            </button>
          </div>
        ))}
      </div>
      {/* Kanban Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 overflow-hidden">
        {(columns || []).map((column) => (
          <div
            key={column.id}
            className="flex flex-col min-h-0 w-full rounded-lg p-1 h-full px-2 py-5"
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
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-hidden pr-1 pb-[300px]">
              {(column.cards || []).map((card, cardIndex) => {
                const isCardDragging = draggedItem?.id === card.id;
                const isCardHoverMakeSpace =
                  hoverInfo?.type === "card" &&
                  hoverInfo?.targetColumnId === column.id &&
                  hoverInfo?.targetIndex === cardIndex;
                const isCardDropZoneHovered =
                  hoverInfo?.type === "card" &&
                  hoverInfo?.targetColumnId === column.id &&
                  hoverInfo?.targetIndex === cardIndex;
                const isSubtaskHoverTargetCard =
                  hoverInfo?.type === "subtask" &&
                  hoverInfo?.targetCardId === card.id;

                return (
                  <div
                    key={card.id}
                    id={card.id}
                    className="mb-3 bg-white rounded-xl px-2"
                  >
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
                    <div
                      className={`shadow-sm rounded-xl overflow-hidden transition-all duration-300 ease-in-out ${
                        isSubtaskHoverTargetCard ? "ring-2 ring-green-300" : ""
                      }`}
                      style={{
                        opacity: isCardDragging ? 0.5 : 1,
                        transform: isCardDragging
                          ? "rotate(2deg) scale(1.05)"
                          : isCardHoverMakeSpace
                          ? "translateY(8px)"
                          : "none",
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
                      {card.expanded && (
                        <div
                          className="p-2"
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
                              const isSubtaskHoverMakeSpace =
                                hoverInfo?.type === "subtask" &&
                                hoverInfo?.targetCardId === card.id &&
                                hoverInfo?.targetIndex === subtaskIndex;
                              const isSubtaskDropZoneHovered =
                                hoverInfo?.type === "subtask" &&
                                hoverInfo?.targetCardId === card.id &&
                                hoverInfo?.targetIndex === subtaskIndex;

                              return (
                                <div key={subtask.id} id={subtask.id}>
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
                                      title={subtask.title}
                                      startDate={
                                        card.startedAt
                                          ? new Date(
                                              card.startedAt
                                            ).toLocaleDateString()
                                          : "N/A"
                                      }
                                      status={
                                        subtask.completed
                                          ? "Completed"
                                          : "Pending"
                                      }
                                      image={card.assignees[0] || ""}
                                    />
                                  </div>
                                </div>
                              );
                            }
                          )}
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
                          <div className="pb-3 pt-1 px-3">
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
                                <CardDateChecklist
                                  date={
                                    card.startedAt
                                      ? new Date(
                                          card.startedAt
                                        ).toLocaleDateString()
                                      : "N/A"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-center">
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
