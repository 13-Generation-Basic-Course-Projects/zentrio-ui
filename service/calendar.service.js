"use server";

import { apiConfig } from "@/constant/baseurl";
import { calenderRouteGroup } from "@/routes/calendarRoute";

export const getTaskbyBoardIdService = async ({ zentrioToken }) => {
    const url = calenderRouteGroup.getTaskbyBoardId();
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "*/*",
            Authorization: `Bearer${zentrioToken}`,
        },
    });
    const data = await res.json();
    console.log("task:",data);
    return data;
};