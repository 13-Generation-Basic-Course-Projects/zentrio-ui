import { deleteDocumentAction, getDocumentsByBoardAction } from "@/action/document.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";

export default async function BoardLayout({ children }) {
  const session = await auth();
  const boardId = "d0d17acc-ca1e-4e3c-9fbf-1c1ab47607fe";

  const getDocuments = await getDocumentsByBoardAction(boardId);
  

  console.log("document: ", getDocuments);

  return (
    <div>
      <DocumentAutherize user={session?.user} documents={getDocuments}/>
      <div>{children}</div>
    </div>
  );
}
