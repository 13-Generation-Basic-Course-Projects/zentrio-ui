import { apiConfig } from "@/constant/baseurl";

export const boardRoute = {
  getBoardById: (id) => `${apiConfig.baseUrl}/board/${id}`, // get spacific workspace by workspaceId
};
