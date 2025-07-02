"use client";

import CardBoardReport from "@/components/card/CardBoardReport";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
export default function ModalSaveAs({ board , report }) {
  return (
    <Dropdown className={`p-0 bg-transparent borde-none`}>
      <DropdownTrigger>
        <Button className={`flex items-center gap-2 bg-white text-btn-sm border border-primary ${report?.payload?.groupedTasks.length == 0 ? `cursor-not-allowed` : ``}`} disabled={report?.payload?.groupedTasks.length == 0}>
          <span>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#000000"
            >
              <path d="M20.5 5.63c.88.31 1.5 1.15 1.5 2.12v10c0 2.35-1.9 4.25-4.25 4.25H7.75c-.98 0-1.81-.63-2.12-1.5h2.1l10.03.004c1.52 0 2.75-1.23 2.75-2.75V7.75l-.004-.05V5.63zM17.25 2C18.49 2 19.5 3.01 19.5 4.25v12.99c0 1.24-1.01 2.25-2.25 2.25H4.25C3.01 19.5 2 18.49 2 17.25V4.25C2 3.01 3.01 2 4.25 2h13zm0 1.5H4.25c-.41 0-.75.34-.75.75v12.99c0 .41.34.75.75.75H17.25c.41 0 .75-.34.75-.75V4.25c0-.41-.34-.75-.75-.75zM10.75 6.75c.41 0 .75.34.75.75v2.5h2.5c.41 0 .75.34.75.75s-.34.75-.75.75h-2.5v2.5c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2.5h-2.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.5v-2.5c0-.41.34-.75.75-.75z" />
            </svg>
          </span>
          Save As
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dynamic Actions"
        className="p-0 bg-transparent borde-none"
      >
        <DropdownItem className="p-0 bg-transparent borde-none">
          <CardBoardReport boardId={board} reports={report?.payload} allDataReport={report}/>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}