import { IconNoBoard, IconpopupDelete, IconpopupLeave, IconQuestion } from "@/components/icon/Iconpopup";
import PopupAction from "@/components/modal/popup/PopupAction";
import React from "react";

export default function page() {
  return (
    <>
      {/* Delete Task */}
      <PopupAction
        title={"Delete Task"}
        color={"text-blue-600"}
        massageTitle={"Are you sure?"}
        massageBody={'You want to delete this task “Frontend"'}
        icon={<IconpopupDelete />}
        bgcolor={"bg-slate-red"}
        massageDo={"Yes, Delete"}
        massageUndo={"No, Cancel"}
      />

      {/* Leave workspace */}
      <PopupAction
        title={"Leave workspace"}
        color={"text-blue-600"}
        massageTitle={"Leave workspace?"}
        massageBody={"everything will be delete and can’t undo"}
        icon={<IconpopupLeave />}
        bgcolor={"bg-slate-orange"}
        massageDo={"Yes, Leave"}
        massageUndo={"No, Cancel"}
      />

      {/* Leave board */}
      <PopupAction
        title={"Leave board"}
        color={"text-blue-600"}
        massageTitle={"Are you sure?"}
        massageBody={"You want to leave this board “Zin two"}
        icon={<IconpopupLeave />}
        bgcolor={"bg-slate-orange"}
        massageDo={"Yes, Leave"}
        massageUndo={"No, Cancel"}
      />

      {/* Delete User */}
      <PopupAction
        title={"Delete User"}
        color={"text-blue-600"}
        massageTitle={"Are you sure?"}
        massageBody={"You want to delete “Roskan” from baord "}
        icon={<IconpopupDelete />}
        bgcolor={"bg-slate-red"}
        massageDo={"Yes, Delete"}
        massageUndo={"No, Cancel"}
      />

      {/* Delete Task */}
      <PopupAction
        title={"Delete Task"}
        color={"text-blue-600"}
        massageTitle={"Are you sure?"}
        massageBody={'You want to delete this task “Frontend"'}
        icon={<IconpopupDelete />}
        bgcolor={"bg-slate-red"}
        massageDo={"Yes, Delete"}
        massageUndo={"No, Cancel"}
      />

      {/* Add Gantt Chart when Empty */}
      <PopupAction
        title={"Add Gantt Chart when Empty"}
        color={"text-blue-600"}
        massageTitle={"Empty Gantt Chart?"}
        massageBody={"Please add your  Gantt Chart first"}
        icon={<IconQuestion />}
        bgcolor={"bg-[#FCD3D3]"}
        massageDo={"No, Cancel"}
        massageUndo={"Yes, let’s go"}
        swapButton={true}
      />

      {/* Delete Checklist */}
      <PopupAction
        title={"Delete Checklist"}
        color={"text-blue-600"}
        massageTitle={"Are you sure?"}
        massageBody={"You want to delete this checklist “Fetch Api”"}
        icon={<IconpopupDelete />}
        bgcolor={"bg-slate-red"}
        massageDo={"Yes, Delete"}
        massageUndo={"No, Cancel"}
      />

      {/* Delete Folder */}
      <PopupAction
        title={"Delete Folder"}
        color={"text-blue-600"}
        massageTitle={"Are you sure?"}
        massageBody={"You want to delete this folder"}
        icon={<IconpopupDelete />}
        bgcolor={"bg-slate-red"}
        massageDo={"Yes, Delete"}
        massageUndo={"No, Cancel"}
      />

      {/* Delete File */}
      <PopupAction
        title={"Delete File"}
        color={"text-blue-600"}
        massageTitle={"Are you sure?"}
        massageBody={"You want to delete this file"}
        icon={<IconpopupDelete />}
        bgcolor={"bg-slate-red"}
        massageDo={"Yes, Delete"}
        massageUndo={"No, Cancel"}
      />

      {/* No board yet */}
      <PopupAction
        title={"No board yet"}
        color={"text-blue-600"}
        massageTitle={"No board yet"}
        massageBody={"please create workspace and board first"}
        icon={<IconNoBoard />}
        bgcolor={"bg-slate-red"}
      />
    </>
  );
}
