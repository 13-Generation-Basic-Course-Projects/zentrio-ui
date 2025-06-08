'use client';

import initOneSignal from '@/utils/oneSignal';
import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

export default function OneSignalInitializer() {
  useEffect(() => {
    // const userId = "8a64d66d-b155-48f5-b166-b8f61861845d";
    // const userId2 = "e2405a33-c3b2-4bde-b2b3-a7fed4f7d86d";
    // const userId3 = "b1c2d3e4-f5a6-7b8c-9d0e-f1a2b3c4d5e6";
    initOneSignal();
    // initOneSignal(userId, userId2, userId3);
  }, []);

  return null;
}