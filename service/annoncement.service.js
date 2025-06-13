"use server";

import { announcementRouteGroup } from "@/routes/announcementRoute";

export const createAnnouncementByBoardIdService = async ({
  boardId,
  title,
  description,
  token,
}) => {
  const url = announcementRouteGroup.createAnnouncementByBoardId(boardId);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, boardId }),
  });
  const data = await res.json();
  console.log("create announcement", data);
  return data;
};

export const uploadMultiImgByBoardIdService = async ({ boardId, image, token }) => {
  const url = announcementRouteGroup.uploadMultiImgByBoardId(boardId);
  console.log("url",url)
  const formData = new FormData();
  formData.append("boardId", boardId);

  // Safely loop if imageFiles is array
  if (Array.isArray(image)) {
    image.forEach((file) => {
      formData.append("files", file); // Make sure this matches your backend field name
    });
  }
  console.log("kakak",formData)

  const res = await fetch(url, {
    method: "POST",
    headers: {
         "accept": "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: formData,

  });

  const data = await res.json();
  console.log("img announcement", data);
  return data;
};

export const getAllAnnouncementByBoardIdService = async ({
  boardId,
  token,
}) => {
  const url = announcementRouteGroup.getAllAnnouncementByBoardId(boardId);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("get all announcements", data);
  return data;
};

export const deleteAnnouncementByIdService = async (id, token) => {
  console.log("Delete id service : ", id, token);
  
    const url = announcementRouteGroup.deleteAnnouncementById(id);
    console.log(url)
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("backend respone", data)
    return data;
  
  
};
