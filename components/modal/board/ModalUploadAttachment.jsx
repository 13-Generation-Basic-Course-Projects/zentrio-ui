"use client";

import { getAllDocumentByBoardIdAction } from "@/action/document.action";
// import { SearchIcon } from "@/components/documentcomponent/AllDocument";
import { documentData } from "@/data/docu/documentData";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDraggable,
} from "@heroui/modal";
import { Button, Input } from "@heroui/react";
import React, { useEffect, useState } from "react";

const ModalUploadAttachment = ({ isOpen, onClose, boardId }) => {
  if (!isOpen) return null;
  const targetRef = React.useRef(null);
  const { moveProps } = useDraggable({
    targetRef,
    canOverflow: true,
    isDisabled: !isOpen,
  });
  console.log("boardIIIId ", boardId);

  const [link, setLink] = useState(""); // input value
  const [appliedLinks, setAppliedLinks] = useState([]); // store multiple links

  const handleApply = () => {
    const trimmedLink = link.trim();
    if (trimmedLink !== "") {
      setAppliedLinks((prev) => [...prev, trimmedLink]);
      setLink(""); // clear input after apply
    }
  };

  const handleDelete = (index) => {
    setAppliedLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const data = documentData;
  // Utility function to format dates
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
    } catch (error) {
      return "Invalid date";
    }
  };

  // Utility function to extract simple document type from MIME type
  const getSimpleDocumentType = (documentType) => {
    if (!documentType) return "docx"; // default fallback

    // Handle Google Apps types
    if (documentType.includes("google-apps")) {
      if (documentType.includes("presentation")) return "pptx";
      if (documentType.includes("spreadsheet")) return "xlsx";
      if (documentType.includes("document")) return "docx";
      return "docx";
    }

    // Handle standard MIME types
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

    // Extract extension from MIME type
    const parts = documentType.split("/");
    if (parts.length > 1) {
      const subtype = parts[1];
      if (subtype.includes("pdf")) return "pdf";
      if (subtype.includes("doc")) return "docx";
      if (subtype.includes("sheet")) return "xlsx";
      if (subtype.includes("presentation")) return "pptx";
    }

    return "docx"; // fallback
  };

  // File Icon Component (using your existing structure)
  function FileIcon({ documentType, size = 20 }) {
    // Mock icons object - replace with your actual icons
    const icons = {
      pdf: "https://cdn-icons-png.flaticon.com/128/4726/4726010.png",
      docx: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
      xlsx: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
      pptx: "https://cdn-icons-png.flaticon.com/128/2875/2875416.png",
      
    };

    const simpleType = getSimpleDocumentType(documentType);
    const src = icons[simpleType] || icons.docx;

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

  
 
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelect = (file) => {
    setSelectedFiles((prevSelected) => {
      // Check if the file is already selected
      const isSelected = prevSelected.some((f) => f.title === file.title);
      if (isSelected) {
        // If selected, remove it (deselect)
        return prevSelected.filter((f) => f.title !== file.title);
      } else {
        // If not selected, add it
        return [...prevSelected, file];
      }
    });
  };
  const handleRemoveFile = (fileToRemove) => {
    setSelectedFiles((prev) =>
      prev.filter((file) => file.title !== fileToRemove.title)
    );
  };

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDocuments = async () => {
      if (boardId) {
        setLoading(true);
        try {
          const allDocument = await getAllDocumentByBoardIdAction(boardId);
          console.log("Fetched documents: ", allDocument);
          setDocuments(allDocument || []);
        } catch (error) {
          console.error("Error fetching documents:", error);
          setDocuments([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDocuments();
  }, [boardId, isOpen]);
  
  console.log("handleGetAllDocuemnt: ", documents);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="xl"
      ref={targetRef}
      className="h-[600px] overflow-auto scrollbar-hidden"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1 ">
              <div className="flex flex-wrap space-x-2 ">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="30"
                    height="30"
                    fill="none"
                    viewBox="0 0 30 30"
                  >
                    <path
                      fill="url(#pattern0_3611_140426)"
                      d="M0 0h30v30H0z"
                    ></path>
                    <defs>
                      <pattern
                        id="pattern0_3611_140426"
                        width="1"
                        height="1"
                        patternContentUnits="objectBoundingBox"
                      >
                        <use
                          xlinkHref="#image0_3611_140426"
                          transform="scale(.00195)"
                        ></use>
                      </pattern>
                      <image
                        xlinkHref="data:image/png;base64,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"
                        id="image0_3611_140426"
                        width="512"
                        height="512"
                        preserveAspectRatio="none"
                      ></image>
                    </defs>
                  </svg>
                </div>
                <p>Upload</p>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="text-title">
                <div className="flex flex-wrap items-center justify-between">
                  <p className="text-h6 text-title/80">Choose file here</p>
                  {/* for searching */}
                  <div>
                    <Input
                      isClearable
                      classNames={{
                        base: "rounded-large border-2", // Apply background here
                        label: "text-black/50 dark:text-white/90",
                        input: [
                          "bg-transparent",
                          "text-black/90 dark:text-white/90",
                          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        innerWrapper: "bg-transparent", // Optional, if you need transparency inside
                      }}
                      placeholder="Type to search..."
                      radius="lg"
                      //   startContent={
                      //     <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                      //   }
                    />
                  </div>
                </div>
                {/* data that have map */}
                <div>
                  <div className="border-1 rounded-large p-5 mt-6 h-[250px] overflow-auto scrollbar-hidden text-caption">
                    {documents?.payload?.map((item, index) => (
                      <div
                        key={index}
                        className={`flex flex-col mb-4 cursor-pointer ${
                          selectedFiles.some((f) => f.title === item.title)
                            ? "bg-title/10 text-primary/80 p-2 rounded-large"
                            : "hover:bg-title/5 hover:text-title/50 p-2 rounded-large"
                        }`}
                        onClick={() => handleSelect(item)}
                      >
                        <div className="flex justify-between items-center text-h6">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <FileIcon documentType={item?.documentType} />
                            <p className="truncate" title={item?.description}>
                              {item?.description || "Untitled Document"}
                            </p>
                          </div>
                          <p className="text-title/50 text-caption-tiny ml-2 flex-shrink-0">
                            {formatDate(item?.creationDate)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attachment link */}
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
                          placeholder="Attach link here"
                          radius="lg"
                        />
                      </div>
                      <Button
                        className="rounded-large bg-primary text-white hover:bg-primary/90"
                        onClick={handleApply}
                      >
                        Apply
                      </Button>
                    </div>

                    {/* Applied Links */}
                    {appliedLinks.length > 0 && (
                      <div className="flex flex-col space-y-2 h-[100px] overflow-auto scrollbar-hidden">
                        {appliedLinks.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-2 bg-gray-100 rounded-large"
                          >
                            <a
                              href={item}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline break-all"
                            >
                              {item}
                            </a>
                            <button
                              onClick={() => handleDelete(index)}
                              className="hover:text-progress-red text-caption ml-4"
                              aria-label="Delete link"
                            >
                              <svg
                                width="18"
                                height="20"
                                viewBox="0 0 18 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
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

                {/* show have selected */}
                <p className="text-title font-semibold mt-8">
                  Selected File{selectedFiles.length !== 1 ? "s" : ""}:{" "}
                  {selectedFiles.length}
                </p>
                {selectedFiles.length > 0 ? (
                  <div className="flex flex-col space-y-3 mt-4 h-[150px] overflow-auto scrollbar-hidden">
                    {selectedFiles.map((file) => (
                      <div
                        key={file.title}
                        className="p-3 bg-blue-100 rounded-medium flex justify-between items-center"
                      >
                        <div>
                          <p>{file.title}</p>
                          <p className="text-caption">{file.date}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveFile(file)}
                          className="hover:text-progress-red text-caption ml-4"
                        >
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
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
                      No file selected
                    </p>
                  </div>
                )}
              </div>

              <Button color="primary" radius="full" onPress={onClose}>
                Upload
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalUploadAttachment;
