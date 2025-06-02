"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
import { createSwapy } from "swapy";
import { teamLeader } from "@/data/board/teamleader";
import { initialColumns } from "@/data/boardData";
import { CardCheckList } from "../card/CardChecklist";
import UserAvater from "../useravatar/UserAvatar";
import BredCrum from "../bredcrum/bredcrum";
import { StackedUser } from "../useravatar/StackUser";
import ModalCreateChecklist from "../modal/board/ModalCreateChecklist";
import ModalDetailChecklist from "../modal/board/ModalDetailChecklist";
import CardDateChecklist from "../card/CardDateChecklist";

export default function KanbanBoard({ modal }) {
  const [columns, setColumns] = useState(initialColumns);
  const containerRef = useRef(null);
  const swapyRef = useRef(null);

  // Initialize Swapy
  useEffect(() => {
    if (containerRef.current) {
      swapyRef.current = createSwapy(containerRef.current, {
        animation: "dynamic",
      });

      // Handle swap events
      swapyRef.current.onSwap((event) => {
        console.log("Swap event:", event);
        if (event && event.data) {
          updateColumnsAfterSwap(event.data);
        }
      });

      return () => {
        if (swapyRef.current) {
          swapyRef.current.destroy();
        }
      };
    }
  }, [columns]); // Add columns as dependency to reinitialize when data changes

  // Update columns state after Swapy swap
  const updateColumnsAfterSwap = (swapData) => {
    console.log("Swap data received:", swapData);

    // Check if swapData exists and is an object
    if (!swapData || typeof swapData !== "object") {
      console.log("Invalid swap data:", swapData);
      return;
    }

    setColumns((prevColumns) => {
      let newColumns = JSON.parse(JSON.stringify(prevColumns));

      // Handle card swaps
      try {
        Object.entries(swapData).forEach(([slotId, itemId]) => {
          console.log(`Processing: ${slotId} -> ${itemId}`);

          if (!itemId || itemId === "null" || itemId === "placeholder") return;

          // Parse IDs
          const slotParts = slotId.split("-");
          const itemParts = itemId.split("-");

          if (slotParts[0] === "card" && itemParts[0] === "card") {
            // Card to card swap
            const sourceColId = itemParts[1];
            const sourceIndex = parseInt(itemParts[2]);
            const targetColId = slotParts[1];
            const targetIndex = parseInt(slotParts[2]);

            console.log(
              `Moving card from ${sourceColId}[${sourceIndex}] to ${targetColId}[${targetIndex}]`
            );

            const sourceColIndex = newColumns.findIndex(
              (col) => col.id === sourceColId
            );
            const targetColIndex = newColumns.findIndex(
              (col) => col.id === targetColId
            );

            if (
              sourceColIndex !== -1 &&
              targetColIndex !== -1 &&
              sourceIndex < newColumns[sourceColIndex].cards.length
            ) {
              const [movedCard] = newColumns[sourceColIndex].cards.splice(
                sourceIndex,
                1
              );
              newColumns[targetColIndex].cards.splice(
                targetIndex,
                0,
                movedCard
              );
            }
          }
        });
      } catch (error) {
        console.error("Error processing swap data:", error);
        return prevColumns; // Return original state on error
      }

      // Update order properties
      newColumns.forEach((column) => {
        column.cards.forEach((card, index) => {
          card.order = index;
        });
      });

      console.log("Updated columns:", newColumns);
      return newColumns;
    });
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
        <div className="mb-4 border-b-4 pb-2 border-black flex items-center gap-3">
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
      <div ref={containerRef} className="grid grid-cols-4 gap-4 h-full">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col min-h-0 w-full h-[99%] overflow-hidden "
          >
            <div className="scrollbar-hidden pb-20 overflow-y-auto bp-3 pb-[300px]">
              {/* Cards Container */}
              <div className="min-h-[50px]">
                {column.cards
                  .sort((a, b) => a.order - b.order)
                  .map((card, cardIndex) => (
                    <div
                      key={card.id}
                      data-swapy-slot={`card-${column.id}-${cardIndex}`}
                    >
                      <div
                        data-swapy-item={`card-${column.id}-${cardIndex}`}
                        className="bg-white rounded-xl shadow mb-2 overflow-hidden hover:shadow-md transition-shadow border-1 border-bgColor"
                      >
                        {/* Task Header */}
                        <div className="py-3 cursor-move" data-swapy-handle>
                          <div className="flex items-center justify-between px-3">
                            <div className="flex items-center gap-2">
                              <div>
                                <div className="text-sm text-gray-600 sm:text-body-sm truncate max-w-[150px]">
                                  {card.description}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <UserAvater
                                image={
                                  "https://cdn.prod.website-files.com/5dd827bbc07b1656e06b16d8/623db0c2ec0384a4ffd2c4ab_mosh.jpeg"
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {/* Subtasks */}
                        <div className="px-3 pb-5">
                          {card.subtasks
                            .sort((a, b) => a.order - b.order)
                            .map((subtask, subtaskIndex) => (
                              <div key={subtask.id} className="pb-4">
                                <ModalDetailChecklist
                                  title="Hello"
                                  startDate={"25/05/25"}
                                  status={"Overdue"}
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
                            ))}

                          {card.expanded && card.subtasks.length === 0 && (
                            <div className="ml-4 p-2 border-2 border-dashed border-gray-300 rounded text-xs text-gray-400 text-center">
                              No subtasks yet
                            </div>
                          )}
                        </div>

                        {/* Create Subtask Button at Bottom of Card */}
                        {card.expanded && (
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
                                <CardDateChecklist date={"April 25"} />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Collapse Button */}
                        <div className="flex items-center justify-center text-primary">
                          <button
                            onClick={() => toggleTaskExpansion(card.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            {card.expanded ? (
                              <ChevronUp size={26} />
                            ) : (
                              <ChevronDown size={26} />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* Empty slot for new cards */}
                <div
                  data-swapy-slot={`card-${column.id}-${column.cards.length}`}
                >
                  {column.cards.length === 0 ? (
                    <div
                      data-swapy-item="placeholder"
                      className="h-20 w-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 opacity-50"
                    >
                      Drop here
                    </div>
                  ) : (
                    <div
                      data-swapy-item={`empty-${column.id}`}
                      className="h-4 w-full opacity-0"
                    >
                      {/* Invisible placeholder for drop zone */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
