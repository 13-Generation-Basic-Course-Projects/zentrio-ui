"use client";

import initOneSignal from "@/utils/oneSignal";
import { useEffect, useRef } from "react";

// Global flag to track initialization status
let isOneSignalInitialized = false;

export default function OneSignalInitializer({ userId }) {
  console.log("👀 OneSignalInitializer rendered with userId:", userId);
  const hasInitialized = useRef(false);

  useEffect(() => {
    console.log("🚀 useEffect triggered with userId:", userId);
    
    // Only initialize OneSignal if we have the required environment variable
    if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) {
      // console.warn("⚠️ OneSignal App ID not configured, skipping initialization");
      return;
    }

    // Prevent duplicate initialization
    if (isOneSignalInitialized || hasInitialized.current) {
      // console.log("⏭️ OneSignal already initialized, skipping");
      return;
    }

    // Initialize OneSignal with or without userId
    try {
      console.log("🔄 Initializing OneSignal...");
      initOneSignal(userId);
      isOneSignalInitialized = true;
      hasInitialized.current = true;
    } catch (error) {
      // console.error("❌ Failed to initialize OneSignal:", error);
      // Reset flags on failure so we can try again
      isOneSignalInitialized = false;
      hasInitialized.current = false;
    }
  }, []); // Remove userId from dependency array to prevent re-initialization

  return null;
}