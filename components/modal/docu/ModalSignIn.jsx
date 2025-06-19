import { Button } from '@heroui/react';
import Link from 'next/link';

export default function ModalSignIn({ link = "/login" }) {
  return (
    <Button className="flex items-center capitalize gap-4 px-6 py-2 text-sm font-semibold bg-primary border-none text-white rounded-[12px] h-[50px]">
      <Link
        href={link}
      >
        Sign In
      </Link>
    </Button>
  );
}