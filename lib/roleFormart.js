// Function to format role enum to user-friendly string
export const formatRole = (role) => {
  if (!role) return "Unknown";
  const roleMap = {
    ROLE_MANAGER: "Manager",
    ROLE_MEMBER: "Member",
    ROLE_LEADER: "Leader",
  };
  return (
    roleMap[role] ||
    role.replace("ROLE_", "").charAt(0).toUpperCase() +
      role.replace("ROLE_", "").slice(1).toLowerCase()
  );
};
