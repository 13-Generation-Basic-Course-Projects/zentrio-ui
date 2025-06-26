"use server"

import { Token } from "@/constant/token"
import { generateReportByBoardIdService, getReportService, getReportVersionByReportIdService } from "@/service/report.service"

export const getReportAction = async ({ boardId }) => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    const result = await getReportService({ boardId, zentrioToken });
    return result;
}

export const generateReportByBoardIdAction = async ({ boardId }) => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    const { blob, fileName } = await generateReportByBoardIdService({ boardId, zentrioToken });
    return { blob, fileName };
}

export const getReportVersionByReportIdAction = async ({ reportId }) => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    const result = await getReportVersionByReportIdService({ reportId, zentrioToken });
    console.log("Version: ", result)
    return result;
}