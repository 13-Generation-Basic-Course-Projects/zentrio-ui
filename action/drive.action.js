"use server";

import { Token } from "@/constant/token";
import { createDriveFileService } from "@/service/document.service";
import {
  deleteFileByFileIdService,
  downloadFileFromDriveService,
  updateFileNameByFileIdService,
} from "@/service/drive.service";
import { revalidatePath } from "next/cache";

export const createDriveFileAction = async ({
  name,
  folderId,
  fileType,
  token: tokenFromGoogle,
}) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    const document = await createDriveFileService(
      name,
      folderId,
      fileType,
      token,
      tokenFromGoogle
    );

    revalidatePath("/document")
    return document;
  } catch (error) {
    console.error("Error creting file: ", error);
    throw error;
  }
};

export const deleteFileByFileIdAction = async ({ fileId, accessToken }) => {
  console.log("deleteFileByFileIdAction input:", { fileId, accessToken });
  const userToken = await Token();
  const token = userToken.Credential;

  const file = await deleteFileByFileIdService({ accessToken, fileId, token });
  revalidatePath("/document");

  return file;
};

export const downloadFileFromDriveAction = async ({
  fileId,
  accessTokenFromGoogle,
}) => {
  const userToken = await Token();
  const token = userToken.Credential;

  // Only return the blob and filename - NO browser download code
  const { blob, fileName } = await downloadFileFromDriveService({
    fileId,
    accessToken: accessTokenFromGoogle,
    token,
  });

  return { blob, fileName }; // Just return data
};

export const updateFileNameByFileIdAction = async ({
  tokenFromGoogle,
  fileId,
  newName,
}) => {
  try {
    const userToken = await Token();
    const token = userToken.Credential;

    if (!token) throw new Error("Missing internal token");
    if (!tokenFromGoogle || !fileId || !newName) {
      throw new Error("Missing input parameters");
    }

    const updated = await updateFileNameByFileIdService({
      accessToken: tokenFromGoogle,
      fileId,
      newName,
      token, // internal JWT
    });

    console.log("✅ File name updated:", updated);
    revalidatePath("/docu")
    return updated;
  } catch (error) {
    console.error("❌ updateFileNameByFileIdAction error:", error.message);
    throw error;
  }
};
