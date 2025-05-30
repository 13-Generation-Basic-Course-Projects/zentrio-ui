import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";

export default async function DocViewLayout({ children }) {
  const session = await auth();

  return (
    <div>
      <p>{children}</p>
    </div>
  );
}
