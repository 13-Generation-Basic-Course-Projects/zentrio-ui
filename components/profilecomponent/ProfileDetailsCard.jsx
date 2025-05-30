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

function ProfileDetailsCard() {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-4 rounded-xl shadow bg-white">
        <h3 className="text-md font-semibold mb-2">
          Overall Board Completeness
        </h3>
        <ProgressBar/>
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
              <IconUser strokeWidth={1.5} size={4} /> Skan
            </p>
            <p className="flex items-center gap-2">
              <Shield className="w-4 h-4" /> Male
            </p>
            <p className="flex items-center gap-2">
              <IconJob strokeWidth={1.5} size={4} /> Front-end Developer
            </p>
            <p className="flex items-center gap-2">
              <IconMap strokeWidth={1.5} size={4} color={"currentColor"} />{" "}
              Phnom Penh
            </p>
            <p className="flex items-center gap-2">
              <IconDate strokeWidth={1.5} size={4} color={"currentColor"} />{" "}
              Started 07-May-2025
            </p>
          </div>

          {/* Contacts Section */}
          <div className="grid grid-cols-1 gap-3">
            <p className="font-semibold text-description mb-2">Contacts</p>
            <p className="flex items-center gap-2">
              <IconPhone strokeWidth={1.5} size={4} color={"currentColor"} />{" "}
              +855 123 456 789
            </p>
            <p className="flex items-center gap-2">
              <IconMail strokeWidth={1.5} size={4} color={"currentColor"} />{" "}
              zentrio@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailsCard;
