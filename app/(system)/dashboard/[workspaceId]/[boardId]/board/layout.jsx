import SystemBoard from "@/components/appserver/Boardpage";
import { auth } from "@/auth";

export default async function BoardLayout({ children }) {
  const session = await auth();

  return (
    <div>
      <SystemBoard user={session?.user} />
      <main> {children}</main>
    </div>
  );
}
