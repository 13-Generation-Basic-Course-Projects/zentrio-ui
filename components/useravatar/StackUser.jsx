export function StackedUser({ image }) {
  // console.log("in stackuser", image);

  const maxVisible = 4;
  const payload = image || []; // Fallback to empty array if undefined
  const visibleUsers = payload.slice(0, maxVisible);
  const remaining = payload.length - maxVisible;

  return (
    <div className="flex items-center space-x-[-14px]">
      {visibleUsers.map((user, index) => (
        <img
          key={index}
          src={user?.profileImage || "/default-profile.png"} // Fallback for undefined profileImage
          alt={user?.username || "User"} // Fallback for undefined username
          className="w-8 h-8 rounded-full border-2 border-white shadow"
        />
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 rounded-full bg-gray-300 text-xs font-medium flex items-center justify-center border-2 border-white shadow">
          +{remaining}
        </div>
      )}
    </div>
  );
}
