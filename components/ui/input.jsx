import * as React from "react"

// import { cn } from "@/lib/utils"

// const Input = React.forwardRef(({ className, type, ...props }, ref) => {
//   return (
//     (<input
//       type={type}
//       className={cn(
//         "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         className
//       )}
//       ref={ref}
//       {...props} />)
//   );
// })
// Input.displayName = "Input"

// export { Input } 

// This Input component for Changeble
import { extendVariants } from "@heroui/react";
const { Input } = require("@heroui/input");

export const MyInput = extendVariants(Input, {
  variants: {
    color: {
      custom: {
        inputWrapper: [
          "bg-bgColor",
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
