"use server";

import { Token } from "@/constant/token";
import {
  getCalendarByBoardIdAndUserIdService,
  getAllNotesFromCalendarByCurrentUserService,
  getNoteInCalendarService,
  createNoteInCalendarService,
  updateNoteByIdFromCalendarService,
} from "@/service/calendar.service";

/*
 * Action for Get calendar by board id and user id
 */
export const getCalendarByBoardIdAndUserIdAction = async (boardId) => {
  try {
  const token = await Token();

    const result = await getCalendarByBoardIdAndUserIdService({ boardId, token });
    return result;
  } catch (error) {
    console.error("getCalendarByBoardIdAndUserIdAction error:", error);
    throw error;
  }
};

/*
 * Action for Get note in calendar
 */
export const getNoteInCalendarAction = async (calendarId) => {
  try {
  const token = await Token();

    const result = await getNoteInCalendarService({ calendarId, token });
    return result;
  } catch (error) {
    console.error("getNoteInCalendarAction error:", error);
    throw error;
  }
};

/*
 * Action for Get all notes from calendar by current user
 */
export const getAllNotesFromCalendarByCurrentUserAction = async (taskId) => {
  try {
  const token = await Token();

    const result = await getAllNotesFromCalendarByCurrentUserService({ taskId, token });
    return result;
  } catch (error) {
    console.error("getAllNotesFromCalendarByCurrentUserAction error:", error);
    throw error;
  }
};

/*
 * Action for Create note in calendar
 */
export const createNoteInCalendarAction = async ({
  noted,
  startDate,
  tillDate,
  taskId,
}) => {
  try {
  const token = await Token();

    const result = await createNoteInCalendarService({
      noted,
      startDate,
      tillDate,
      taskId,
      token,
    });
    return result;
  } catch (error) {
    console.error("createNoteInCalendarAction error:", error);
    throw error;
  }
};

/*
 * Action for Update note by id from calendar
 */
export const updateNoteByIdFromCalendarAction = async ({
  calendarId,
  noted,
  startDate,
  tillDate,
  taskId,
}) => {
  try {
  const token = await Token();

    const result = await updateNoteByIdFromCalendarService({
      calendarId,
      noted,
      startDate,
      tillDate,
      taskId,
      token,
    });
    return result;
  } catch (error) {
    console.error("updateNoteByIdFromCalendarAction error:", error);
    throw error;
  }
};
