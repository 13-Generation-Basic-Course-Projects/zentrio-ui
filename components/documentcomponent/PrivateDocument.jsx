"use client";
import React, { useState } from "react";
import MyDatePicker from "../date/Datepicker";
import BredCrum from "../bredcrum/MyBredcrum";
import CardFolder, { CardFile } from "../card/CardDoc";
import { Autocomplete, AutocompleteItem, Input } from "@heroui/react";
import ModalCreateDocu from "../modal/docu/ModalCreateDocu";

export default function Privatedocument({
  modal,
  documents,
  tokenFromGoogle,
  isHidden,
  workspaceId,
}) {
  const data = documents || { payload: [] };

  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const sortOptions = [
    { key: "asc", label: "A-Z" },
    { key: "desc", label: "Z-A" },
  ];

  const myFilter = (textValue, inputValue) => {
    if (!inputValue) return true;
    textValue = textValue.normalize("NFC").toLowerCase();
    inputValue = inputValue.normalize("NFC").toLowerCase();
    return textValue.startsWith(inputValue);
  };

  const transformedData = data.payload.map((doc) => {
    const docType = doc.documentType || "";
    const isGoogleDoc = docType.includes("google-apps.document");
    const isGoogleSheet = docType.includes("google-apps.spreadsheet");
    const isGoogleSlide = docType.includes("google-apps.presentation");
    const isFolder =
      !docType || (!isGoogleDoc && !isGoogleSheet && !isGoogleSlide);

    return {
      title: doc.description || "Untitled",
      status: doc._public ? "public" : "personal",
      id: doc.documentId,
      folderId: doc.folderId,
      date: new Date(doc.creationDate).toISOString().split("T")[0],
      type: isGoogleDoc
        ? "docx"
        : isGoogleSheet
        ? "xlsx"
        : isGoogleSlide
        ? "pptx"
        : "folder",
      category: isFolder ? "Folder" : "File",
      link: doc.drive_url || null,
    };
  });

  const filteredData = transformedData
    .filter((doc) => {
      const matchesTitle = myFilter(doc.title, searchTerm);
      const matchesDate = (() => {
        if (!selectedDate) return true;

        const selected = new Date(selectedDate);
        const docDate = new Date(doc.date);

        return (
          selected.getFullYear() === docDate.getFullYear() &&
          selected.getMonth() === docDate.getMonth() &&
          selected.getDate() === docDate.getDate()
        );
      })();

      return matchesTitle && matchesDate;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  return (
    <div className="h-screen flex flex-col">
      <div className="grid grid-cols-1 gap-3">
        <BredCrum
          board={"Hikko Design"}
          feature={"Document"}
          header={"Document"}
          modal={modal}
          workspaceId={workspaceId}
        />
        <div className="flex items-center justify-between pb-5">
          <div className="flex flex-row items-end gap-4 mb-4">
            <div className="flex-1">
              <MyDatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
            <div className="w-40">
              <Autocomplete
                labelPlacement="inside"
                placeholder="Select order"
                selectedKey={sortOrder}
                onSelectionChange={(key) => setSortOrder(key)}
                className="text-default-700/50 dark:placeholder:text-white/60 bg-gray-100 rounded-medium"
              >
                {sortOptions.map((option) => (
                  <AutocompleteItem key={option.key} textValue={option.label}>
                    {option.label}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
          </div>
          <div className="w-[340px] rounded-2xl flex justify-center items-center text-white">
            <Input
              isClearable
              onValueChange={(val) => setSearchTerm(val)}
              classNames={{
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
              startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
              }
            />
          </div>
        </div>
      </div>
      <div className="w-full max-h-screen overflow-y-auto scrollbar-hidden pb-[300px] px-5 pt-10">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <p className="text-h5 font-semibold">Folders</p>
            <span className="text-sm text-gray-500">
              {filteredData.filter((el) => el.category === "Folder").length}{" "}
              folders
            </span>
          </div>
          <div className="grid grid-cols-6 gap-3 pb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {filteredData.filter((el) => el.category === "Folder").length >
            0 ? (
              filteredData
                .filter((el) => el.category === "Folder")
                .map((el, i) => (
                  <CardFolder
                    key={`folder-${i}`}
                    title={el.title}
                    status={el.status}
                    date={el.date}
                    link={el.link}
                    documentId={el.id}
                    folderId={el.folderId}
                    isFolder={el.category === "Folder"}
                    tokenFromGoogle={tokenFromGoogle}
                    isHidden={isHidden}
                  />
                ))
            ) : (
              <p className="text-gray-500 col-span-6">No Folders</p>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-h5 font-semibold">Files</p>
            <span className="text-sm text-gray-500">
              {filteredData.filter((el) => el.category === "File").length} files
            </span>
          </div>
          <div className="grid grid-cols-6 gap-3 pb-4 pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {filteredData.filter((el) => el.category === "File").length > 0 ? (
              filteredData
                .filter((el) => el.category === "File")
                .map((el, i) => (
                  <CardFile
                    key={`file-${i}`}
                    title={el.title}
                    status={el.status}
                    date={el.date}
                    type={el.type}
                    link={el.link}
                    documentId={el.id}
                    folderId={el.folderId}
                    fileId=""
                    tokenFromGoogle={tokenFromGoogle}
                    isHidden={isHidden}
                  />
                ))
            ) : (
              <p className="text-gray-500 col-span-6">No Files</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const SearchIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
