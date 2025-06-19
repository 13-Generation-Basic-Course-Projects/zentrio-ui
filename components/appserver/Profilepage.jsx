import React from "react";
import Image from "next/image";
import ProfileLayout from "../profilecomponent/ProfileLayout";
import ProfileTab from "../profilecomponent/ProfileTab";
import AchievmentTab from "../profilecomponent/AchievmentTab";
import { ModalEditProfile } from "../modal/profile/ModalEditProfileTab";
import { ModalEditAchievment } from "../modal/profile/ModalEditAchievment";

export default function Profilepage({ currentUserProfile, userAchievement }) {
  return (
    <div>
      <ProfileLayout
        currentUserProfile={currentUserProfile}
        profile={<ProfileTab currentUserProfile={currentUserProfile} userAchievement={userAchievement} />}
        acheivment={
          <AchievmentTab
            currentUserProfile={currentUserProfile}
            userAchievement={userAchievement}
          />
        }
        action={[
          <ModalEditProfile
            key="edit-1"
            currentUserProfile={currentUserProfile}
          />,
          <ModalEditAchievment
            currentUserProfile={currentUserProfile}
            key="edit-2"
          />,
        ]}
      />
    </div>
  );
}
