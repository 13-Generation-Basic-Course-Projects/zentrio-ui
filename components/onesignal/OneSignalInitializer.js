"use client";

import initOneSignal from "@/utils/oneSignal";
import { useEffect } from "react";

export default function OneSignalInitializer({ userId }) {
  console.log("👀 OneSignalInitializer rendered with userId:", userId);

  useEffect(() => {
    console.log("🚀 useEffect triggered with userId:", userId);
    if (userId) {
      initOneSignal(userId);
    }
  }, [userId]);

  return null;
}
