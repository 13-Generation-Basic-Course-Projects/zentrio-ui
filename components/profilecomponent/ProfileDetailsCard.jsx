// ProfileDetailsCard.js
import { Shield } from "lucide-react";
import {
  IconDate,
  IconJob,
  IconMail,
  IconMap,
  IconPhone,
  IconUser,
} from "../icon/everyicon";
import ProgressBar from "./ProgressBar";

function ProfileDetailsCard({ currentUserProfile, userAchievement }) {
  const userDetails = currentUserProfile?.payload?.user || {};

  console.log("userAchievement:", userAchievement);

  // Extract achievement data from your object structure
  const achievementData =
    userAchievement?.success && userAchievement?.payload
      ? userAchievement.payload
      : {};

  // Convert completionRate string to number for ProgressBar
  const getPercentageNumber = (completionRate) => {
    if (!completionRate) return 0;
    // Remove the % sign and convert to number
    return parseInt(completionRate.replace("%", ""));
  };

  console.log("Achievement data:", userAchievement);
  console.log("Extracted achievement payload:", achievementData);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto">
      <div className="p-4 rounded-xl shadow bg-white">
        <h3 className="text-md font-semibold mb-2 sticky top-0 z-20">
          Overall Board Completeness
        </h3>
        <ProgressBar
          percent={getPercentageNumber(achievementData?.completionRate)}
        />

        {/* Optional: Show task completion info */}
        <div className="mt-2 text-sm text-gray-600">
          <p>
            Completed Tasks: {achievementData?.completedTasks || 0} /{" "}
            {achievementData?.totalTasks || 0}
          </p>
        </div>
      </div>

      <div className="rounded-xl shadow bg-white">
        <h3 className="px-4 text-body font-semibold py-4 border-b-1 border-stroke">
          Profile Details
        </h3>
        <div className="p-4 text-body-sm text-gray-700">
          {/* Personal Details Section */}
          <div className="grid grid-cols-1 gap-3 pb-5">
            <p className="font-semibold text-description mb-2">
              Personal Details
            </p>
            <p className="flex items-center gap-2">
              <IconUser strokeWidth={1.5} size={4} />{" "}
              {userDetails.username || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Shield className="w-4 h-4" />{" "}
              {userDetails.gender === "OTHER"
                ? "Other"
                : userDetails.gender || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IconJob strokeWidth={1.5} size={4} />{" "}
              {userDetails?.position || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IconMap strokeWidth={1.5} size={4} color={"currentColor"} />{" "}
              {userDetails?.location || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IconDate strokeWidth={1.5} size={4} color={"currentColor"} />{" "}
              {userDetails.createdAt
                ? userDetails.createdAt.split("T")[0]
                : "N/A"}
            </p>
          </div>

          {/* Contacts Section */}
          <div className="grid grid-cols-1 gap-3">
            <p className="font-semibold text-description mb-2">Contacts</p>
            <p className="flex items-center gap-2">
              <IconPhone strokeWidth={1.5} size={4} color={"currentColor"} />{" "}
              +855{" "}
              {userDetails?.contact
                ? userDetails?.contact?.startsWith("0")
                  ? userDetails.contact.slice(1)
                  : userDetails.contact
                : "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IconMail strokeWidth={1.5} size={4} color={"currentColor"} />{" "}
              {userDetails.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailsCard;
