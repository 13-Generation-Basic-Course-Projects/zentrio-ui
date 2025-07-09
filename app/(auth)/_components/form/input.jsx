import { extendVariants } from "@heroui/react";
const { Input } = require("@heroui/input");

export const AuthInput = extendVariants(Input, {
  variants: {
    color: {
      custom: {
        inputWrapper: [
          "bg-white",
          "group-data-[focus=true]:bg-bgColor",
          "border-[0.1px] border-stroke",
          "hover:bg-bgColor",
          "data-[hover=true]:bg-bgColor",
          "data-[focus=true]:border-primary data-[focus=true]:bordere-1",
          "shadow-none",
          // Responsive height
          "h-[45px] xs:h-[45px] sm:h-[45px] md:h-[50px]",
          "rounded-[9px]"
        ],
        input: [
          "bg-bgColor",
          "placeholder:text-borderInput_color",
          // Responsive font size
          "text-[12px] xs:text-[15px] sm:text-[16px] md:text-[17px]",
          "text-title"
        ],
        label: [
          "font-medium text-foreground",
          // Responsive font size and padding
          "text-[13px] xs:text-[17px] sm:text-[18px] md:text-[19px]",
          "py-2 xs:py-2.5 sm:py-3"
        ],
      },
      transparent: {
        inputWrapper: [
          "bg-bgColor",
          "group-data-[focus=true]:bg-bgColor"
        ],
        input: ["bg-bgColor"],
        // Optional: add responsive label if needed
      },
    },
    radius: {
      sm: {
        inputWrapper: "rounded-[6px]",
      },
    },
  },
  defaultVariants: {
    radius: "sm",
    color: "custom",
  },
});
