"use server"
import { Token } from "@/constant/token"
import { deleteFileByFileIdService, downloadFileFromDriveService, updateFileNameByFileIdService } from "@/service/drive.service";
import { revalidatePath } from "next/cache";

export const deleteFileByFileIdAction = async ({fileId, accessToken}) => {
  console.log("deleteFileByFileIdAction input:", { fileId, accessToken });
  const userToken = await Token();
  const token = userToken.Credential;

  const file = await deleteFileByFileIdService({accessToken, fileId, token});
  revalidatePath("/document")

  return file;
}

export const downloadFileFromDriveAction = async ({fileId, accessTokenFromGoogle}) => {
  const userToken = await Token();
    const token = userToken.Credential;
  
    // Only return the blob and filename - NO browser download code
    const { blob, fileName } = await downloadFileFromDriveService({
      fileId,
      accessToken: accessTokenFromGoogle,
      token,
    });
  
    return { blob, fileName }; // Just return data
}

export const updateFileNameByFileIdAction = async ({ accessTokenFromGoogle, fileId, newName}) => {
  const userToken = await Token();
  const token = userToken.Credential;
  revalidatePath("/document");

  const updated = await updateFileNameByFileIdService({ accessTokenFromGoogle, fileId, newName, token});

  return updated;
}