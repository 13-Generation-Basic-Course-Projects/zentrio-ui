"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import { updateAnnouncementByIdAction } from "@/action/announcement.action";
import Image from "next/image";
import preImage from "@/assets/folderdynamiccolor.png";
import thumbup from "@/assets/thumbupdynamiccolor.png";
import logo from "@/public/image/Zentrio-Logo.png";
import { ArrowRight, Calendar, Crown, Zap } from "lucide-react";

export default function ModalEditAnnoun({
  title,
  announId,
  boardId,
  boardMember,
  Announcement,
  preventUserImage,
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [titleState, setTitleState] = useState(Announcement?.title || "");
  const [description, setDescription] = useState(
    Announcement?.description || ""
  );
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!titleState || !description) return;
    setLoading(true);
    try {
      await updateAnnouncementByIdAction(
        announId,
        description,
        titleState,
        boardId
      );
      onClose();
    } catch (error) {
      console.error("Failed to update announcement", error);
    } finally {
      setLoading(false);
    }
  };

  const managerMember = boardMember?.find((member) =>
    member.roles?.includes("ROLE_MANAGER")
  );

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent h-auto flex items-center cursor-pointer p-0 border-0"
      >
        <div className="font-medium text-blue-500">{title}</div>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        isDismissable={false} // disable click outside & ESC to close
      >
        <ModalContent className="rounded-3xl bg-white shadow-2xl border-0 overflow-hidden transform transition-all duration-300 scale-100">
          {(onClose) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Left side */}
                <div className="w-full lg:w-2/5 relative bg-gradient-to-br from-primary via-primary to-white">
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-md z-0"></div>
                  <Image
                    src={preImage}
                    alt="Pre Image"
                    className="absolute w-full h-auto"
                  />
                  <Image
                    src={thumbup}
                    alt="Thumb Up"
                    className="absolute bottom-5 left-3 w-full h-auto"
                  />
                  <Image
                    src={logo}
                    alt="Logo"
                    className="absolute bottom-5 right-5 h-[30px] w-auto object-contain"
                  />
                  <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
                    <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
                      <Zap className="w-4 h-4 mr-2" />
                      Work smart with Zentrio
                      <br />
                      젠트리오와 함께 스마트하게 일하세요
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="w-full lg:w-3/5 flex flex-col">
                  <div className="px-6 py-4 border-b border-gray-100">
                    {managerMember && (
                      <div className="flex items-center space-x-3 p-4 rounded-2xl">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-indigo-400 to-purple-400 p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                              <img
                                src={
                                  managerMember.profileImage || preventUserImage
                                }
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                          </div>
                          {/* <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div> */}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900">
                            {managerMember.username || managerMember.name}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Crown className="w-3 h-3 mr-1" />
                            {managerMember.roles?.[0]
                              ?.replace("ROLE_", "")
                              ?.toLowerCase()
                              ?.replace(/^\w/, (c) => c.toUpperCase()) ||
                              "Manager"}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date().toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>

                  <ModalBody className="flex-1 px-8 py-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        Announcement Title
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter a compelling title..."
                        className="w-full px-4 py-4 text-base font-medium bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-200 placeholder-gray-400 border-transparent hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:shadow-lg"
                        value={titleState}
                        onChange={(e) => setTitleState(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        Description<span className="text-red-500 ml-1">*</span>
                      </label>
                      <textarea
                        placeholder="What would you like to announce? Share details, updates, or important information..."
                        className="w-full px-4 py-4 text-base font-medium bg-gray-50 border-2 rounded-2xl outline-none transition-all duration-200 placeholder-gray-400 resize-none min-h-[100px] border-transparent hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:shadow-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                    </div>
                  </ModalBody>

                  <ModalFooter className="flex justify-end space-x-3 px-8 py-6 border-t border-gray-100 bg-gray-50/50">
                    <Button
                      type="button"
                      className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium transition-all duration-200 hover:scale-[1.02]"
                      onPress={onClose}
                      isDisabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className={`flex-1 font-semibold transition-all duration-200 ${
                        titleState && description
                          ? "bg-gradient-to-r bg-gradient-to-br from-primary via-primary to-white text-white transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      radius="lg"
                      isDisabled={!titleState || !description || loading}
                      isLoading={loading}
                    >
                      <span className="flex items-center">
                        {loading ? "Updating..." : "Update Announcement"}
                        {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                      </span>
                    </Button>
                  </ModalFooter>
                </div>
              </div>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
