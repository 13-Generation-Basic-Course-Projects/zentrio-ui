// app/api/board/[workspaceId]/route.js
import { mockGetBoardByWorkSpaceId } from "@/data/board/data";
import { validate } from "uuid";

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export async function GET(request, { params }) {
  const { workspaceId } = params;

  // Validate UUID
  if (!workspaceId || !validate(workspaceId)) {
    return jsonResponse({ error: "Invalid or missing workspace UUID" }, 400);
  }

  // Get boards
  const boards = mockGetBoardByWorkSpaceId().filter(
    (board) => board.workspaceId === workspaceId
  );

  // Return empty if no boards found
  if (boards.length === 0) {
    return jsonResponse({ payload: [] });
  }

  // Return boards
  return jsonResponse({ payload: boards });
}
