"use server"

import { Token } from "@/constant/token";
import { getTaskbyBoardIdService, getNotebyTaskIdService, updateNoteByIdService } from "@/service/calendar.service";


export const calendarAction = async () => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    // define boardId
    const boardId = "d4f6ed17-3f68-48b4-9cbb-fa141a2d2000";

    const result = await getTaskbyBoardIdService({ boardId, zentrioToken });
    return result;
}

export const calendarNoteAction = async () => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    //define taskId
    const taskId = "277f6217-2f73-4241-a0b4-d40c60877cd1";

    const result = await getNotebyTaskIdService({ taskId, zentrioToken });
    return result;
}

export const calendarUpdateNoteAction = async ({ noteId, noted, startDate, tillDate, taskId }) => {
    console.log("testing: ")
    const userToken = await Token();
   
    const zentrioToken = userToken.Credential;

    console.log("Token before update:", startDate);

    if (!zentrioToken) throw new Error("Token missing!");

    const result = await updateNoteByIdService({
        noteId,
        noted,
        startDate,
        tillDate,
        taskId,
        zentrioToken,
    });

    

  return result;
}