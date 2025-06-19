"use server"

import { Token } from "@/constant/token"
import { createReactService, unReactService, updateReactService } from "@/service/react.service";
import { revalidatePath } from "next/cache";



export const reactAction =  async({reaction,announId})=>{

    console.log("✅ reactAction running:", reaction, announId);
    const token = await Token();
    const  result =  await createReactService({token,
        reaction: reaction.label.toUpperCase(),
        announId});
         revalidatePath("/creatReact")
    return result

}



export const unreactAction =  async({reactId})=>{
    const token = await Token();
    const  result =  await unReactService({
        token,
        reactId});
          revalidatePath("/deleteReact")
    return result

}




export const updateReactAction =  async({reactId,reactType,announId})=>{
    const token = await Token();

    console.log("updateReact: ",reactId, "type:", reactType, "annountid:", announId)
    const  result =  await  updateReactService({
        token,
        reactId,
        reactType: reactType.toUpperCase(),
        announId
    });
      revalidatePath("/updateReact")
    return result

}