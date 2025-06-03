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
