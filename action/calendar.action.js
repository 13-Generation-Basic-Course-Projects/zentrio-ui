"use server"

import { Token } from "@/constant/token";

const { getTaskbyBoardIdService } = require("@/service/calendar.service");

console.log("booooooooooo");

export const calendarAction = async () => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    const result = await calenderRouteGroup({ zentrioToken });
    return result;
}