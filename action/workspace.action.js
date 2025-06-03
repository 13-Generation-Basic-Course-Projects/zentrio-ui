"use server";

import { createWorkspaceService } from "@/service/workspace.service";

/* 
* action for create workspaces 
*/
export async function createWorkspaceAction(title, description) {
  try {
    const data = await createWorkspaceService(title, description);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong in create workspace action",
    };
  }
}
  



