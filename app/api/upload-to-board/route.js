export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "10mb",
  },
};

import { Token } from "@/constant/token";
import { createDocumentByUploadService } from "@/service/document.service";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("multipartFile");
    const accessToken = formData.get("accessToken");
    const boardId = formData.get("boardId");

    if (!file || !accessToken || !boardId) {
      return new Response(JSON.stringify({ error: "Missing input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userToken = await Token();
    const token = userToken.Credential;

    const formPayload = new FormData();
    formPayload.append("multipartFile", file);

    const result = await createDocumentByUploadService(
      formPayload,
      boardId,
      token,
      accessToken
    );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Upload to board error:", error);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
