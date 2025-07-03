"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React from "react";
import dynamic from "next/dynamic";
import { PDFPreviewer } from "../integrate/pdf/CustomePDF";

// const PDFPreview = dynamic(() => import("../integrate/pdf/CustomePDF"), {
//   ssr: false,
// });
export const BtnPreview = ({ report }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dataReport = report;

  return (
    <>
      <Button
        onPress={onOpen}
        className={`flex items-center gap-2 bg-white text-btn-sm border border-primary ${report?.payload?.groupedTasks.length == 0 ? `cursor-not-allowed` : ``}`}
        disabled={report?.payload?.groupedTasks.length == 0}
      >
        <span>
          <svg
            fill="#000000"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
          >
            <path d="M16 8C7.664 8 1.25 15.344 1.25 15.344L0.656 16l0.594 0.656S7.098 23.324 14.875 23.938c0.371 0.047 0.742 0.063 1.125 0.063s0.754-0.016 1.125-0.063C24.902 23.324 30.75 16.656 30.75 16.656L31.344 16l-0.594-0.656S24.336 8 16 8zm0 2c2.203 0 4.234 0.602 6 1.406C22.637 12.461 23 13.676 23 15c0 3.613-2.711 6.582-6.219 6.969C16.48 21.98 16.242 22 16 22s-0.48-0.02-0.719-0.031C11.711 21.582 9 18.613 9 15c0-1.305 0.352-2.52 0.969-3.563L9.938 11.438C11.719 10.617 13.773 10 16 10zm0 2c-1.656 0-3 1.344-3 3s1.344 3 3 3 3-1.344 3-3-1.344-3-3-3zM7.25 12.938c-0.156 0.672-0.25 1.348-0.25 2.063 0 1.754 0.5 3.395 1.375 4.782-2.52-1.457-4.27-3.195-4.844-3.781 0.48-0.492 1.82-1.797 3.719-3.063zm17.5 0c1.898 1.266 3.238 2.57 3.719 3.063-0.574 0.586-2.324 2.324-4.844 3.781C24.5 18.395 25 16.754 25 15c0-0.715-0.094-1.398-0.25-2.063z" />
          </svg>
        </span>
        Preview
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <PDFPreviewer report={dataReport}/>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const BtnSaveAs = () => {
  return (
    <Button className="flex items-center gap-2 bg-white text-btn-sm border border-primary">
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
  );
};