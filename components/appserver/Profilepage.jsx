import React from "react";
import Image from "next/image";
import ProfileLayout from "../profilecomponent/ProfileLayout";
import ProfileTab from "../profilecomponent/ProfileTab";
import AchievmentTab from "../profilecomponent/AchievmentTab";
import { ModalEditProfile } from "../modal/profile/ModalEditProfileTab";
import { ModalEditAchievment } from "../modal/profile/ModalEditAchievment";

import {
  ModalEditProfile,
} from "../modal/profile/ModalEditProfileTab";
import { ModalEditAchievment } from "../modal/profile/ModalEditAchievment";
export default function Profilepage() {
  return (
    <div>
      <ProfileLayout
        profile={<ProfileTab />}
        acheivment={<AchievmentTab />}
        action={[
          <ModalEditProfile key="edit-1" />,
          <ModalEditAchievment key="edit-2" />,
        ]}
      />
    </div>
  );
}
