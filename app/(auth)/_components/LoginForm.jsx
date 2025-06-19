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
        className="button border-none bg-transparent"
      >
        <div className="flex flex-col items-center justify-center gap-2 w-[92px] h-[84px] border rounded-[18px]">
          <div className=" w-[40px] h-[40px] rounded-full p-1 border-1">
            <Image src={Google} alt="Google Icon" className=" object-cover" />
          </div>
        </div>
      </button>
    </form>
  );
};

export default GoogleLogin;
