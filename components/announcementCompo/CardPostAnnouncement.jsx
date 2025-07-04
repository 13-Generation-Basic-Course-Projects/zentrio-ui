"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

import {
  Pin,
  MessageCircle,
  Send,
  Heart,
  MoreHorizontal,
  Eye,
  Calendar,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModalOptionAnnoun from "./ModalOptionAnnoun";
import { LikeReactionButton } from "./ModalLikeComponent";
import ImageViewer from "./popupImage";
import CommentCompo from "./CommentCompo";
import { createCommentByAnnouncementIdAction } from "@/action/announcement.action";

export default function CardPostAnnouncement({
  Announcements,
  commentsMap, // Add this prop
  currentUserProfile,
  boardId,
  boardMember,
  preventUserImage,
  onCommentUpdate, // Add this prop
}) {
  const announcementList = Announcements?.payload || [];

  const currentUserBoardInfo = boardMember.find(
    (member) => member.userId === currentUserProfile?.payload?.user?.userId
  );
  const currentUserRoles = currentUserBoardInfo?.roles || [];
  const isProjectManager = currentUserRoles.includes("ROLE_MANAGER");

  const [commentInputs, setCommentInputs] = useState({});

  const handleCommentChange = (id, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitComment = async (announcementId) => {
    const content = commentInputs[announcementId]?.trim();
    if (!content) return;

    try {
      const res = await createCommentByAnnouncementIdAction({
        announcementId,
        content,
      });

      if (res?.success) {
        toast.success("Comment posted successfully!");
        setCommentInputs((prev) => ({ ...prev, [announcementId]: "" }));
        
        // Call the callback to update parent state if needed
        if (onCommentUpdate && res.data) {
          onCommentUpdate(announcementId, res.data);
        }
      } else {
        toast.error("Failed to post comment.");
      }
    } catch (err) {
      toast.error("An error occurred while posting the comment.");
      console.error("Failed to post comment", err);
    }
  };

  const getInitials = (username) => {
    return (
      username
        ?.split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto h-screen overflow-hidden px-4 py-3">
        <div className="h-full overflow-y-auto scrollbar-hidden space-y-6 scroll-container pb-[400px]">
          {announcementList.map((announcement, index) => {
            // Get comments from commentsMap instead of announcement.comments
            const announcementComments = commentsMap[announcement.announcementId] || [];
            
            return (
              <Card
                key={announcement.announcementId} // Use announcementId instead of index
                className="group bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden max-w-3xl mx-auto border-1"
              >
                <CardContent className="p-0">
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between">
                      <Link
                        href={{
                          pathname: `/profile/${announcement.createdBy?.userId}`,
                          query: {
                            name: announcement.createdBy?.username,
                            boardId: boardId,
                            profileImage: announcement.createdBy?.imageUrl,
                          },
                        }}
                        passHref
                      >
                        <div className="flex items-center gap-4 cursor-pointer hover:opacity-90 transition-opacity">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 p-0.5 shadow-lg">
                              <div className="w-full h-full rounded-full bg-white p-0.5">
                                {announcement.createdBy?.imageUrl ? (
                                  <img
                                    src={announcement.createdBy.imageUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                ) : (
                                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    {getInitials(announcement.createdBy?.username)}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-gray-900 text-lg">
                                {announcement.createdBy?.username}
                              </h3>
                              {isProjectManager && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                  <Crown className="w-3 h-3" />
                                  <span>Manager</span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-small text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(announcement.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="flex items-center gap-2">
                        {announcement.isPinned && (
                          <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            <Pin className="w-4 h-4" />
                            <span>Pinned</span>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-2"
                        >
                          {isProjectManager && (
                            <ModalOptionAnnoun
                              Announcement={announcement}
                              announId={announcement.announcementId}
                              boardId={boardId}
                              boardMember={boardMember}
                              preventUserImage={preventUserImage}
                            />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {announcement.title}
                    </h2>
                    <div className="prose prose-sm max-w-none mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {announcement.description}
                      </p>
                    </div>
                    {announcement.imageUrl?.length > 0 && (
                      <div className="mb-4 overflow-hidden">
                        <ImageViewer urls={announcement.imageUrl} />
                      </div>
                    )}
                  </div>

                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-end justify-between mb-4">
                      <LikeReactionButton
                        announId={announcement?.announcementId}
                        reacts={announcement?.reacts}
                        currentUserProfile={currentUserProfile}
                      />
                      <div className="flex items-center gap-2 text-gray-600 p-2">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">
                          {announcementComments.length} comments
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <CommentCompo
                        boardMember={boardMember}
                        announId={announcement?.announcementId}
                        comments={announcementComments} // Use comments from commentsMap
                        currentUserProfile={currentUserProfile}
                        boardId={boardId}
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:scale-[1.02] transition-transform duration-200">
                      {/* Avatar with Link to Profile */}
                      <Link
                        href={{
                          pathname: `/profile/${currentUserProfile?.payload?.user?.userId}`,
                          query: {
                            name: currentUserBoardInfo?.username,
                            boardId: boardId,
                            profileImage: currentUserBoardInfo?.profileImage,
                          },
                        }}
                        passHref
                      >
                        <div className="relative w-9 h-9 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
                          <div className="w-full h-full rounded-full ring-2 ring-primary ring-offset-2 ring-offset-white">
                            {currentUserBoardInfo?.profileImage ? (
                              <img
                                src={currentUserBoardInfo.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                {getInitials(currentUserBoardInfo?.username)}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>

                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder={`Comment as ${
                            currentUserBoardInfo?.username || "User"
                          }`}
                          className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                          value={commentInputs[announcement.announcementId] || ""}
                          onChange={(e) =>
                            handleCommentChange(
                              announcement.announcementId,
                              e.target.value
                            )
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSubmitComment(announcement.announcementId);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() =>
                            handleSubmitComment(announcement.announcementId)
                          }
                          disabled={
                            !commentInputs[announcement.announcementId]?.trim()
                          }
                          className="bg-primary hover:bg-blue-300 justify-center items-center text-white rounded-full p-2 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
