import React from "react";
import Image from "next/image";
import ProfileLayout from "../profilecomponent/ProfileLayout";
import ProfileTab from "../profilecomponent/ProfileTab";
import AchievmentTab from "../profilecomponent/AchievmentTab";
import { ModalEditProfile } from "../modal/profile/ModalEditProfileTab";
import { ModalEditAchievment } from "../modal/profile/ModalEditAchievment";
import { getAchievementActions } from "@/action/achievement.action";

export default async function Profilepage({ achievements }) {
  return (
    <div>
      <ProfileLayout profileDetails = {achievements}
        profile={<ProfileTab achievements={achievements} />}
        acheivment={<AchievmentTab achievements={achievements} />}
        action={[
          <ModalEditProfile key="edit-1" />,
          <ModalEditAchievment key="edit-2" />,
        ]}
      />
    </div>
  );
}
