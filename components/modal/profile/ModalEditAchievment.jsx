"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Tabs,
  Tab,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import React, { useState } from "react";
import {
  IconEdit,
  IconJob,
  IconMap,
  IconPhone,
  IconShield,
  IconUser,
} from "../../icon/everyicon";
import Image from "next/image";
import correctIcon from "@/assets/correct.png";

export const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "other", label: "Other" },
];

export function ModalEditAchievment() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState("Achievement");

  const boards = [
    { percent: 25, role: "Owner", color: "bg-progress-red" },
    { percent: 50, role: "Team Leader", color: "bg-progress-orange" },
    { percent: 75, role: "Owner", color: "bg-progress-blue" },
    { percent: 90, role: "Owner", color: "bg-progress-green" },
    { percent: 90, role: "Owner", color: "bg-progress-green" },
    { percent: 90, role: "Owner", color: "bg-progress-green" },
    { percent: 90, role: "Owner", color: "bg-progress-green" },
    { percent: 90, role: "Owner", color: "bg-progress-green" },
    { percent: 90, role: "Owner", color: "bg-progress-green" },
  ];

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        <IconEdit strokeWidth={1.5} size={5} color={"currentColor"} /> Edit
        Achievment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p className="text-h2  text-primary flex flex-col gap-1">
                  Edit Profile
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(String(key))}
                    aria-label="Options"
                    classNames={{
                      tabList: "gap-6 w-full relative rounded-none p-0",
                      cursor: "w-full bg-blue-500",
                      tab: "max-w-fit px-0 h-12",
                      tabContent: "group-data-[selected=true]:text-blue-500",
                    }}
                    variant="underlined"
                  >
                    <Tab
                      key="Profile"
                      title={
                        <div className="flex items-center space-x-2">
                          <IconUser strokeWidth={1} size={6} />
                          <span>Profile</span>
                        </div>
                      }
                    />
                    <Tab
                      key="Achievement"
                      title={
                        <div className="flex items-center space-x-2">
                          <IconJob strokeWidth={1} size={6} />
                          <span>Achievement</span>
                        </div>
                      }
                    />
                  </Tabs>
                </div>
                {selectedTab === "Achievement" && (
                  <form className="grid grid-cols-1 gap-4">
                    <div className=" flex flex-col">
                      <div className="flex justify-between">
                        <h2 className="text-h5 text-title font-medium">
                          Choose your achievement
                        </h2>
                        <p className="text-sm text-description">1/2</p>
                      </div>
                      <p className="text-sm text-description">
                        Select a achievement to credit of your profile
                      </p>
                    </div>

                    <ul className="px-2 pt-2 space-y-3 mt-2 max-h-[400px] overflow-y-auto pr-2  pb-[200px]">
                      {boards.map((board, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center gap-4 border border-stroke outline-blue-500 outline px-2 py-3 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${board.color}`}
                            >
                              D
                            </div>
                            <div>
                              <p className="font-medium">Zentrio UI Design</p>
                              <p className="text-body-sm text-description">
                                Role: {board.role}
                              </p>
                            </div>
                          </div>
                          <div>
                            <Image
                              src={correctIcon}
                              width={18}
                              height={14}
                              alt="selected icon"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button
                        className="bg-transparent border-1 border-bgColor"
                        radius="full"
                        onPress={onClose}
                      >
                        Cancel
                      </Button>
                      <Button color="primary" radius="full" onPress={onClose}>
                        Save
                      </Button>
                    </div>
                  </form>
                )}

                {selectedTab === "Profile" && (
                  <form action="" className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconUser strokeWidth={1} size={4} />
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        isRequired
                        errorMessage="Please input a valid name"
                        labelPlacement="outside"
                        name="name"
                        placeholder="Input your name"
                        type="text"
                        classNames={{
                          label: "text-label font-medium",
                          inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        focus:outline-none
                        focus-within:ring-2 
                        focus-within:ring-primary 
                        rounded-small
                        transition-all 
                        hover:bg-white
                        px-6
                        py-6
                      `,
                          input: "text-black",
                        }}
                      />
                    </div>

                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconShield
                          strokeWidth={1}
                          size={4}
                          color={"currentColor"}
                        />
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <Select
                        isRequired
                        placeholder="Choose your gender"
                        classNames={{
                          trigger: `
                        bg-white 
                        text-black 
                        border 
                        border-gray-300 
                        focus:ring-2 
                        focus:ring-primary
                        rounded-small
                        transition-all 
                        hover:bg-white 
                        px-6
                        py-6
                      `,
                          value: "text-gray-500",
                        }}
                      >
                        {gender.map((ganttBar) => (
                          <SelectItem key={ganttBar.key}>
                            {ganttBar.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconJob strokeWidth={1} size={4} />
                        Position <span className="text-red-500">*</span>
                      </label>
                      <Input
                        isRequired
                        errorMessage="Please input a valid position"
                        labelPlacement="outside"
                        name="position"
                        placeholder="Input your position"
                        type="text"
                        classNames={{
                          label: "text-label font-medium",
                          inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        focus:outline-none
                        focus-within:ring-2 
                        focus-within:ring-primary 
                        rounded-small
                        transition-all 
                        hover:bg-white
                        px-6
                        py-6
                      `,
                          input: "text-black",
                        }}
                      />
                    </div>

                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconMap
                          strokeWidth={1}
                          size={4}
                          color={"currentColor"}
                        />
                        Location <span className="text-red-500">*</span>
                      </label>
                      <Input
                        isRequired
                        errorMessage="Please input a valid location"
                        name="name"
                        placeholder="Input your location"
                        type="text"
                        classNames={{
                          label: "text-label font-medium",
                          inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        focus:outline-none
                        focus-within:ring-2 
                        focus-within:ring-primary 
                        rounded-small
                        transition-all 
                        hover:bg-white
                        px-6
                        py-6
                      `,
                          input: "text-black",
                        }}
                      />
                    </div>

                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconPhone
                          strokeWidth={1}
                          size={4}
                          color={"currentColor"}
                        />
                        Contact <span className="text-red-500">*</span>
                      </label>
                      <Input
                        isRequired
                        errorMessage="Please input a valid contact"
                        name="contact"
                        placeholder="Input your contact"
                        type="tel"
                        classNames={{
                          label: "text-label font-medium",
                          inputWrapper: `
                        bg-white 
                        border
                        border-gray-300
                        focus:outline-none
                        focus-within:ring-2 
                        focus-within:ring-primary 
                        rounded-small
                        transition-all 
                        hover:bg-white
                        px-6
                        py-6
                      `,
                          input: "text-black",
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button
                        className="bg-transparent border-1 border-bgColor"
                        radius="full"
                        onPress={onClose}
                      >
                        Cancel
                      </Button>
                      <Button color="primary" radius="full" onPress={onClose}>
                        Save
                      </Button>
                    </div>
                  </form>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
