import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";

export default async function BoardLayout({ children }) {
  const session = await auth();

  return (
    <div>
      <DocumentAutherize user={session?.user} />
      <div>{children}</div>
    </div>
  );
}
