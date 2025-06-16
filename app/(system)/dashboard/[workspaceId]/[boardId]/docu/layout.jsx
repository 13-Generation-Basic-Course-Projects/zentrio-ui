import {
  getDocumentsByBoardAction,
  getPublicDocumentsByBoardAction,
} from "@/action/document.action";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";
import { preventImage } from "@/constant/preventimage";

export default async function BoardLayout({ children, params }) {
  const session = await auth();
  const boardId = params?.boardId;

  const getDocuments = await getDocumentsByBoardAction(boardId);
  const publicDocuments = await getPublicDocumentsByBoardAction(boardId);

  const tokenFromGoogle =
    "ya29.a0AW4XtxjsYgMBuKRvhBt0IjTTYMnEnIHQ4S1unkB0Ay_hWwquR2w---w9vFESEEClfasfoYW9CXTaujsXT0aWuIiQq5NcIX-7LxJvU-5m_Ma4307C-J9abWX5ksmV1ECe_ylFVsBrqLdeGRGTRBsg_YweD6mWBDt7ElPZaNU3aCgYKAdkSARYSFQHGX2MiQioteA8Dz6kahCx6jlCF_g0175";

  //pf
  /*
   * This function is the main entry point for the profile page.
   */
  const currentUserProfile = await getCurrentUserProfileAction();
  const imageUser = currentUserProfile?.payload?.user?.profileImage;
  const noImage = preventImage.noProfile;
  const preventUserImage = imageUser == null ? noImage : imageUser;

  return (
    <div>
      <DocumentAutherize
        user={session?.user}
        documents={getDocuments}
        publicDocuments={publicDocuments}
        boardId={boardId}
        tokenFromGoogle={tokenFromGoogle}
        preventUserImage={preventUserImage}
      />
      <div>{children}</div>
    </div>
  );
}
