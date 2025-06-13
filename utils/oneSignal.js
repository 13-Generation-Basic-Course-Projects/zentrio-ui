// import OneSignal from 'react-onesignal';

// export default async function initOneSignal(externalUserId) {
//     await OneSignal.init({
//         appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
//         serviceWorkerPath: '/OneSignalSDKWorker.js',
//         notifyButton: {
//             enable: true,
//         },
//         allowLocalhostAsSecureOrigin: true,
//     });

//     if (externalUserId) {
//         await OneSignal.User.addAlias("external_id", externalUserId);
//     }
// }


import OneSignal from "react-onesignal";

export default async function initOneSignal(externalUserId) {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
    serviceWorkerPath: "/OneSignalSDKWorker.js",
    notifyButton: {
      enable: true,
    },
    allowLocalhostAsSecureOrigin: true,
  });

  if (externalUserId) {
    await OneSignal.User.addAlias("external_id", externalUserId);
  }
}
