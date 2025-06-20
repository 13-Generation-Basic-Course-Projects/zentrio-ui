"use client";
import { doLogout } from "@/action/auth.action";
import ModalLogOut from "@/components/modal/board/ModalLogOut";

export default function Logout() {
  const handleLogout = async () => {
    await doLogout();
  };

  return (
    <ModalLogOut
      massageTitle={"Are you sure?"}
      massageBody={"You want to logout from your account."}
      massageUndo={"No, cancel"}
      massageDo={"Yes, Logout"}
      onConfirm={handleLogout}
    />
  );
}
