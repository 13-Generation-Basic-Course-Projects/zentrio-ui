import { apiConfig } from "@/constant/baseurl";


export const reactGroup= {

    //create react
    createReact : () => `${apiConfig.baseUrl}/reacts`,

    //unreact
    unReact : (reactId) => `${apiConfig.baseUrl}/reacts/${reactId}`,

    //update react
    updateReact :(reactId) => `${apiConfig.baseUrl}/reacts/${reactId}`
}