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
              {/* Modal Header */}
              <ModalHeader className="flex flex-col gap-1  sticky top-0 z-10 bg-white">
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
                        {/* <label className="block text-title">Activity</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Write a comment"
                            className="w-full h-15 text-title/50 text-caption p-4 pr-10 border border-gray-400 rounded-medium"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            // onClick={openModal}
                          >
                            <svg
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 fill-primary"
                            >
                              <path
                                clipRule="evenodd"
                                d="M26.8908 3.63751C27.4296 2.02234 25.8325 0.515487 24.2514 1.14736L23.7584 1.34438L2.05498 8.09216C0.775656 8.48991 0.61966 10.236 1.80825 10.8539L11.8128 16.0544C11.8453 16.0712 11.8781 16.0868 11.9113 16.1011C11.9255 16.1337 11.9408 16.166 11.9574 16.1978L17.1625 26.1935C17.7809 27.381 19.5286 27.2252 19.9267 25.947L26.6579 4.33542L26.8908 3.63751ZM4.2732 9.49616C4.10263 9.54919 4.08185 9.78221 4.24034 9.8646L12.281 14.0443C12.3584 14.0845 12.453 14.0699 12.5146 14.0083L22.2205 4.31105C22.3683 4.16341 22.2193 3.91657 22.0198 3.97859L4.2732 9.49616ZM18.5213 23.7312C18.4682 23.9016 18.2354 23.9224 18.153 23.7641L13.9694 15.7303C13.9291 15.6529 13.9437 15.5582 14.0055 15.4965L23.7117 5.79893C23.8594 5.65131 24.1061 5.80048 24.044 5.99989L18.5213 23.7312Z"
                                fillRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div> */}
                        <PostCommentChecklist checklistId={id} />
                      </div>

                      {/* comment */}
                      <div className="space-y-1">
                        {comments.map((el, index) => (
                          <div key={index}>
                            <p className="flex items-center gap-2">
                              <img
                                src={
                                  preventUserImage ||
                                  "https://i.pinimg.com/736x/78/d9/4b/78d94baa8d7459c33b6b99f647893869.jpg"
                                }
                                alt={el?.member?.username}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              {el?.member?.username}
                            </p>

                            <div className="ml-8 text-title/50 text-caption flex flex-col space-y-1">
                              <p>
                                {el?.content ||
                                  "Static  Discussed project timeline and identified key milestones."}
                              </p>
                              <div className="flex justify-end">
                                <div className="flex flex-col items-end bg-progress-green/20 rounded-full p-2">
                                  <div className="flex items-center space-x-2">
                                    <svg
                                      width="10"
                                      height="11"
                                      viewBox="0 0 10 11"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5 2.24344C2.83564 2.24344 1.08108 3.998 1.08108 6.16236C1.08108 8.32672 2.83564 10.0813 5 10.0813C7.16436 10.0813 8.91892 8.32672 8.91892 6.16236C8.91892 3.998 7.16436 2.24344 5 2.24344ZM0.27027 6.16236C0.27027 3.5502 2.38784 1.43263 5 1.43263C7.61216 1.43263 9.72973 3.5502 9.72973 6.16236C9.72973 8.77452 7.61216 10.8921 5 10.8921C2.38784 10.8921 0.27027 8.77452 0.27027 6.16236Z"
                                        fill="#5FC381"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M5 3.05425C5.2239 3.05425 5.40541 3.23576 5.40541 3.45966V5.93766L6.83649 6.83209C7.02635 6.95076 7.08407 7.20087 6.9654 7.39074C6.84674 7.5806 6.59662 7.63832 6.40676 7.51966L4.78514 6.50614C4.6666 6.43206 4.59459 6.30214 4.59459 6.16236V3.45966C4.59459 3.23576 4.7761 3.05425 5 3.05425Z"
                                        fill="#5FC381"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.04342 1.01083C2.20174 1.16915 2.20174 1.42584 2.04342 1.58416L0.69207 2.93551C0.53375 3.09383 0.277061 3.09383 0.11874 2.93551C-0.0395802 2.77719 -0.0395802 2.5205 0.11874 2.36218L1.47009 1.01083C1.62841 0.85251 1.8851 0.85251 2.04342 1.01083Z"
                                        fill="#5FC381"
                                      />
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.95658 1.01083C7.79826 1.16915 7.79826 1.42584 7.95658 1.58416L9.30793 2.93551C9.46625 3.09383 9.72294 3.09383 9.88126 2.93551C10.0396 2.77719 10.0396 2.5205 9.88126 2.36218L8.52991 1.01083C8.37159 0.85251 8.1149 0.85251 7.95658 1.01083Z"
                                        fill="#5FC381"
                                      />
                                    </svg>
                                    <span className="text-caption-tiny text-gray-500">
                                      2 hours ago
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
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
