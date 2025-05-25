import { User } from "@heroui/react";

export default function UserAvatar({ image }) {
  return (
    <User
      avatarProps={{
        radius: "full",
        imgProps: {
          src: "https://static01.nyt.com/images/2020/01/28/multimedia/28xp-memekid3/28cp-memekid3-articleLarge.jpg?quality=75&auto=webp&disable=upscale", // use the passed-in image prop
          alt: "User Avatar",
        },
      }}
    />
  );
}
