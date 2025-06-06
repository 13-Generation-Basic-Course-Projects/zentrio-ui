import { Token } from "@/constant/token"
import { reportService } from "@/service/report.service"

export const reportAction = async ({ boardId }) => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    const result = await reportService({ boardId, zentrioToken });
    return result;
}