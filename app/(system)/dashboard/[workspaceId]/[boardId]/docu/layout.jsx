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
    "ya29.a0AW4XtxhYhveZvBIdYD8Tz2RBHK5kcInDk7rMqCz_CTefQs5e_cbM4XJtW8DtnmdAnaEIx3z0-RRiZIoTOTkus7mc9SFcBP8njZ5UTOdalG0cT9q5415DFbHa5YPyZB_nXGi_jw280-DN7gRcmNKboEXRQzdz9g5XBg3PIf7h_QaCgYKAfYSARcSFQHGX2MimqeYj-SbZG66qB40Eijh9g0177";
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
