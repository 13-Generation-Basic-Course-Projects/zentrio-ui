import { doSocialLogin } from ".././../../auth";
import Google from "../../../assets/googleIcon.png";
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
        <Image src={Google} alt="Google Icon" className="w-24 h-24" />
      </button>
    </form>
  );
};

export default GoogleLogin;
