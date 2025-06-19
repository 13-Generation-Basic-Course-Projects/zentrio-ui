"use server"

import { Token } from "@/constant/token"
import { generateReportByBoardIdService, getReportService } from "@/service/report.service"

export const getReportAction = async ({ boardId }) => {
    const token = await Token();
    const result = await getReportService({ boardId, zentrioToken });
    return result;
}

export const generateReportByBoardIdAction = async ({ boardId }) => {
    const token = await Token();
    const { blob, fileName } = await generateReportByBoardIdService({ boardId, zentrioToken });
    return { blob, fileName };
}