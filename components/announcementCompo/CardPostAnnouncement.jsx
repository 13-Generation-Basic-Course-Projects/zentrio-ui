"use client";

import { Pin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModalOptionAnnoun from "./ModalOptionAnnoun";
import { LikeReactionButton } from "./ModalLikeComponent";
import ImageViewer from "./popupImage";
import CommentCompo from "./CommentCompo";

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

  console.log("this is comment",Announcements);

  return (
    <div className="mx-auto h-screen overflow-hidden px-2 py-1">
      <div className="h-full overflow-y-auto scrollbar-hidden space-y-4 scroll-container pb-[400px]">
        {announcementList.map((announcement, index) => (
          <Card
            key={index}
            className="w-full bg-white shadow-lg border-1 rounded-xl overflow-hidden"
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-[#59BAD5] to-[#4AB5D1] p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                        <img
                          src={announcement.createdBy?.imageUrl}
                          alt="Profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      {/* <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div> */}
                    </div>
                  </div>
                  <div>
                    <h3 className="flex font-bold text-title">
                      {announcement.createdBy?.username}
                    </h3>
                    <p className="text-small text-gray-500">
                      {new Date(announcement.createdAt).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  {announcement.isPinned && (
                    <Pin className="w-13 h-13 text-primary" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-title hover:text-primary"
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

              {/* Title */}
              <h2 className="text-lg font-semibold text-title mb-2">
                {announcement.title}
              </h2>

              {/* Description */}
              <p className="text-description mb-4 leading-relaxed">
                {announcement.description}
              </p>

              {/* Image Viewer */}
              {announcement.imageUrl?.length > 0 && (
                <div className="mb-4">
                  <ImageViewer urls={announcement.imageUrl} />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-end justify-between border-gray-100 pt-1 m-5">
                {/* like */}
                <div className="flex items-center gap-6">
                  <LikeReactionButton
                    announId={announcement?.announcementId}
                    reacts={announcement?.reacts}
                    currentUserProfile={currentUserProfile}
                  />
                </div>
                {/* comment */}
                <div className="flex items-center gap-2 text-gray-600 p-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {announcement?.comments?.length || 0}
                  </span>
                </div>
              </div>

              {/* comment list section */}
              <div>
                <CommentCompo 
                  boardMember={boardMember}
                  announId={announcement?.announcementId}
                  comments={announcement.comments}
                  currentUserProfile={currentUserProfile}
                />
              </div>

              {/* Comment input section */}
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-r from-[#59BAD5] to-[#4AB5D1] p-0.5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img
                        src={currentUserBoardInfo?.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full p-0.5"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-[2px] border-white" />
                </div>

                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      Comment as {currentUserBoardInfo?.username}
                    </span>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="md"
                        className="p-1 h-auto rounded-full"
                      >
                        <Send className="w-6 h-6 text-primary" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
