import { apiConfig } from "@/constant/baseurl";

export const reportRoute = {
    getReportByBoardId: (id) => `${apiConfig.baseUrl}/reports/boards/${id}`,
    getReportInPDFByBoardId: (id) => `${apiConfig.baseUrl}/reports/pdf/boards/${id}`
}