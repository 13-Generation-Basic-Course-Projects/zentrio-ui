import {
  getDocumentsByBoardAction,
  getPublicDocumentsByBoardAction,
} from "@/action/document.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";

export default async function BoardLayout({ children, params }) {
  const session = await auth();
  const boardId = params?.boardId;

  const getDocuments = await getDocumentsByBoardAction(boardId);
  const publicDocuments = await getPublicDocumentsByBoardAction(boardId);

  const tokenFromGoogle =
    "ya29.a0AW4Xtxj7Lw4OBj1kMkIAqUikhEcubvhOJ-C9AczSrfcm3n84_C_65Efnofn4fhLHOoZkliMIc2B1DLrNAidGB8eZvMu9R5ZOlYAttPIz9ffvZqPqlDhkilI9OOfh_y5Y_vsgU1tERC9S3SBSOpCGkGHN4aejcOAetPW9xXqdOAaCgYKAZYSARcSFQHGX2MiutmZScNksXvNrmMjcpxqmQ0177";
  return (
    <div>
      <DocumentAutherize
        user={session?.user}
        documents={getDocuments}
        publicDocuments={publicDocuments}
        boardId={boardId}
        tokenFromGoogle={tokenFromGoogle}
      />
      <div>{children}</div>
    </div>
  );
}
