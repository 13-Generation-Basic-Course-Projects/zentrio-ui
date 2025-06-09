"use server"

import { reportRouteGroup } from "@/routes/reportRoute"

// get report from board
export const getReportService = async ({ boardId, zentrioToken } = {}) => {
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
    console.log('Request URL:', url);
    return data;
}