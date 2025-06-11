"use server";

import { Token } from "@/constant/token";
import { createAnnouncementByBoardIdService, getAllAnnouncementByBoardIdService, uploadMultiImgByBoardIdService } from "@/service/annoncement.service"

export const createAnnouncementByBoardIdAction = async (payload = {}) => {

    const { title, description } = payload;

    const userToken = await Token();
    const token = userToken.Credential;
    const result = await createAnnouncementByBoardIdService({
        title,
        description,
        token,
    });
    return result;
};

export const uploadMultiImgByBoardIdAction = async (boardId) => {

    const userToken = await Token();
    const token = userToken.Credential;
    const result = await uploadMultiImgByBoardIdService({
        token,
    });
    return result;
};

export const getAllAnnouncementByBoardIdAction = async (boardId) => {

    const userToken = await Token();
    const token = userToken.Credential;
    const result = await getAllAnnouncementByBoardIdService({
        boardId, 
        token,
    });
    return result;
};
