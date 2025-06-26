"use server"

import { reportRouteGroup } from "@/routes/reportRoute"

// get report from board
// get report from boardAdd commentMore actions
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

export const generateReportByBoardIdService = async ({ boardId, zentrioToken } = {}) =>{
    const url = reportRouteGroup.generateReportInPDFByBoardId(boardId);
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
    let fileName = "document.pdf";

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

export const getReportVersionByReportIdService = async ({ reportId, zentrioToken } = {}) => {
    const url = reportRouteGroup.getReportVersionByReportId(reportId);
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