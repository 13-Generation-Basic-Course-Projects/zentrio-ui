import AllDocument from "../documentcomponent/AllDocument";
import DocumentLayout from "../documentcomponent/DocumentLayout";
import Privatedocument from "../documentcomponent/PrivateDocument";
import PublicDocument from "../documentcomponent/PublicDocument";
import ModalCreateDocu from "../modal/docu/ModalCreateDocu";

export default function DocumentAutherize({ user }) {
  return (
    <>
      <DocumentLayout
        user={user}
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
