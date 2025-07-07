"use client";

import { Button } from "@heroui/react";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export default function MobileMenuButton() {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Button
      isIconOnly
      onClick={toggleSidebar}
      className="bg-white border border-gray-200 shadow-sm hover:bg-gray-50 lg:hidden rounded-lg mobile-menu-button"
      size="sm"
    >
      <Menu className="w-5 h-5 text-gray-600" />
    </Button>
  );
} 