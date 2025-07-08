"use server";

import { calenderRouteGroup } from "@/routes/calendarRoute";

/*
* Get calendar by board id and user id
*/
export const getCalendarByBoardIdAndUserIdService = async ({ boardId, token }) => {
    try {
        const url = calenderRouteGroup.getCalendarByBoardIdAndUserId(boardId);

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "accept": "*/*",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
          ("getCalendarByBoardIdAndUserId:", data);
        return data;
    } catch (error) {
        console.error("Error fetching calendar data:", error.message);
        throw error;
    }
};

/*
* Get all notes from calendar by current user
*/
export const getAllNotesFromCalendarByCurrentUserService = async ({ taskId, token }) => {
    try {
        const url = calenderRouteGroup.getAllNotesFromCalendarByCurrentUser(taskId);

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "accept": "*/*",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
          ("getAllNotesFromCalendarByCurrentUser:", data);
        return data;
    } catch (error) {
        console.error("Error fetching notes from calendar:", error.message);
        throw error;
    }
};

/*
* Get note in calendar
*/
export const getNoteInCalendarService = async ({ calendarId, token }) => {
  try {
    const url = calenderRouteGroup.getNoteInCalendar(calendarId);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "accept": "*/*",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
      ("getNoteInCalendar:", data);
    return data;
  } catch (error) {
    console.error("Error fetching note in Calendar:", error.message);
    throw error;
  }
};


/*
* Create note in calendar
*/
export const createNoteInCalendarService = async ({
  noted,
  startDate,
  tillDate,
  taskId,
  token,
}) => {
  try {
    const url = calenderRouteGroup.createNoteInCalendar();

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        noted,
        startDate,
        tillDate,
        taskId,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
      ("createNoteInCalendar:", data);
    return data;
  } catch (error) {
    console.error("Error creating note in calendar:", error.message);
    throw error;
  }
};


/*
* Update note by id from calendar
*/
export const updateNoteByIdFromCalendarService = async ({ 
  calendarId,
  noted,
  startDate,
  tillDate,
  taskId,
  token
}) => {
  try {
    const url = calenderRouteGroup.updateNoteByIdFromCalendar(calendarId);

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        noted,
        startDate,
        tillDate,
        taskId,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
      ("updateNoteByIdFromCalendar:", data);
    return data;
  } catch (error) {
    console.error("Error updating note by ID from calendar:", error.message);
    throw error;
  }
};