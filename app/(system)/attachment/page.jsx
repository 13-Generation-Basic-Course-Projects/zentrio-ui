"use client";
import { useState } from "react";
import ModalUploadAttachment from "@/components/modal/board/ModalUploadAttachment";

export default async function AttachmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulate test data — replace these with real values from context/router/etc.
  const boardId = "your-board-id";
  const checklistId = "2b336981-105a-4861-951b-5ddc3e3c3b7a"; // required

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAttachmentSelected = ({ files, links, result }) => {
      console.log("Attachment uploaded successfully:", { files, links, result });
      alert("Attachment uploaded successfully!");
    // refresh page or update UI as needed
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-2xl font-bold">Attachment Page</h1>
      <button
        onClick={handleOpenModal}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Open Upload Modal
      </button>

      {/* Modal with required props */}
      <ModalUploadAttachment
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        boardId={boardId}
        checklistId={checklistId}
        onAttachmentSelected={handleAttachmentSelected}
        role="Member"
      />
    </div>
  );
}
