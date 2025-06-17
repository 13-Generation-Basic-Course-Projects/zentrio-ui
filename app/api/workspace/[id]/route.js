"use server";
//import { mockWorkspaces } from "@/data/workspace/data";
export async function GET(request, { params }) {
  // Await the params object to access the workspaceId
  const { workspaceId } = await params;

  // Validate UUID
  if (!workspaceId || !validate(workspaceId)) {
    return new Response(JSON.stringify({ message: "Invalid workspaceId" }), {
      status: 400,
    });
  }

  // Continue with the rest of your logic
  try {
    const board = await getBoardByWorkspaceId(workspaceId);
    return new Response(JSON.stringify(board), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
