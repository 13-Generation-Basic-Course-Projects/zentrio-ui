import React from "react";
import Image from "next/image";
import ProfileLayout from "../profilecomponent/ProfileLayout";
import ProfileTab from "../profilecomponent/ProfileTab";
import AchievmentTab from "../profilecomponent/AchievmentTab";
import {
  ButtonEditprofile,
  ButtonEditAchievment,
} from "../button/ButtonEditprofile";

export default function Profilepage() {
  return (
    <div>
      <ProfileLayout
        profile={<ProfileTab />}
        acheivment={<AchievmentTab />}
        action={[
          <ButtonEditprofile key="edit-1" />,
          <ButtonEditAchievment key="edit-2" />,
        ]}
      />
    </div>
  );
}
