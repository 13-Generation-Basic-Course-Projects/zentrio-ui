// app/api/upload/route.js

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "10mb", // or larger
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

    // Create FormData again to pass into your service
    const reFormData = new FormData();
    reFormData.append("multipartFile", file);

    const result = await createDocumentByUploadService(
      reFormData,
      boardId,
      token,
      accessToken
    );

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