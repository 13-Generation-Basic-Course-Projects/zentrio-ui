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
  user,
} from "@heroui/react";
import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/lib/schemas/editprofileSchema";
import {
  getCurrentUserProfileAction,
  updateAchievementAction,
  updateUserProfileAction,
} from "@/action/profile.action";
import { Controller } from "react-hook-form";
import {
  sendNotificationForAllUserAction,
  sendNotificationToUserIdAction,
} from "@/action/notification.action";
import { sendNotificationToUserIdService } from "@/service/notification.service";

export const gender = [
  { key: "male", label: "Male" },
  { key: "female", label: "Female" },
  { key: "other", label: "Other" },
];

export function ModalEditProfile({ currentUserProfile }) {
  const ownBoards = currentUserProfile?.payload?.ownBoards || [];
  const joinedBoards = currentUserProfile?.payload?.joinedBoards || [];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedTab, setSelectedTab] = useState("Profile");
  const [selectedAchievements, setSelectedAchievements] = useState(new Set());

  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  const combinedBoards = [...ownBoards, ...joinedBoards].map(
    (board, index) => ({
      id: board.boardId,
      title: board.boardName,
      role: board.role,
      color: colors[index % colors.length],
    })
  );

  const handleAchievementToggle = (achievementId) => {
    setSelectedAchievements((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(achievementId)) {
        newSelected.delete(achievementId);
      } else {
        newSelected.add(achievementId);
      }
      return newSelected;
    });
  };

  const user = currentUserProfile?.payload?.user || {};

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      gender: "",
      position: "",
      location: "",
      contact: "",
    },
  });

  useEffect(() => {
    if (isOpen && user) {
      reset({
        username: user?.username || "",
        gender: user?.gender?.toLowerCase() || "",
        position: user?.position || "",
        location: user?.location || "",
        contact: user?.contact || "",
      });
    }
  }, [isOpen, , reset]);

  const onSubmit = async (data) => {
    const result = await updateUserProfileAction(data);
    if (result?.success) {
      onOpenChange(false);
    } else {
      console.error("Failed to update profile:", result?.error);
    }
  };

  const getReadableRole = (role) => {
    switch (role) {
      case "ROLE_MANAGER":
        return "Owner";
      case "ROLE_LEADER":
        return "Leader";
      case "ROLE_MEMBER":
        return "Member";
      default:
        return "N/A";
    }
  };

  const selectedBoards = combinedBoards.filter((board) =>
    selectedAchievements.has(board.id)
  );

  const handleSave = async () => {
    const selectedBoards = combinedBoards.filter((board) =>
      selectedAchievements.has(board.id)
    );

    const payload = {
      achievements: selectedBoards.map((board) => ({
        boardId: board.id,
        title: board.title,
        role: board.role,
        color: board.color,
      })),
    };

    try {
      const response = await updateAchievementAction(payload); // API call with correct structure
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving achievements:", error);
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        <IconEdit strokeWidth={1.5} size={5} color={"currentColor"} /> Edit
        Profile
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
                        <p className="text-sm text-description">
                          {selectedAchievements.size}/{combinedBoards.length}
                        </p>
                      </div>
                      <p className="text-sm text-description">
                        Select achievements to credit to your profile
                      </p>
                    </div>

                    <ul className="px-2 pt-2 space-y-3 mt-2 max-h-[400px] overflow-y-auto pr-2  pb-[200px]">
                      {combinedBoards?.map((board, index) => {
                        const isSelected = selectedAchievements.has(board.id);
                        return (
                          <li
                            key={index}
                            className={`flex justify-between items-center gap-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "border-blue-500 bg-blue-50 outline outline-1 outline-blue-500"
                                : "border-stroke hover:border-gray-400"
                            } px-2 py-3`}
                            onClick={() => handleAchievementToggle(board.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${board.color}`}
                              >
                                {board.title.charAt(0)}
                              </div>
                              <div>
                                <p className="font-medium">{board.title}</p>
                                <p className="text-body-sm text-description">
                                  Role: {getReadableRole(board?.role)}
                                </p>
                              </div>
                            </div>
                            <div
                              className={`transition-opacity duration-200 ${
                                isSelected ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              <Image
                                src={correctIcon}
                                width={18}
                                height={14}
                                alt="selected icon"
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button
                        className="bg-transparent border-1 border-bgColor"
                        radius="full"
                        onPress={onClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        radius="full"
                        onPress={handleSave}
                      >
                        Save ({selectedAchievements.size})
                      </Button>
                    </div>
                  </form>
                )}
                {selectedTab === "Profile" && (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-4"
                  >
                    {/* NAME */}
                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconUser strokeWidth={1} size={4} />
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("username")}
                        isRequired
                        errorMessage={errors.username?.message}
                        placeholder="Input your name"
                        classNames={{
                          inputWrapper: `bg-white border border-gray-300 shadow-none focus:outline-none rounded-small px-6 py-6`,
                          input: "text-black",
                        }}
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.username.message}
                        </p>
                      )}
                    </div>

                    {/* GENDER (FIXED using Controller) */}
                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconShield strokeWidth={1} size={4} />
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            selectedKeys={[field.value]}
                            onSelectionChange={
                              (e) => field.onChange(Array.from(e)[0]) // Fix string value
                            }
                            isInvalid={!!errors.gender}
                            errorMessage={errors.gender?.message}
                            isRequired
                            placeholder="Choose your gender"
                            classNames={{
                              trigger: `bg-white text-black border border-gray-300 focus:outline-none rounded-small px-6 py-6`,
                              value: "text-gray-500",
                            }}
                          >
                            {gender.map((item) => (
                              <SelectItem key={item.key} value={item.key}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                    </div>

                    {/* POSITION */}
                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconJob strokeWidth={1} size={4} />
                        Position <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("position")}
                        isRequired
                        errorMessage={errors.position?.message}
                        placeholder="Input your position"
                        classNames={{
                          inputWrapper: `bg-white border border-gray-300 shadow-none focus:outline-none rounded-small px-6 py-6`,
                          input: "text-black",
                        }}
                      />
                      {errors.position && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.position.message}
                        </p>
                      )}
                    </div>

                    {/* LOCATION */}
                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconMap
                          strokeWidth={1}
                          size={4}
                          color={"currentColor"}
                        />{" "}
                        Location <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("location")}
                        isRequired
                        errorMessage={errors.location?.message}
                        placeholder="Input your location"
                        classNames={{
                          inputWrapper: `bg-white border border-gray-300 shadow-none focus:outline-none rounded-small px-6 py-6`,
                          input: "text-black",
                        }}
                      />
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.location.message}
                        </p>
                      )}
                    </div>

                    {/* CONTACT */}
                    <div>
                      <label className="text-label font-medium flex items-center gap-x-2 mb-2">
                        <IconPhone strokeWidth={1} size={4} />
                        Contact <span className="text-red-500">*</span>
                      </label>
                      <Input
                        {...register("contact")}
                        isRequired
                        errorMessage={errors.contact?.message}
                        placeholder="Input your contact"
                        classNames={{
                          inputWrapper: `bg-white border border-gray-300 shadow-none focus:outline-none rounded-small px-6 py-6`,
                          input: "text-black",
                        }}
                      />
                      {errors.contact && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.contact.message}
                        </p>
                      )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button
                        type="button"
                        className="bg-transparent border-1 border-bgColor"
                        radius="full"
                        onPress={onClose}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" color="primary" radius="full">
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
