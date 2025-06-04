import DocumentLayout from "../documentcomponent/DocumentLayout";
import Privatedocument from "../documentcomponent/PrivateDocument";
import PublicDocument from "../documentcomponent/PublicDocument";
import ModalCreateDocu from "../modal/docu/ModalCreateDocu";

export default function DocumentAutherize({ user, documents }) {
  return (
    <>
      <DocumentLayout
        user={user}
        documents={documents}
        privatedocument={
          <Privatedocument title="Private" modal={[<ModalCreateDocu />]} />
        }
        publicdocument={
          <PublicDocument title="Public" modal={[<ModalCreateDocu />]} />
        }
      />
    </>
  );
}
