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

  console.log("doooo", getDocuments);

  const tokenFromGoogle =
    "ya29.a0AW4XtxjhCRfoO_elKzREky204cusJjP5WPHYvnhmx3R7ORRRotLrm-4iMr20Y9HkItokZCF3cBTlp8M9RDpblWWav_WAhpmmwXN1Yquh44EPw9sLXZjLVZd5lm4Q2MabQS74EE2G8kwSK5AwwDUl6bg2cichEOVUdTXXS4mCmgaCgYKAdUSARcSFQHGX2MiTx8YJTs0mRID6CeLwUVO0g0177";
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
