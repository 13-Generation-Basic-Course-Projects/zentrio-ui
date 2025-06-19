import { apiConfig } from "@/constant/baseurl";

export const driveRouteGroup = {
  deleteFileByFileId: (fileId, accessToken) => 
    `${apiConfig.baseUrl}/files/file?accessToken=${accessToken}&fileId=${fileId}`,
};