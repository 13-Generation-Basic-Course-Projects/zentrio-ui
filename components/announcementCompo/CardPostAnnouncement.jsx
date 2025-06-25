"use client";

import { ThumbsUp, Bookmark, EllipsisVertical, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModalOptionAnnoun from "./ModalOptionAnnoun";
import { LikeReactionButton } from "./ModalLikeComponent";
import ImageViewer from "./popupImage";

export default function CardPostAnnouncement({
  Announcements,
  currentUserProfile,
  boardId,
  boardMember,
  preventUserImage
}) {
  const announcementList = Announcements?.payload || [];

  const currentUserBoardInfo = boardMember.find(
    (member) => member.userId === currentUserProfile?.payload?.user?.userId
  );
  const currentUserRoles = currentUserBoardInfo?.roles || [];
  const isProjectManager = currentUserRoles.includes("ROLE_MANAGER");

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
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="flex font-bold text-title">
                      {announcement.createdBy?.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(announcement.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
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
              <div className="flex items-center justify-between border-t border-gray-100 pt-1">
                <div className="flex items-center gap-6">
                  <LikeReactionButton
                    announId={announcement?.announcementId}
                    reacts={announcement?.reacts}
                    currentUserProfile={currentUserProfile}
                  />
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-4 border-t border-gray-200 pt-4 space-y-4">
                {/* Mock Comments */}
                <div className="space-y-2">
                  {[
                    {
                      user: {
                        username: "Alice",
                        imageUrl: "https://i.pravatar.cc/40?img=3",
                      },
                      text: "Great announcement!",
                    },
                    {
                      user: {
                        username: "Bob",
                        imageUrl: "https://i.pravatar.cc/40?img=4",
                      },
                      text: "Thank you for the update!",
                    },
                  ].map((comment, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <img
                        src={comment.user.imageUrl}
                        alt={comment.user.username}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-[80%]">
                        <p className="text-sm font-semibold text-title">
                          {comment.user.username}
                        </p>
                        <p className="text-sm text-description">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex items-start gap-3">
                  <img
                    src={announcement.createdBy?.imageUrl}
                    alt="You"
                    className="w-8 h-8 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <textarea
                      rows={2}
                      placeholder="Write a comment..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        size="sm"
                        className="text-white rounded-2xl bg-primary hover:bg-primary/90"
                      >
                        Post
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
