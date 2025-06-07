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
    "ya29.a0AW4XtxiI2oxYcy_QpLwPjaCPrh3hka6WauBBvggaIKi8PnkSZ4oUFYnY4cmmq7W1CfvBrAcR8B-hmnrbESFZfkn56-UYOmlg_Er0P01pVqKCumURBOq7bhEjD_pnGQPWrVGEZS0dSxkyTCuVvL0vNNKamRMo2m_fWEwhX6GSFwaCgYKAXwSARYSFQHGX2MislZSD27DjS3PdQV6bqPuLg0177";
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
