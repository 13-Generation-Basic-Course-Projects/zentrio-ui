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
    <div className=" mx-auto h-screen overflow-hidden p-4">
      <div className="h-full overflow-y-auto space-y-4 scroll-container pb-[400px] ">
        {announcementList.map((announcement, index) => (
          <Card
            key={index}
            className="w-full bg-white shadow-sm border border-gray-200"
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={announcement.createdBy?.imageUrl}
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-title">
                      {announcement.createdBy?.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {announcement.createdAt}
                    </p>
                  </div>
                </div>
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
                  {/* <Button
                    variant="ghost"
                    size="sm"
                    className="text-title hover:text-primary p-0"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Bookmark
                  </Button> */}
                </div>
                <span className="text-sm text-title">{"Read 11"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
