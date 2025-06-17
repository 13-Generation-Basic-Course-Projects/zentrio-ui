// "use client";

import { ThumbsUp, Bookmark, EllipsisVertical, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModalOptionAnnoun from "./ModalOptionAnnoun";
import { LikeReactionButton } from "./ModalLikeComponent";
import ImageViewer from "./popupImage";
// import { useState } from "react";

export default function CardPostAnnouncement({
  Announcements,
  currentUserProfile,
  boardId,
}) {
  console.log("bottttt", boardId);
  const announcementList = Announcements?.payload || [];
  console.log("announcement", announcementList);
  console.log("current user", currentUserProfile);
  // Loop through each announcement
  announcementList.forEach((announcement, index) => {
    console.log(`📢 Announcement ${index + 1}: ${announcement.title}`);

    // Loop through each react in that announcement
    announcement.reacts?.forEach((react, i) => {
      console.log(`  👉 React ${i + 1}:`, react);
    });
  });
  // const [localAnnouncements, setLocalAnnouncements] = useState(announcementList);
  // console.log("announcementlist",announcementList);

  const handleDeleteSuccess = (deletedId) => {
    // console.log("id to delete: ", deletedId)
    // setLocalAnnouncements(prev => prev.filter(ann => ann.id !== deletedId));
  };

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
                {/* add icon pin if ispined=true */}
                <div className="flex items-center">
                {announcement.isPinned && (
                  <Pin className="w-13 h-13 text-primary" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-title hover:text-primary"
                >
                  <ModalOptionAnnoun
                    Announcement={announcement}
                    announId={announcement.announcementId}
                    boardId={boardId}
                    // onDeleteSuccess={() => handleDeleteSuccess(announcement.id)}
                  />
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
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-6">
                  <LikeReactionButton
                    announId={announcement?.announcementId}
                    reacts={announcement?.reacts}
                    currentUserProfile={currentUserProfile}
                  />
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="text-title hover:text-primary p-0"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Bookmark
                  </Button> */}
                </div>
                {/* <span className="text-sm text-title">{"Read 11"}</span> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
