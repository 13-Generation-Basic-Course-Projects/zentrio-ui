"use server";

import { Token } from "@/constant/token";
import { createAnnouncementByBoardIdService, deleteAnnouncementByIdService, getAllAnnouncementByBoardIdService, pinedAnnouncementByIdService, updateAnnouncementByIdService, uploadMultiImgByBoardIdService } from "@/service/annoncement.service"
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

export const uploadMultiImgByBoardIdAction = async (boardId,image) => {
    
    console.log("kakakak", image)
    const userToken = await Token();
    const token = userToken.Credential;
    const result = await uploadMultiImgByBoardIdService({
        boardId,
        image,
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


export const deleteAnnouncementByIdAction = async (id) => {

    console.log("kdet",id)
    const userToken = await Token();
    const token = userToken.Credential;
    const result = await deleteAnnouncementByIdService(
        id,
        token,
    );
    revalidatePath("/delete");
    return result;
};

export const pinedAnnouncementByIdAction = async (announId) => {
    console.log("pined id",announId);

    const userToken = await Token();
    const token = userToken.Credential;
    const result = await pinedAnnouncementByIdService( announId, token );
    revalidatePath("/update");
    return result;
};

export const updateAnnouncementByIdAction = async (announId, description, title, boardId) => {
    console.log("update id annon",announId, description, title, boardId);

    const userToken = await Token();
    const token = userToken.Credential;
    const result = await updateAnnouncementByIdService({announId, description, title, boardId, token});
    revalidatePath("/update");
    return result;
};

export const createCommentByAnnouncementIdAction = async ({ announId, content }) => {
    console.log("Comment Actionp1",announId, content);
    
    const userToken = await Token();
    const token = userToken.Credential;
    const result = await createAnnouncementByBoardIdService({ content, announId, token });
    revalidatePath("/create");
    return result;
};

export const editCommentByIdAction = async ({ commentId, content, announId }) => {

    console.log("Comment Actionpu",commentId, content, announId, token);
    const userToken = await Token();
    const token = userToken.Credential;
    const result = await updateAnnouncementByIdService({ content, announId, token });
    revalidatePath("/update");
    return result;
}

export const deleteCommentByIdAction = async ({ commentId }) => {
    console.log("Comment Actionpd",commentId);

    const userToken = await Token();
    const token = userToken.Credential;
    const result = await deleteAnnouncementByIdService({ commentId, token });
    revalidatePath("/detele");
    return result;
}