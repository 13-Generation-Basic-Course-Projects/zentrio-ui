import { doSocialLogin } from "../../../action/auth.action";
import Google from "../../../assets/google.png";
import Image from "next/image";
import "@/styles/login.css";

const GoogleLogin = () => {
  return (
    <form action={doSocialLogin}>
      <button
        type="submit"
        name="action"
        value="google"
        className="button border-none bg-transparent hover:scale-105 transition-transform duration-200 focus:outline-none"
        aria-label="Login with Google"
      >
        <div className="flex flex-col items-center justify-center gap-1 xs:gap-2 w-[72px] h-[64px] xs:w-[82px] xs:h-[74px] sm:w-[92px] sm:h-[84px] border rounded-[14px] xs:rounded-[16px] sm:rounded-[18px] hover:shadow-sm">
          <div className="w-[32px] h-[32px] xs:w-[36px] xs:h-[36px] sm:w-[40px] sm:h-[40px] rounded-full p-1 border">
            <Image 
              src={Google} 
              alt="Google Icon" 
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <span className="text-[10px] xs:text-xs sm:text-sm text-gray-600 hidden xs:inline-block">
            Google
          </span>
        </div>
      </button>
    </form>
  );
};

export default GoogleLogin;