import { Token } from "@/constant/token"
import { getReportService } from "@/service/report.service"

export const getReportAction = async ({ boardId }) => {
    const userToken = await Token();
    const zentrioToken = userToken.Credential;
    const result = await getReportService({ boardId, zentrioToken });
    return result;
}