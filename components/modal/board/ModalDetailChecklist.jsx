"use client";
import React, {
  useEffect,
  useReducer,
  useCallback,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Card,
  DateRangePicker,
} from "@heroui/react";
import { IconAdd, StackedProfileChecklist } from "../../icon/everyicon";
import ModalUploadAttachment from "./ModalUploadAttachment";
import { CardCheckList } from "@/components/card/CardCheckList";
import Trash from "@/components/button/Trash";
import PopupAction from "@/components/popup/PopupAction";
import { IconpopupDelete } from "@/components/icon/Iconpopup";
import { preventImage } from "@/constant/preventimage";
import {
  changeStatusCheckListAction,
  getCommentByCheckListIdAction,
  getCheckListByTaskIdAction,
  updateCheckListByIdAndTaskIdAction,
} from "@/action/board.action";
import PostCommentChecklist from "./PostCommentChecklist";
import CommentChecklistSec from "./CommentChecklistSec";
import { getAttachmentAction } from "@/action/document.action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CameraIcon } from "lucide-react";
import UpdateDateChecklist from "./UpdateDateChecklist";

const initialState = {
  activeTab: "add",
  isModalOpen: false,
  selectedAttachment: null,
  comments: [],
  loading: false,
  error: null,
  attachments: [],
  attachmentError: null,
  currentStatus: "IN_PROGRESS",
  isEditing: false,
  newDescription: "",
  taskData: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_MODAL_OPEN":
      return { ...state, isModalOpen: action.payload };
    case "SET_SELECTED_ATTACHMENT":
      return { ...state, selectedAttachment: action.payload };
    case "SET_COMMENTS":
      return { ...state, comments: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_ATTACHMENTS":
      return { ...state, attachments: action.payload };
    case "SET_ATTACHMENT_ERROR":
      return { ...state, attachmentError: action.payload };
    case "SET_CURRENT_STATUS":
      return { ...state, currentStatus: action.payload };
    case "SET_IS_EDITING":
      return { ...state, isEditing: action.payload };
    case "SET_NEW_DESCRIPTION":
      return { ...state, newDescription: action.payload };
    case "SET_TASK_DATA":
      return { ...state, taskData: action.payload };

    case "RESET_STATE":
      return { ...initialState };
    default:
      return state;
  }
};

const useChecklistData = (checklistId, isOpen) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    currentStatus: "IN_PROGRESS",
  });
  const fetchingRef = useRef(false);
  const shouldStayOpen = useRef(false);

  const fetchAttachments = useCallback(async () => {
    if (!checklistId || fetchingRef.current) return;
    fetchingRef.current = true;
    shouldStayOpen.current = true;
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ATTACHMENT_ERROR", payload: null });
    dispatch({ type: "SET_ATTACHMENTS", payload: [] });
    try {
      const result = await getAttachmentAction(checklistId);
      if (result.success) {
        dispatch({ type: "SET_ATTACHMENTS", payload: [result.payload] });
      } else {
        dispatch({
          type: "SET_ATTACHMENT_ERROR",
          payload: result.error || "Failed to load attachments",
        });
      }
    } catch (err) {
      dispatch({
        type: "SET_ATTACHMENT_ERROR",
        payload:
          err.status === 404
            ? "No attachments found"
            : "An unexpected error occurred",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      fetchingRef.current = false;
      shouldStayOpen.current = false;
    }
  }, [checklistId]);

  const fetchComments = useCallback(async () => {
    if (!checklistId || fetchingRef.current) return;
    fetchingRef.current = true;
    shouldStayOpen.current = true;
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_COMMENTS", payload: [] });
    try {
      const result = await getCommentByCheckListIdAction(checklistId);
      if (result.success) {
        dispatch({ type: "SET_COMMENTS", payload: result.data || [] });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: result.error?.includes("404")
            ? "No comments yet"
            : result.error || "Failed to load comments",
        });
      }
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.message?.includes("404")
          ? "No comments yet"
          : "An unexpected error occurred",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
      fetchingRef.current = false;
      shouldStayOpen.current = false;
    }
  }, [checklistId]);

  useEffect(() => {
    if (isOpen && checklistId && !fetchingRef.current) {
      fetchComments();
      fetchAttachments();
    }
  }, [isOpen, checklistId, fetchComments, fetchAttachments]);

  return { state, dispatch, shouldStayOpen };
};

const useDescriptionEditor = (taskId, checklistId, isOpen) => {
  const [newDescription, setNewDescription] = useState("");
  const [error, setError] = useState();
  const [checklistData, setChecklistData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (isOpen) {
      const fetchTask = async () => {
        try {
          setIsLoading(true);
          const response = await getCheckListByTaskIdAction({ taskId });
          const checklist = response?.payload?.find(
            (ch) => ch.checklistId === checklistId
          );
          if (!checklist) throw new Error("checklist not found");
          setChecklistData(checklist);
          setNewDescription(checklist.description || ""); // Fixed: should be setNewDescription
        } catch (err) {
          setError(err.message);
          toast.error("Failed to load checklist data: " + err.message, {
            position: "top-right",
            autoClose: 4000,
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchTask();
    }
  }, [isOpen, taskId, checklistId]);

  const handleEditClick = () => {
    setIsEditing(true);
    setError(null);
  };
  const handleEditTitleClick = () => {
    setIsEditingTitle(true);
    setError(null);
  };
  const handleCancel = () => {
    console.log("Cancel clicked - reverting changes");
    setIsEditing(false);
    setNewDescription(checklistData?.description || "");
    setNewTitle(checklistData?.title || "");
    setError(null);
  };

  const handleDescriptionChange = useCallback((e) => {
    setNewDescription(e.target.value);
    setError(null);
  }, []);

  const handleTitleChange = useCallback((e) => {
    setNewTitle(e.target.value);
    setError(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (!newTitle?.trim()) {
      setError("Title cannot be empty.");
      toast.error("Title cannot be empty", {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }
    if (!newDescription?.trim()) {
      setError("Description cannot be empty.");
      toast.error("Description cannot be empty", {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }
    if (!checklistData) {
      setError("Checklist data not loaded.");
      toast.error("Checklist data not loaded", {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const title = newTitle.trim();
      const description = newDescription.trim();
      const startedAt = checklistData.startedAt.endsWith("Z")
        ? checklistData.startedAt
        : `${checklistData.startedAt}Z`;
      const finishedAt = checklistData.finishedAt.endsWith("Z")
        ? checklistData.finishedAt
        : `${checklistData.finishedAt}Z`;
      const taskIdToUpdate = checklistData.taskId;

      const result = await updateCheckListByIdAndTaskIdAction(
        checklistId,
        title,
        description,
        startedAt,
        finishedAt,
        taskIdToUpdate
      );

      setChecklistData({ ...checklistData, title, description });
      toast.success("Checklist updated successfully ✅", {
        position: "top-right",
        autoClose: 2500,
      });

      setIsEditing(false);
      return result;
    } catch (err) {
      setError(err.message || "Bad Request");
      toast.error(
        `Failed to update checklist: ${err.message || "Bad Request"}`,
        {
          position: "top-right",
          autoClose: 4000,
        }
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [checklistData, newTitle, newDescription, checklistId]);

  const handleSubmit = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    },
    [handleSave, handleCancel]
  );

  const handleBlur = () => {
    setIsEditing(false);
    setNewDescription(checklistData?.description || "");
    setNewTitle(checklistData?.title || "");
    setError(null);
  };

  return {
    taskData: checklistData, // Renamed to match component usage
    newDescription,
    newTitle,
    isEditing,
    isEditingTitle,
    loading: isLoading, // Renamed to match component usage
    error,
    handleEditClick,
    handleEditTitleClick,
    handleDescriptionChange,
    handleSubmit,
    handleBlur,
    handleSave,
    handleTitleChange,
    handleCancel,
  };
};

const ModalDetailChecklist = ({
  id,
  taskTitle,
  title,
  startDate,
  finishedAt,
  status,
  label,
  description,
  image,
  member,
  hideImage,
  preventUserImage,
  checklistId,
  taskId,
  allMemberInBoard,
  leaderId,
  role,
  boardId,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { state, dispatch, shouldStayOpen } = useChecklistData(
    checklistId,
    isOpen
  );
  // Image upload state and ref
  const [previewImage, setPreviewImage] = useState(
    image || preventImage.noChecklistImage
  );
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const {
    taskData,
    newDescription,
    newTitle,
    isEditing,
    isEditingTitle,
    loading,
    error,
    handleEditClick,
    handleEditTitleClick,
    handleDescriptionChange,
    handleSubmit,
    handleBlur,
    handleSave,
    handleTitleChange,
    handleCancel,
  } = useDescriptionEditor(taskId, checklistId, isOpen);

  console.log("Title checklist get in modal detail checklist: ", title);
  const fileIcons = {
    pdf: "https://cdn-icons-png.flaticon.com/128/4726/4726010.png",
    docx: "https://cdn-icons-png.flaticon.com/128/2991/2991108.png",
    xlsx: "https://cdn-icons-png.flaticon.com/128/2504/2504768.png",
    pptx: "https://cdn-icons-png.flaticon.com/128/2875/2875416.png",
    default: "https://cdn-icons-png.flaticon.com/128/833/833524.png",
  };

  const getFileIcon = (filename) => {
    const extension = filename?.split(".").pop()?.toLowerCase();
    return fileIcons[extension] || fileIcons.default;
  };

  const handleAttachmentSelected = (attachment) => {
    dispatch({ type: "SET_SELECTED_ATTACHMENT", payload: attachment });
    dispatch({ type: "SET_MODAL_OPEN", payload: false });
  };

  const handleStatusChange = useCallback(async () => {
    shouldStayOpen.current = true;
    const newStatus = state.currentStatus === "DONE" ? "IN_PROGRESS" : "DONE";
    try {
      const result = await changeStatusCheckListAction(checklistId, newStatus);
      if (result.success) {
        dispatch({ type: "SET_CURRENT_STATUS", payload: newStatus });
      }
    } catch (error) {
      toast.error("Failed to update status", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      shouldStayOpen.current = false;
    }
  }, [checklistId, state.currentStatus]);

  const handleOpenChange = useCallback(
    (open) => {
      if (!open && shouldStayOpen.current) return;
      onOpenChange(open);
      if (!open) {
        dispatch({ type: "SET_COMMENTS", payload: [] });
        dispatch({ type: "SET_ERROR", payload: null });
        dispatch({ type: "SET_ACTIVE_TAB", payload: "add" });
        dispatch({ type: "SET_SELECTED_ATTACHMENT", payload: null });
        dispatch({ type: "SET_ATTACHMENTS", payload: [] });
        dispatch({ type: "SET_ATTACHMENT_ERROR", payload: null });
      }
    },
    [onOpenChange]
  );

  const handleCommentsUpdated = useCallback(
    (dataOrUpdater) => {
      shouldStayOpen.current = true;
      dispatch({
        type: "SET_COMMENTS",
        payload:
          typeof dataOrUpdater === "function"
            ? dataOrUpdater(state.comments)
            : dataOrUpdater,
      });
      setTimeout(() => {
        shouldStayOpen.current = false;
      }, 100);
    },
    [state.comments]
  );

  /* for upload image */
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.", {
          position: "top-right",
          autoClose: 4000,
        });
        return;
      }
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds 5MB limit.", {
          position: "top-right",
          autoClose: 4000,
        });
        return;
      }
      // Create local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      // Optional: Upload to server
      // uploadImageToServer(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  // Optional: Server upload function
  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(
        `/api/checklists/${checklistId}/upload-image`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        setPreviewImage(data.imageUrl); // Update with server URL
        toast.success("Image uploaded successfully!", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload image.", {
        position: "top-right",
        autoClose: 4000,
      });
      setPreviewImage(image || preventImage.noChecklistImage); // Revert to original
    }
  };

  return (
    <div>
      <div className="relative flex justify-end items-center">
        <button
          onClick={handleStatusChange}
          className="absolute top-5 right-5 p-2 rounded-full transition-colors z-20 focus:outline-none"
          title={
            state.currentStatus === "DONE"
              ? "Mark as In Progress"
              : "Mark as Done"
          }
        >
          {state.currentStatus === "DONE" ? (
            <svg
              viewBox="0 0 24 24"
              width={24}
              height={24}
              fill="#10B981"
              stroke="#10B981"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="#9ca3af"
              width={24}
              height={24}
              className="hover:fill-green-500 transition-colors"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.5 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              />
            </svg>
          )}
        </button>
      </div>
      <Button
        onPress={onOpen}
        className="h-full w-full p-0 shadow-sm"
        fullWidth={true}
      >
        <div className="h-full w-full max-w-none !px-0 bg-pink-200">
          <CardCheckList
            status={state.currentStatus}
            title={title}
            startDate={startDate}
            comment="static comment"
            label={label}
            image={image}
            hideImage={hideImage}
            member={member}
            checkedListId={id}
            commentCount={state.comments.length}
            finishedAt={finishedAt}
            leaderId={leaderId}
          />
        </div>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        size="5xl"
        className="overflow-y-auto scrollbar-hidden max-h-[760px]"
        isDismissable={false}
        isKeyboardDismissDisabled={false}
        closeButton={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
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
                    {taskTitle || "Task Name"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    shouldStayOpen.current = false;
                    onClose();
                  }}
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
              <ModalBody>
                {state.loading && (
                  <div className="absolute inset-0 bg-white/50 flex justify-center items-center z-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                  </div>
                )}
                <div className="border rounded-medium flex justify-center items-center relative w-full h-40">
                  <img
                    src={previewImage}
                    alt="Checklist Image"
                    className="w-full h-40 object-cover rounded-medium"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <button
                    onClick={triggerFileInput}
                    className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    aria-label="Upload Image"
                  >
                    <CameraIcon className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
                <div className="flex flex-col">
                  {/* Title checklist section */}
                  <div className="flex flex-wrap justify-between items-center">
                    {isEditingTitle ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={handleTitleChange}
                          onKeyDown={handleSubmit}
                          className="w-full p-3 text-lg font-normal text-gray-900 underline bg-transparent outline-none focus:outline-none border-0 focus:border-0 focus:ring-0"
                          placeholder={title}
                          autoFocus
                          disabled={loading}
                          aria-label="Checklist title input"
                        />
                      </div>
                    ) : (
                      <div
                        onClick={handleEditTitleClick}
                        className="cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleEditTitleClick()
                        }
                        aria-label="Edit checklist title"
                      >
                        <p className="text-lg text-gray-900 underline font-normal break-words max-w-full">
                          {title || "Checklist Title"}
                        </p>
                      </div>
                    )}

                    <PopupAction
                      title={<Trash />}
                      color={"text-blue-600"}
                      massageTitle={"Are you sure?"}
                      massageBody={"You want to delete this checklist "}
                      icon={<IconpopupDelete />}
                      bgcolor={"bg-slate-red"}
                      massageDo={"Yes, Delete"}
                      massageUndo={"No, Cancel"}
                      checkListId={id}
                      taskId={taskId}
                    />
                  </div>
                  {/* ------------------------ */}

                  <div className="flex flex-wrap justify-between items-center mt-5">
                    <StackedProfileChecklist
                      member={member}
                      preventUserImage={preventUserImage}
                      taskId={taskId}
                      allMemberInBoard={allMemberInBoard}
                      leaderId={leaderId}
                      checklistId={checklistId}
                    />
                    {/* call pdate date */}
                    <UpdateDateChecklist
                      checkListId={checklistId}
                      taskId={taskId}
                      initialStartedAt={startDate}
                      initialFinishedAt={finishedAt}
                    />
                  </div>
                </div>

                {/* Description Section */}
                <div className="flex flex-col space-y-3">
                  <div className="flex flex-wrap justify-between items-center">
                    <p className="text-h6 text-title font-semibold">
                      Description
                    </p>
                    <div
                      className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                      onClick={handleEditClick}
                      role="button"
                      aria-label="Edit description"
                    >
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

                  {/* Loading state for initial data fetch */}
                  {loading && !taskData && (
                    <div className="text-sm text-gray-500 flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 mr-2"></div>
                      Loading checklist data...
                    </div>
                  )}

                  {/* Error state for data fetch */}
                  {error && !isEditing && (
                    <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                      Error: {error}
                    </div>
                  )}

                  {(!loading || taskData) && (
                    <>
                      {isEditing ? (
                        <div className="space-y-3">
                          <textarea
                            value={newDescription}
                            onChange={handleDescriptionChange}
                            onKeyDown={handleSubmit}
                            className="w-full p-3 resize-none border-none focus:border-none focus:ring-0 text-gray-700 text-sm rounded-md bg-gray-50"
                            rows={2}
                            placeholder="Enter description..."
                            autoFocus
                            disabled={loading}
                            variant="none"
                          />

                          {/* Action buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSave}
                                disabled={loading || !newDescription.trim()}
                                className="text-btn-sm px-4 py-1 bg-primary text-white text-sm font-medium rounded-large hover:bg-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                              >
                                {loading ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 "></div>
                                    Saving...
                                  </>
                                ) : (
                                  <>Save</>
                                )}
                              </button>

                              <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="text-btn-sm px-4 py-1 bg-gray-400 text-white text-sm font-medium rounded-large  focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>

                          {/* Error state during editing */}
                          {error && (
                            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-200">
                              <div className="flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2 text-red-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Error: {error}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          onClick={handleEditClick}
                          className="w-full p-3  min-h-[80px] cursor-pointer transition-colors group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              {taskData?.description ? (
                                <p className="text-gray-700 whitespace-pre-wrap">
                                  {taskData.description}
                                </p>
                              ) : (
                                <p className="text-gray-400 italic">
                                  Click to add description...
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {/* --------------------------- */}

                {state.selectedAttachment && (
                  <div className="mt-4 p-3 border rounded">
                    <p className="font-medium">
                      Selected Attachment:{" "}
                      {state.selectedAttachment.details.fileName}
                    </p>
                    <div className="flex items-center space-x-2">
                      <img
                        src={getFileIcon(
                          state.selectedAttachment.details.fileName
                        )}
                        alt={state.selectedAttachment.details.fileName}
                        className="w-5 h-5"
                      />
                      <a
                        href={state.selectedAttachment.drive_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        View
                      </a>
                      <Button
                        onClick={() =>
                          dispatch({
                            type: "SET_SELECTED_ATTACHMENT",
                            payload: null,
                          })
                        }
                        className="ml-2 text-sm bg-red-500 text-white"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
                <div className="flex space-x-4 border-b border-gray-300 mt-6">
                  <button
                    className={`py-2 px-4 ${
                      state.activeTab === "add"
                        ? "border-b-2 border-primary text-primary font-semibold"
                        : "text-title/50"
                    }`}
                    onClick={() =>
                      dispatch({ type: "SET_ACTIVE_TAB", payload: "add" })
                    }
                  >
                    Add Attachment
                  </button>
                  <button
                    className={`py-2 px-4 ${
                      state.activeTab === "all"
                        ? "border-b-2 border-primary text-primary font-semibold"
                        : "text-title/50"
                    }`}
                    onClick={() =>
                      dispatch({ type: "SET_ACTIVE_TAB", payload: "all" })
                    }
                  >
                    All Attachments ({state.attachments.length})
                  </button>
                </div>
                <div className="mt-4 mb-5">
                  {state.activeTab === "add" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-title">Uploading</label>
                        <div
                          className="w-full text-title/50 text-caption p-4 border rounded-medium border-gray-400 flex justify-between items-center cursor-pointer"
                          onClick={() =>
                            dispatch({ type: "SET_MODAL_OPEN", payload: true })
                          }
                        >
                          Choose file here...
                          <svg
                            width="18"
                            height="20"
                            viewBox="0 0 18 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="inline-block cursor-pointer ml-2"
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
                        {state.isModalOpen && (
                          <ModalUploadAttachment
                            boardId={boardId}
                            checklistId={checklistId}
                            isOpen={state.isModalOpen}
                            onClose={() =>
                              dispatch({
                                type: "SET_MODAL_OPEN",
                                payload: false,
                              })
                            }
                            onAttachmentSelected={handleAttachmentSelected}
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <PostCommentChecklist checklistId={checklistId} />
                      </div>
                      {state.error ? (
                        <div
                          className={`text-center py-4 ${
                            state.error === "No comments yet"
                              ? "text-gray-500"
                              : "text-red-500"
                          }`}
                        >
                          {state.error}
                          {state.error !== "No comments yet" && (
                            <Button
                              onClick={() =>
                                dispatch({ type: "SET_COMMENTS", payload: [] })
                              }
                              className="ml-2 text-sm bg-primary text-white"
                            >
                              Retry
                            </Button>
                          )}
                        </div>
                      ) : (
                        <CommentChecklistSec
                          comments={state.comments}
                          checklistId={checklistId}
                          onCommentsUpdated={handleCommentsUpdated}
                        />
                      )}
                    </div>
                  )}
                  {state.activeTab === "all" && (
                    <div className="h-[400px] overflow-auto scrollbar-hidden">
                      {state.attachmentError ? (
                        <div className="text-red-500 text-center py-4">
                          {state.attachmentError}
                          {state.attachmentError !== "No attachments found" && (
                            <Button
                              onClick={() =>
                                dispatch({
                                  type: "SET_ATTACHMENTS",
                                  payload: [],
                                })
                              }
                              className="ml-2 text-sm bg-primary text-white"
                            >
                              Retry
                            </Button>
                          )}
                        </div>
                      ) : state.attachments.length === 0 ? (
                        <div className="text-center py-4">
                          No attachments available
                        </div>
                      ) : (
                        state.attachments.map((item) => (
                          <div
                            key={item.attachmentId}
                            className="mb-4 p-3 border rounded"
                          >
                            <p className="text-sm text-gray-500">
                              Created on{" "}
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                            <div className="mt-1 flex items-center space-x-2">
                              <img
                                src={getFileIcon(item.details.fileName)}
                                alt={item.details.fileName}
                                className="w-5 h-5"
                              />
                              {item.drive_url ? (
                                <a
                                  href={item.drive_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blueActive/50"
                                >
                                  {item.details.fileName}
                                </a>
                              ) : (
                                <span className="text-gray-600">
                                  {item.details.fileName} (No link available)
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalDetailChecklist;
