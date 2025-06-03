"use server";

import {
  createWorkspaceService,
  getAllWorkspacesService,
  getWorkspacesByUserIdService,
} from "@/service/workspace.service";

/*
 * 1. action for create workspaces
 */
export async function createWorkspaceAction(title, description) {
  try {
    const data = await createWorkspaceService(title, description);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message:
        error.message || "Something went wrong in create workspace action",
    };
  }
}

/*
 *2. action get all workspaces (my workspace)
 */
export async function getAllWorkspaceAction() {
   const yourToken =
     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGhpbmcwMjA1MThAZ21haWwuY29tIiwiaWF0IjoxNzQ4OTMyNTIzLCJleHAiOjE3NDg5NTQxMjN9.3w0aRPbl_TqsXd5FOpZ0DlDEevDu4rmQn2AkIT9Qc4fmzlWfUky0j0OE0RB3U3O60fuwWhCNQReDmw64SY2Wsw";
  try {
    const data = await getAllWorkspacesService(yourToken);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message:
        error.message || "Something went wrong in get all workspaces action",
    };
  }

}

export async function getAllWorkspaceByUserAction(users) {
  const token = "your_jwt_token_here"; 
  try {
    const data = await getWorkspacesByUserService(users, token);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      message:
        error.message ||
        "Something went wrong in get workspaces by user action",
    };
  }
}

