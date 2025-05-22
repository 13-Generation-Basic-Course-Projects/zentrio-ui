"use client";
import { useState } from "react";

export default function KanbanBoard() {
  const initialColumns = [
    {
      id: "todo",
      title: "To Do",
      cards: [
        { id: "1", title: "a", description: "Fix navbar alignment" },
        { id: "2", title: "b", description: "Update README.md" },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      cards: [{ id: "3", title: "c", description: "New dashboard UI" }],
    },
    {
      id: "under-review",
      title: "Under Review",
      cards: [{ id: "5", title: "d", description: "Cleanup codebase" }],
    },
    {
      id: "done",
      title: "Done",
      cards: [{ id: "4", title: "e", description: "Create project base" }],
    },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);

  // Get the card from columns by ID
  const findCard = (cardId) => {
    for (const column of columns) {
      const card = column.cards.find((card) => card.id === cardId);
      if (card)
        return {
          card,
          columnId: column.id,
          cardIndex: column.cards.findIndex((c) => c.id === cardId),
        };
    }
    return { card: null, columnId: null, cardIndex: -1 };
  };

  // Handlers for card dragging
  const handleDragStart = (e, cardId) => {
    const { columnId } = findCard(cardId);
    setDraggedItem({ cardId, columnId });
    e.dataTransfer.setData("text/plain", cardId);

    if (e.target.classList) {
      setTimeout(() => {
        e.target.classList.add("opacity-50");
      }, 0);
    }
  };

  const handleDragEnd = (e) => {
    if (e.target.classList) {
      e.target.classList.remove("opacity-50");
    }
    setDraggedItem(null);
    setDragTarget(null);
  };

  // Handle dragging over card or column
  const handleDragOver = (e, targetType, columnId, index = null) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem) return;

    if (targetType === "card") {
      const cardElement = e.currentTarget;
      const rect = cardElement.getBoundingClientRect();
      const mouseY = e.clientY;
      const cardMidpoint = rect.top + rect.height / 2;

      // Determine drop index based on mouse position
      const dropIndex = mouseY < cardMidpoint ? index : index + 1;

      setDragTarget({ type: "card", columnId, index: dropIndex });
    } else if (targetType === "column") {
      setDragTarget({ type: "column", columnId });
    }
  };

  // Main drop handler
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItem || !dragTarget) return;

    const { cardId, columnId: sourceColumnId } = draggedItem;
    const { card, cardIndex: sourceIndex } = findCard(cardId);

    if (!card) return;

    // Create a deep copy of columns
    let newColumns = JSON.parse(JSON.stringify(columns));

    // Find source and target column indices
    const sourceColumnIndex = newColumns.findIndex(
      (col) => col.id === sourceColumnId
    );
    const targetColumnIndex = newColumns.findIndex(
      (col) => col.id === dragTarget.columnId
    );

    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;

    // Remove card from source column
    newColumns[sourceColumnIndex].cards = newColumns[
      sourceColumnIndex
    ].cards.filter((c) => c.id !== cardId);

    // Handle drop
    if (dragTarget.type === "card") {
      let targetIndex = dragTarget.index;

      // Adjust target index if in the same column
      if (sourceColumnId === dragTarget.columnId && sourceIndex < targetIndex) {
        targetIndex -= 1; // Adjust for the removed card
      }

      // Insert card at the target index
      newColumns[targetColumnIndex].cards.splice(targetIndex, 0, card);
    } else if (dragTarget.type === "column") {
      // Add to the end of the column
      newColumns[targetColumnIndex].cards.push(card);
    }

    setColumns(newColumns);
    setDraggedItem(null);
    setDragTarget(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-64 bg-gray-100 rounded-lg shadow"
            onDragOver={(e) => handleDragOver(e, "column", column.id)}
            onDrop={handleDrop}
          >
            <div className="p-3 font-medium bg-gray-200 rounded-t-lg">
              {column.title}
            </div>
            <div className="p-2 min-h-40">
              {column.cards.map((card, index) => (
                <div key={card.id}>
                  <div
                    className={`h-4 w-full transition-all
                      ${
                        dragTarget &&
                        dragTarget.type === "card" &&
                        dragTarget.columnId === column.id &&
                        dragTarget.index === index
                          ? "border-t-2 border-blue-500 bg-blue-50"
                          : "border-t-2 border-transparent"
                      }`}
                    onDragOver={(e) =>
                      handleDragOver(e, "card", column.id, index)
                    }
                    onDrop={handleDrop}
                  />
                  <div
                    className={`bg-white p-3 mb-2 rounded shadow cursor-pointer hover:shadow-md transition-shadow
                      ${
                        dragTarget &&
                        dragTarget.type === "card" &&
                        dragTarget.columnId === column.id &&
                        dragTarget.index === index + 1
                          ? "border-b-2 border-blue-500"
                          : ""
                      }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, card.id)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) =>
                      handleDragOver(e, "card", column.id, index)
                    }
                    onDrop={handleDrop}
                  >
                    <div className="font-medium">{card.title}</div>
                    <div className="text-sm text-gray-600">
                      {card.description}
                    </div>
                  </div>
                </div>
              ))}
              <div
                className={`h-4 w-full transition-all
                  ${
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
