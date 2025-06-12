"use server";

import { Token } from "@/constant/token";
import { createAnnouncementByBoardIdService, getAllAnnouncementByBoardIdService, uploadMultiImgByBoardIdService } from "@/service/annoncement.service"
import { revalidatePath } from "next/cache";

export const createAnnouncementByBoardIdAction = async (payload = {}) => {

    const { title, description, boardId } = payload;
    console.log("pay",payload);

    const userToken = await Token();
    const token = userToken.Credential;
    console.log("Calling service with:", { title, description, token ,boardId});
    const result = await createAnnouncementByBoardIdService({
        title,
        description,
        boardId,
        token,
    });
    revalidatePath("/create");
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
