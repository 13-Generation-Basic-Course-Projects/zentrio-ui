"use client";
import React, { useEffect, useState } from "react";
import * as SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Token } from "@/constant/token";
import { getNotificationForUserIdAction } from "@/action/notification.action";

export default function WebSocketTest() {
  const [notifications, setNotifications] = useState([]);
  const [connected, setConnected] = useState(false);

  const userId = "fdc53bff-b75e-4237-87b4-264b32888773"; // TODO: Replace with dynamic user ID

  useEffect(() => {
    let stompClient = null;

    const setupWebSocketAndFetch = async () => {
      try {
        const jwtToken = await Token();
        const token = jwtToken?.Credential;
        if (!token) {
          console.error("❌ Missing token");
          return;
        }

        // Fetch initial notifications from API
        const result = await getNotificationForUserIdAction(userId);
        const raw = result?.payload ?? result?.data ?? result;

        if (Array.isArray(raw)) {
          // Sort notifications descending by createdAt
          const sorted = raw.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setNotifications(sorted);
        } else {
          console.error("Expected array of notifications, got:", raw);
        }

        // Setup WebSocket connection
        stompClient = new Client({
          webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
          connectHeaders: {
            Authorization: `Bearer ${token}`,
          },
          reconnectDelay: 5000,
          onConnect: () => {
            setConnected(true);
            console.log("✅ Connected to WebSocket");

            stompClient.subscribe("/user/topic/notifications", (message) => {
              const notification = JSON.parse(message.body);
              console.log("📨 User-specific Notification:", notification);
              setNotifications((prev) => [notification, ...prev]);
            });

            // stompClient.subscribe("/topic/all-notifications", (message) => {
            //   const notification = JSON.parse(message.body);
            //   console.log("📨 Broadcast Notification:", notification);
            //   setNotifications((prev) => [notification, ...prev]);
            // });
          },
          onStompError: (frame) => {
            console.error("❌ Broker error:", frame);
          },
          onDisconnect: () => {
            setConnected(false);
            console.log("🔌 WebSocket disconnected");
          },
        });

        stompClient.activate();
      } catch (error) {
        console.error(
          "❌ Failed to initialize WebSocket or fetch data:",
          error
        );
      }
    };

    setupWebSocketAndFetch();

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        console.log("🔌 WebSocket disconnected (cleanup)");
      }
    };
  }, [userId]);

  // Debug: log notifications state changes
  useEffect(() => {
    console.log("📝 Notifications state updated:", notifications);
  }, [notifications]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">WebSocket Notifications</h2>
      <p>Status: {connected ? "🟢 Connected" : "🔴 Disconnected"}</p>
      <ul className="mt-4">
        {notifications.map((n) => (
          <li
            key={n.notificationId ?? n.id ?? n.createdAt} // Use stable unique key
            className="border-b py-2">
            <strong>{n.title}</strong> <em>from {n.senderName}</em>
            <p>{n.content}</p>
            <small>{new Date(n.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
