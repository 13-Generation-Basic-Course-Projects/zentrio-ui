<<<<<<< HEAD
import { doSocialLogin } from "@/action/auth.action";
=======
import { doSocialLogin } from '@/action/auth.action';
import { Button } from '@heroui/react';
import Link from 'next/link';
>>>>>>> 1dfc7bacdbf209490e7546ac55fe7a9920e92f68

export default function ModalSignIn() {
  return (
<<<<<<< HEAD
    <form action={doSocialLogin}>
      <button
        type="submit"
        name="action"
        value="google"
        className="button border-none bg-transparent"
      >
        <div className="flex flex-col items-center justify-center gap-2 w-[120px] h-[54px] border rounded-[18px] bg-primary text-white">
          login
        </div>
      </button>
    </form>
  );
}
=======
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



>>>>>>> 1dfc7bacdbf209490e7546ac55fe7a9920e92f68
