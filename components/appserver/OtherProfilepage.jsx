import React from "react";
import Image from "next/image";
import ProfileLayout from "../profilecomponent/ProfileLayout";
import ProfileTab from "../profilecomponent/ProfileTab";
import AchievmentTab from "../profilecomponent/AchievmentTab";
import { ModalEditProfile } from "../modal/profile/ModalEditProfileTab";
import { ModalEditAchievment } from "../modal/profile/ModalEditAchievment";
import OtherAchievmentTab from "../profilecomponent/OtherAchievmentTab";
import OtherProfileLayout from "../profilecomponent/OtherProfileLayout";
import OtherProfileTab from "../profilecomponent/OtherProfileTab";

export default function OtherUserProfile({ otherAchievement }) {
  return (
    
      <OtherProfileLayout otherAchievement={otherAchievement}
        userName={"Jack Ma"}
        profile={<OtherProfileTab/>}
        acheivment={<OtherAchievmentTab otherAchievement={otherAchievement} />}
      />
    
  );
}
