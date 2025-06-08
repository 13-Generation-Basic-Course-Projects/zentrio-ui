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
import { CardFile } from "../../card/CardDoc";
import { getFileByFolderIdAction } from "@/action/document.action";

export default function ModalFolderList({ title, folderId, accessToken }) {
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
                  <p>No files found</p>
                ) : (
                  <div className="grid grid-cols-4 gap-4 overflow-y-auto scrollbar-hidden pb-[250px] p-2">
                    {data.map((el, i) => {
                      // Skip folders based on mimeType
                      if (
                        el.mimeType === "application/vnd.google-apps.folder"
                      ) {
                        return null;
                      }
                      // Map backend fields to CardFile props
                      const fileType =
                        el.mimeType.split("application/vnd.google-apps.")[1] ||
                        el.mimeType.split("/")[1] ||
                        "file";
                      return (
                        <CardFile
                          key={el.id || i} // Use id for unique key
                          title={el.name} // Map name to title
                          status="public" // Default status
                          date={new Date().toISOString().split("T")[0]} // Default date
                          type={fileType} // Extract file type
                          webViewLink={el.webViewLink} // Optional
                        />
                      );
                    })}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
