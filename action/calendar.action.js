"use server"

import { Token } from "@/constant/token";
import { getTaskbyBoardIdService } from "@/service/calendar.service";


export const calendarAction = async () => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    // define boardId
    const boardId = "d4f6ed17-3f68-48b4-9cbb-fa141a2d2000";

    const result = await getTaskbyBoardIdService({ boardId, zentrioToken });
    return result;
}