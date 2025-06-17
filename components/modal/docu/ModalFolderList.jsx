"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { IconFolder } from "../../icon/everyicon";
import CardFolder, { CardFile } from "../../card/CardDoc";
import { getFileByFolderIdAction } from "@/action/document.action";
import NoFilesFound from "./NoFilesFound";
import ModalCreateDocuInFolder from "./ModalCreateDocuInFolder";

export default function ModalFolderList({
  title,
  folderId,
  boardId,
  accessToken,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentFolderId, setCurrentFolderId] = useState(folderId);
  const [folderStack, setFolderStack] = useState([folderId]); // for "back" navigation
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if we're in a subfolder (not the root folder)
  const isInSubfolder = folderStack.length > 1;

  const goToFolder = (newFolderId) => {
    setFolderStack((prev) => [...prev, newFolderId]);
    setCurrentFolderId(newFolderId);
  };

  const goBack = () => {
    if (folderStack.length > 1) {
      const updatedStack = [...folderStack];
      updatedStack.pop(); // remove current folder
      const prevFolder = updatedStack[updatedStack.length - 1];
      setFolderStack(updatedStack);
      setCurrentFolderId(prevFolder);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getFileByFolderIdAction(accessToken, currentFolderId);
        const payload = Array.isArray(result?.payload) ? result.payload : [];
        setData(payload);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to fetch files");
        setData([]);
        setLoading(false);
      }
    };

    if (currentFolderId) {
      fetchData();
    }
  }, [currentFolderId, accessToken]);

  // Determine grid layout based on whether we're in a subfolder
  const getGridLayout = () => {
    if (isInSubfolder) {
      // Different layout for subfolder - could be list view, different grid, etc.
      return "grid grid-cols-2 gap-6"; // 2 columns instead of 4
      // Or use: "flex flex-col space-y-3" for list view
    }
    return "grid grid-cols-4 gap-4"; // Default 4-column grid for root
  };

  return (
    <>
      <Button
        disableRipple
        onPress={onOpen}
        className="max-h-none h-fit bg-transparent"
      >
        <div className="overflow-visible py-10 flex flex-col items-center space-y-2">
          <IconFolder />
          <p className="truncate text-base font-extrabold text-title/80 text-center px-2">
            {title}
          </p>
        </div>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={"4xl"}
        scrollBehavior="inside"
        classNames={{
          base: "overflow-hidden",
          body: "overflow-hidden",
        }}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  {folderStack.length > 1 && (
                    <button
                      onClick={goBack}
                      className="text-sm px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                    >
                      ← Back
                    </button>
                  )}
                  <span className="text-lg font-bold">
                    {title}
                    {isInSubfolder && " - Subfolder View"}
                  </span>
                </div>
              </ModalHeader>

              <ModalBody>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : data.length === 0 ? (
                  <NoFilesFound />
                ) : (
                  <div className={`${getGridLayout()} overflow-y-auto pb-[250px] p-2`}>
                    {data.map((el, i) => {
                      const isFolder = el.mimeType === "application/vnd.google-apps.folder";
                      const fileType = el.mimeType.includes("document")
                        ? "docx"
                        : el.mimeType.includes("spreadsheet")
                        ? "xlsx"
                        : el.mimeType.includes("presentation")
                        ? "pptx"
                        : el.mimeType.includes("folder")
                        ? "folder"
                        : el.mimeType.split("/")[1] || "file";

                      return isFolder ? (
                        <CardFolder
                          key={`folder-${i}`}
                          title={el.name || "Untitled Folder"}
                          status={el.status || "personal"}
                          date={new Date().toISOString().split("T")[0]}
                          link={el.webViewLink}
                          documentId={el.id}
                          folderId={el.id}
                          tokenFromGoogle={accessToken}
                          onClick={() => goToFolder(el.id)} // change folder content inside modal
                        />
                      ) : (
                        <CardFile
                          key={el.id || i}
                          title={el.name}
                          status={el.status || "personal"}
                          date={new Date().toISOString().split("T")[0]}
                          type={fileType}
                          link={el.webViewLink}
                        />
                      );
                    })}
                  </div>
                )}

                <ModalCreateDocuInFolder
                  folderId={currentFolderId}
                  boardId={boardId}
                  tokenFromGoogle={accessToken}
                />
              </ModalBody>

              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}