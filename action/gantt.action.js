"use server";
import { Token } from "@/constant/token";
import {
  createGanttBarsByGanttChartIdService,
  deleteGanttBarsByGanttChartIdService,
  getGanttBarByGanttChartIdService,
  getGanttBarService,
  getGanttChartByBoardIdService,
  updateGantChartBytIdService,
} from "@/service/gantt.service";
import { revalidatePath } from "next/cache";
console.log("test actions must create folders");
/*
 * get ganttbar
 */
export const getGanttBarAction = async () => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log(token);
  const result = await getGanttBarService({
    token,
  });
  return result;
};
/*
 * get ganttbar by gantt chart id
 */
export const getGanttBarByGanttChartIdAction = async ({ ganttChartId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log(token);
  const result = await getGanttBarByGanttChartIdService({
    ganttChartId,
    token,
  });
  return result;
};

/*
 * get ganttchart
 */
export const getGanttChartByBoardIdAction = async ({ boardId }) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log(token);

  const result = await getGanttChartByBoardIdService({
    boardId,
    token,
  });
  return result;
};

/*
 * create multiple ganttbar
 */
import { ganttBarSchema } from "@/lib/schemas/ganttBarSchema";

/*
 * create multiple ganttbar
 */
export const createGanttBarsByGanttChartIdAction = async ({
  ganttChartId,
  data: payload,
}) => {
  // 1. Validate the incoming payload using Zod schema
  try {
    const validatedPayload = payload.map((item) => ganttBarSchema.parse(item));
    console.log("✅ Payload validated successfully:", validatedPayload);

    const userToken = await Token(); // Assuming Token() is defined elsewhere
    const token = userToken.Credential;
    console.log(token);

    const result = await createGanttBarsByGanttChartIdService({
      ganttChartId,
      data: validatedPayload, // Pass the validated payload
      token,
    });
    revalidatePath("/gantbar");
    return result;
  } catch (error) {
    console.error("❌ Validation error or action failed:", error);
    // Re-throw the error or handle it as appropriate for your application
    throw error;
  }
};
/*
 * update gantchart
 */
export const updateGantChartBytIdAction = async (
  ganttChartId,
  boardId,
  title
) => {
  console.log("=== updateGantChartBytIdAction called ===");
  console.log("ganttChartId:", ganttChartId);
  console.log("boardId:", boardId);
  console.log("title received:", title);
  console.log("title type:", typeof title);

  const userToken = await Token();
  const token = userToken.Credential;
  console.log("token:", token ? "Token exists" : "No token");

  try {
    const result = await updateGantChartBytIdService({
      ganttChartId,
      boardId,
      title,
      token,
    });

    console.log("✅ Action completed successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Error in updateGantChartBytIdAction:", error);
    throw error;
  }
};
/*
 * delete gantt bar
 */
export const deleteGanttBarsByGanttChartIdAction = async ({
  ganttChartId,
  ganttbarId,
}) => {
  const userToken = await Token();
  const token = userToken.Credential;
  console.log(token);

  const result = await deleteGanttBarsByGanttChartIdService({
    ganttChartId,
    ganttbarId,
    token,
  });
  return result;
};
