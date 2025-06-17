import { apiConfig } from "@/constant/baseurl";

export const reportRouteGroup = {

    // get report from board by board id
    getReportByBoardId: (id) => `${apiConfig.baseUrl}/reports/boards/${id}`,

    // get report from board by board id and generate it
    
}