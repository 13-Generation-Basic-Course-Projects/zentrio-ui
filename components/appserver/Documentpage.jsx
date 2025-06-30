import DocumentLayout from "../documentcomponent/DocumentLayout";
import Privatedocument from "../documentcomponent/PrivateDocument";
import PublicDocument from "../documentcomponent/PublicDocument";
import ModalCreateDocu from "../modal/docu/ModalCreateDocu";

export default function DocumentAutherize({
  user,
  documents,
  publicDocuments,
  boardId,
  tokenFromGoogle,
  preventUserImage,
  workspaceId,
  docIdPage,
  boardName
}) {
  console.log("object workId", boardName);
  return (
    <>
      <DocumentLayout
        user={user}
        documents={documents}
        publicDocuments={publicDocuments}
        boardId={boardId}
        workspaceId={workspaceId}
        tokenFromGoogle={tokenFromGoogle}
        preventUserImage={preventUserImage}
        docIdPage={docIdPage}
        boardName={boardName}
        privatedocument={
          <Privatedocument
            title="Private"
            modal={[<ModalCreateDocu key="private-modal" boardId={boardId} />]}
            preventUserImage={preventUserImage}
            workspaceId={workspaceId}
            boardId={boardId}
            docIdPage={docIdPage}
            boardName={boardName}
          />
        }
        publicdocument={
          <PublicDocument
            title="Public"
            modal={[<ModalCreateDocu key="public-modal" boardId={boardId} />]}
            preventUserImage={preventUserImage}
            workspaceId={workspaceId}
            boardId={boardId}
            docIdPage={docIdPage}
            boardName={boardName}
          />
        }
      />
    </>
  );
}
