"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import CartPostAnnouncement from "../announcementCompo/CardPostAnnouncement";
import CardCreateAnnouncement from "../announcementCompo/CardCreateAnnouncement";
import CardAllMembers from "../announcementCompo/CardAllMembers";
import { preventImage } from "@/constant/preventimage";
import ClockWeather from "../announcementCompo/ClockWheather";
import Image from "next/image";
import nothing from "@/assets/nothingbox.png";
import DrawerPinAnnoun from "../announcementCompo/DrawerPinAnnoun";
import { Button } from "../ui/button";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export default function Announcementpage({
  boardId,
  Announcements,
  boardMember,
  currentUserProfile,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const preventUserImage = preventImage.noProfile;

  const currentUserBoardInfo = boardMember.find(
    (member) => member.userId === currentUserProfile?.payload?.user?.userId
  );
  const currentUserRoles = currentUserBoardInfo?.roles || [];
  const isProjectManager = currentUserRoles.includes("ROLE_MANAGER");

  const initialAnnouncements = (Announcements?.payload) || [];
  const initialCommentsMap = initialAnnouncements.reduce((acc, ann) => {
    acc[ann.announcementId] = ann.comments || [];
    return acc;
  }, {});

  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [commentsMap, setCommentsMap] = useState(initialCommentsMap);

  const sortedAnnouncements = useMemo(() => {
    return [...announcements].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      const dateA = new Date(a.createdAt || a.created_at || 0);
      const dateB = new Date(b.createdAt || b.created_at || 0);
      return dateB - dateA;
    });
  }, [announcements]);

  const stompClientRef = useRef(null);

  // ✅ Setup WebSocket + subscriptions
  useEffect(() => {
    if (!boardId) return;

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect(
      {},
      () => {
        // ✅ Subscribe only after successful connection
        stompClient.subscribe(`/topic/board/${boardId}/announcements`, (message) => {
          const payload = JSON.parse(message.body);
          const { type, announcement, announcementId } = payload;

          setAnnouncements((prev) => {
            switch (type) {
              case "CREATED":
                if (!prev.find((a) => a.announcementId === announcement.announcementId)) {
                  setCommentsMap((prevComments) => ({
                    ...prevComments,
                    [announcement.announcementId]: [],
                  }));
                  return [...prev, announcement];
                }
                return prev;

              case "UPDATED":
                return prev.map((a) =>
                  a.announcementId === announcement.announcementId ? { ...announcement } : a
                );

              case "DELETED":
                setCommentsMap((prevComments) => {
                  const copy = { ...prevComments };
                  delete copy[announcementId];
                  return copy;
                });
                return prev.filter((a) => a.announcementId !== announcementId);

              default:
                return prev;
            }
          });
        });

        stompClient.subscribe(`/topic/board/${boardId}/comments`, (message) => {
          try {
            const payload = JSON.parse(message.body);
            const { type = "CREATED", comment = payload.comment || payload, commentId, announcementId = comment?.announcementId || payload.announcementId } = payload;

            setCommentsMap((prev) => {
              const prevComments = prev[announcementId] || [];
              const currentCommentId = comment.id || commentId;

              let newState;
              switch (type) {
                case "CREATED":
                  if (prevComments.find((c) => c.id === currentCommentId)) return prev;
                  newState = {
                    ...prev,
                    [announcementId]: [...prevComments, comment],
                  };
                  break;

                case "UPDATED":
                  newState = {
                    ...prev,
                    [announcementId]: prevComments.map((c) =>
                      c.id === currentCommentId ? { ...comment } : c
                    ),
                  };
                  break;

                case "DELETED":
                  newState = {
                    ...prev,
                    [announcementId]: prevComments.filter((c) => c.id !== commentId),
                  };
                  break;

                default:
                  return prev;
              }

              return newState;
            });
          } catch (err) {
            console.error("Comment WebSocket error:", err);
          }
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      }
    );

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected");
        });
      }
    };
  }, [boardId]);

  const memoizedCommentsMap = useMemo(() => commentsMap, [commentsMap]);

  const handleCommentUpdate = useCallback((announcementId, newComment) => {
    setCommentsMap((prev) => ({
      ...prev,
      [announcementId]: [...(prev[announcementId] || []), newComment],
    }));
  }, []);

  return (
    <>
      <DrawerPinAnnoun
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        announcements={sortedAnnouncements}
      />

      <div className="grid grid-cols-12 w-full h-screen pt-2">
        <div className="flex col-span-1 justify-end p-2 ">
          <Button
            onClick={() => setIsDrawerOpen(true)}
            className="bg-gradient-to-r from-[#49bbda] to-[#0a8dbd] text-white shadow-lg hover:shadow-xl transition-all rounded-medium"
          >
            Pinned
          </Button>
        </div>
        <div className="col-span-7">
          {isProjectManager && (
            <CardCreateAnnouncement
              boardId={boardId}
              boardMember={boardMember}
              Announcements={Announcements}
              preventUserImage={preventUserImage}
              onCommentUpdate={handleCommentUpdate}
            />
          )}

          <div className="w-full h-full">
            {sortedAnnouncements.length > 0 ? (
              <CartPostAnnouncement
                Announcements={{ payload: sortedAnnouncements }}
                commentsMap={memoizedCommentsMap}
                currentUserProfile={currentUserProfile}
                boardId={boardId}
                preventUserImage={preventUserImage}
                boardMember={boardMember}
                onCommentUpdate={handleCommentUpdate}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
                <Image src={nothing} alt="No Announcements" width={100} height={100} />
                <p className="text-xl text-primary font-medium mt-4">
                  Nothing has announcement
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-4">
          <CardAllMembers
            boardMember={boardMember}
            preventUserImage={preventUserImage}
            boardId={boardId}
          />
          <ClockWeather />
        </div>
      </div>
    </>
  );
}
