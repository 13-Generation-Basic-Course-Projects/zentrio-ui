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
    "ya29.a0AW4XtxgTTMb9LVHggOipP67Mq-Cs6X3V61fM9EejGFXfqFQX9gK399VyQHqc0eY0BuBZNC9zO-_8OYcUSwmrkgTEtZLv7ohp8HlVEevQdKBcc9QXLiHR9UzXS76o7mvbV54ZE6x7H5qJOXPReSB4EYo8UdaXsGY3tCWH8xYtMwaCgYKAf0SARcSFQHGX2MiWAwhApEpa7Q6FoujsapeAA0177";
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
