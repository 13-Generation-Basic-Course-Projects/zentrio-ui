// "use client";

// // import React from "react";
// import { createSwapy } from "swapy";
// import { useEffect, useRef, useState } from "react";
// import ModalDetailChecklist from "../../../../components/modal/board/ModalDetailChecklist";

// // export default function App() {
// //   const swapy = useRef(null);
// //   const container = useRef(null);
// //   const [slots] = useState(["a", "b", "c"]); // Define your slots here

// //   const initializeSwapy = () => {
// //     // Clean up previous instance
// //     if (swapy.current) {
// //       swapy.current.destroy();
// //       swapy.current = null;
// //     }

// //     // If container element is loaded
// //     if (container.current) {
// //       try {
// //         swapy.current = createSwapy(container.current);

// //         // Your event listeners
// //         swapy.current.onSwap((event) => {
// //           console.log("swap", event);
// //         });
// //       } catch (error) {
// //         console.error("Error initializing Swapy:", error);
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     // Small delay to ensure DOM is fully rendered
// //     const timer = setTimeout(initializeSwapy, 50);

// //     return () => {
// //       clearTimeout(timer);
// //       if (swapy.current) {
// //         swapy.current.destroy();
// //         swapy.current = null;
// //       }
// //     };
// //   }, [slots.length]); // Re-initialize when number of slots changes

// //   return (
// //     <div ref={container}>
// //       {slots.map((slotId) => (
// //         <div key={slotId} data-swapy-slot={slotId}>
// //           <div data-swapy-item={slotId}>
// //             <div>
// //               <ModalDetailChecklist />
// //             </div>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// import { Plus, ChevronDown, ChevronRight, ChevronUp } from "lucide-react";
// import { teamLeader } from "@/data/board/teamleader";
// import { initialColumns } from "@/data/boardData";
// // import { CardCheckList } from "../card/CardChecklist";
// import UserAvater from "../../../../components/useravatar/UserAvatar";
// import BredCrum from "../../../../components/bredcrum/MyBredcrum";
// import { StackedUser } from "../../../../components/useravatar/StackUser";
// import ModalCreateChecklist from "../../../../components/modal/board/ModalCreateChecklist";

// import CardDateChecklist from "../../../../components/card/CardDateChecklist";

// export default function PageTest({ modal }) {
//   //swappy
//   const swapy = useRef(null);
//   const container = useRef([]);
//   const [slots] = useState(["a", "b", "c"]); // Define your slots here

//   const initializeSwapy = () => {
//     // Clean up previous instance
//     if (swapy.current) {
//       swapy.current.destroy();
//       swapy.current = null;
//     }

//     // If container element is loaded
//     if (container.current) {
//       try {
//         swapy.current = createSwapy(container.current);

//         // Your event listeners
//         swapy.current.onSwap((event) => {
//           console.log("swap", event);
//         });
//       } catch (error) {
//         console.error("Error initializing Swapy:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     // Small delay to ensure DOM is fully rendered
//     const timer = setTimeout(initializeSwapy, 50);

//     return () => {
//       clearTimeout(timer);
//       if (swapy.current) {
//         swapy.current.destroy();
//         swapy.current = null;
//       }
//     };
//   }, [slots.length]); // Re-initialize when number of slots changes

//   //aaaa

//   const [columns, setColumns] = useState(initialColumns);
//   const [draggedItem, setDraggedItem] = useState(null);
//   const [dragTarget, setDragTarget] = useState(null);

//   // Find card or subtask by ID
//   const findItem = (itemId) => {
//     for (const column of columns) {
//       // Check if it's a main task
//       const card = column.cards.find((card) => card.id === itemId);
//       if (card) {
//         return {
//           type: "card",
//           item: card,
//           columnId: column.id,
//           cardIndex: column.cards.findIndex((c) => c.id === itemId),
//           parentCardId: null,
//         };
//       }

//       // Check if it's a subtask
//       for (const card of column.cards) {
//         const subtask = card.subtasks.find((st) => st.id === itemId);
//         if (subtask) {
//           return {
//             type: "subtask",
//             item: subtask,
//             columnId: column.id,
//             cardIndex: column.cards.findIndex((c) => c.id === card.id),
//             parentCardId: card.id,
//             subtaskIndex: card.subtasks.findIndex((st) => st.id === itemId),
//           };
//         }
//       }
//     }
//     return { type: null, item: null, columnId: null, cardIndex: -1 };
//   };

//   // Toggle task expansion
//   const toggleTaskExpansion = (cardId) => {
//     setColumns((prev) =>
//       prev.map((column) => ({
//         ...column,
//         cards: column.cards.map((card) =>
//           card.id === cardId ? { ...card, expanded: !card.expanded } : card
//         ),
//       }))
//     );
//   };

//   // Add new subtask with data from modal
//   const addSubtask = (cardId, subtaskData) => {
//     const newSubtaskId = `${cardId}-${Date.now()}`;
//     setColumns((prev) =>
//       prev.map((column) => ({
//         ...column,
//         cards: column.cards.map((card) =>
//           card.id === cardId
//             ? {
//                 ...card,
//                 subtasks: [
//                   ...card.subtasks,
//                   {
//                     id: newSubtaskId,
//                     title:
//                       subtaskData.title ||
//                       `subtask ${card.subtasks.length + 1}`,
//                     description: subtaskData.description || "New subtask",
//                     duration: subtaskData.duration || null,
//                     label: subtaskData.label || null,
//                     comment: subtaskData.comment || null,
//                     order: card.subtasks.length,
//                   },
//                 ],
//                 expanded: true,
//               }
//             : card
//         ),
//       }))
//     );
//   };

//   // Drag handlers
//   const handleDragStart = (e, itemId, itemType) => {
//     e.stopPropagation(); // Prevent parent drag events
//     const itemData = findItem(itemId);
//     setDraggedItem({ itemId, itemType, ...itemData });
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("text/plain", itemId);

//     setTimeout(() => {
//       if (e.target.classList) {
//         e.target.classList.add("opacity-50");
//       }
//     }, 0);
//   };

//   const handleDragEnd = (e) => {
//     e.stopPropagation();
//     if (e.target.classList) {
//       e.target.classList.remove("opacity-50");
//     }
//     setDraggedItem(null);
//     setDragTarget(null);
//   };

//   const handleDragOver = (
//     e,
//     targetType,
//     columnId,
//     cardIndex = null,
//     subtaskIndex = null
//   ) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!draggedItem) return;

//     // Prevent cards from being dropped into subtask or task-body areas
//     if (
//       draggedItem.type === "card" &&
//       ["subtask", "task-body"].includes(targetType)
//     ) {
//       return;
//     }

//     // Restrict subtask drops to subtask or task-body areas only
//     if (
//       draggedItem.type === "subtask" &&
//       !["subtask", "task-body"].includes(targetType)
//     ) {
//       return;
//     }

//     if (targetType === "card") {
//       const cardElement = e.currentTarget;
//       const rect = cardElement.getBoundingClientRect();
//       const mouseY = e.clientY;
//       const cardMidpoint = rect.top + rect.height / 2;
//       const dropIndex = mouseY < cardMidpoint ? cardIndex : cardIndex + 1;

//       setDragTarget({ type: "card", columnId, index: dropIndex });
//     } else if (targetType === "subtask") {
//       const subtaskElement = e.currentTarget;
//       const rect = subtaskElement.getBoundingClientRect();
//       const mouseY = e.clientY;
//       const subtaskMidpoint = rect.top + rect.height / 2;
//       const dropIndex =
//         mouseY < subtaskMidpoint ? subtaskIndex : subtaskIndex + 1;

//       setDragTarget({ type: "subtask", columnId, cardIndex, index: dropIndex });
//     } else if (targetType === "column") {
//       setDragTarget({ type: "column", columnId });
//     } else if (targetType === "task-body") {
//       setDragTarget({ type: "task-body", columnId, cardIndex });
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!draggedItem || !dragTarget) return;

//     let newColumns = JSON.parse(JSON.stringify(columns));
//     const sourceColumnIndex = newColumns.findIndex(
//       (col) => col.id === draggedItem.columnId
//     );
//     const targetColumnIndex = newColumns.findIndex(
//       (col) => col.id === dragTarget.columnId
//     );

//     if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;

//     // Get the item to move
//     let itemToMove;

//     if (draggedItem.type === "card") {
//       itemToMove = newColumns[sourceColumnIndex].cards[draggedItem.cardIndex];
//     } else if (draggedItem.type === "subtask") {
//       const sourceCard =
//         newColumns[sourceColumnIndex].cards[draggedItem.cardIndex];
//       itemToMove = sourceCard.subtasks[draggedItem.subtaskIndex];
//     }

//     if (!itemToMove) return;

//     // Handle different drop scenarios
//     if (dragTarget.type === "card" && draggedItem.type === "card") {
//       // Dropping as a main task (only allowed for cards)
//       let targetIndex = dragTarget.index;

//       // If moving within same column, adjust index for removal
//       if (
//         sourceColumnIndex === targetColumnIndex &&
//         draggedItem.cardIndex < targetIndex
//       ) {
//         targetIndex -= 1;
//       }

//       // Remove from source and insert as main task
//       newColumns[sourceColumnIndex].cards.splice(draggedItem.cardIndex, 1);
//       newColumns[targetColumnIndex].cards.splice(targetIndex, 0, itemToMove);
//     } else if (
//       dragTarget.type === "subtask" &&
//       draggedItem.type === "subtask"
//     ) {
//       // Dropping as a subtask
//       const targetCard =
//         newColumns[targetColumnIndex].cards[dragTarget.cardIndex];
//       let targetIndex = dragTarget.index;

//       // If moving within same subtask array, adjust index for removal
//       if (
//         sourceColumnIndex === targetColumnIndex &&
//         draggedItem.cardIndex === dragTarget.cardIndex &&
//         draggedItem.subtaskIndex < targetIndex
//       ) {
//         targetIndex -= 1;
//       }

//       // Remove subtask from source
//       const sourceCard =
//         newColumns[sourceColumnIndex].cards[draggedItem.cardIndex];
//       sourceCard.subtasks.splice(draggedItem.subtaskIndex, 1);
//       // Insert subtask at target position
//       targetCard.subtasks.splice(targetIndex, 0, itemToMove);
//       targetCard.expanded = true;
//     } else if (
//       dragTarget.type === "task-body" &&
//       draggedItem.type === "subtask"
//     ) {
//       // Dropping into task body (append to end)
//       const targetCard =
//         newColumns[targetColumnIndex].cards[dragTarget.cardIndex];

//       const sourceCard =
//         newColumns[sourceColumnIndex].cards[draggedItem.cardIndex];
//       sourceCard.subtasks.splice(draggedItem.subtaskIndex, 1);
//       targetCard.subtasks.push(itemToMove);
//       targetCard.expanded = true;
//     } else if (dragTarget.type === "column" && draggedItem.type === "card") {
//       // Dropping into empty column (append to end, only allowed for cards)
//       newColumns[sourceColumnIndex].cards.splice(draggedItem.cardIndex, 1);
//       newColumns[targetColumnIndex].cards.push(itemToMove);
//     }

//     // Update order properties
//     newColumns.forEach((column) => {
//       column.cards.forEach((card, index) => {
//         card.order = index;
//       });
//       column.cards.forEach((card) => {
//         card.subtasks.forEach((subtask, subIndex) => {
//           subtask.order = subIndex;
//         });
//       });
//     });

//     setColumns(newColumns);
//     setDraggedItem(null);
//     setDragTarget(null);
//   };

//   //

//   return (
//     <div className="w-full h-screen flex flex-col">
//       <BredCrum
//         board={"Hikko Design"}
//         feature={"Board"}
//         header={"Hikko Design"}
//       />
//       <StackedUser />
//       {/* Column Headers */}
//       <div className=" pt-5 pb-2 grid grid-cols-4 gap-4">
//         <div className="mb-4 border-b-4  pb-2  border-black flex items-center gap-3">
//           <p className="text-2xl font-semibold">TODO</p>
//           <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
//             {columns.find((col) => col.id === "todo")?.cards.length || 0}
//           </button>
//         </div>
//         <div className="mb-4 border-b-4 border-blue-500 pb-2 flex items-center gap-3">
//           <p className="text-2xl font-bold">In Progress</p>
//           <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
//             {columns.find((col) => col.id === "in-progress")?.cards.length || 0}
//           </button>
//         </div>
//         <div className="mb-4 border-b-4 border-[#FFB580] pb-2 flex items-center gap-3">
//           <p className="text-2xl font-bold">Under Review</p>
//           <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
//             {columns.find((col) => col.id === "under-review")?.cards.length ||
//               0}
//           </button>
//         </div>
//         <div className="mb-4 border-b-4 border-green-500 pb-2 flex items-center gap-3">
//           <p className="text-2xl font-bold">COMPLETED</p>
//           <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
//             {columns.find((col) => col.id === "done")?.cards.length || 0}
//           </button>
//         </div>
//       </div>

//       {/* Kanban Columns */}
//       <div className="  hidden  grid grid-cols-4  gap-4 h-full  ">
//         {columns.map((column) => (
//           // parent
//           <div
//             key={column.id}
//             className="flex  flex-col min-h-0 w-full  h-[99%] overflow-hidden  "
//             onDragOver={(e) => handleDragOver(e, "column", column.id)}
//             onDrop={handleDrop}
//           >
//             {/* child */}
//             <div className="  scrollbar-hidden pb-20 overflow-y-auto  bp-3  ">
//               {column.cards
//                 .sort((a, b) => a.order - b.order)
//                 .map((card, cardIndex) => (
//                   <div key={card.id}>
//                     {/* Drop zone above card */}
//                     <div
//                       className={`h-4 w-full transition-all ${
//                         dragTarget &&
//                         dragTarget.type === "card" &&
//                         dragTarget.columnId === column.id &&
//                         dragTarget.index === cardIndex
//                           ? "border-t-2 border-blue-500 bg-blue-50"
//                           : "border-t-2 border-transparent"
//                       }`}
//                       onDragOver={(e) =>
//                         handleDragOver(e, "card", column.id, cardIndex)
//                       }
//                       onDrop={handleDrop}
//                     />

//                     {/* Main Task Card */}
//                     <div className="bg-white rounded-xl shadow mb-2 overflow-hidden hover:shadow-md transition-shadow border-1 border-bgColor">
//                       {/* Task Header */}
//                       <div
//                         className="py-3  cursor-move"
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, card.id, "card")}
//                         onDragEnd={handleDragEnd}
//                       >
//                         <div className="flex items-center justify-between px-3">
//                           <div className="flex items-center gap-2">
//                             <div>
//                               {/* tam pet ah ng title key te */}
//                               <div className="text-sm text-gray-600 sm:text-body-sm truncate max-w-[150px]">
//                                 {card.description}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex items-center justify-between gap-2  ">
//                             <UserAvater
//                               image={
//                                 "https://cdn.prod.website-files.com/5dd827bbc07b1656e06b16d8/623db0c2ec0384a4ffd2c4ab_mosh.jpeg"
//                               }
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Subtasks - Always visible, but images hidden when collapsed */}
//                       <div
//                         className="px-3 pb-5"
//                         onDragOver={(e) =>
//                           handleDragOver(e, "task-body", column.id, cardIndex)
//                         }
//                         onDrop={handleDrop}
//                       >
//                         {card.subtasks
//                           .sort((a, b) => a.order - b.order)
//                           .map((subtask, subtaskIndex) => (
//                             <div key={subtask.id}>
//                               {/* Drop zone above subtask - only visible when expanded */}
//                               {card.expanded && (
//                                 <div
//                                   className={`h-2 w-full transition-all ${
//                                     dragTarget &&
//                                     dragTarget.type === "subtask" &&
//                                     dragTarget.columnId === column.id &&
//                                     dragTarget.cardIndex === cardIndex &&
//                                     dragTarget.index === subtaskIndex
//                                       ? "border-t-2 border-green-500 bg-green-50"
//                                       : "border-t-2 border-transparent"
//                                   }`}
//                                   onDragOver={(e) =>
//                                     handleDragOver(
//                                       e,
//                                       "subtask",
//                                       column.id,
//                                       cardIndex,
//                                       subtaskIndex
//                                     )
//                                   }
//                                   onDrop={handleDrop}
//                                 />
//                               )}

//                               {/* Subtask Item */}
//                               <div
//                                 className="pb-4"
//                                 draggable
//                                 onDragStart={(e) =>
//                                   handleDragStart(e, subtask.id, "subtask")
//                                 }
//                                 onDragEnd={handleDragEnd}
//                               >
//                                 <ModalDetailChecklist
//                                   title="Hello"
//                                   startDate={"25/05/25"}
//                                   status={"Overdue"}
//                                   label={subtask.label}
//                                   comment={subtask.comment}
//                                   image={
//                                     card.expanded
//                                       ? "https://codewithmosh.com/_next/image?url=https%3A%2F%2Fcdn.filestackcontent.com%2F8MbtJ4hTAaOk3KPcptqZ&w=3840&q=75"
//                                       : null
//                                   }
//                                   hideImage={!card.expanded}
//                                 />
//                               </div>
//                             </div>
//                           ))}

//                         {/* Drop zone at end of subtasks - only visible when expanded */}
//                         {card.expanded && (
//                           <div
//                             className={`h-2 w-full transition-all ${
//                               dragTarget &&
//                               dragTarget.type === "subtask" &&
//                               dragTarget.columnId === column.id &&
//                               dragTarget.cardIndex === cardIndex &&
//                               dragTarget.index === card.subtasks.length
//                                 ? "border-t-2 border-green-500 bg-green-50"
//                                 : "border-t-2 border-transparent"
//                             }`}
//                             onDragOver={(e) =>
//                               handleDragOver(
//                                 e,
//                                 "subtask",
//                                 column.id,
//                                 cardIndex,
//                                 card.subtasks.length
//                               )
//                             }
//                             onDrop={handleDrop}
//                           />
//                         )}

//                         {card.expanded && card.subtasks.length === 0 && (
//                           <div className="ml-4 p-2 border-2 border-dashed border-gray-300 rounded text-xs text-gray-400 text-center">
//                             Drop subtasks here
//                           </div>
//                         )}
//                       </div>

//                       {/* Create Subtask Button at Bottom of Card */}
//                       {card.expanded && (
//                         <div className=" pb-3 pt-1 px-3">
//                           <div className="grid grid-cols-12">
//                             <div className="col-span-8 flex items-center">
//                               <ModalCreateChecklist
//                                 onSubmit={(subtaskData) =>
//                                   addSubtask(card.id, subtaskData)
//                                 }
//                                 buttonText="New checklist"
//                                 modalTitle="Create Checklist"
//                               />
//                             </div>
//                             <div className="col-span-4 p-2">
//                               <CardDateChecklist date={"April 25"} />
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                       {/* collape */}
//                       <div className="flex items-center justify-center text-primary">
//                         <button
//                           onClick={() => toggleTaskExpansion(card.id)}
//                           className="p-1 hover:bg-gray-100 rounded"
//                         >
//                           {card.expanded ? (
//                             <ChevronUp size={26} />
//                           ) : (
//                             <ChevronDown size={26} />
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//               {/* Drop zone at end of column */}
//               <div
//                 className={`h-4 w-full transition-all ${
//                   dragTarget &&
//                   dragTarget.type === "card" &&
//                   dragTarget.columnId === column.id &&
//                   dragTarget.index === column.cards.length
//                     ? "border-t-2 border-blue-500 bg-blue-50"
//                     : "border-t-2 border-transparent"
//                 }`}
//                 onDragOver={(e) =>
//                   handleDragOver(e, "card", column.id, column.cards.length)
//                 }
//                 onDrop={handleDrop}
//               />

//               {column.cards.length === 0 && (
//                 <div
//                   className="h-20 w-full border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400"
//                   onDragOver={(e) => handleDragOver(e, "column", column.id)}
//                   onDrop={handleDrop}
//                 >
//                   Drop here
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div>
//         {/* <div ref={container}>
//           {slots.map((slotId) => (
//             <div key={slotId} data-swapy-slot={slotId}>
//               <div data-swapy-item={slotId}>
//                 <div>
//                   <ModalDetailChecklist />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div> */}
//         {/* i want to display it here  */}
//         <div className="grid grid-cols-4">
//           <div className="grid grid-cols-4">
//             {[0, 1, 2, 3].map((colIndex) => (
//               <div
//                 key={colIndex}
//                 ref={(el) => (containers.current[colIndex] = el)}
//               >
//                 {slots.map((slotId) => (
//                   <div key={slotId} data-swapy-slot={slotId}>
//                     <div data-swapy-item={slotId}>
//                       <ModalDetailChecklist />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";

const TrelloBoard = () => {
  const [columns, setColumns] = useState({
    todo: {
      id: "todo",
      title: "To Do",
      taskIds: ["task-1", "task-2"],
    },
    inprogress: {
      id: "inprogress",
      title: "In Progress",
      taskIds: ["task-3"],
    },
    review: {
      id: "review",
      title: "In Review",
      taskIds: [],
    },
    done: {
      id: "done",
      title: "Done",
      taskIds: [],
    },
  });

  const [tasks, setTasks] = useState({
    "task-1": {
      id: "task-1",
      title: "Design homepage",
      checklists: [
        { id: "check-1", text: "Create wireframes", completed: true },
        { id: "check-2", text: "Design mockups", completed: false },
      ],
    },
    "task-2": {
      id: "task-2",
      title: "Setup database",
      checklists: [
        { id: "check-3", text: "Install PostgreSQL", completed: false },
      ],
    },
    "task-3": {
      id: "task-3",
      title: "Write documentation",
      checklists: [],
    },
  });

  const [columnOrder] = useState(["todo", "inprogress", "review", "done"]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showNewTaskForm, setShowNewTaskForm] = useState(null);
  const [newChecklistText, setNewChecklistText] = useState("");
  const [showNewChecklistForm, setShowNewChecklistForm] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedChecklist, setDraggedChecklist] = useState(null);
  const [taskHoverIndex, setTaskHoverIndex] = useState(null);
  const [checklistHoverIndex, setChecklistHoverIndex] = useState(null);
  const [dragPreview, setDragPreview] = useState({ tasks: {}, checklists: {} });

  // Task drag and drop handlers
  const handleTaskDragStart = (e, taskId, sourceColumnId, taskIndex) => {
    setDraggedTask({ taskId, sourceColumnId, sourceIndex: taskIndex });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", taskId);

    setTimeout(() => {
      e.target.style.opacity = "0.5";
    }, 0);
  };

  const handleTaskDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedTask(null);
    setTaskHoverIndex(null);
    setDragPreview({ tasks: {}, checklists: {} });
  };

  const handleTaskDragOver = (e, columnId, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";

    if (!draggedTask || draggedTask.sourceColumnId !== columnId) return;

    const { sourceIndex } = draggedTask;
    if (sourceIndex === targetIndex) return;

    // Set hover index for smooth animation
    setTaskHoverIndex({ columnId, index: targetIndex });

    // Create preview arrangement
    const column = columns[columnId];
    const newTaskIds = [...column.taskIds];
    const draggedTaskId = newTaskIds.splice(sourceIndex, 1)[0];
    newTaskIds.splice(targetIndex, 0, draggedTaskId);

    setDragPreview((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [columnId]: newTaskIds,
      },
    }));
  };

  const handleTaskDragLeave = (e) => {
    // Only clear hover if we're actually leaving the task area
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setTaskHoverIndex(null);
    }
  };

  const handleTaskDrop = (e, targetColumnId, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedTask || draggedTask.sourceColumnId !== targetColumnId) {
      return;
    }

    const { taskId, sourceIndex } = draggedTask;

    if (sourceIndex === targetIndex) return;

    const column = columns[targetColumnId];
    const newTaskIds = [...column.taskIds];

    newTaskIds.splice(sourceIndex, 1);
    newTaskIds.splice(targetIndex, 0, taskId);

    setColumns({
      ...columns,
      [targetColumnId]: {
        ...column,
        taskIds: newTaskIds,
      },
    });

    setTaskHoverIndex(null);
    setDragPreview({ tasks: {}, checklists: {} });
  };

  // Checklist drag and drop handlers
  const handleChecklistDragStart = (e, checklistId, taskId) => {
    e.stopPropagation();
    setDraggedChecklist({ checklistId, taskId });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", checklistId);

    setTimeout(() => {
      e.target.style.opacity = "0.5";
    }, 0);
  };

  const handleChecklistDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedChecklist(null);
    setChecklistHoverIndex(null);
    setDragPreview((prev) => ({ ...prev, checklists: {} }));
  };

  const handleChecklistDragOver = (e, targetIndex, taskId) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";

    if (!draggedChecklist || draggedChecklist.taskId !== taskId) return;

    const task = tasks[taskId];
    const sourceIndex = task.checklists.findIndex(
      (c) => c.id === draggedChecklist.checklistId
    );

    if (sourceIndex === targetIndex) return;

    // Set hover index for smooth animation
    setChecklistHoverIndex({ taskId, index: targetIndex });

    // Create preview arrangement
    const newChecklists = [...task.checklists];
    const draggedItem = newChecklists.splice(sourceIndex, 1)[0];
    newChecklists.splice(targetIndex, 0, draggedItem);

    setDragPreview((prev) => ({
      ...prev,
      checklists: {
        ...prev.checklists,
        [taskId]: newChecklists,
      },
    }));
  };

  const handleChecklistDrop = (e, targetIndex, taskId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedChecklist || draggedChecklist.taskId !== taskId) return;

    const task = tasks[taskId];
    const sourceIndex = task.checklists.findIndex(
      (c) => c.id === draggedChecklist.checklistId
    );

    if (sourceIndex === targetIndex) return;

    const newChecklists = [...task.checklists];
    const [draggedItem] = newChecklists.splice(sourceIndex, 1);
    newChecklists.splice(targetIndex, 0, draggedItem);

    setTasks({
      ...tasks,
      [taskId]: {
        ...task,
        checklists: newChecklists,
      },
    });

    setChecklistHoverIndex(null);
    setDragPreview((prev) => ({ ...prev, checklists: {} }));
  };

  const createTask = (columnId) => {
    if (!newTaskTitle.trim()) return;

    const taskId = `task-${Date.now()}`;
    const newTask = {
      id: taskId,
      title: newTaskTitle,
      checklists: [],
    };

    setTasks({
      ...tasks,
      [taskId]: newTask,
    });

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: [...columns[columnId].taskIds, taskId],
      },
    });

    setNewTaskTitle("");
    setShowNewTaskForm(null);
  };

  const createChecklist = (taskId) => {
    if (!newChecklistText.trim()) return;

    const checklistId = `check-${Date.now()}`;
    const newChecklist = {
      id: checklistId,
      text: newChecklistText,
      completed: false,
    };

    setTasks({
      ...tasks,
      [taskId]: {
        ...tasks[taskId],
        checklists: [...tasks[taskId].checklists, newChecklist],
      },
    });

    setNewChecklistText("");
    setShowNewChecklistForm(null);
  };

  const toggleChecklist = (taskId, checklistId) => {
    const task = tasks[taskId];
    const updatedChecklists = task.checklists.map((checklist) =>
      checklist.id === checklistId
        ? { ...checklist, completed: !checklist.completed }
        : checklist
    );

    setTasks({
      ...tasks,
      [taskId]: {
        ...task,
        checklists: updatedChecklists,
      },
    });
  };

  const deleteTask = (taskId, columnId) => {
    const newTasks = { ...tasks };
    delete newTasks[taskId];
    setTasks(newTasks);

    setColumns({
      ...columns,
      [columnId]: {
        ...columns[columnId],
        taskIds: columns[columnId].taskIds.filter((id) => id !== taskId),
      },
    });
  };

  const deleteChecklist = (taskId, checklistId) => {
    const task = tasks[taskId];
    const updatedChecklists = task.checklists.filter(
      (c) => c.id !== checklistId
    );

    setTasks({
      ...tasks,
      [taskId]: {
        ...task,
        checklists: updatedChecklists,
      },
    });
  };

  // Helper function to get display order for tasks
  const getDisplayTaskIds = (columnId) => {
    if (dragPreview.tasks[columnId]) {
      return dragPreview.tasks[columnId];
    }
    return columns[columnId].taskIds;
  };

  // Helper function to get display order for checklists
  const getDisplayChecklists = (taskId) => {
    if (dragPreview.checklists[taskId]) {
      return dragPreview.checklists[taskId];
    }
    return tasks[taskId].checklists;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
          Trello Board
        </h1>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            const displayTaskIds = getDisplayTaskIds(columnId);
            const columnTasks = displayTaskIds.map((taskId) => tasks[taskId]);

            return (
              <div key={column.id} className="flex-shrink-0 w-80">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl transition-all duration-300 min-h-[500px]">
                  <h2 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
                    {column.title}
                    <span className="ml-2 bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-full">
                      {columnTasks.length}
                    </span>
                  </h2>

                  <div className="space-y-3">
                    {columnTasks.map((task, taskIndex) => {
                      const isDragging = draggedTask?.taskId === task.id;
                      const isHovering =
                        taskHoverIndex?.columnId === columnId &&
                        taskHoverIndex?.index === taskIndex;

                      return (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) =>
                            handleTaskDragStart(
                              e,
                              task.id,
                              column.id,
                              columns[columnId].taskIds.indexOf(task.id)
                            )
                          }
                          onDragEnd={handleTaskDragEnd}
                          onDragOver={(e) =>
                            handleTaskDragOver(e, column.id, taskIndex)
                          }
                          onDragLeave={handleTaskDragLeave}
                          onDrop={(e) =>
                            handleTaskDrop(e, column.id, taskIndex)
                          }
                          className={`bg-white rounded-lg p-4 shadow-md border border-gray-200 cursor-move hover:shadow-lg transition-all duration-200 ${
                            isDragging
                              ? "opacity-50 transform rotate-2 scale-105"
                              : "transform hover:-translate-y-1"
                          } ${isHovering ? "transform translate-y-2" : ""}`}
                          style={{
                            transform: isHovering
                              ? "translateY(8px)"
                              : isDragging
                              ? "rotate(2deg) scale(1.05)"
                              : "",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-gray-800 flex-1 select-none">
                              {task.title}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(task.id, column.id);
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors ml-2 p-1 hover:bg-red-50 rounded"
                            >
                              X
                            </button>
                          </div>

                          {task.checklists.length > 0 && (
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                ✅
                                <span>
                                  {
                                    task.checklists.filter((c) => c.completed)
                                      .length
                                  }
                                  /{task.checklists.length} completed
                                </span>
                              </div>
                              {getDisplayChecklists(task.id).map(
                                (checklist, index) => {
                                  const isChecklistDragging =
                                    draggedChecklist?.checklistId ===
                                    checklist.id;
                                  const isChecklistHovering =
                                    checklistHoverIndex?.taskId === task.id &&
                                    checklistHoverIndex?.index === index;

                                  return (
                                    <div
                                      key={checklist.id}
                                      draggable
                                      onDragStart={(e) =>
                                        handleChecklistDragStart(
                                          e,
                                          checklist.id,
                                          task.id
                                        )
                                      }
                                      onDragEnd={handleChecklistDragEnd}
                                      onDragOver={(e) =>
                                        handleChecklistDragOver(
                                          e,
                                          index,
                                          task.id
                                        )
                                      }
                                      onDrop={(e) =>
                                        handleChecklistDrop(e, index, task.id)
                                      }
                                      className={`flex items-center gap-2 text-sm p-2 bg-gray-50 rounded hover:bg-gray-100 transition-all duration-200 cursor-move group ${
                                        isChecklistDragging
                                          ? "opacity-50 transform scale-105"
                                          : ""
                                      }`}
                                      style={{
                                        transform: isChecklistHovering
                                          ? "translateY(4px)"
                                          : isChecklistDragging
                                          ? "scale(1.05)"
                                          : "",
                                        transition: "all 0.2s ease-in-out",
                                      }}
                                    >
                                      {/* <GripVertical
                                        size={12}
                                        className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                      /> */}
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleChecklist(
                                            task.id,
                                            checklist.id
                                          );
                                        }}
                                        className={`transition-all duration-200 ${
                                          checklist.completed
                                            ? "text-green-500 scale-110"
                                            : "text-gray-400 hover:text-green-500"
                                        }`}
                                      >
                                        {checklist.completed ? (
                                          <div>✅</div>
                                        ) : (
                                          <div className="w-4 h-4 border-2 border-slate-200"></div>
                                        )}
                                      </button>
                                      <span
                                        className={`transition-all duration-300 flex-1 ${
                                          checklist.completed
                                            ? "line-through text-gray-500"
                                            : "text-gray-700"
                                        }`}
                                      >
                                        {checklist.text}
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteChecklist(
                                            task.id,
                                            checklist.id
                                          );
                                        }}
                                        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                      >
                                        X
                                      </button>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          )}

                          {showNewChecklistForm === task.id ? (
                            <div className="space-y-2 animate-in slide-in-from-top duration-200">
                              <input
                                type="text"
                                value={newChecklistText}
                                onChange={(e) =>
                                  setNewChecklistText(e.target.value)
                                }
                                placeholder="Add checklist item..."
                                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                autoFocus
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    createChecklist(task.id);
                                  }
                                }}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() => createChecklist(task.id)}
                                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors transform hover:scale-105"
                                >
                                  Add
                                </button>
                                <button
                                  onClick={() => {
                                    setShowNewChecklistForm(null);
                                    setNewChecklistText("");
                                  }}
                                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowNewChecklistForm(task.id);
                              }}
                              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-all duration-200 p-2 hover:bg-gray-50 rounded w-full"
                            >
                              + Add checklist
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {showNewTaskForm === column.id ? (
                    <div className="space-y-3 mt-3 animate-in slide-in-from-top duration-300">
                      <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Enter task title..."
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        autoFocus
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            createTask(column.id);
                          }
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => createTask(column.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-md"
                        >
                          Add Task
                        </button>
                        <button
                          onClick={() => {
                            setShowNewTaskForm(null);
                            setNewTaskTitle("");
                          }}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowNewTaskForm(column.id)}
                      className="w-full mt-3 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 hover:border-gray-400 transform hover:scale-[1.02]"
                    >
                      + Add a task
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrelloBoard;
