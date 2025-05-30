"use client";

import docs from "/public/image/docE.svg";
import Image from "next/image";

import { BtnCreateDoc } from "../button/Button";
import { Autocomplete, AutocompleteItem, DatePicker } from "@heroui/react";
import { useState } from "react";
export const animals = [
  {
    label: "A-Z",
    key: "A-Z",
    description: "The second most popular pet in the world",
  },
  {
    label: "Z-A",
    key: "Z-A",
    description: "The most popular pet in the world",
  },
];
export default function DocuEmpty() {
  const [startDate, setStartDate] = useState(null);
  const [value, setValue] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Default to A-Z

  // Simple filter: starts with input (case insensitive)
  const myFilter = (textValue, inputValue) => {
    if (inputValue.length === 0) return true;
    textValue = textValue.toLowerCase();
    inputValue = inputValue.toLowerCase();
    return textValue.startsWith(inputValue);
  };

  // Filter items by input value
  const filtered = animals.filter((animal) => myFilter(animal.label, value));

  // Sort filtered items by label depending on selected order
  filtered.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.label.localeCompare(b.label);
    } else {
      return b.label.localeCompare(a.label);
    }
  });

  return (
    <div className="p-6 space-y-4">
      <nav className="text-h6 text-[#94A3B8]">
        <ol className="flex space-x-2">
          <li>
            <a href="#" className=" hover:text-blueActive">
              Workspace
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-blueActive">
              Hikoko Design
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className=" hover:text-blueActive">
              Document
            </a>
          </li>
        </ol>
      </nav>
      <header className="text-h1 text-title font-semibold flex justify-between items-center">
        <p>Documents</p>
        <BtnCreateDoc />
      </header>
      <div className="flex justify-between items-center space-x-4">
        <div className="flex flex-row space-x-4 items-center">
          <div className="w-[150px]">
            <DatePicker
              radius="full"
              selected={startDate}
              onChange={setStartDate}
              placeholderText="Select date"
              selectorButtonPlacement="start"
              variant="bordered"
              classNames={{
                base: "rounded-full shadow-md",
                timeInput: true,
                selectorIcon: true,
                timeInputLabel: true,
                selectorButton:
                  "text-primary rounded-full text-[22px] border-none items-center",
              }}
            />
          </div>

          <div className="w-[150px]">
            <Autocomplete
              radius="full"
              defaultItems={filtered}
              label="Filter"
              variant="bordered"
              value={value}
              onInputChange={setValue}
              classNames={{
                base: "rounded-full h-10 shadow-md",
                selectorButton:
                  "text-primary rounded-full text-[22px] border-none items-center",
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.key}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </div>

        <form className="flex items-center w-[230px] max-w-md bg-[#FFFFFF] border border-gray-300 rounded-full overflow-hidden shadow-md focus-within:ring-2 focus-within:ring-blue-500 px-3 py-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500"
          >
            <circle
              cx="10.5"
              cy="10.5"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z"
              fill="currentColor"
            />
          </svg>

          <input
            type="text"
            placeholder="Search your files"
            required
            className="flex-1 ml-2 text-btn-sm text-title/70 placeholder-title/70 bg-transparent focus:outline-none"
          />
        </form>
      </div>

      {/*please get here : section empty */}
      <section className="flex justify-center items-center ">
        <div className="flex flex-col items-center space-y-4 text-center ">
          <div className="w-[300px] h-[200px] mb-2">
            <Image
              src={docs}
              alt="Document"
              layout="responsive"
              width={300}
              height={200}
              objectFit="cover"
            />
          </div>

          <p className="text-h4  font-semibold text-title/80">
            Ooops! It’s Emplty
          </p>
          <p className="text-h6 text-description max-w-lg">
            Looks like you don’t have anything in your document
          </p>
        </div>
      </section>
    </div>
  );
}
