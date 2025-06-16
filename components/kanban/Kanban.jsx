"use client";

import React, { useState, useEffect } from "react";
import { StackedUser } from "../useravatar/StackUser";
import BredCrum from "../bredcrum/MyBredcrum";
import ModalDetailChecklist from "../modal/board/ModalDetailChecklist";
import { ChevronDown, ChevronUp, MessageSquare, Paperclip } from "lucide-react";
import CardDateChecklist from "../card/CardDateChecklist";
import ModalCreateChecklist from "../modal/board/ModalCreateChecklist";
import { EmptyKanban } from "../appserver/EmptyKanban";
import ModalOptionTask from "../modal/board/ModalOptionTask";
import { moveTaskOrderAction } from "@/action/board.action";

// Placeholder component
const UserAvater = ({ image }) => (
  <img
    src={image}
    alt="avatar"
    className="w-6 h-6 rounded-full border border-white -ml-2 first:ml-0"
  />
);

// Function to get checklists for a specific task
const getChecklistsForTask = (taskId, checklistbyTaskIds) => {
  if (!checklistbyTaskIds || !Array.isArray(checklistbyTaskIds)) {
    return [];
  }

  for (const response of checklistbyTaskIds) {
    if (
      response.success &&
      response.payload &&
      Array.isArray(response.payload)
    ) {
      const taskChecklists = response.payload.filter(
        (checklist) => checklist.taskId === taskId
      );
      if (taskChecklists.length > 0) {
        return taskChecklists.sort(
          (a, b) => a.checklistOrder - b.checklistOrder
        );
      }
    }
  }
  return [];
};

// Function to transform API data into columns format
const transformApiToColumns = (apiData, checklistbyTaskIds) => {
  const columns = [
    { id: "todo", title: "TODO", cards: [] },
    { id: "in-progress", title: "In Progress", cards: [] },
    { id: "under-review", title: "Under Review", cards: [] },
    { id: "done", title: "COMPLETED", cards: [] },
  ];

  const stageToColumnMap = {
    COMPLETED: "done",
    UNDER_REVIEW: "under-review",
    IN_PROGRESS: "in-progress",
    TO_DO: "todo",
  };

  apiData.forEach((task) => {
    const columnId = stageToColumnMap[task.stage] || "todo";

    let duration = "N/A";
    if (task.startedAt && task.finishedAt) {
      const start = new Date(task.startedAt);
      const end = new Date(task.finishedAt);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      duration = `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    }

    const taskChecklists = getChecklistsForTask(
      task.taskId,
      checklistbyTaskIds
    );

    const card = {
      id: task.taskId,
      title: task.title,
      description: task.description,
      label: null,
      comment: 0,
      attachment: 0,
      duration: duration,
      order: task.taskOrder,
      expanded: false,
      checklists: taskChecklists,
      assignees: [task.creator.imageUrl],
      startedAt: task.startedAt,
      finishedAt: task.finishedAt,
    };

    const column = columns.find((col) => col.id === columnId);
    if (column) {
      column.cards.push(card);
    }
  });

  // Sort cards by taskOrder (ascending: 1, 2, 3, ...)
  columns.forEach((column) => {
    column.cards.sort((a, b) => a.order - b.order);
  });

  return columns;
};

export default function KanbanBoard({
  modal,
  tasks,
  checklistbyTaskIds,
  allMemberInBoard,
  preventUserImage,
  boardData,
  ganttbar,
  boardId,
  role,
}) {
  const [columns, setColumns] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [newSubtaskCardId, setNewSubtaskCardId] = useState(null);
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    console.log("KanbanBoard props:", {
      boardId,
      boardDataBoardId: boardData?.payload?.boardId,
      tasksBoardId: tasks[0]?.boardId,
    });
    console.log(
      "TO DO tasks:",
      transformApiToColumns(tasks, checklistbyTaskIds)
        .find((c) => c.id === "todo")
        ?.cards.map((c) => ({ id: c.id, order: c.order }))
    );

    if (!boardId) {
      setError("Board ID is missing");
      setLoading(false);
      return;
    }

    if (tasks) {
      const transformedColumns = transformApiToColumns(
        tasks,
        checklistbyTaskIds
      );
      setColumns(transformedColumns);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [tasks, JSON.stringify(checklistbyTaskIds), boardId, boardData]);

  const findChecklistDetails = (checklistId) => {
    for (let colIndex = 0; colIndex < columns.length; colIndex++) {
      const column = columns[colIndex];
      for (
        let cardIndex = 0;
        cardIndex < (column.cards || []).length;
        cardIndex++
      ) {
        const card = column.cards[cardIndex];
        if (card.checklists) {
          for (
            let checklistIndex = 0;
            checklistIndex < card.checklists.length;
            checklistIndex++
          ) {
            const checklist = card.checklists[checklistIndex];
            if (checklist.checklistId === checklistId) {
              return {
                columnId: column.id,
                cardId: card.id,
                checklistIndex: checklistIndex,
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

  const addChecklist = (cardId, checklistData) => {
    if (!checklistData?.description?.trim()) return;
    const newChecklistId = `${cardId}-checklist-${Date.now()}`;
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        cards: (column.cards || []).map((card) =>
          card.id === cardId
            ? {
                ...card,
                checklists: [
                  ...(card.checklists || []),
                  {
                    checklistId: newChecklistId,
                    title:
                      checklistData.title ||
                      `Checklist ${(card.checklists || []).length + 1}`,
                    description: checklistData.description,
                    status: "PENDING",
                    cover: null,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    checklistOrder: (card.checklists || []).length + 1,
                    startedAt: checklistData.startedAt || null,
                    finishedAt: checklistData.finishedAt || null,
                    taskId: cardId,
                    createdBy: "current-user-id",
                    members: [],
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

    if (
      draggedItem.type === "card" &&
      targetInfo.type === "card" &&
      draggedItem.sourceColumnId !== targetInfo.targetColumnId
    ) {
      e.dataTransfer.dropEffect = "none";
      setHoverInfo(null);
      return;
    }

    if (draggedItem.type === "card" && targetInfo.type === "checklist") {
      e.dataTransfer.dropEffect = "none";
      setHoverInfo(null);
      return;
    }

    if (
      draggedItem.type === "checklist" &&
      targetInfo.type === "card" &&
      targetInfo.isDropZone
    ) {
      e.dataTransfer.dropEffect = "none";
      setHoverInfo(null);
      return;
    }

    if (
      draggedItem.type === "checklist" &&
      targetInfo.type === "checklist" &&
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

  const handleDrop = async (e) => {
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

    // Check if dropping on the same item
    if (
      draggedId ===
      (dropTargetType === "card"
        ? columns.find((c) => c.id === targetColumnId)?.cards[targetIndex]?.id
        : columns
            .find((c) => c.id === targetColumnId)
            ?.cards.find((c) => c.id === targetCardId)?.checklists[targetIndex]
            ?.checklistId)
    ) {
      handleDragEnd(e);
      return;
    }

    // Prevent cross-column card moves
    if (draggedType === "card" && sourceColumnId !== targetColumnId) {
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

    // Extract the item to move
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
        !sourceCard.checklists ||
        sourceIndex < 0 ||
        sourceIndex >= sourceCard.checklists.length
      ) {
        console.error(
          "Source checklist index invalid or card/checklists missing"
        );
        handleDragEnd(e);
        return;
      }
      itemToMove = sourceCard.checklists.splice(sourceIndex, 1)[0];
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

        // Calculate oldOrder BEFORE modifying the array
        // Use the original taskOrder of the moved task as default
        let oldOrder = itemToMove.order;
        if (
          insertIndex < targetCol.cards.length &&
          insertIndex !== sourceIndex
        ) {
          // Use the order of the task at the target position if it exists and it’s not a self-drop
          oldOrder = targetCol.cards[insertIndex]?.order || itemToMove.order;
        }

        // Insert the dragged task at the target index
        targetCol.cards.splice(insertIndex, 0, itemToMove);

        // Reassign taskOrder for all cards in the column, starting from 1
        targetCol.cards = targetCol.cards.map((card, index) => ({
          ...card,
          order: index + 1,
        }));

        // Update the state
        setColumns(newColumns);

        // Calculate newOrder (1-based position)
        const newOrder = insertIndex + 1;

        console.log("Calling moveTaskOrderAction:", {
          boardId,
          newOrder,
          oldOrder,
          draggedId,
          targetIndex,
          insertIndex,
          sourceIndex,
          targetColCards: targetCol.cards.map((c) => ({
            id: c.id,
            order: c.order,
          })),
        });

        if (!boardId) {
          setErrorMessage("Board ID is missing. Cannot update task order.");
          setColumns(columns); // Revert to original state
          throw new Error("Board ID is missing");
        }

        try {
          setIsUpdating(true);
          setErrorMessage(null);
          await moveTaskOrderAction(boardId, newOrder, oldOrder);
          console.log(
            `Task order updated: moved task ${draggedId} to order ${newOrder}${
              oldOrder
                ? ` (displaced task with order ${oldOrder})`
                : " (moved to end)"
            }`
          );
        } catch (error) {
          console.error(
            "Failed to update task order on backend:",
            error.message
          );
          setErrorMessage("Failed to update task order. Please try again.");
          setColumns(columns); // Revert to previous state
          throw error;
        } finally {
          setIsUpdating(false);
        }
      } else if (
        draggedType === "checklist" &&
        dropTargetType === "checklist"
      ) {
        const targetCard = targetCol.cards.find(
          (card) => card.id === targetCardId
        );
        if (!targetCard)
          throw new Error("Target card for checklist drop not found");
        if (!targetCard.checklists) targetCard.checklists = [];

        const maxIndex = targetCard.checklists.length;
        const insertIndex = Math.max(0, Math.min(targetIndex, maxIndex));
        targetCard.checklists.splice(insertIndex, 0, itemToMove);
        targetCard.expanded = true;

        // Update checklist orders
        targetCard.checklists = targetCard.checklists.map(
          (checklist, index) => ({
            ...checklist,
            checklistOrder: index + 1,
          })
        );

        setColumns(newColumns);
      } else {
        console.warn("Invalid drop combination detected in handleDrop");
        handleDragEnd(e);
        return;
      }
    } catch (error) {
      console.error("Error during drop:", error.message);
      // Optionally revert state here if needed
    }

    handleDragEnd(e);
  };

  const columnHeaderStyles = {
    todo: "border-black",
    "in-progress": "border-blue-500",
    "under-review": "border-yellow-500",
    done: "border-green-500",
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("ganttbar data", ganttbar);
  return (
    <div className="w-full h-screen flex flex-col">
      <BredCrum
        board={boardData?.payload.title || "Hikko Design"}
        feature={"Board"}
        header={boardData?.payload.title || "Hikko Design"}
        modal={modal}
      />
      <StackedUser image={allMemberInBoard} />
      {isUpdating && (
        <div className="text-blue-500 p-2">Updating task order...</div>
      )}
      {errorMessage && <div className="text-red-500 p-2">{errorMessage}</div>}
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
      {tasks.length > 0 ? (
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
                {(column.cards || [])
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((card, cardIndex) => {
                    const isCardDragging = draggedItem?.id === card.id;
                    const isCardHoverMakeSpace =
                      hoverInfo?.type === "card" &&
                      hoverInfo?.targetColumnId === column.id &&
                      hoverInfo?.targetIndex === cardIndex;
                    const isCardDropZoneHovered =
                      hoverInfo?.type === "card" &&
                      hoverInfo?.targetColumnId === column.id &&
                      hoverInfo?.targetIndex === cardIndex;
                    const isChecklistHoverTargetCard =
                      hoverInfo?.type === "checklist" &&
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
                            isChecklistHoverTargetCard
                              ? "ring-2 ring-green-300"
                              : ""
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
                                {tasks.map((task) =>
                                  task.taskId === card.id ? (
                                    <div key={task.taskId}>
                                      {task.teamLeader ? (
                                        <p className="text-[10px] text-green-500">
                                          TL {task?.teamLeader?.username}
                                          {task?.teamLeader?.userId}
                                        </p>
                                      ) : (
                                        <p className="text-[10px] text-red-500">
                                          No Team Leader yet
                                        </p>
                                      )}
                                    </div>
                                  ) : null
                                )}
                              </div>
                              <div className="flex items-center flex-shrink-0">
                                <div className="flex -space-x-2 mr-2">
                                  {tasks.map((task) =>
                                    task.taskId === card.id ? (
                                      <div key={task.taskId}>
                                        {task.teamLeader ? (
                                          <UserAvater
                                            key={task.taskId}
                                            image={
                                              task.teamLeader?.imageUrl ??
                                              preventUserImage
                                            }
                                          />
                                        ) : (
                                          <UserAvater
                                            key={task.taskId}
                                            image={
                                              "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png"
                                            }
                                          />
                                        )}
                                      </div>
                                    ) : null
                                  )}
                                </div>
                                <ModalOptionTask
                                  role={role}
                                  key={"apple"}
                                  allMemberInBoard={allMemberInBoard}
                                  taskId={card.id}
                                  boardId={
                                    boardData?.payload?.boardId || boardId
                                  }
                                  ganttbarData={ganttbar}
                                  tasks={tasks}
                                />
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
                                  targetIndex: (card.checklists || []).length,
                                  type: "checklist",
                                })
                              }
                              onDrop={handleDrop}
                            >
                              {(card.checklists || []).map(
                                (checklist, checklistIndex) => {
                                  const isChecklistDragging =
                                    draggedItem?.id === checklist.checklistId;
                                  const isChecklistHoverMakeSpace =
                                    hoverInfo?.type === "checklist" &&
                                    hoverInfo?.targetCardId === card.id &&
                                    hoverInfo?.targetIndex === checklistIndex;
                                  const isChecklistDropZoneHovered =
                                    hoverInfo?.type === "checklist" &&
                                    hoverInfo?.targetCardId === card.id &&
                                    hoverInfo?.targetIndex === checklistIndex;

                                  return (
                                    <div
                                      key={checklist.checklistId}
                                      id={checklist.checklistId}
                                    >
                                      <div
                                        className={`h-1 w-full transition-all duration-200 ease-in-out rounded ${
                                          isChecklistDropZoneHovered
                                            ? "bg-green-200 h-6 border-2 border-dashed border-green-500"
                                            : ""
                                        }`}
                                        onDragOver={(e) =>
                                          handleDragOver(e, {
                                            targetColumnId: column.id,
                                            targetCardId: card.id,
                                            targetIndex: checklistIndex,
                                            type: "checklist",
                                          })
                                        }
                                        onDrop={handleDrop}
                                      />
                                      <div
                                        className={`mb-1 cursor-grab active:cursor-grabbing bg-white transition-all duration-200 ease-in-out rounded-xl shadow-sm`}
                                        style={{
                                          opacity: isChecklistDragging
                                            ? 0.5
                                            : 1,
                                          transform: isChecklistDragging
                                            ? "scale(1.05)"
                                            : isChecklistHoverMakeSpace
                                            ? "translateY(4px)"
                                            : "none",
                                        }}
                                        draggable
                                        onDragStart={(e) =>
                                          handleDragStart(e, {
                                            id: checklist.checklistId,
                                            type: "checklist",
                                            sourceColumnId: column.id,
                                            sourceCardId: card.id,
                                            sourceIndex: checklistIndex,
                                          })
                                        }
                                        onDragEnd={handleDragEnd}
                                      >
                                        <ModalDetailChecklist
                                          taskId={card.id}
                                          id={checklist?.checklistId}
                                          taskTitle={card.title}
                                          title={checklist.title}
                                          startDate={
                                            checklist.startedAt
                                              ? new Date(
                                                  checklist.startedAt
                                                ).toLocaleDateString()
                                              : "N/A"
                                          }
                                          status={checklist.status}
                                          image={
                                            checklist.members &&
                                            checklist.members.length > 0
                                              ? checklist.members[0].imageUrl
                                              : card.assignees[0] || ""
                                          }
                                          description={checklist.description}
                                          checklistId={checklist.checklistId}
                                          members={checklist.members || []}
                                          createdAt={checklist.createdAt}
                                          updatedAt={checklist.updatedAt}
                                          finishedAt={checklist.finishedAt}
                                          member={checklist.members}
                                          preventUserImage={preventUserImage}
                                          allMemberInBoard={allMemberInBoard}
                                          leaderId={
                                            tasks.find(
                                              (task) => task.taskId === card.id
                                            )?.teamLeader?.userId || null
                                          }
                                          role={role}
                                        />
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                              <div
                                className={`h-1 w-full transition-all duration-200 ease-in-out rounded ${
                                  hoverInfo?.type === "checklist" &&
                                  hoverInfo?.targetCardId === card.id &&
                                  hoverInfo?.targetIndex ===
                                    (card.checklists || []).length
                                    ? "bg-green-200 h-6 border-2 border-dashed border-green-500"
                                    : ""
                                }`}
                                onDragOver={(e) =>
                                  handleDragOver(e, {
                                    targetColumnId: column.id,
                                    targetCardId: card.id,
                                    targetIndex: (card.checklists || []).length,
                                    type: "checklist",
                                  })
                                }
                                onDrop={handleDrop}
                              />
                              <div className="pb-3 pt-1 px-3">
                                <div className="grid grid-cols-12">
                                  <div
                                    className={`col-span-8 flex items-center`}
                                  >
                                    <ModalCreateChecklist
                                      buttonText="New checklist"
                                      modalTitle="Create Checklist"
                                      taskid={card.id}
                                      startedAt={card.startedAt}
                                      finishedAt={card.finishedAt}
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
      ) : (
        <EmptyKanban />
      )}
    </div>
  );
}
