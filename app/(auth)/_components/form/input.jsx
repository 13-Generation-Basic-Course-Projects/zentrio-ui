// This Input component for Changeble
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
          // "placeholder:text-red-200 ",
          "shadow-none"
        ],
        input: ["bg-bgColor", "placeholder:text-borderInput_color text-sm text-title",],
        label: "font-medium text-foreground",
      },
      transparent: {
        inputWrapper: [
          " bg-bgColor",
          "group-data-[focus=true]: bg-bgColor",
        ],
        input: [" bg-bgColor"],
        // label: "text-foreground",
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
