import { apiConfig } from "@/constant/baseurl";

export const checklistRouteGroup = {
  //get
  getCheckListByTaskId: (checklistId) =>
    `${apiConfig.baseUrl}/checklists/tasks/${checklistId}`, // Get all checklist by specific tasks ID
  getCoverOfCheckList: (checklistId, fileName) =>
    `${apiConfig.baseUrl}/checklists/${checklistId}/cover/${fileName}`, // Get cover of checklist by checklist ID and File Name Parameters
  getCheckListByCurrentUser: (id) => `${apiConfig.baseUrl}/checklists/current`, // Get all checklists by current users

  //update
  updateCheckListByIdAndTaskId: (checklistId) =>
    `${apiConfig.baseUrl}/checklists/${checklistId}`, // update checklist by checklist id
  updateStatusById: (id) => `${apiConfig.baseUrl}/checklists/tasks/${id}`,
  updateStatusById: (id) => `${apiConfig.baseUrl}/checklists/${id}/status`, //enum

  //post
  createCheckListByTaskId: () => `${apiConfig.baseUrl}/checklists`,
  uploadCoverOfChecklistByCheckListId: (id) =>
    `${apiConfig.baseUrl}/checklists/${id}/cover`,
  assignMemberToCheckList: (checklistId, taskId, assignedBy, assignTo) =>
    `${apiConfig.baseUrl}/checklists/${checklistId}/tasks/${taskId}/members${assignedBy}/members/${assignTo}`,

  //delete
  deleteCheckListByTaskId: (checkListId, taskId) =>
    `${apiConfig.baseUrl}/checklists/${checkListId}/tasks/${taskId}`, // Delete checklist id and task id

  //add new delete comment
  deleteCommentBycmtId: (commentId) =>
    `${apiConfig.baseUrl}/comment/${commentId}`,
};
