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
import { parseDate } from "@internationalized/date";
import { IconAdd, StackedProfileChecklist } from "../../icon/everyicon";
import ModalUploadAttachment from "./ModalUploadAttachment";
import Trash from "@/components/button/Trash";
import PopupAction from "@/components/popup/PopupAction";
import { IconpopupDelete } from "@/components/icon/Iconpopup";
import { preventImage } from "@/constant/preventimage";
import {
  changeStatusCheckListAction,
  getCommentByCheckListIdAction,
  getCheckListByTaskIdAction,
  updateCheckListByIdAndTaskIdAction,
  uploadCoverChecklistAction,
  chageStatusCheckListAction,
} from "@/action/board.action";
import PostCommentChecklist from "./PostCommentChecklist";
import CommentChecklistSec from "./CommentChecklistSec";
import { getAttactmentAction } from "@/action/document.action";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CameraIcon } from "lucide-react";
import { CardCheckList } from "@/components/card/CardChecklist";
import FeedbackDisplay from "./FeedbackOfTask";

const initialState = {
  activeTab: "add",
  isModalOpen: false,
  selectedAttachment: null,
  comments: [],
  loading: false,
  error: null,
  attachments: [],
  actions: [],
  attachmentError: null,
  currentStatus: "IN_PROGRESS",
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
    case "SET_ATTENDMENTS":
      return { ...state, attachments: action.payload };
    case "SET_ATTENDMENT_ERROR":
      return { ...state, attachmentError: action.payload };
    case "SET_CURRENT_STATUS":
      return { ...state, currentStatus: action.payload };
    case "SET_ACTIONS":
      return { ...state, actions: action.payload };
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
    dispatch({ type: "SET_ATTENDMENT_ERROR", payload: null });
    dispatch({ type: "SET_ATTENDMENTS", payload: [] });
    try {
      const result = await getAttactmentAction(checklistId);
      if (result.success) {
        dispatch({ type: "SET_ATTENDMENTS", payload: [result.payload] });
      } else {
        dispatch({
          type: "SET_ATTENDMENT_ERROR",
          payload: result.error || "Failed to load attachments",
        });
      }
    } catch (err) {
      dispatch({
        type: "SET_ATTENDMENT_ERROR",
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
      console.log("Fetched comments:", result);
      if (result.success) {
        dispatch({ type: "SET_COMMENTS", payload: result.payload || [] }); // Use result.payload
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
    if (checklistId && !fetchingRef.current) {
      fetchComments();
      fetchAttachments();
    }
  }, [checklistId, fetchComments, fetchAttachments]); // Removed isOpen dependency

  return { state, dispatch, shouldStayOpen };
};

const useDescriptionEditor = (taskId, checklistId, isOpen) => {
  const [newDescription, setNewDescription] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState(null);
  const [checklistData, setChecklistData] = useState(null);
  const [taskStartedAt, setTaskStartedAt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [changedFields, setChangedFields] = useState(new Set());

  useEffect(() => {
    console.log("useDescriptionEditor useEffect:", {
      isOpen,
      taskId,
      checklistId,
    });
    if (isOpen && taskId && checklistId) {
      const fetchTask = async () => {
        try {
          setIsLoading(true);
          const response = await getCheckListByTaskIdAction({ taskId });
          if (!response?.payload) {
            throw new Error("No checklist data returned");
          }
          const checklist = response.payload.find(
            (ch) => ch.checklistId === checklistId
          );
          if (!checklist) {
            throw new Error("Checklist not found");
          }
          console.log("Fetched checklist:", checklist);
          setChecklistData(checklist);
          setTaskStartedAt(
            response.taskStartedAt || checklist.taskStartedAt || null
          );
          setNewDescription(checklist.description || "");
          setNewTitle(checklist.title || "");
          let startDate = null;
          let endDate = null;
          if (checklist.startedAt) {
            const start = new Date(checklist.startedAt);
            if (!isNaN(start.getTime())) {
              startDate = parseDate(start.toISOString().split("T")[0]);
            }
          }
          if (checklist.finishedAt) {
            const end = new Date(checklist.finishedAt);
            if (!isNaN(end.getTime())) {
              endDate = parseDate(end.toISOString().split("T")[0]);
            }
          }
          setDateRange({ start: startDate, end: endDate });
          setChangedFields(new Set());
        } catch (err) {
          setError(err.message || "Failed to load checklist data");
          toast.error(`Failed to load checklist data: ${err.message}`, {
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
    setIsEditingTitle(false);
    setNewDescription(checklistData?.description || "");
    setNewTitle(checklistData?.title || "");
    let startDate = null;
    let endDate = null;
    if (checklistData?.startedAt) {
      const start = new Date(checklistData.startedAt);
      if (!isNaN(start.getTime())) {
        startDate = parseDate(start.toISOString().split("T")[0]);
      }
    }
    if (checklistData?.finishedAt) {
      const end = new Date(checklistData.finishedAt);
      if (!isNaN(end.getTime())) {
        endDate = parseDate(end.toISOString().split("T")[0]);
      }
    }
    setDateRange({ start: startDate, end: endDate });
    setChangedFields(new Set());
    setError(null);
  };

  const handleDescriptionChange = useCallback((e) => {
    setNewDescription(e.target.value);
    setChangedFields((prev) => new Set(prev).add("description"));
    setError(null);
  }, []);

  const handleTitleChange = useCallback((e) => {
    setNewTitle(e.target.value);
    setChangedFields((prev) => new Set(prev).add("title"));
    setError(null);
  }, []);

  const handleDateRangeChange = useCallback(
    (value) => {
      console.log("DateRangePicker onChange:", value);
      const now = new Date();
      const start = value.start
        ? new Date(value.start.year, value.start.month - 1, value.start.day)
        : null;
      if (start && start < now) {
        console.log("Invalid start date (past):", start);
        toast.error("Start date must be in the present or future", {
          position: "top-right",
          autoClose: 4000,
        });
        return;
      }
      if (taskStartedAt && start) {
        const taskStart = new Date(taskStartedAt);
        if (!isNaN(taskStart.getTime()) && start < taskStart) {
          console.log("Invalid start date (before task):", start);
          toast.error("Start date cannot be before task's start time", {
            position: "top-right",
            autoClose: 4000,
          });
          return;
        }
      }
      console.log("Updating dateRange:", {
        start: value.start,
        end: value.end,
      });
      setDateRange({ start: value.start, end: value.end });
      setChangedFields((prev) =>
        new Set(prev).add("startedAt").add("finishedAt")
      );
    },
    [taskStartedAt]
  );

  const handleSaveTitle = useCallback(async () => {
    console.log("handleSaveTitle called with changedFields:", [
      ...changedFields,
    ]);
    if (changedFields.has("title") && !newTitle?.trim()) {
      setError("Title cannot be empty.");
      toast.error("Title cannot be empty", {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }

    if (!checklistData || !taskId || !checklistId) {
      setError("Checklist data or IDs not loaded.");
      toast.error("Checklist data or IDs not loaded", {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Construct payload with all required fields
      let startedAt = checklistData.startedAt;
      let finishedAt = checklistData.finishedAt;

      if (changedFields.has("startedAt")) {
        startedAt = dateRange.start
          ? new Date(
              dateRange.start.year,
              dateRange.start.month - 1,
              dateRange.start.day
            ).toISOString()
          : checklistData.startedAt;
        if (!startedAt) {
          startedAt = new Date().toISOString();
        } else {
          const parsedStartDate = new Date(startedAt);
          if (isNaN(parsedStartDate.getTime())) {
            throw new Error("Invalid startedAt date format");
          }
          if (parsedStartDate < new Date()) {
            startedAt = new Date().toISOString();
          }
          if (taskStartedAt) {
            const taskStart = new Date(taskStartedAt);
            if (!isNaN(taskStart.getTime()) && parsedStartDate < taskStart) {
              startedAt = taskStart.toISOString();
            }
          }
        }
      }

      if (changedFields.has("finishedAt")) {
        finishedAt = dateRange.end
          ? new Date(
              dateRange.end.year,
              dateRange.end.month - 1,
              dateRange.end.day
            ).toISOString()
          : checklistData.finishedAt;
        if (finishedAt) {
          const parsedFinishDate = new Date(finishedAt);
          if (isNaN(parsedFinishDate.getTime())) {
            throw new Error("Invalid finishedAt date format");
          }
          if (changedFields.has("startedAt") && startedAt) {
            const startDate = new Date(startedAt);
            if (new Date(finishedAt) < startDate) {
              finishedAt = startedAt;
            }
          }
        }
      }

      const payload = {
        title: changedFields.has("title")
          ? newTitle.trim()
          : checklistData.title,
        description: checklistData.description,
        startedAt,
        finishedAt,
        taskId: checklistData.taskId,
      };

      console.log(
        "Sending update title to updateCheckListByIdAndTaskIdAction:",
        payload
      );

      const result = await updateCheckListByIdAndTaskIdAction(
        checklistId,
        payload.title,
        payload.description,
        payload.startedAt,
        payload.finishedAt,
        payload.taskId
      );

      if (result.success) {
        setChecklistData({
          ...checklistData,
          title: payload.title,
          description: payload.description,
          startedAt: payload.startedAt,
          finishedAt: payload.finishedAt,
        });
        toast.success("Checklist updated title successfully ", {
          position: "top-right",
          autoClose: 2500,
        });
        setIsEditing(false);
        setIsEditingTitle(false);
        setChangedFields(new Set());
        return result;
      } else {
        throw new Error(result.error || "Failed to update checklist");
      }
    } catch (err) {
      const errorMessage = err.message || JSON.stringify(err) || "Bad Request";
      setError(errorMessage);
      toast.error(`Failed to update checklist: ${errorMessage}`, {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [
    checklistData,
    newTitle,
    // newDescription,
    checklistId,
    taskId,
    dateRange,
    taskStartedAt,
    changedFields,
  ]);
  const handleSaveDecription = useCallback(async () => {
    console.log("handleSaveDescription called with changedFields:", [
      ...changedFields,
    ]);
    if (changedFields.has("description") && !newDescription?.trim()) {
      setError("Description cannot be empty.");
      toast.error("Description cannot be empty", {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }
    if (!checklistData || !taskId || !checklistId) {
      setError("Checklist data or IDs not loaded.");
      toast.error("Checklist data or IDs not loaded", {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Construct payload with all required fields
      let startedAt = checklistData.startedAt;
      let finishedAt = checklistData.finishedAt;

      if (changedFields.has("startedAt")) {
        startedAt = dateRange.start
          ? new Date(
              dateRange.start.year,
              dateRange.start.month - 1,
              dateRange.start.day
            ).toISOString()
          : checklistData.startedAt;
        if (!startedAt) {
          startedAt = new Date().toISOString();
        } else {
          const parsedStartDate = new Date(startedAt);
          if (isNaN(parsedStartDate.getTime())) {
            throw new Error("Invalid startedAt date format");
          }
          if (parsedStartDate < new Date()) {
            startedAt = new Date().toISOString();
          }
          if (taskStartedAt) {
            const taskStart = new Date(taskStartedAt);
            if (!isNaN(taskStart.getTime()) && parsedStartDate < taskStart) {
              startedAt = taskStart.toISOString();
            }
          }
        }
      }

      if (changedFields.has("finishedAt")) {
        finishedAt = dateRange.end
          ? new Date(
              dateRange.end.year,
              dateRange.end.month - 1,
              dateRange.end.day
            ).toISOString()
          : checklistData.finishedAt;
        if (finishedAt) {
          const parsedFinishDate = new Date(finishedAt);
          if (isNaN(parsedFinishDate.getTime())) {
            throw new Error("Invalid finishedAt date format");
          }
          if (changedFields.has("startedAt") && startedAt) {
            const startDate = new Date(startedAt);
            if (new Date(finishedAt) < startDate) {
              finishedAt = startedAt;
            }
          }
        }
      }

      const payload = {
        title: checklistData.title,
        description: changedFields.has("description")
          ? newDescription.trim()
          : checklistData.description,
        startedAt,
        finishedAt,
        taskId: checklistData.taskId,
      };

      console.log(
        "Sending update description to updateCheckListByIdAndTaskIdAction:",
        payload
      );

      const result = await updateCheckListByIdAndTaskIdAction(
        checklistId,
        payload.title,
        payload.description,
        payload.startedAt,
        payload.finishedAt,
        payload.taskId
      );

      if (result.success) {
        setChecklistData({
          ...checklistData,
          title: payload.title,
          description: payload.description,
          startedAt: payload.startedAt,
          finishedAt: payload.finishedAt,
        });
        toast.success("Checklist updated descrition successfully ", {
          position: "top-right",
          autoClose: 2500,
        });
        setIsEditing(false);
        setIsEditingTitle(false);
        setChangedFields(new Set());
        return result;
      } else {
        throw new Error(
          result.error || "Failed to update decription checklist"
        );
      }
    } catch (err) {
      const errorMessage = err.message || JSON.stringify(err) || "Bad Request";
      setError(errorMessage);
      toast.error(`Failed to update checklist: ${errorMessage}`, {
        position: "top-right",
        autoClose: 4000,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [
    checklistData,
    // newTitle,
    newDescription,
    checklistId,
    taskId,
    dateRange,
    taskStartedAt,
    changedFields,
  ]);

  const handleSubmitTitle = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSaveTitle();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    },
    [handleSaveTitle, handleCancel]
  );
  const handleSubmitDecription = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSaveDecription();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    },
    [handleSaveDecription, handleCancel]
  );

  const handleBlur = () => {
    setIsEditing(false);
    setIsEditingTitle(false);
    setNewDescription(checklistData?.description || "");
    setNewTitle(checklistData?.title || "");
    setChangedFields(new Set());
    setError(null);
  };

  return {
    taskData: checklistData,
    newDescription,
    newTitle,
    isEditing,
    isEditingTitle,
    loading: isLoading,
    error,
    handleEditClick,
    handleEditTitleClick,
    handleDescriptionChange,
    // handleSubmit,
    handleBlur,
    // handleSave,
    handleSubmitTitle,
    handleSubmitDecription,
    handleSaveDecription,
    handleTitleChange,
    handleCancel,
    dateRange,
    handleDateRangeChange,
    taskStartedAt,
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
  isModalDisabled,
  imageChecklist,
  feedbackByTaskIds,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { state, dispatch, shouldStayOpen } = useChecklistData(
    checklistId,
    isOpen
  );
  const [totalCommentLength, setTotalCommentLength] = useState(0); // Add state

  console.log("hhhh", image);
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
    handleSaveDecription,
    handleSubmitTitle,
    handleSubmitDecription,
    handleTitleChange,
    handleCancel,
    dateRange,
    handleDateRangeChange,
    taskStartedAt,
  } = useDescriptionEditor(taskId, checklistId, isOpen);

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

  // Toggle status between IN_PROGRESS and DONE
  const [currentStatus, setCurrentStatus] = useState(status); // Initialize with status (PENDING)

  // Toggle status: PENDING/IN_PROGRESS -> DONE, DONE -> IN_PROGRESS
  const handleStatusChange = async () => {
    const newStatus = currentStatus === "DONE" ? "IN_PROGRESS" : "DONE";
    try {
      const result = await chageStatusCheckListAction(id, newStatus);
      if (result.success) {
        setCurrentStatus(newStatus); // Update UI on success
      } else {
        console.error("Failed to update status:", result.error);
      }
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleOpenChange = useCallback(
    (open) => {
      if (!open && shouldStayOpen.current) return;
      onOpenChange(open);
      if (!open) {
        dispatch({ type: "SET_COMMENTS", payload: [] });
        dispatch({ type: "SET_ERROR", payload: null });
        dispatch({ type: "SET_ACTIVE_TAB", payload: "add" });
        dispatch({ type: "SET_SELECTED_ATTACHMENT", payload: null });
        dispatch({ type: "SET_ATTENDMENTS", payload: [] });
        dispatch({ type: "SET_ATTENDMENT_ERROR", payload: null });
      }
    },
    [onOpenChange]
  );

  // Calculate totalCommentLength when state.comments changes
  useEffect(() => {
    const totalLength = state.comments.reduce(
      (sum, comment) => sum + (comment.content?.length || 0),
      0
    );
    console.log("Calculated totalCommentLength:", totalLength);
    setTotalCommentLength(totalLength);
  }, [state.comments]);

  // ... rest of the code ...

  const handleCommentsUpdated = useCallback(
    (dataOrUpdater) => {
      shouldStayOpen.current = true;
      const newComments =
        typeof dataOrUpdater === "function"
          ? dataOrUpdater(state.comments)
          : dataOrUpdater;
      dispatch({ type: "SET_COMMENTS", payload: newComments });
      // Update totalCommentLength
      const totalLength = newComments.reduce(
        (sum, comment) => sum + (comment.content?.length || 0),
        0
      );
      setTotalCommentLength(totalLength);
      setTimeout(() => {
        shouldStayOpen.current = false;
      }, 100);
    },
    [state.comments]
  );

  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(
    image || previewImage.noChecklistImage
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.", {
          position: "top-right",
          autoClose: 4000,
        });
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds 5MB limit.", {
          position: "top-right",
          autoClose: 4000,
        });
        return;
      }

      // Clean up previous blob URL if it exists
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }

      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);

      uploadImageToServer(file).catch((err) => {
        toast.error(`Image upload failed: ${err.message}`, {
          position: "top-right",
          autoClose: 4000,
        });
        // Clean up the blob URL on error
        URL.revokeObjectURL(imageUrl);
        // Set to default image or previous valid image
        setPreviewImage(image || defaultImage);
      });
    }
  };

  const uploadImageToServer = async (file) => {
    try {
      const response = await uploadCoverChecklistAction(checklistId, file);

      // Handle different response types
      let data;
      if (response.json && typeof response.json === "function") {
        data = await response.json();
      } else {
        data = response; // Assume it's already parsed
      }

      if (data.success) {
        // Clean up the blob URL since we now have the server URL
        if (previewImage && previewImage.startsWith("blob:")) {
          URL.revokeObjectURL(previewImage);
        }

        setPreviewImage(data.imageUrl);
        toast.success("Image uploaded successfully!", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        throw new Error(data.message || "Upload failed");
      }
    } catch (error) {
      throw error; // Re-throw to be caught by the catch in handleImageUpload
    }
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  useEffect(() => {
    if (!taskId || !checklistId) {
      console.error("Missing required props:", { taskId, checklistId });
      toast.error("Invalid task or checklist ID", {
        position: "top-right",
        autoClose: 4000,
      });
      router.push("/dashboard");
    }
  }, [taskId, checklistId, router]);
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const displayImage = imageChecklist
    ? imageChecklist
    : "https://media.sproutsocial.com/uploads/2024/01/facebook-cover-image.svg";

  console.log("Rendering CardCheckList with:", {
    commentCount: state.comments.length,
    totalCommentLength,
  });

  const matchingFeedback =
    feedbackByTaskIds
      ?.flat() // Flatten the array of arrays into a single array
      .filter((feedback) => feedback?.taskId === taskId) || [];


      console.log("this is role ",role);  

  return (
    <div>
      {role == "ROLE_MEMBER" || role == "ROLE_MANAGER" ? (
        ""
      ) : (
        <div className="relative flex justify-end items-center">
          <button
            onClick={handleStatusChange}
            className="absolute top-5 right-5 p-2 rounded-full transition-colors z-20 focus:outline-none"
            title={
              state.currentStatus === "DONE"
                ? "Mark as In Progress"
                : "Mark as Done"
            }
            disabled={loading}
          >
            {state.currentStatus === "DONE" ? (
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="#10B981"
                stroke="black"
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
                width="24"
                height="24"
                className="hover:fill-green-500 transition-colors"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            )}
          </button>
        </div>
      )}
      <Button
        onPress={onOpen}
        className="h-full w-full p-0"
        fullWidth={true}
        disabled={loading || isModalDisabled}
      >
        <div className="h-full w-full max-w-none px-0 bg-white">
          <CardCheckList
            status={status || state.currentStatus}
            title={title || "Untitled"}
            startDate={startDate}
            comment="static comment"
            label={label}
            image={displayImage}
            hideImage={hideImage}
            member={member || []}
            checkedListId={id}
            commentCount={state.comments.length}
            totalCommentLength={totalCommentLength}
            finishedAt={finishedAt}
            leaderId={leaderId}
            imageChecklist={displayImage}
            matchingFeedback={matchingFeedback} // ng use muy taskId
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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center sticky top-0 z-10 bg-white">
                <div className="flex flex-wrap justify-start items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
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
                    className="text-gray-500 hover:text-gray-600"
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
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center z-20">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
                  </div>
                )}

                {/* this is for change image checklist  */}
                <div className="border rounded-medium flex justify-center items-center relative w-full h-40">
                  <img
                    src={displayImage}
                    alt="Checklist Image"
                    className="w-full h-full object-cover rounded-medium"
                  />
                  {role === "ROLE_MEMBER" ? "": (

                    <>
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
                    disabled={loading}
                  >
                    <CameraIcon className="h-6 w-6 text-gray-600" />
                  </button>
                    
                    </>
                  )}
                </div>
                {/* newwwwww */}
                <div>
                  {/* Existing modal content */}
                  <FeedbackDisplay
                    taskTitle={title}
                    matchingFeedback={matchingFeedback}
                  />
                  {/* Other modal content */}
                </div>

                {/* newwwww */}
                <div className="flex flex-col">
                  {/* title and delete button */}
                  {role === "ROLE_MEMBER" ? "": (<div className="flex items-center justify-between gap-4 p-4 bg-white">
                    {isEditingTitle ? (
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={newTitle}
                          onChange={handleTitleChange}
                          onKeyDown={handleSubmitTitle}
                          className="w-full px-4 py-3 text-lg font-medium text-gray-900 focus:outline-none "
                          placeholder="Enter checklist title..."
                          autoFocus
                          disabled={loading}
                          aria-label="Checklist title input"
                          maxLength={100} // Prevent extremely long titles
                        />
                        {loading && (
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <div className="animate-spin h-4 w-4 "></div>
                            Saving...
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        onClick={handleEditTitleClick}
                        className="flex-1 min-w-0 cursor-pointer group"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleEditTitleClick();
                          }
                        }}
                        aria-label="Click to edit checklist title"
                      >
                        <div className="p-3 ">
                          <h1 className="text-lg font-medium text-gray-900 break-words leading-relaxed">
                            {newTitle || title || (
                              <span className="text-gray-500 italic">
                                Click to add title...
                              </span>
                            )}
                          </h1>
                        </div>
                      </div>
                    )}

                    <div className="flex-shrink-0">
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
                  </div>) }
                  
                 {/* this date picker  */}
                  <div className="flex flex-wrap justify-between items-center mt-5">
                    <StackedProfileChecklist
                      member={member || []}
                      preventUserImage={preventUserImage}
                      taskId={taskId}
                      allMemberChecklist={allMemberInBoard}
                      leaderId={leaderId}
                      checklistId={checklistId}
                      role={role}
                    />
                    <div className="max-w-[400px] w-full flex flex-row gap-4">
                      <DateRangePicker
                        showMonthAndYearPickers
                        variant="inline"
                        size="sm"
                        value={dateRange}
                        onChange={handleDateRangeChange}
                        isInvalid={
                          dateRange.start &&
                          (new Date(
                            dateRange.start.year,
                            dateRange.start.month - 1,
                            dateRange.start.day
                          ) < new Date() ||
                            (taskStartedAt &&
                              new Date(
                                dateRange.start.year,
                                dateRange.start.month - 1,
                                dateRange.start.day
                              ) < new Date(taskStartedAt)))
                        }
                        errorMessage={
                          dateRange.start &&
                          new Date(
                            dateRange.start.year,
                            dateRange.start.month - 1,
                            dateRange.start.day
                          ) < new Date()
                            ? "Start date must be in the present or future"
                            : dateRange.start &&
                              taskStartedAt &&
                              new Date(
                                dateRange.start.year,
                                dateRange.start.month - 1,
                                dateRange.start.day
                              ) < new Date(taskStartedAt)
                            ? "Start date cannot be before task's start time"
                            : ""
                        }
                        label="Checklist Dates"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
                {/*  Description section */}
                
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-wrap justify-between items-center">
                      <p className="text-h6 font-bold">Description</p>
                      {/* Show edit button only for non-ROLE_MEMBER users */}
                      {role !== "ROLE_MEMBER" && (
                        <div
                          className="p-1 cursor-pointer hover:bg-gray-100 rounded"
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
                      )}
                    </div>
                    {loading && !taskData && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 mr-2 border-t-2 border-blue-500"></div>
                        Loading checklist data...
                      </div>
                    )}
                    {error && !isEditing && (
                      <div className="text-sm text-red-500 p-2 bg-gray-50 rounded">
                        Error: {error}
                      </div>
                    )}
                    {(!loading || taskData) && (
                      <>
                        {isEditing && role !== "ROLE_MEMBER" ? ( // Restrict editing UI to non-ROLE_MEMBER
                          <div className="space-y-3">
                            <textarea
                              value={newDescription}
                              onChange={handleDescriptionChange}
                              onKeyDown={handleSubmitDecription}
                              className="w-full p-3 resize-none border-none focus:ring-primary text-gray-700"
                              rows="2"
                              placeholder="Enter description..."
                              autoFocus
                              disabled={loading}
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-2">
                                <button
                                  onClick={handleSaveDecription}
                                  disabled={loading || !newDescription?.trim()}
                                  className="text-btn-sm px-2 py-1 bg-primary text-white rounded-full hover:bg-blue-700 focus:ring-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                  {loading ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 mr-2 border-t-2 border-white inline-block"></div>
                                      Saving...
                                    </>
                                  ) : (
                                    "Save"
                                  )}
                                </button>
                                <button
                                  onClick={handleCancel}
                                  disabled={loading}
                                  className="text-btn-sm px-2 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                            {error && (
                              <div className="text-btn-sm text-red-500 p-2 bg-gray-50 rounded border border-red-200">
                                <div className="flex items-center">
                                  <svg
                                    className="h-4 w-4 mr-2 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
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
                            onClick={role !== "ROLE_MEMBER" ? handleEditClick : undefined} // Disable click for ROLE_MEMBER
                            className={`w-full p-3 ${role !== "ROLE_MEMBER" ? "cursor-pointer" : "cursor-default"} min-h-[100px]`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                {taskData?.description ? (
                                  <span className="text-gray-700 whitespace-pre-wrap">
                                    {taskData.description}
                                  </span>
                                ) : (
                                  <span className="text-gray-400 italic">
                                    {role !== "ROLE_MEMBER" ? "Click to add description..." : "No description available"}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                </div>
               
               {/* this is  atteactment  + commment */}
               
                <div className="mt-4 mb-5">
                  {state.activeTab === "add" && (
                    <div className="space-y-4">
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



                      {/* comment */}
                      <div className="space-y-2">
                        <PostCommentChecklist checklistId={checklistId} />
                      </div> 
                      {/* comment */}
                      {state.error ? (
                        <div
                          className={`text-center p-4 ${
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
                              className="ml-2 text-sm px-4 py-2 bg-blue-600 text-white rounded-full"
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
                      {state.error ? (
                        <div className="text-red-500 text-center p-4">
                          {state.error}
                          {state.error !== "No actions available" && (
                            <Button
                              onClick={() =>
                                dispatch({ type: "SET_ACTIONS", payload: [] })
                              }
                              className="ml-2 text-sm px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                              Retry
                            </Button>
                          )}
                        </div>
                      ) : state.actions.length === 0 ? (
                        <div className="text-center p-4 text-gray-500">
                          No actions available.
                        </div>
                      ) : (
                        state.actions.map((action) => (
                          <div
                            key={action.actionId}
                            className="mb-4 p-3 border rounded-md border-gray-200"
                          >
                            <p className="text-sm text-gray-600">
                              Created on{" "}
                              {new Date(action.createdAt).toLocaleString()}
                            </p>
                            <div className="mt-2 flex items-center gap-x-2">
                              <img
                                src={getFileIcon(action.fileName)}
                                alt={action.fileName || "File"}
                                className="h-5 w-5"
                              />
                              {action?.url ? (
                                <a
                                  href={action.url}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  {action.fileName || "Unnamed File"}
                                </a>
                              ) : (
                                <span className="text-gray-600">
                                  {action.fileName || "Unnamed File"} (No link
                                  available)
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
