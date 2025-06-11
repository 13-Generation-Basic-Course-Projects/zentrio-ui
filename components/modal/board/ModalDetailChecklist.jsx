"use client";
import React, { useEffect, useState } from "react";
import member from "@/assets/memberSideBar.png";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  DateRangePicker,
  Input,
} from "@heroui/react";
import {
  IconAdd,
  StackedProfileChecklist,
  StackedProfiles,
} from "../../icon/everyicon";
import ModalUploadAttachment from "./ModalUploadAttachment";
import { allAttachment } from "@/data/board/allAttachment";
import { CardCheckList } from "@/components/card/CardChecklist";
import Trash from "@/components/button/Trash";
import PopupAction from "@/components/popup/PopupAction";
import { IconpopupDelete } from "@/components/icon/Iconpopup";
import { preventImage } from "@/constant/preventimage";
import { getCommentByCheckListIdAction } from "@/action/board.action";
import PostCommentChecklist from "./PostCommentChecklist";
import CommentChecklistSec from "./CommentChecklistSec";

export default function ModalDetailChecklist({
  id,
  taskTitle,
  title,
  startDate,
  status,
  label,
  description,
  image,
  member,
  hideImage,
  preventUserImage,
  checklistId,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [activeTab, setActiveTab] = useState("add"); // 'add' or 'all'
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //fetch
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const data = allAttachment;
  const icons = {
    pdf: "https://cdn-icons-png.flaticon.com/128/4726/4726010.png",
    docx: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
    xlsx: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
    pptx: "https://cdn-icons-png.flaticon.com/128/2875/2875416.png",
  };
  const getFileIcon = (filename) => {
    const extension = filename.split(".").pop().toLowerCase();
    return (
      icons[extension] ||
      "https://cdn-icons-png.flaticon.com/128/833/833524.png"
    ); // Default icon
  };
  console.log("member", member);
  //comment
  console.log("is this the id of checklist", id);
  const prevnetCheckListImage = preventImage.noChecklistImage;
  //fetch comment
  useEffect(() => {
    let isMounted = true;

    const fetchComments = async () => {
      if (!id) {
        console.warn("Checklist ID is missing");
        setError("Checklist ID is required");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const result = await getCommentByCheckListIdAction(id);
        console.log("Fetch result:", result); // Log the result
        if (isMounted) {
          if (result.success) {
            setComments(result.data);
          } else {
            setError(result.error || "Failed to load comments");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("An unexpected error occurred");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchComments();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Separate useEffect for logging comments
  useEffect(() => {
    console.log("Updated comments state:", comments);
  }, [comments]);

  return (
    <>
      <Button
        onPress={onOpen}
        className="h-full w-full p-0 shadow-sm"
        fullWidth="true"
      >
        <div className="h-full w-full  max-w-none !p-0 bg-pink-300">
          <CardCheckList
            status={status}
            title={title}
            startDate={startDate}
            comment={"static comment"}
            label={label}
            image={image}
            hideImage={hideImage}
            member={member}
            id={id}
            commentCount={comments.length}
          />
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        className="overflow-y-auto scrollbar-hidden  max-h-[760px]"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* Modal Header with Close Button */}
              <ModalHeader className="flex flex-row justify-between items-center sticky top-0 z-10 bg-white">
                <div className="flex flex-wrap justify-start items-center gap-2">
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 12 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 2.5H2C1.44772 2.5 1 2.94772 1 3.5V12.5C1 13.0523 1.44772 13.5 2 13.5H8C8.55228 13.5 9 13.0523 9 12.5V3.5C9 2.94772 8.55228 2.5 8 2.5Z"
                      stroke="#000001"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 5H7"
                      stroke="#000001"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7.5H7"
                      stroke="#000001"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 10H5"
                      stroke="#000001"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.5 0.5H10C10.2652 0.5 10.5196 0.605357 10.7071 0.792893C10.8946 0.98043 11 1.23478 11 1.5V11"
                      stroke="#000001"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-h5 font-medium break-words max-w-full">
                    {taskTitle || "task name"}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 ml-auto"
                  aria-label="Close modal"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </ModalHeader>

              {/* Modal Body */}
              <ModalBody>
                {/* for show image of task */}
                <div className=" border rounded-medium flex justify-center items-center">
                  <img
                    src={image || prevnetCheckListImage}
                    alt="Dynamic ERD"
                    className="w-full h-40 object-cover rounded-medium"
                  />
                </div>
                {/* for show sub title of task */}
                <div className="flex flex-col ">
                  <div className="flex flex-wrap justify-between items-center">
                    <p className="text-title text-h6 underline font-normal break-words max-w-full">
                      {title || "title of checklist"}
                    </p>

                    <PopupAction
                      title={<Trash />}
                      color={"text-blue-600"}
                      massageTitle={"Are you sure?"}
                      massageBody={"You want to delete this checklist "}
                      icon={<IconpopupDelete />}
                      bgcolor={"bg-slate-red"}
                      massageDo={"Yes, Delete"}
                      massageUndo={"No, Cancel"}
                    />
                  </div>
                  <div className="flex flex-wrap justify-between items-center mt-5">
                    <StackedProfileChecklist
                      member={member}
                      preventUserImage={preventUserImage}
                    />
                    <div>
                      <div className="w-full max-w-xl flex flex-row gap-4">
                        <DateRangePicker
                          showMonthAndYearPickers
                          //   label="Birth Date"
                          variant="none"
                          size="md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* for description */}
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-wrap justify-between items-center">
                    <p className="text-h6 text-title font-semibold">
                      Description test id == {id}
                    </p>
                    <div>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_3611_138420)">
                          <path
                            d="M6.875 2.5H2.5C2.16848 2.5 1.85054 2.6317 1.61612 2.86612C1.3817 3.10054 1.25 3.41848 1.25 3.75V12.5C1.25 12.8315 1.3817 13.1495 1.61612 13.3839C1.85054 13.6183 2.16848 13.75 2.5 13.75H11.25C11.5815 13.75 11.8995 13.6183 12.1339 13.3839C12.3683 13.1495 12.5 12.8315 12.5 12.5V8.125"
                            stroke="#143A47"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.5625 1.56252C11.8111 1.31388 12.1484 1.17419 12.5 1.17419C12.8516 1.17419 13.1889 1.31388 13.4375 1.56252C13.6861 1.81116 13.8258 2.14839 13.8258 2.50002C13.8258 2.85165 13.6861 3.18888 13.4375 3.43752L7.5 9.37502L5 10L5.625 7.50002L11.5625 1.56252Z"
                            stroke="#143A47"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_3611_138420">
                            <rect width="15" height="15" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <p className="text-title/50 text-caption break-words max-w-full">
                    {description ||
                      "The Task Management System is a web-based application designed to help individuals and teams effectively manage their daily activity"}
                  </p>
                </div>

                {/* two tab add attachment and all attachment */}
                {/* Tabs */}
                <div className="flex space-x-4 border-b border-gray-300 mt-6">
                  <button
                    className={`py-2 px-4 ${
                      activeTab === "add"
                        ? "border-b-2 border-primary text-primary font-semibold"
                        : "text-title/50"
                    }`}
                    onClick={() => setActiveTab("add")}
                  >
                    Add Attachment
                  </button>
                  <button
                    className={`py-2 px-4 ${
                      activeTab === "all"
                        ? "border-b-2 border-primary text-primary font-semibold"
                        : "text-title/50"
                    }`}
                    onClick={() => setActiveTab("all")}
                  >
                    All Attachments ({data.length})
                  </button>
                </div>

                {/* Tab Content */}
                <div className="mt-4  mb-5 ">
                  {activeTab === "add" && (
                    <div className="space-y-6 ">
                      <div className="space-y-2">
                        <label className="block text-title ">Uploading</label>
                        <div
                          className="w-full text-title/50 text-caption p-4 border-1 rounded-medium border-gray-400  flex justify-between items-center cursor-pointer"
                          onClick={openModal}
                        >
                          Choose file here...
                          <div
                            className="inline-block cursor-pointer ml-2"
                            onClick={openModal}
                          >
                            <svg
                              width="18"
                              height="20"
                              viewBox="0 0 18 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.33398 18.2243H15.0007C15.4427 18.2243 15.8666 18.0487 16.1792 17.7361C16.4917 17.4236 16.6673 16.9996 16.6673 16.5576V5.72428L12.5007 1.55762H5.00065C4.55862 1.55762 4.1347 1.73321 3.82214 2.04577C3.50958 2.35833 3.33398 2.78226 3.33398 3.22428V6.55762"
                                stroke="#59BAD5"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.668 1.55762V4.89095C11.668 5.33298 11.8436 5.7569 12.1561 6.06946C12.4687 6.38202 12.8926 6.55762 13.3346 6.55762H16.668M1.66797 12.391H10.0013M10.0013 12.391L7.5013 14.891M10.0013 12.391L7.5013 9.89095"
                                stroke="#59BAD5"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        {isModalOpen && (
                          <ModalUploadAttachment
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <PostCommentChecklist checklistId={id} />
                      </div>

                      {/* comment */}
                      <CommentChecklistSec
                        comments={comments}
                        checklistId={id}
                        onCommentsUpdated={(dataOrUpdater) => {
                          if (typeof dataOrUpdater === "function") {
                            setComments((prev) => dataOrUpdater(prev));
                          } else {
                            setComments(dataOrUpdater);
                          }
                        }}
                      />
                    </div>
                  )}

                  {activeTab === "all" && (
                    <div className="h-[400px] overflow-auto scrollbar-hidden">
                      {data.map((item) => (
                        <div key={item.id} className="mb-4 p-3 border rounded">
                          <p className="text-sm text-gray-500">
                            Created by {item.createBy} on {item.date}
                          </p>
                          {item.fileSaved.map((file, idx) => (
                            <div
                              key={idx}
                              className="mt-1 cursor-pointer hover:text-blueActive/50 flex items-center space-x-2"
                            >
                              <img
                                src={getFileIcon(file)}
                                alt={file}
                                className="w-5 h-5"
                              />
                              <span>{file}</span>
                            </div>
                          ))}

                          {item.linkAttached.map((file, idx) => (
                            <div
                              key={idx}
                              className="mt-1 flex items-center space-x-2"
                            >
                              <a
                                href={item.linkAttached[idx]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                              >
                                {file}
                              </a>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
