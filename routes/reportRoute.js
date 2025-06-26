import { apiConfig } from "@/constant/baseurl";

export const reportRouteGroup = {

    // get report from board by board idAdd commentMore actions
    getReportByBoardId: (id) => `${apiConfig.baseUrl}/reports/boards/${id}`,

    // get report from board by board id and generate it
    generateReportInPDFByBoardId: (id) => `${apiConfig.baseUrl}/reports/pdf/boards/${id}`,

    // get report version by reportId
    getReportVersionByReportId: (id) => `${apiConfig.baseUrl}/reports/version/${id}`
}