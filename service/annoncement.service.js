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
    next: { tags: ["announcements"] },
  });
  const data = await res.json();
  return data;
};

export const uploadMultiImgByBoardIdService = async ({ boardId, image, token }) => {
  const url = announcementRouteGroup.uploadMultiImgByBoardId(boardId);
  const formData = new FormData();
  formData.append("boardId", boardId);

  if (Array.isArray(image)) {
    image.forEach((file) => {
      formData.append("files", file);
    });
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
         "accept": "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: formData,

  });

  const data = await res.json();
  return data;
};

export const getAllAnnouncementByBoardIdService = async ({
  boardId,
  token,
}) => {
  const url = announcementRouteGroup.getAllAnnouncementByBoardId(boardId);
  const res = await fetch(url, {
    method: "GET",
    next: {
      tags: ["announcements"],
    },
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const deleteAnnouncementByIdService = async (id, token) => {
    const url = announcementRouteGroup.deleteAnnouncementById(id);
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  
  
};

export const pinedAnnouncementByIdService = async (announId, token) => {
  const url = announcementRouteGroup.pinedAnnouncementById(announId);
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "accept": "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

export const updateAnnouncementByIdService = async ({announId, description, title, boardId, token}) => {
  const payload={
    description: description,
    title: title,
    boardId: boardId
  }
  const url = announcementRouteGroup.updateAnnouncementById(announId);
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    next: { tags: ["announcements"] },
  });
  const data = await res.json();
  return data; 
};

export const createCommentByAnnouncementIdService = async ({ content, announcementId, token }) => {
  const url = announcementRouteGroup.createCommentByAnnouncementId(announcementId);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({content,announcementId }),
  });
  const data = await res.json();
  return data;
};

export const editCommentByIdService = async ({ content, announId, commentId, token }) => {
  const url = announcementRouteGroup.editCommentById(commentId);
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      { content,
      announcementId: announId }),
  });
  const data = await res.json();
  return data;
};

export const deleteCommentByIdService = async ({ commentId, token }) => {
  const url = announcementRouteGroup.deleteCommentById(commentId);
  const res = await fetch(url, {
    method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  const data = await res.json();
  return data;
};

export const createAnnouncementService = async ({ title, description, boardId, token }) => {
  const url = announcementRouteGroup.createAnnouncement();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, boardId }),
    next: { tags: ["announcements"] },
  });
  const data = await res.json();
  return data;
};