"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
} from "@heroui/react";
import { useState } from "react";
import { IconpopupDelete, IconPopupPined } from "@/components/icon/Iconpopup";

import ModalDeleteAnnoun from "./ModalDeleteAnnoun";
import ModalPinedAnnoun from "./ModalPinedAnnoun";
import ModalEditAnnoun from "./ModalEditAnnoun";

const EditAnnouncementIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#143A47"
    width="18"
    height="18"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const PinnedAnnouncementIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="#143A47"
    width="18"
    height="18"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 
         1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9
         M15 11.25 12.75 9"
    />
  </svg>
);

const DeleteDocumentIcon = (props) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.5 3H9.5C9.5 2.17157 8.82843 1.5 8 1.5C7.17157 1.5 6.5 2.17157 6.5 3ZM5.5 3C5.5 1.61929 6.61929 0.5 8 0.5C9.38071 0.5 10.5 1.61929 10.5 3H15.5C15.7761 3 16 3.22386 16 3.5C16 3.77614 15.7761 4 15.5 4H14.4456L13.2521 14.3439C13.0774 15.8576 11.7957 17 10.2719 17H5.72813C4.20431 17 2.92256 15.8576 2.7479 14.3439L1.55437 4H0.5C0.223858 4 0 3.77614 0 3.5C0 3.22386 0.223858 3 0.5 3H5.5ZM3.74131 14.2292C3.85775 15.2384 4.71225 16 5.72813 16H10.2719C11.2878 16 12.1422 15.2384 12.2587 14.2292L13.439 4H2.56101L3.74131 14.2292ZM6.5 6.5C6.77614 6.5 7 6.72386 7 7V13C7 13.2761 6.77614 13.5 6.5 13.5C6.22386 13.5 6 13.2761 6 13V7C6 6.72386 6.22386 6.5 6.5 6.5ZM10 7C10 6.72386 9.77614 6.5 9.5 6.5C9.22386 6.5 9 6.72386 9 7V13C9 13.2761 9.22386 13.5 9.5 13.5C9.77614 13.5 10 13.2761 10 13V7Z"
      fill="#143A47"
    />
  </svg>
);

export default function ModalOptionAnnoun({
  Announcement,
  announId,
  boardId,
  boardMember,
  preventUserImage,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <>
      <Dropdown className="z-[10px]">
        <DropdownTrigger>
          <div className="p-0 min-w-0 h-auto w-auto cursor-pointer">
            <div className="hover:text-black text-gray-600 px-2 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
          </div>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Dropdown menu"
          variant="faded"
          className="min-w-[200px]"
        >
          <DropdownItem
            key="pin"
            showDivider
            startContent={<PinnedAnnouncementIcon className={iconClasses} />}
            onClick={() => setShowPin(true)}
          >
            <span>Pin</span>
          </DropdownItem>

          <DropdownItem
            key="edit"
            showDivider
            startContent={<EditAnnouncementIcon className={iconClasses} />}
            onClick={() => setShowEdit(true)}
          >
            <span>Edit</span>
          </DropdownItem>

          <DropdownItem
            key="delete"
            className="mb-1"
            startContent={<DeleteDocumentIcon className={cn(iconClasses)} />}
            onClick={() => setShowDelete(true)}
          >
            <span>Delete</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Independent modals triggered by local state */}
      <ModalPinedAnnoun
        title="Pin"
        massageTitle="Are you sure?"
        massageBody="You want to pin it."
        icon={<IconPopupPined />}
        bgcolor="bg-slate-blue"
        massageDo="Yes, Pin"
        massageUndo="No, Cancel"
        announId={announId}
        isOpen={showPin}
        onClose={() => setShowPin(false)}
      />

      <ModalEditAnnoun
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title="Edit"
        announId={announId}
        boardId={boardId}
        Announcement={Announcement}
        boardMember={boardMember}
        preventUserImage={preventUserImage}
      />

      <ModalDeleteAnnoun
        title="Delete"
        massageTitle="Are you sure?"
        massageBody="You want to delete it."
        icon={<IconpopupDelete />}
        bgcolor="bg-slate-red"
        massageDo="Yes, Delete"
        massageUndo="No, Cancel"
        announId={announId}
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
      />
    </>
  );
}
