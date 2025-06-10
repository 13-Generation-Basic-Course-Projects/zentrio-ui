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
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data when component mounts or folderId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getFileByFolderIdAction(accessToken, folderId);
        console.log("Fetched result:", result); // Debug: Log the result

        // Ensure result.payload is an array, fallback to empty array
        const payload = Array.isArray(result?.payload) ? result.payload : [];
        setData(payload);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to fetch files");
        setData([]); // Ensure data is an array even on error
        setLoading(false);
      }
    };

    if (folderId) {
      fetchData();
    } else {
      console.warn("No folderId provided"); // Debug: Warn if folderId is missing
      setData([]);
      setLoading(false);
    }
  }, [folderId, accessToken]);

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
          backdrop: "overflow-hidden",
          wrapper: "overflow-hidden",
          body: "overflow-hidden",
        }}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                {loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : data.length === 0 ? (
                  <NoFilesFound />
                ) : (
                  <div className="grid grid-cols-4 gap-4 overflow-y-auto scrollbar-hidden pb-[250px] p-2">
                    {data.map((el, i) => {
                      // Check if it's a folder
                      if (
                        el.mimeType === "application/vnd.google-apps.folder"
                      ) {
                        return (
                          <CardFolder
                            key={`folder-${i}`}
                            title={el.name || "Untitled Folder"}
                            status={el.status || "personal"}
                            date={new Date().toISOString().split("T")[0]}
                            link={el.webViewLink}
                            documentId={el.id}
                            folderId={el.id}
                            tokenFromGoogle={accessToken}
                          />
                        );
                      }

                      const mime = el.mimeType;
                      const fileType = mime.includes("document")
                        ? "docx"
                        : mime.includes("spreadsheet")
                        ? "xlsx"
                        : mime.includes("presentation")
                        ? "pptx"
                        : mime.includes("folder")
                        ? "folder"
                        : mime.split("/")[1] || "file";

                      return (
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
                  folderId={folderId}
                  boardId={boardId}
                  tokenFromGoogle={accessToken}
                />
              </ModalBody>

              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
