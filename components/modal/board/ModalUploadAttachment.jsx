"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDraggable,
} from "@heroui/modal";
import { Button, Input } from "@heroui/react";
import {
  getAllDocumentByBoardIdAction,
  postAttactmentAction,
} from "@/action/document.action";
import { toast } from "react-toastify";

const ModalUploadAttachment = ({
  isOpen,
  onClose,
  boardId,
  checklistId,
  onAttachmentSelected,
  role,
}) => {
  if (!isOpen) return null;

  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });

  const [link, setLink] = useState("");
  const [appliedLinks, setAppliedLinks] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleApply = () => {
    const trimmedLink = link.trim();
    if (trimmedLink !== "" && isValidUrl(trimmedLink)) {
      setAppliedLinks((prev) => [...prev, trimmedLink]);
      setLink("");
      setError(null);
    } else {
      setError("Please enter a valid URL");
      toast.error("Invalid URL", { position: "top-right", autoClose: 4000 });
    }
  };

  const handleDelete = (index) => {
    setAppliedLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelect = (file) => {
    setSelectedFiles((prev) => {
      const isAlreadySelected = prev.some(
        (selectedFile) => selectedFile.documentId === file.documentId
      );
      if (isAlreadySelected) {
        return prev.filter(
          (selectedFile) => selectedFile.documentId !== file.documentId
        );
      }
      return [...prev, file];
    });
  };

  const handleUpload = async () => {
    if (role === "ROLE_MEMBER") {
      setError("You do not have permission to upload attachments");
      toast.error("You do not have permission to upload attachments", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    if (selectedFiles.length === 0 && appliedLinks.length === 0) {
      setError("Please select at least one file or link");
      toast.error("Please select at least one file or link", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    setUploading(true);
    setError(null);

    const documentIds = selectedFiles.map((file) => file.documentId);
    // Extract drive URLs from selected files
    const driveUrls = selectedFiles
      .filter((file) => file.drive_url)
      .map((file) => file.drive_url);

    const detailsPayload = {
      details: {
        ...(documentIds.length > 0 && {
          documentIds: documentIds.join(","),
        }),
        ...(appliedLinks.length > 0 && {
          links: appliedLinks.join(","),
        }),
        ...(driveUrls.length > 0 && {
          drive_url: driveUrls.join(","),
        }),
      },
    };

    console.log(
      "Sending attachment payload:",
      JSON.stringify(detailsPayload, null, 2)
    );

    try {
      const result = await postAttactmentAction(checklistId, detailsPayload);
      if (result.success) {
        onAttachmentSelected(result.payload);
        setSelectedFiles([]);
        setAppliedLinks([]);
        onClose();
        toast.success("Attachment uploaded successfully", {
          position: "top-right",
          autoClose: 2500,
        });
      } else {
        throw new Error(
          result.detail || result.error || "Failed to upload attachment"
        );
      }
    } catch (error) {
      const errorMessage = error.message.includes("JSON parse error")
        ? "Invalid data format sent to server. Please ensure links are valid URLs."
        : error.message || "Failed to upload attachment";
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return "Invalid date";
    }
  };

  const getSimpleDocumentType = (documentType) => {
    if (!documentType) return "docx";
    if (documentType.includes("google-apps")) {
      if (documentType.includes("presentation")) return "pptx";
      if (documentType.includes("spreadsheet")) return "xlsx";
      if (documentType.includes("document")) return "docx";
      return "docx";
    }
    if (documentType.includes("pdf")) return "pdf";
    if (documentType.includes("word") || documentType.includes("msword"))
      return "docx";
    if (documentType.includes("excel") || documentType.includes("spreadsheet"))
      return "xlsx";
    if (
      documentType.includes("powerpoint") ||
      documentType.includes("presentation")
    )
      return "pptx";
    if (documentType.includes("text")) return "txt";
    if (documentType.includes("image")) return "img";
    const parts = documentType.split("/");
    if (parts.length > 1) {
      const subtype = parts[1];
      if (subtype.includes("pdf")) return "pdf";
      if (subtype.includes("doc")) return "docx";
      if (subtype.includes("sheet")) return "xlsx";
      if (subtype.includes("presentation")) return "pptx";
    }
    return "docx";
  };

  function FileIcon({ documentType, size = 20 }) {
    const icons = {
      pdf: "https://cdn-icons-png.flaticon.com/128/4726/4726010.png",
      docx: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
      xlsx: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
      pptx: "https://cdn-icons-png.flaticon.com/128/2875/2875416.png",
      default: "https://cdn-icons-png.flaticon.com/128/833/833524.png",
    };
    const simpleType = getSimpleDocumentType(documentType);
    const src = icons[simpleType] || icons.default;
    return (
      <img
        src={src}
        alt={`${simpleType || "document"} icon`}
        width={size}
        height={size}
        className="object-contain"
      />
    );
  }

  const isFileSelected = (file) => {
    return selectedFiles.some(
      (selectedFile) => selectedFile.documentId === file.documentId
    );
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      if (boardId) {
        setLoading(true);
        try {
          const allDocument = await getAllDocumentByBoardIdAction(boardId);
          console.log("Fetched documents:", allDocument);
          setDocuments(allDocument?.payload || []);
        } catch (error) {
          console.error("Error fetching documents:", error);
          setDocuments([]);
          setError("Failed to load documents");
          toast.error("Failed to load documents", {
            position: "top-right",
            autoClose: 4000,
          });
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDocuments();
  }, [boardId, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFiles([]);
      setAppliedLinks([]);
      setError(null);
      setLink("");
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="xl"
      ref={targetRef}
      className="h-[600px] overflow-auto scrollbar-hidden">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              <div className="flex flex-wrap space-x-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 30 30">
                    <path fill="url(#pattern0_3611_140426)" d="M0 0h30v30H0z" />
                    <defs>
                      <pattern
                        id="pattern0_3611_140426"
                        width="1"
                        height="1"
                        patternContentUnits="objectBoundingBox">
                        <use
                          xlinkHref="#image0_3611_140426"
                          transform="scale(.00195)"
                        />
                      </pattern>
                    </defs>
                  </svg>
                </div>
                <p>Upload Attachment</p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="text-title">
                {error && (
                  <div className="text-sm text-red-500 p-2 bg-gray-50 rounded border border-red-200 mb-4">
                    <div className="flex items-center">
                      <svg
                        className="h-4 w-4 mr-2 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {error}
                    </div>
                  </div>
                )}
                <div className="flex flex-wrap items-center justify-between">
                  <p className="text-h6 text-title/80">Choose file here</p>
                  <div>
                    <Input
                      isClearable
                      classNames={{
                        base: "rounded-large border-2",
                        label: "text-black/50 dark:text-white/90",
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90",
                          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent",
                      }}
                      placeholder="Type to search..."
                      radius="lg"
                    />
                  </div>
                </div>
                <div>
                  {loading ? (
                    <div className="border-1 rounded-large p-5 mt-6 h-[250px] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                      <p className="ml-2">Loading documents...</p>
                    </div>
                  ) : (
                    <div className="border-1 rounded-large p-5 mt-6 h-[250px] overflow-auto scrollbar-hidden text-caption">
                      {documents.length > 0 ? (
                        documents.map((item, index) => {
                          const isSelected = isFileSelected(item);
                          return (
                            <div
                              key={
                                item.documentId ||
                                `${item.title}-${item.creationDate}-${index}`
                              }
                              className={`flex flex-col mb-4 cursor-pointer transition-colors ${
                                isSelected
                                  ? "bg-title/10 text-primary/80 p-2 rounded-large"
                                  : "hover:bg-title/5 hover:text-title/50 p-2 rounded-large"
                              }`}
                              onClick={() => handleSelect(item)}>
                              <div className="flex justify-between items-center text-h6">
                                <div className="flex items-center space-x-2 flex-1 min-w-0">
                                  <FileIcon documentType={item?.documentType} />
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className="truncate"
                                      title={item?.description || item?.title}>
                                      {item?.description ||
                                        item?.title ||
                                        "Untitled Document"}
                                    </p>
                                    {/* Show indication if file has drive URL */}
                                    {item?.drive_url && (
                                      <p className="text-xs text-green-600">
                                        📁 Google Drive File
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <p className="text-title/50 text-caption-tiny ml-2 flex-shrink-0">
                                  {formatDate(item?.creationDate)}
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-title/50">No documents found</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2 mt-5">
                  <p className="text-h6">Attach link</p>
                  <div className="flex flex-col space-y-3 p-2 rounded-large shadow-sm border">
                    <div className="text-title flex flex-wrap justify-between items-center bg-white">
                      <div className="flex-1 mr-4 relative">
                        <Input
                          isClearable
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          onClear={() => setLink("")}
                          classNames={{
                            base: "rounded-large border-2 bg-gray-100",
                            label: "text-black/50 dark:text-white/90",
                            input: [
                              "bg-transparent",
                              "text-black/90 dark:text-white/90",
                              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                            ],
                            innerWrapper: "bg-transparent",
                          }}
                          placeholder="Attach link here (e.g., https://example.com)"
                          radius="lg"
                        />
                      </div>
                      <Button
                        className="rounded-large bg-primary text-white hover:bg-primary/90"
                        onClick={handleApply}
                        disabled={role === "ROLE_MEMBER" || !link.trim()}>
                        Apply
                      </Button>
                    </div>
                    {appliedLinks.length > 0 && (
                      <div className="flex flex-col space-y-2 h-[100px] overflow-auto scrollbar-hidden">
                        {appliedLinks.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-gray-100 rounded-large">
                            <a
                              href={item}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline break-all">
                              {item}
                            </a>
                            <button
                              onClick={() => handleDelete(index)}
                              className="hover:text-progress-red text-caption ml-4"
                              aria-label="Delete link">
                              <svg
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M15.25 4.58337L14.7336 12.9376C14.6016 15.0721 14.5356 16.1393 14.0006 16.9066C13.7361 17.286 13.3955 17.6061 13.0006 17.8467C12.2018 18.3334 11.1325 18.3334 8.99395 18.3334C6.8526 18.3334 5.78192 18.3334 4.98254 17.8458C4.58733 17.6048 4.24666 17.284 3.98224 16.9041C3.4474 16.1355 3.38288 15.0668 3.25384 12.9293L2.75 4.58337"
                                  stroke="#FF2D55"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M1.5 4.58329H16.5M12.3798 4.58329L11.8109 3.40973C11.433 2.63017 11.244 2.24039 10.9181 1.9973C10.8458 1.94338 10.7692 1.89541 10.6892 1.85388C10.3283 1.66663 9.8951 1.66663 9.02877 1.66663C8.14069 1.66663 7.69665 1.66663 7.32974 1.86173C7.24842 1.90497 7.17082 1.95487 7.09774 2.01093C6.76803 2.26388 6.58386 2.66792 6.2155 3.47601L5.71077 4.58329"
                                  stroke="#FF2D55"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-title font-semibold mt-8">
                  Selected Files: {selectedFiles.length} | Links:{" "}
                  {appliedLinks.length}
                  {selectedFiles.filter((file) => file.drive_url).length > 0 &&
                    ` | Drive Files: ${
                      selectedFiles.filter((file) => file.drive_url).length
                    }`}
                </p>
                {selectedFiles.length > 0 || appliedLinks.length > 0 ? (
                  <div className="flex flex-col space-y-3 mt-4 h-[150px] overflow-auto scrollbar-hidden">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={`file-${index}`}
                        className="p-3 bg-blue-100 rounded-medium flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <FileIcon documentType={file.documentType} />
                          <div>
                            <p className="font-medium">
                              {file.description ||
                                file.title ||
                                "Untitled Document"}
                            </p>
                            <p className="text-caption text-gray-600">
                              {formatDate(file.creationDate)} • File
                              {file.drive_url && (
                                <span className="text-green-600 ml-1">
                                  • Google Drive
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedFiles((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="hover:text-progress-red text-caption ml-4"
                          aria-label="Remove file">
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15.25 4.58337L14.7336 12.9376C14.6016 15.0721 14.5356 16.1393 14.0006 16.9066C13.7361 17.286 13.3955 17.6061 13.0006 17.8467C12.2018 18.3334 11.1325 18.3334 8.99395 18.3334C6.8526 18.3334 5.78192 18.3334 4.98254 17.8458C4.58733 17.6048 4.24666 17.284 3.98224 16.9041C3.4474 16.1355 3.38288 15.0668 3.25384 12.9293L2.75 4.58337"
                              stroke="#FF2D55"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M1.5 4.58329H16.5M12.3798 4.58329L11.8109 3.40973C11.433 2.63017 11.244 2.24039 10.9181 1.9973C10.8458 1.94338 10.7692 1.89541 10.6892 1.85388C10.3283 1.66663 9.8951 1.66663 9.02877 1.66663C8.14069 1.66663 7.69665 1.66663 7.32974 1.86173C7.24842 1.90497 7.17082 1.95487 7.09774 2.01093C6.76803 2.26388 6.58386 2.66792 6.2155 3.47601L5.71077 4.58329"
                              stroke="#FF2D55"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {appliedLinks.map((link, index) => (
                      <div
                        key={`link-${index}`}
                        className="p-3 bg-green-100 rounded-medium flex justify-between items-center">
                        <div>
                          <p className="font-medium text-blue-600 underline break-all">
                            {link}
                          </p>
                          <p className="text-caption text-gray-600">Link</p>
                        </div>
                        <button
                          onClick={() => handleDelete(index)}
                          className="hover:text-progress-red text-caption ml-4"
                          aria-label="Remove link">
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15.25 4.58337L14.7336 12.9376C14.6016 15.0721 14.5356 16.1393 14.0006 16.9066C13.7361 17.286 13.3955 17.6061 13.0006 17.8467C12.2018 18.3334 11.1325 18.3334 8.99395 18.3334C6.8526 18.3334 5.78192 18.3334 4.98254 17.8458C4.58733 17.6048 4.24666 17.284 3.98224 16.9041C3.4474 16.1355 3.38288 15.0668 3.25384 12.9293L2.75 4.58337"
                              stroke="#FF2D55"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M1.5 4.58329H16.5M12.3798 4.58329L11.8109 3.40973C11.433 2.63017 11.244 2.24039 10.9181 1.9973C10.8458 1.94338 10.7692 1.89541 10.6892 1.85388C10.3283 1.66663 9.8951 1.66663 9.02877 1.66663C8.14069 1.66663 7.69665 1.66663 7.32974 1.86173C7.24842 1.90497 7.17082 1.95487 7.09774 2.01093C6.76803 2.26388 6.58386 2.66792 6.2155 3.47601L5.71077 4.58329"
                              stroke="#FF2D55"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 p-3 bg-gray-100 rounded-large">
                    <p className="text-title/50 font-medium rounded-large">
                      No files or links selected
                    </p>
                  </div>
                )}
                <Button
                  color="primary"
                  radius="full"
                  onPress={handleUpload}
                  isLoading={uploading}
                  isDisabled={
                    role === "ROLE_MEMBER" ||
                    (selectedFiles.length === 0 && appliedLinks.length === 0)
                  }
                  className="mt-4 w-full">
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalUploadAttachment;
