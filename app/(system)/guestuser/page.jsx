import { getGuestUserDisplayKanbanAction } from "@/action/board.action";
import GuestKanbanBoardCompo from "@/components/appserver/GuestUserPage";

export default async function GuestPage() {
  const workspaceId = "feb6d22e-b2d6-4105-b3ad-663c7148c337";
  const boardId = "15bf8b35-fc6e-49fc-be3e-7730dc76a533";

  const data = await getGuestUserDisplayKanbanAction({ workspaceId, boardId });

  console.log("dAaaaaaaaaaaaaaaaaa", data);
  return (
    <div className="w-full h-screen flex flex-col">
      <BredCrum
        board={boardData?.payload.title || "Hikko Design"}
        feature={"Board"}
        header={boardData?.payload.title || "Hikko Design"}
        modal={modal}
        workspaceId={workspaceId}
      />
      <StackedUser image={allMemberInBoard} />
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
      {columns.some((col) => col.cards.length > 0) ? (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 overflow-hidden">
          {(columns || []).map((column) => (
            <div
              key={column.id}
              className="flex flex-col min-h-0 w-full rounded-lg p-1 h-full px-2 py-5"
            >
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-hidden pr-1 pb-[300px]">
                {(column.cards || [])
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((card, cardIndex) => (
                    <div
                      key={card.id}
                      id={card.id}
                      className="mb-3 bg-white rounded-xl px-2"
                    >
                      <div className="shadow-sm rounded-xl overflow-hidden">
                        <div className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0 mr-2">
                              <p
                                className="text-sm font-medium text-gray-800 truncate"
                                title={card.title}
                              >
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
                                id={checklist.checklistId}
                              >
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
                  ))}
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
