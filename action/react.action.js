"use server"

import { Token } from "@/constant/token"
import { createReactService } from "@/service/react.service";



export const reactAction =  async({reaction,announId})=>{

    console.log("✅ reactAction running:", reaction, announId);
    const userToken = await Token();
    const token = userToken.Credential;
    const  result =  await createReactService({token,
        reaction: reaction.label.toUpperCase(),
        announId});
    return result

}