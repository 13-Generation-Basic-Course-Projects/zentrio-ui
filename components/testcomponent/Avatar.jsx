export const UserAvatar = ({ data }) => {
  return (
    <div>
      <img
        src={data.image || ""}
        className="w-12 h-12 rounded-full"
        alt="g_Image"
      />
    </div>
  );
};
