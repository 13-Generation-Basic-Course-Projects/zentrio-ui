"use client";
import { useState } from "react";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import { teamLeader } from "@/data/board/teamleader";
import { initialColumns } from "@/data/boardData";
import { CardCheckList } from "../card/CardChecklist";
import UserAvater from "../useravatar/UserAvatar";
import BredCrum from "../bredcrum/bredcrum";
import { StackedUser } from "../useravatar/StackUser";
import ModalCreateChecklist from "../modal/board/ModalCreateChecklist";
import ModalDetailChecklist from "../modal/board/ModalDetailChecklist";

export default function KanbanBoard({ modal }) {
  const [columns, setColumns] = useState(initialColumns);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);

  // Find card or subtask by ID
  const findItem = (itemId) => {
    for (const column of columns) {
      // Check if it's a main task
      const card = column.cards.find((card) => card.id === itemId);
      if (card) {
        return {
          type: "card",
          item: card,
          columnId: column.id,
          cardIndex: column.cards.findIndex((c) => c.id === itemId),
          parentCardId: null,
        };
      }

      // Check if it's a subtask
      for (const card of column.cards) {
        const subtask = card.subtasks.find((st) => st.id === itemId);
        if (subtask) {
          return {
            type: "subtask",
            item: subtask,
            columnId: column.id,
            cardIndex: column.cards.findIndex((c) => c.id === card.id),
            parentCardId: card.id,
            subtaskIndex: card.subtasks.findIndex((st) => st.id === itemId),
          };
        }
      }
    }
    return { type: null, item: null, columnId: null, cardIndex: -1 };
  };

  // Toggle task expansion
  const toggleTaskExpansion = (cardId) => {
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        cards: column.cards.map((card) =>
          card.id === cardId ? { ...card, expanded: !card.expanded } : card
        ),
      }))
    );
  };

  // Add new subtask with data from modal
  const addSubtask = (cardId, subtaskData) => {
    const newSubtaskId = `${cardId}-${Date.now()}`;
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        cards: column.cards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                subtasks: [
                  ...card.subtasks,
                  {
                    id: newSubtaskId,
                    title:
                      subtaskData.title ||
                      `subtask ${card.subtasks.length + 1}`,
                    description: subtaskData.description || "New subtask",
                    duration: subtaskData.duration || null,
                    label: subtaskData.label || null,
                    comment: subtaskData.comment || null,
                    order: card.subtasks.length,
                  },
                ],
                expanded: true,
              }
            : card
        ),
      }))
    );
  };

  // Drag handlers
  const handleDragStart = (e, itemId, itemType) => {
    e.stopPropagation(); // Prevent parent drag events
    const itemData = findItem(itemId);
    setDraggedItem({ itemId, itemType, ...itemData });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", itemId);

    setTimeout(() => {
      if (e.target.classList) {
        e.target.classList.add("opacity-50");
      }
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.stopPropagation();
    if (e.target.classList) {
      e.target.classList.remove("opacity-50");
    }
    setDraggedItem(null);
    setDragTarget(null);
  };

  const handleDragOver = (
    e,
    targetType,
    columnId,
    cardIndex = null,
    subtaskIndex = null
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

    // Prevent cards from being dropped into subtask or task-body areas
    if (
      draggedItem.type === "card" &&
      ["subtask", "task-body"].includes(targetType)
    ) {
      return;
    }

    // Restrict subtask drops to subtask or task-body areas only
    if (
      draggedItem.type === "subtask" &&
      !["subtask", "task-body"].includes(targetType)
    ) {
      return;
    }

    if (targetType === "card") {
      const cardElement = e.currentTarget;
      const rect = cardElement.getBoundingClientRect();
      const mouseY = e.clientY;
      const cardMidpoint = rect.top + rect.height / 2;
      const dropIndex = mouseY < cardMidpoint ? cardIndex : cardIndex + 1;

      setDragTarget({ type: "card", columnId, index: dropIndex });
    } else if (targetType === "subtask") {
      const subtaskElement = e.currentTarget;
      const rect = subtaskElement.getBoundingClientRect();
      const mouseY = e.clientY;
      const subtaskMidpoint = rect.top + rect.height / 2;
      const dropIndex =
        mouseY < subtaskMidpoint ? subtaskIndex : subtaskIndex + 1;

      setDragTarget({ type: "subtask", columnId, cardIndex, index: dropIndex });
    } else if (targetType === "column") {
      setDragTarget({ type: "column", columnId });
    } else if (targetType === "task-body") {
      setDragTarget({ type: "task-body", columnId, cardIndex });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || !dragTarget) return;

    let newColumns = JSON.parse(JSON.stringify(columns));
    const sourceColumnIndex = newColumns.findIndex(
      (col) => col.id === draggedItem.columnId
    );
    const targetColumnIndex = newColumns.findIndex(
      (col) => col.id === dragTarget.columnId
    );

    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;

    // Get the item to move
    let itemToMove;

    if (draggedItem.type === "card") {
      itemToMove = newColumns[sourceColumnIndex].cards[draggedItem.cardIndex];
    } else if (draggedItem.type === "subtask") {
      const sourceCard =
        newColumns[sourceColumnIndex].cards[draggedItem.cardIndex];
      itemToMove = sourceCard.subtasks[draggedItem.subtaskIndex];
    }

    if (!itemToMove) return;

    // Handle different drop scenarios
    if (dragTarget.type === "card" && draggedItem.type === "card") {
      // Dropping as a main task (only allowed for cards)
      let targetIndex = dragTarget.index;

      // If moving within same column, adjust index for removal
      if (
        sourceColumnIndex === targetColumnIndex &&
        draggedItem.cardIndex < targetIndex
      ) {
        targetIndex -= 1;
      }

      // Remove from source and insert as main task
      newColumns[sourceColumnIndex].cards.splice(draggedItem.cardIndex, 1);
      newColumns[targetColumnIndex].cards.splice(targetIndex, 0, itemToMove);
    } else if (
      dragTarget.type === "subtask" &&
      draggedItem.type === "subtask"
    ) {
      // Dropping as a subtask
      const targetCard =
        newColumns[targetColumnIndex].cards[dragTarget.cardIndex];
      let targetIndex = dragTarget.index;

      // If moving within same subtask array, adjust index for removal
      if (
        sourceColumnIndex === targetColumnIndex &&
        draggedItem.cardIndex === dragTarget.cardIndex &&
        draggedItem.subtaskIndex < targetIndex
      ) {
        targetIndex -= 1;
      }

      // Remove subtask from source
      const sourceCard =
        newColumns[sourceColumnIndex].cards[draggedItem.cardIndex];
      sourceCard.subtasks.splice(draggedItem.subtaskIndex, 1);
      // Insert subtask at target position
      targetCard.subtasks.splice(targetIndex, 0, itemToMove);
      targetCard.expanded = true;
    } else if (
      dragTarget.type === "task-body" &&
      draggedItem.type === "subtask"
    ) {
      // Dropping into task body (append to end)
      const targetCard =
        newColumns[targetColumnIndex].cards[dragTarget.cardIndex];

      const sourceCard =
        newColumns[sourceColumnIndex].cards[draggedItem.cardIndex];
      sourceCard.subtasks.splice(draggedItem.subtaskIndex, 1);
      targetCard.subtasks.push(itemToMove);
      targetCard.expanded = true;
    } else if (dragTarget.type === "column" && draggedItem.type === "card") {
      // Dropping into empty column (append to end, only allowed for cards)
      newColumns[sourceColumnIndex].cards.splice(draggedItem.cardIndex, 1);
      newColumns[targetColumnIndex].cards.push(itemToMove);
    }

    // Update order properties
    newColumns.forEach((column) => {
      column.cards.forEach((card, index) => {
        card.order = index;
      });
      column.cards.forEach((card) => {
        card.subtasks.forEach((subtask, subIndex) => {
          subtask.order = subIndex;
        });
      });
    });

    setColumns(newColumns);
    setDraggedItem(null);
    setDragTarget(null);
  };


  //


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
        <div className="mb-4 border-b-4 border-blue-500 pb-2 flex items-center gap-3">
          <p className="text-2xl font-bold">To Do</p>
          <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
            {columns.find((col) => col.id === "todo")?.cards.length || 0}
          </button>
        </div>
        <div className="mb-4 border-b-4 border-yellow-500 pb-2 flex items-center gap-3">
          <p className="text-2xl font-bold">In Progress</p>
          <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
            {columns.find((col) => col.id === "in-progress")?.cards.length || 0}
          </button>
        </div>
        <div className="mb-4 border-b-4 border-purple-500 pb-2 flex items-center gap-3">
          <p className="text-2xl font-bold">Under Review</p>
          <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
            {columns.find((col) => col.id === "under-review")?.cards.length ||
              0}
          </button>
        </div>
        <div className="mb-4 border-b-4 border-green-500 pb-2 flex items-center gap-3">
          <p className="text-2xl font-bold">Done</p>
          <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
            {columns.find((col) => col.id === "done")?.cards.length || 0}
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="   grid grid-cols-4  gap-1 h-full  ">
        {columns.map((column) => (
          // parent
          <div
            key={column.id}
            className="flex  flex-col min-h-0 w-full  h-[99%] overflow-hidden  "
            onDragOver={(e) => handleDragOver(e, "column", column.id)}
            onDrop={handleDrop}
          >
            {/* child */}
            <div className="  scrollbar-hidden pb-20 overflow-y-auto  bp-3  ">
              {column.cards
                .sort((a, b) => a.order - b.order)
                .map((card, cardIndex) => (
                  <div key={card.id}>
                    {/* Drop zone above card */}
                    <div
                      className={`h-4 w-full transition-all ${
                        dragTarget &&
                        dragTarget.type === "card" &&
                        dragTarget.columnId === column.id &&
                        dragTarget.index === cardIndex
                          ? "border-t-2 border-blue-500 bg-blue-50"
                          : "border-t-2 border-transparent"
                      }`}
                      onDragOver={(e) =>
                        handleDragOver(e, "card", column.id, cardIndex)
                      }
                      onDrop={handleDrop}
                    />

                    {/* Main Task Card */}
                    <div className="bg-white rounded-xl shadow mb-2 overflow-hidden hover:shadow-md transition-shadow border-1 border-bgColor">
                      {/* Task Header */}
                      <div
                        className="py-3  cursor-move"
                        draggable
                        onDragStart={(e) => handleDragStart(e, card.id, "card")}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="flex items-center justify-between px-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleTaskExpansion(card.id)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {card.expanded ? (
                                <ChevronDown size={16} />
                              ) : (
                                <ChevronRight size={16} />
                              )}
                            </button>
                            <div>
                              <div className="font-medium">{card.title}</div>
                              <div className="text-sm text-gray-600 sm:text-body-sm truncate max-w-[150px]">
                                {card.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2  ">
                            <UserAvater
                              image={
                                "https://cdn.prod.website-files.com/5dd827bbc07b1656e06b16d8/623db0c2ec0384a4ffd2c4ab_mosh.jpeg"
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subtasks - Always visible, but images hidden when collapsed */}
                      <div
                        className="px-3 pb-5"
                        onDragOver={(e) =>
                          handleDragOver(e, "task-body", column.id, cardIndex)
                        }
                        onDrop={handleDrop}
                      >
                        {card.subtasks
                          .sort((a, b) => a.order - b.order)
                          .map((subtask, subtaskIndex) => (
                            <div key={subtask.id}>
                              {/* Drop zone above subtask - only visible when expanded */}
                              {card.expanded && (
                                <div
                                  className={`h-2 w-full transition-all ${
                                    dragTarget &&
                                    dragTarget.type === "subtask" &&
                                    dragTarget.columnId === column.id &&
                                    dragTarget.cardIndex === cardIndex &&
                                    dragTarget.index === subtaskIndex
                                      ? "border-t-2 border-green-500 bg-green-50"
                                      : "border-t-2 border-transparent"
                                  }`}
                                  onDragOver={(e) =>
                                    handleDragOver(
                                      e,
                                      "subtask",
                                      column.id,
                                      cardIndex,
                                      subtaskIndex
                                    )
                                  }
                                  onDrop={handleDrop}
                                />
                              )}

                              {/* Subtask Item */}
                              <div
                                className="pb-4"
                                draggable
                                onDragStart={(e) =>
                                  handleDragStart(e, subtask.id, "subtask")
                                }
                                onDragEnd={handleDragEnd}
                              >
                                <ModalDetailChecklist
                                  title="Hello"
                                  startDate={"25/05/25"}
                                  label={subtask.label}
                                  comment={subtask.comment}
                                  image={
                                    card.expanded
                                      ? "https://codewithmosh.com/_next/image?url=https%3A%2F%2Fcdn.filestackcontent.com%2F8MbtJ4hTAaOk3KPcptqZ&w=3840&q=75"
                                      : null
                                  }
                                  hideImage={!card.expanded}
                                />
                              </div>
                            </div>
                          ))}

                        {/* Drop zone at end of subtasks - only visible when expanded */}
                        {card.expanded && (
                          <div
                            className={`h-2 w-full transition-all ${
                              dragTarget &&
                              dragTarget.type === "subtask" &&
                              dragTarget.columnId === column.id &&
                              dragTarget.cardIndex === cardIndex &&
                              dragTarget.index === card.subtasks.length
                                ? "border-t-2 border-green-500 bg-green-50"
                                : "border-t-2 border-transparent"
                            }`}
                            onDragOver={(e) =>
                              handleDragOver(
                                e,
                                "subtask",
                                column.id,
                                cardIndex,
                                card.subtasks.length
                              )
                            }
                            onDrop={handleDrop}
                          />
                        )}

                        {card.expanded && card.subtasks.length === 0 && (
                          <div className="ml-4 p-2 border-2 border-dashed border-gray-300 rounded text-xs text-gray-400 text-center">
                            Drop subtasks here
                          </div>
                        )}
                      </div>

                      {/* Create Subtask Button at Bottom of Card */}
                      {card.expanded && (
                        <div className=" pb-3 pt-1">
                          <div className="w-full">
                            <ModalCreateChecklist
                              onSubmit={(subtaskData) =>
                                addSubtask(card.id, subtaskData)
                              }
                              buttonText="create new checklist"
                              modalTitle="Create Checklist"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              {/* Drop zone at end of column */}
              <div
                className={`h-4 w-full transition-all ${
                  dragTarget &&
                  dragTarget.type === "card" &&
                  dragTarget.columnId === column.id &&
                  dragTarget.index === column.cards.length
                    ? "border-t-2 border-blue-500 bg-blue-50"
                    : "border-t-2 border-transparent"
                }`}
                onDragOver={(e) =>
                  handleDragOver(e, "card", column.id, column.cards.length)
                }
                onDrop={handleDrop}
              />

              {column.cards.length === 0 && (
                <div
                  className="h-20 w-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400"
                  onDragOver={(e) => handleDragOver(e, "column", column.id)}
                  onDrop={handleDrop}
                >
                  Drop here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
