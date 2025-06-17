import { mockWorkspaces } from "@/data/workspace/data";

export async function GET() {
  return Response.json(mockWorkspaces);
}
