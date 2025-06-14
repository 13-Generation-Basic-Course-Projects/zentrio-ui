export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "10mb",
  },
};

import { Token } from "@/constant/token";
import {
  createDocumentByUploadService,
  uploadDocumentToFolderServie,
} from "@/service/document.service";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("multipartFile");
    const accessToken = formData.get("accessToken");
    const boardId = formData.get("boardId");
    const folderId = formData.get("folderId"); // optionally included

    if (!file || !accessToken || (!boardId && !folderId)) {
      return new Response(JSON.stringify({ error: "Missing input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userToken = await Token();
    const token = userToken.Credential;

    const formPayload = new FormData();
    formPayload.append("multipartFile", file);

    let result;

    if (boardId) {
      result = await createDocumentByUploadService(
        formPayload,
        boardId,
        token,
        accessToken
      );
    } else if (folderId) {
      result = await uploadDocumentToFolderServie(
        file,
        folderId,
        token,
        accessToken
      );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Upload API error:", error);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
