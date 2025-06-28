"use client";

import { useState } from "react";
import { Pin, MessageCircle, Send, Heart, MoreHorizontal, Eye, Calendar, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModalOptionAnnoun from "./ModalOptionAnnoun";
import { LikeReactionButton } from "./ModalLikeComponent";
import ImageViewer from "./popupImage";
import CommentCompo from "./CommentCompo";
import { createCommentByAnnouncementIdAction } from "@/action/announcement.action";

export default function CardPostAnnouncement({
  Announcements,
  currentUserProfile,
  boardId,
  boardMember,
  preventUserImage,
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
      await createCommentByAnnouncementIdAction({ announcementId, content });
      setCommentInputs((prev) => ({ ...prev, [announcementId]: "" }));
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const getInitials = (username) => {
    return username?.split(' ').map(name => name[0]).join('').toUpperCase() || 'U';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(dateString);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto h-screen overflow-hidden px-4 py-3">
        <div className="h-full overflow-y-auto scrollbar-hidden space-y-6 scroll-container pb-[400px]">
          {announcementList.map((announcement, index) => (
            <Card
              key={index}
              className="group bg-white/90 backdrop-blur-sm  shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden max-w-2xl mx-auto border-1"
            >
              <CardContent className="p-0">
                {/* Header Section */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {/* Enhanced Profile Avatar */}
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 p-0.5 shadow-lg">
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

                      {/* User Info */}
                      <div className="flex-1">
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
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{getTimeAgo(announcement.createdAt)}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span>{formatDate(announcement.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
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

                {/* Content Section */}
                <div className="px-6 pb-4">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {announcement.title}
                  </h2>

                  {/* Description */}
                  <div className="prose prose-sm max-w-none mb-4">
                    <p className="text-gray-700 leading-relaxed">
                      {announcement.description}
                    </p>
                  </div>

                  {/* Image Viewer */}
                  {announcement.imageUrl?.length > 0 && (
                    <div className="mb-4 rounded-xl overflow-hidden">
                      <ImageViewer urls={announcement.imageUrl} />
                    </div>
                  )}
                </div>

                {/* Engagement Section */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                  <div className="flex items-end justify-between mb-4">
                    {/* Like Button */}
                    <div className="flex items-center gap-6">
                      <LikeReactionButton
                        announId={announcement?.announcementId}
                        reacts={announcement?.reacts}
                        currentUserProfile={currentUserProfile}
                      />
                    </div>

                    {/* Comment Count */}
                    <div className="flex items-center gap-2 text-gray-600 p-2">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-medium">
                        {announcement?.comments?.length || 0} comments
                      </span>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mb-4">
                    <CommentCompo
                      boardMember={boardMember}
                      announId={announcement?.announcementId}
                      comments={announcement.comments}
                      currentUserProfile={currentUserProfile}
                    />
                  </div>

                  {/* Enhanced Comment Input */}
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                    {/* Current User Avatar */}
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          {currentUserBoardInfo?.profileImage ? (
                            <img
                              src={currentUserBoardInfo.profileImage}
                              alt="Profile"
                              className="w-full h-full object-cover rounded-full p-0.5"
                            />
                          ) : (
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                              {getInitials(currentUserBoardInfo?.username)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    </div>

                    {/* Input Field */}
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={`Comment as ${currentUserBoardInfo?.username || 'User'}`}
                        className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                        value={commentInputs[announcement.announcementId] || ""}
                        onChange={(e) =>
                          handleCommentChange(announcement.announcementId, e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSubmitComment(announcement.announcementId);
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSubmitComment(announcement.announcementId)}
                        disabled={!commentInputs[announcement.announcementId]?.trim()}
                        className="bg-primary hover:bg-blue-300 justify-center items-center text-white rounded-full p-2 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}