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
}) {
  return (
    <>
      <DocumentLayout
        user={user}
        documents={documents}
        publicDocuments={publicDocuments}
        boardId={boardId}
        tokenFromGoogle={tokenFromGoogle}
        preventUserImage={preventUserImage}
        privatedocument={
          <Privatedocument
            title="Private"
            modal={[<ModalCreateDocu key="private-modal" boardId={boardId} />]}
            preventUserImage={preventUserImage}
          />
        }
        publicdocument={
          <PublicDocument
            title="Public"
            modal={[<ModalCreateDocu key="public-modal" boardId={boardId} />]}
            preventUserImage={preventUserImage}
          />
        }
      />
    </>
  );
}
