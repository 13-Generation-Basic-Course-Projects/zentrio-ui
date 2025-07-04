"use server"

import { Token } from "@/constant/token"
import { createReactService, unReactService, updateReactService } from "@/service/react.service";
import { revalidatePath, revalidateTag } from "next/cache";



export const reactAction =  async({reaction,announId})=>{

    console.log("✅ reactAction running:", reaction, announId);
    const userToken = await Token();
    const token = userToken.Credential;
    const  result =  await createReactService({token,
        reaction: reaction.label.toUpperCase(),
        announId});
         revalidateTag("reactions");
         revalidateTag("announcements");
    return result

}



export const unreactAction =  async({reactId})=>{
    const userToken = await Token();
    const token = userToken.Credential;
    const  result =  await unReactService({
        token,
        reactId});
          revalidateTag("reactions");
          revalidateTag("announcements");
    return result

}




export const updateReactAction =  async({reactId,reactType,announId})=>{
    const userToken = await Token();
    const token = userToken.Credential;

    console.log("updateReact: ",reactId, "type:", reactType, "annountid:", announId)
    const  result =  await  updateReactService({
        token,
        reactId,
        reactType: reactType.toUpperCase(),
        announId
    });
      revalidateTag("reactions");
      revalidateTag("announcements");
    return result

}