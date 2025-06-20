"use client";

import { getGuestUserDisplayKanbanAction } from "@/action/board.action";
import { useEffect, useState } from "react";

// Placeholder component
const UserAvater = ({ image }) => (
  <img
    src={image}
    alt="avatar"
    className="w-6 h-6 rounded-full border border-white -ml-2 first:ml-0"
  />
);

// Function to transform API data into columns format
const transformApiToColumns = (apiData) => {
  const columns = [
    { id: "todo", title: "TO DO", cards: [] },
    { id: "in-progress", title: "In Progress", cards: [] },
    { id: "under-review", title: "Under Review", cards: [] },
    { id: "done", title: "COMPLETED", cards: [] },
  ];

  const stageToColumnMap = {
    TO_DO: "todo",
    IN_PROGRESS: "in-progress",
    UNDER_REVIEW: "under-review",
    COMPLETED: "done",
  };

  if (!apiData?.tasks || !Array.isArray(apiData.tasks)) {
    return columns;
  }

  apiData.tasks.forEach((task) => {
    const columnId = stageToColumnMap[task.stage] || "todo";

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
      description: task.description || "No description",
      label: null,
      comment:
        task.allChecklists?.reduce(
          (sum, checklist) => sum + (checklist.allComments?.length || 0),
          0
        ) || 0,
      attachment:
        task.allChecklists?.reduce(
          (sum, checklist) => sum + (checklist.attachment ? 1 : 0),
          0
        ) || 0,
      duration: duration,
      order: task.taskOrder,
      expanded: false,
      checklists: task.allChecklists || [],
      assignees: task.creator?.imageUrl ? [task.creator.imageUrl] : [],
      startedAt: task.startedAt,
      finishedAt: task.finishedAt,
      status: task.status,
      stage: task.stage,
      teamLeader: task.teamLeader,
    };

    const column = columns.find((col) => col.id === columnId);
    if (column) {
      column.cards.push(card);
    }
  });

  // Sort cards by taskOrder within each column
  columns.forEach((column) => {
    column.cards.sort((a, b) => a.order - b.order);
  });

  return columns;
};

export default function GuestKanbanBoardCompo({
  modal,
  workspaceId,
  boardId,
  allMemberInBoard,
  preventUserImage,
  boardData,
  role,
  data,
}) {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("data from kabanpage", data);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (!workspaceId || !boardId) {
        setError("Workspace ID or Board ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const result = await getGuestUserDisplayKanbanAction(
          "feb6d22e-b2d6-4105-b3ad-663c7148c337",
          "15bf8b35-fc6e-49fc-be3e-7730dc76a533"
        );
        if (result.success && result.payload?.tasks) {
          const transformedColumns = transformApiToColumns(result.payload);
          setColumns(transformedColumns);
        } else {
          setError(result.message || "Failed to fetch kanban data");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [workspaceId, boardId]);

  // Toggle task expansion
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

  return (
    <>
      <h1>Hello guest user</h1>
      <div className="w-full h-screen flex flex-col">
        <BredCrum
          board={boardData?.payload.title || "Hikko Design"}
          feature={"Board"}
          header={boardData?.payload.title || "Hikko Design"}
          modal={modal}
        />
        <StackedUser image={allMemberInBoard} />
        <div className="pt-5 pb-2 grid grid-cols-4 gap-4">
          {(columns || []).map((column) => (
            <div
              key={column.id}
              className={`mb-4 border-b-4 pb-2 flex items-center gap-3 ${
                columnHeaderStyles[column.id]
              }`}>
              <p className="text-2xl font-semibold">{column.title}</p>
              <button className="px-3 py-1 text-sm rounded-full bg-transparent border-2 border-gray-300 shadow-sm">
                {column.cards?.length || 0}
              </button>
            </div>
          ))}
        </div>
        {columns.some((col) => col.cards.length > 0) ? (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 overflow-hidden">
            {(columns || []).map((column) => (
              <div
                key={column.id}
                className="flex flex-col min-h-0 w-full rounded-lg p-1 h-full px-2 py-5">
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-hidden pr-1 pb-[300px]">
                  {(column.cards || [])
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((card, cardIndex) => (
                      <div
                        key={card.id}
                        id={card.id}
                        className="mb-3 bg-white rounded-xl px-2">
                        <div className="shadow-sm rounded-xl overflow-hidden">
                          <div className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex-1 min-w-0 mr-2">
                                <p
                                  className="text-sm font-medium text-gray-800 truncate"
                                  title={card.title}>
                                  {card.title}
                                </p>
                                {card.teamLeader ? (
                                  <p className="text-[10px] text-green-500">
                                    TL {card.teamLeader?.username}
                                  </p>
                                ) : (
                                  <p className="text-[10px] text-red-500">
                                    No Team Leader yet
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center justify-between w-fit flex-shrink-0">
                                <div className="flex -space-x-2 mr-2">
                                  {card.teamLeader ? (
                                    <UserAvater
                                      image={
                                        card.teamLeader?.imageUrl ??
                                        preventUserImage
                                      }
                                    />
                                  ) : (
                                    <UserAvater
                                      image={
                                        "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png"
                                      }
                                    />
                                  )}
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
                            <div className="p-2">
                              {(card.checklists || []).map((checklist) => (
                                <div
                                  key={checklist.checklistId}
                                  id={checklist.checklistId}>
                                  <div className="mb-1 bg-white rounded-xl shadow-sm">
                                    <ModalDetailChecklist
                                      boardId={boardId}
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
                                      description={checklist.description || ""}
                                      checklistId={checklist?.checklistId}
                                      members={checklist.members || []}
                                      createdAt={checklist.createdAt}
                                      updatedAt={checklist.updatedAt}
                                      finishedAt={checklist.finishedAt}
                                      member={checklist.members}
                                      preventUserImage={preventUserImage}
                                      allMemberInBoard={allMemberInBoard}
                                      leaderId={card.teamLeader?.userId || null}
                                      role="ROLE_GUEST" // Read-only for guests
                                    />
                                  </div>
                                </div>
                              ))}
                              <div className="pb-3 pt-1 px-4">
                                <div className="grid grid-cols-12">
                                  <div className="col-span-8 flex items-center"></div>
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
                            className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
                            {card.expanded ? (
                              <ChevronUp size={16} />
                            ) : (
                              <ChevronDown size={16} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyKanban />
        )}
      </div>
    </>
  );
}
