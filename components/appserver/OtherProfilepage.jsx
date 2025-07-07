"use client";
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
import { useSearchParams } from "next/navigation";

export default function OtherUserProfile({
  MemberDetails,
  userId,
  userIdDetail,
  boardName,
}) {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const profileImage = searchParams.get("profileImage");
  const boardId = searchParams.get("boardId");
  console.log("testeee", userIdDetail);
  return (
    <OtherProfileLayout
      MemberDetails={MemberDetails}
      userName={"Jack Ma"}
      userId={userId}
      userIdDetail={userIdDetail}
      boardName={boardName}
      profile={
        <OtherProfileTab
          MemberDetails={MemberDetails}
          userId={userId}
          userIdDetail={userIdDetail}
        />
      }
      acheivment={
        <OtherAchievmentTab
          MemberDetails={MemberDetails}
          userId={userId}
          userIdDetail={userIdDetail}
        />
      }
    />
  );
}
