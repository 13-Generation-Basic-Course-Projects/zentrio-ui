"use server";

import { announcementRouteGroup } from "@/routes/announcementRoute";

export const createAnnouncementByBoardIdService = async ({ boardId, title, description, token }) => {

    const url = announcementRouteGroup.createAnnouncementByBoardId(boardId);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({  title, description, boardId }),
    });
    const data = await res.json();
    console.log("create announcement",data);
    return data;
};

// not finnish
export const uploadMultiImgByBoardIdService = async ({ boardId, token }) => {

    const url = announcementRouteGroup.uploadMultiImgByBoardId(boardId);
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "accept": "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ boardId, }),
    });
    const data = await res.json();
    console.log("img announcement",data);
    return data;
};

export const getAllAnnouncementByBoardIdService = async ({boardId, token }) => {

    const url = announcementRouteGroup.getAllAnnouncementByBoardId(boardId);
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "accept": "*/*",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    console.log("get all announcements",data);
    return data;
};

export const deleteAnnouncementByIdService = async ({announId, token}) => {

    const url =announcementRouteGroup.deleteAnnouncementById(announId);
    const res = await fetch(url, {
        method: "DELETE",
        headers: {
            "accept": "*/*",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json();
    return data;
};