import {
  deleteDocumentAction,
  getDocumentsByBoardAction,
} from "@/action/document.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";

export default async function BoardLayout({ children }) {
  const session = await auth();
  const boardId = "feb6d22e-b2d6-4105-b3ad-663c7148c337";

  const getDocuments = await getDocumentsByBoardAction(boardId);

  console.log("document: ", getDocuments);

  return (
    <div>
      <DocumentAutherize user={session?.user} documents={getDocuments} />
      <div>{children}</div>
    </div>
  );
}
