import "../globals.css";

import { auth } from "../../auth";

//this layout is use for auth

export default async function AuthLayout({ children }) {
  const session = await auth();
  console.log("aaa", session?.user);
  return <div className={" font-poppin w-full"}>{children}
  
  </div>;
}
