import { ThumbsUp, Bookmark, EllipsisVertical, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ModalOptionAnnoun from "./ModalOptionAnnoun";

export default function CardPostAnnouncement({ Announcements }) {
  const announcementList = Announcements?.payload || [];
  console.log("announcement", announcementList);

  return (
    <div className="max-w-4xl mx-auto h-screen overflow-hidden p-4">
      <style>
        {`
            /* Hide scrollbar for Webkit browsers */
            ::-webkit-scrollbar {
              display: none;
            }
            /* Hide scrollbar for Firefox */
            .scroll-container {
              scrollbar-width: none;
            }
          `}
      </style>
      <div className="h-full overflow-y-auto space-y-4 scroll-container">
        {announcementList?.map((announcement, index) => (
          <Card
            key={index}
            className="w-full bg-white shadow-sm border border-gray-200"
          >
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
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
                    <p className="text-sm text-description">
                      {announcement.createdAt}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-title hover:text-primary"
                >
                  <ModalOptionAnnoun/>
                </Button>
              </div>

              {/* Post Title */}
              <h2 className="text-lg font-semibold text-title mb-4">
                {announcement.title}
              </h2>

              {/* Post Content */}
              <div className="text-description mb-6 leading-relaxed">
                <p>{announcement.description}</p>
              </div>

              {/* Optional Image */}
              {announcement.imageUrl?.length > 0 && (
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {announcement.imageUrl.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Announcement visual ${i + 1}`}
                      className="w-full h-auto rounded-lg object-cover max-h-96"
                    />
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-title hover:text-primary p-0"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Like
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-title hover:text-primary p-0"
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Bookmark
                  </Button>
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
