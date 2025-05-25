import { Phone, Mail, User, Shield, Briefcase, MapPin, Calendar } from "lucide-react";

function ProfileDetailsCard() {
  return (
    <div className="rounded-xl shadow bg-white">
      <h3 className="px-4 text-body font-semibold py-4 border-b-1">Profile Details</h3>
      <div className="p-4 text-body-sm text-gray-700">
        {/* Personal Details Section */}
        <div className="mb-4">
          <p className="font-semibold text-gray-500 mb-2">Personal Details</p>
          <p className="flex items-center gap-2">
            <User className="w-4 h-4" /> Skan
          </p>
          <p className="flex items-center gap-2">
            <Shield className="w-4 h-4" /> Male
          </p>
          <p className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Front-end Developer
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Phnom Penh
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Started 07-May-2025
          </p>
        </div>

        {/* Contacts Section */}
        <div>
          <p className="font-semibold text-gray-500 mb-2">Contacts</p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> +855 123 456 789
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> zentrio@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailsCard;