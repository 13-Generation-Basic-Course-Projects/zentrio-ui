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
    return data;
}

// generating report by pdf
export const generateReportByBoardIdService = async ({ boardId, zentrioToken } = {}) =>{
    const url = reportRouteGroup.getReportInPDFByBoardId(boardId);
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "accept": "*/*",
            "Authorization": `Bearer ${zentrioToken}`
        }
    });
    const blob = await res.blob();

    const contentDisposition = res.headers.get("Content-Disposition");
    let fileName = "document";

    if (contentDisposition && contentDisposition.includes("filename=")) {
        const match = contentDisposition.match(
        /filename[^;=\n]*=(['"]?)([^'"\n]*)\1?/
        );
        if (match && match.length >= 3) {
        fileName = decodeURIComponent(match[2]);
        }
    }

    return { blob, fileName };
}