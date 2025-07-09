"use client";

import initOneSignal from "@/utils/oneSignal";
import { useEffect } from "react";

export default function OneSignalInitializer({ userId }) {
  //  ("👀 OneSignalInitializer rendered with userId:", userId);

  useEffect(() => {
    //  ("🚀 useEffect triggered with userId:", userId);
    
    // Only initialize OneSignal if we have the required environment variable
    if (!process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) {
      //console.warn("⚠️ OneSignal App ID not configured, skipping initialization");
      return;
    }

    // Initialize OneSignal with or without userId
    try {
      initOneSignal(userId);
    } catch (error) {
      //console.error("❌ Failed to initialize OneSignal:", error);
    }
  }, [userId]);

  return null;
}
