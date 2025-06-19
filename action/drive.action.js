import { Token } from "@/constant/token"
import { deleteFileByFileIdService } from "@/service/drive.service";

export const deleteFileByFileIdAction = async ({fileId, accessToken}) => {
  const token = await Token();

  const file = await deleteFileByFileIdService({fileId, accessToken, token});

  return file;
}