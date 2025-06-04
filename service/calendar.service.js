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
    console.log("task:",data);
    return data;
};