"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from "@heroui/react";
import { Pin, Calendar } from "lucide-react";

export default function DrawerPinAnnoun({
  isOpen,
  onOpenChange,
  onClose,
  announcements = [],
}) {
  const pinned = announcements.filter((item) => item.isPinned);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-lg font-bold text-primary flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path d="M16.881 4.345A23.112 23.112 0 0 1 8.25 6H7.5a5.25 5.25 0 0 0-.88 10.427 21.593 21.593 0 0 0 1.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.593.772-2.468a17.116 17.116 0 0 1-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0 0 18 11.25c0-2.414-.393-4.735-1.119-6.905ZM18.26 3.74a23.22 23.22 0 0 1 1.24 7.51 23.22 23.22 0 0 1-1.41 7.992.75.75 0 1 0 1.409.516 24.555 24.555 0 0 0 1.415-6.43 2.992 2.992 0 0 0 .836-2.078c0-.807-.319-1.54-.836-2.078a24.65 24.65 0 0 0-1.415-6.43.75.75 0 1 0-1.409.516c.059.16.116.321.17.483Z" />
          </svg>
          Pinned Announcements
        </DrawerHeader>
        <DrawerBody className="overflow-y-auto scrollbar-hidden">
          {pinned.length === 0 ? (
            <p className="text-gray-500">No pinned announcements.</p>
          ) : (
            <div className="space-y-4 ">
              {pinned.map((item) => (
                <div
                  key={item.announcementId}
                  className="relative flex flex-col p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition"
                >
                  {/* Pinned Badge */}
                  <div className="absolute top-6 right-5 bg-blue-100 text-primary text-small px-2 py-1 rounded-full font-medium flex items-center gap-1">
                    <Pin className="w-3 h-3" />
                    Pinned
                  </div>

                  {/* User Info */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-primary to-purple-600">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-0.5">
                        {item.createdBy?.imageUrl ? (
                          <img
                            src={item.createdBy.imageUrl}
                            alt="User Avatar"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-xs font-bold text-gray-700">
                            {(item.createdBy?.username || "U")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <h4 className="font-semibold text-gray-900 text-medium">
                        {item.createdBy?.username || "Unknown"}
                      </h4>
                      <div className="flex items-center gap-1 text-small text-gray-500 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-semibold text-title mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {item.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t pt-2 mt-auto text-sm text-gray-500">
                    <div className="flex items-center gap-1 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                      </svg>
                      <span>{item.reacts?.length || 0}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{item.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}