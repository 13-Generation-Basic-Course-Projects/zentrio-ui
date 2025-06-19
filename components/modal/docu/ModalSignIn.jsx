import Link from 'next/link';

export default function ModalSignIn({ link = "/login" }) {
  return (
    <div>
      <Link
        href={link}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary border border-gray-300 rounded-[8px] shadow-sm hover:bg-[#000] h-[50px] w-full"
      >
        Sign In
      </Link>
    </div>
  );
}