import {
  createDocumentByUploadAction,
  deleteDocumentAction,
  getDocumentsByBoardAction,
} from "@/action/document.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";

export default async function BoardLayout({ children }) {
  const session = await auth();
  const boardId = "d0d17acc-ca1e-4e3c-9fbf-1c1ab47607fe";

  const getDocuments = await getDocumentsByBoardAction(boardId);

  const tokenFromGoogle =
    "ya29.a0AW4XtxgLwsciVhJl1lR0wQaTHicJokciKujAWZ8UQPq6CTMQfhokSEnAnmLRve5sw8Ox9KqbkZ_M7OJFE0bxlAXguOBcsblR_oXRSZlVgVNlNQ9PUkloC-In0vGez_TuFpwNQpdKLre1W_ewKN-ltTUDDR2CfZEUVHbltzOWqwaCgYKARQSARcSFQHGX2Mi6cviw3lpOIwdN6rwSa14Jw0177";
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
