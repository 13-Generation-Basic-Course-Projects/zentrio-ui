// ✅ hooks/useWebSocketNotifications.js
"use client";
import { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Token } from "@/constant/token";
import { getNotificationForUserIdAction } from "@/action/notification.action";

export default function useWebSocketNotifications({userId}) {
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);

    ("uerId in useWebSocketNotifications:", userId);

  useEffect(() => {
    if (!userId) return; // wait until userId is ready

    let stompClient = null;

    const setupWebSocketAndFetch = async () => {
      try {
        const jwtToken = await Token();
        const token = jwtToken?.Credential;

        if (!token) {
          console.error("❌ Missing token");
          return;
        }

        // ✅ Initial fetch
        const result = await getNotificationForUserIdAction(userId);

          ("notification result:", result);

        const raw = result?.payload ?? result?.data ?? [];
        const sorted = Array.isArray(raw)
          ? raw.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          : [];

        setNotifications(sorted);

        // ✅ WebSocket
        stompClient = new Client({
          // webSocketFactory: () => new SockJS("http://16.176.18.10:9100/ws"),
          webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
          debug: (str) =>   ("STOMP DEBUG:", str),
          connectHeaders: { Authorization: `Bearer ${token}` },
          reconnectDelay: 5000,
          onConnect: () => {
            setConnected(true);
            stompClient.subscribe("/user/topic/notifications", (message) => {
              const notification = JSON.parse(message.body);
                ("📨 Real-time Notification:", notification);
              setNotifications((prev) => [notification, ...prev]);
            });
            // stompClient.subscribe("/topic/all-notifications", (message) => {
            //   const notification = JSON.parse(message.body);
            //     ("📨 Broadcast Notification:", notification);
            //   setNotifications((prev) => [notification, ...prev]);
            // });
          },
          onStompError: (frame) => {
            console.error("STOMP error:", frame);
          },
          onDisconnect: () => {
            setConnected(false);
          },
        });

        stompClient.activate();
      } catch (e) {
        console.error("WebSocket init error:", e);
      }
    };

    setupWebSocketAndFetch();

    return () => {
      if (stompClient) stompClient.deactivate();
    };
  }, [userId]);

  return { notifications, connected };
}
