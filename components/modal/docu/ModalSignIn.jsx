import { doSocialLogin } from '@/action/auth.action';
import { Button } from '@heroui/react';
import Link from 'next/link';

export default function ModalSignIn() {
  return (
    // <Button className="flex items-center capitalize gap-4 px-6 py-2 text-sm font-semibold bg-primary border-none text-white rounded-[12px] h-[50px]">
    //   <Link
    //     href={link}
    //   >
    //     Sign In
    //   </Link>
    // </Button>
    <form action={doSocialLogin}>
      <Button 
       type="submit"
        name="action"
        value="google"
       className="flex items-center capitalize gap-4 px-6 py-2 text-sm font-semibold bg-primary border-none text-white rounded-[12px] h-[50px]">
      Sign in with Google
   </Button>
    </form>
  );
}



