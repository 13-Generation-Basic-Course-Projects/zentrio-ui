"use server";

import { Token } from "@/constant/token";
import {
  getTaskbyBoardIdService,
  getNotebyTaskIdService,
  updateNoteByIdService,
} from "@/service/calendar.service";

export const calendarAction = async () => {
  const userToken = await Token();
  const zentrioToken = userToken.Credential;
  // define boardId
  const boardId = "0a3d4af8-d4dd-4a67-88cc-7bd7cc06a59f";

  const result = await getTaskbyBoardIdService({ boardId, zentrioToken });
  return result;
};

export const calendarNoteAction = async () => {
  const userToken = await Token();
  const zentrioToken = userToken.Credential;
  //define taskId
  const taskId = "0a3d4af8-d4dd-4a67-88cc-7bd7cc06a59f";

  const result = await getNotebyTaskIdService({ taskId, zentrioToken });
  return result;
};

export const calendarUpdateNoteAction = async ({
  noteId,
  noted,
  startDate,
  tillDate,
  taskId,
}) => {
  console.log("testing: ");
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
};
