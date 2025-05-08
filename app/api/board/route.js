import { mockBoard, mockGetBoardByWorkSpaceId } from "@/data/board/data";

export async function GET() {
  return Response.json(mockGetBoardByWorkSpaceId);
}
