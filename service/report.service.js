import { reportRouteGroup } from "@/routes/reportRoute"

export const reportService = async ({ boardId, zentrioToken } = {}) => {
    const url = reportRouteGroup.getReportByBoardId(boardId);
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            "Authorization": `Bearer ${zentrioToken}`
        }
    });
    const data = await res.json();
    return data;
}