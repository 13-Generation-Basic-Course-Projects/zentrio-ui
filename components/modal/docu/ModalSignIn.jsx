import { doSocialLogin } from "@/action/auth.action";

export default function ModalSignIn({ link = "/login" }) {
  return (
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
