'use client';

import initOneSignal from '@/utils/oneSignal';
import { useEffect } from 'react';

export default function OneSignalInitializer() {
  useEffect(() => {
    // const userId2 = "e2405a33-c3b2-4bde-b2b3-a7fed4f7d86d";
    // const userId3 = "b1c2d3e4-f5a6-7b8c-9d0e-f1a2b3c4d5e6";
    // const userId = "0366b3f6-9922-4f1c-8d91-c74b0cf8edab";
    // const userId = "bcf9227f-c24a-47a0-b91f-50125c4ef0a2";
    initOneSignal();
    // initOneSignal(userId);
  }, []);

  return null;
}