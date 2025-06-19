import { Token } from "@/constant/token"
import { deleteFileByFileIdService } from "@/service/drive.service";

export const deleteFileByFileIdAction = async ({fileId, accessToken}) => {
  const userToken = await Token();
  const token = userToken.Credential;

  const file = await deleteFileByFileIdService({fileId, accessToken, token});

  return file;
}