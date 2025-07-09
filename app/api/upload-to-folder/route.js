export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "20mb",
  },
};

import { apiConfig } from "@/constant/baseurl";
import { Token } from "@/constant/token";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tokenFromGoogle = formData.get("token");
    const folderId = formData.get("folderId");
    const file = formData.get("file");

    if (!file || !tokenFromGoogle || !folderId) {
        ("Missing:", { file, tokenFromGoogle, folderId });
      return new Response(JSON.stringify({ error: "Missing input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userToken = await Token();
    const token = userToken.Credential;

    const driveFormData = new FormData();
    driveFormData.append("file", file);

    const url = `${apiConfig.baseUrl}/files/upload-image-to-drive?token=${tokenFromGoogle}&folderId=${folderId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: driveFormData,
    });

    const result = await res.json();

    return new Response(JSON.stringify(result), {
      status: res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
