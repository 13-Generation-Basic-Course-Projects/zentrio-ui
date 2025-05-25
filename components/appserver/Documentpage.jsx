import DocumentLayout from "../documentcomponent/DocumentLayout";
import PersonalDocument from "../documentcomponent/PublicDocument";
import PublicDocument from "../documentcomponent/PrivateDocument";
export default function DocumentAutherize({ user }) {
  return (
    <>
      <DocumentLayout
        user={user}
        publicdocument={<PersonalDocument title="Personal" />}
        privatedocument={<PublicDocument title="Private" />}
      />
    </>
  );
}
