import { NavbarAuthorizedBoard } from "@/components/layout/NavbarAutherized";
import { auth } from "@/auth";

export default async function BoardLayout({ children }) {
  const session = await auth();

  return (
    <div>
      <NavbarAuthorizedBoard user={session?.user} />
      <main>{children}</main>
    </div>
  );
}
