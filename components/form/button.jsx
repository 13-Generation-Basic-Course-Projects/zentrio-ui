// This Button for Changble
import { Button, extendVariants } from "@heroui/react";

export const MyButton = extendVariants(Button, {
  variants: {
    color: {
      general: "bg-primary_color text-white",
      cancel: "bg-transparent border-1 px-8 ",
      remove: "bg-[#FCD3D3] text-[#FD1717]",
    },
    radius: {
      sm: "rounded-[6px]",
    },
  },
  defaultVariants: {
    radius: "sm",
    color: "general",
  },
});
