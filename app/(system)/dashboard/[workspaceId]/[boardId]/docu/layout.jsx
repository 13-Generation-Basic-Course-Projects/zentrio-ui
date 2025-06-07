import {
  createDocumentByUploadAction,
  deleteDocumentAction,
  getDocumentsByBoardAction,
} from "@/action/document.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";

export default async function BoardLayout({ children, params }) {
  const session = await auth();
  const boardId = params?.boardId;

  const getDocuments = await getDocumentsByBoardAction(boardId);

  const tokenFromGoogle =
    "ya29.a0AW4Xtxg5w-K9jxxksPhfJkt2F3ZgB6f4r48FGXDRLypnFN5CJ2zBF95CRtGWDuC7GHP846lw1GHsMMo8OMfy8-AUXqbs6j7YjTzGT3eRec2uKFFSRLvVJOdmp2DmJrdqDYuEQ8TOyimg3N0BXnBT-u645QpM4EYqlbphnu9NgAaCgYKAf0SARcSFQHGX2Mi2ybv1NyC-W05Xhnr6bXbkg0177";
  return (
    <div>
      <DocumentAutherize
        user={session?.user}
        documents={getDocuments}
        boardId={boardId}
        tokenFromGoogle={tokenFromGoogle}
      />
      <div>{children}</div>
    </div>
  );
}
