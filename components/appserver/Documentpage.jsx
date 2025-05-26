import DocumentLayout from "../documentcomponent/DocumentLayout";
import Privatedocument from "../documentcomponent/PrivateDocument";
import PublicDocument from "../documentcomponent/PublicDocument";

export default function DocumentAutherize({ user }) {
  return (
    <>
      <DocumentLayout
        user={user}
        privatedocument={<Privatedocument title="Private" />}
        publicdocument={<PublicDocument title="Public" />}
      />
    </>
  );
}
