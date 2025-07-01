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
                        fill="currentColor"
                        className="w-5 h-5"
                        viewBox="0 0 512 512"
                      >
                        <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
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
