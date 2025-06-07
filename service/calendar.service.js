"use server";

import { calenderRouteGroup } from "@/routes/calendarRoute";

export const getTaskbyBoardIdService = async ({ boardId, zentrioToken }) => {
    const url = calenderRouteGroup.getTaskbyBoardId(boardId);
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "*/*",
            Authorization: `Bearer ${zentrioToken}`,
        },
    });
    const data = await res.json();
    // console.log("task:",data);
    return data;
};

export const getNotebyTaskIdService = async ({ taskId, zentrioToken }) => {
    const url= calenderRouteGroup.getNotebyTaskId(taskId);
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "*/*",
            Authorization: `Bearer ${zentrioToken}`,
        },
    });
    const data =await res.json();
    // console.log("note:",data);
    return data;
};

export const updateNoteByIdService = async ({ noteId, noted, startDate, tillDate, taskId, zentrioToken }) => {
    console.log("update service")
  const url = calenderRouteGroup.updateNoteById(noteId);

  console.log("Sending token:",startDate);


  console.log("Authorization header:", `Bearer ${zentrioToken}`);

  console.log("URL ", url)

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${zentrioToken}`,
    },
    body: JSON.stringify({
      noted,
      startDate,
      tillDate,
      taskId,
    }),
  });
  
  const data = await res.json();

  console.log("Testing heloo: ",data)
  return data;
};