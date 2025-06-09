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

export default function ProfileDetailsCardOther({
  currentUserProfile,
  MemberDetails,
  userId,
  userIdDetail,
}) {
  // Find the specific user from MemberDetails array based on userId
  const userDetails =
    MemberDetails?.find((member) => member.userId === userId) || {};

  console.log("7777", userIdDetail);

  // Calculate task completion percentage
  const totalTasks = userDetails.tasks?.length || 0;
  const completionPercentage =
    totalTasks > 0 ? Math.round((totalTasks / 20) * 100) : 0; // Assuming 20 is max tasks

  return (
    <div className="flex flex-col gap-2 ">
      <div className="p-4 rounded-xl shadow bg-white">
        <h3 className="text-md font-semibold mb-2">
          Overall Board Completeness
        </h3>
        <ProgressBar percentage={completionPercentage} />
        <p className="text-sm text-gray-600 mt-2">
          {totalTasks} tasks assigned
        </p>
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
              <IconUser strokeWidth={1.5} size={4} />
              {userDetails.username || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {userDetails.gender === "OTHER"
                ? "Other"
                : userDetails.gender === "MALE"
                ? "Male"
                : userDetails.gender === "FEMALE"
                ? "Female"
                : userDetails.gender || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IconJob strokeWidth={1.5} size={4} />
              {userDetails?.position || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IconMap strokeWidth={1.5} size={4} color={"currentColor"} />
              {userDetails?.location || "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IconDate strokeWidth={1.5} size={4} color={"currentColor"} />
              {userDetails.createdAt
                ? userDetails.createdAt.split("T")[0]
                : "N/A"}
            </p>
          </div>

          {/* Contacts Section */}
          <div className="grid grid-cols-1 gap-3 pb-5">
            <p className="font-semibold text-description mb-2">Contacts</p>
            <p className="flex items-center gap-2">
              <IconPhone strokeWidth={1.5} size={4} color={"currentColor"} />
              +855{" "}
              {userDetails?.contact
                ? userDetails?.contact?.startsWith("0")
                  ? userDetails.contact.slice(1)
                  : userDetails.contact
                : "N/A"}
            </p>
            <p className="flex items-center gap-2">
              <IconMail strokeWidth={1.5} size={4} color={"currentColor"} />
              {userDetails.email || "N/A"}
            </p>
          </div>

          {/* Roles Section */}
          <div className="grid grid-cols-1 gap-3 pb-5">
            <p className="font-semibold text-description mb-2">Roles</p>
            <div className="flex flex-wrap gap-2">
              {userDetails.roles?.map((role, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {role.replace("ROLE_", "")}
                </span>
              )) || <span className="text-gray-500">No roles assigned</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
