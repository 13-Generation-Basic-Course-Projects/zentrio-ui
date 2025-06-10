import {
  createDocumentByUploadAction,
  deleteDocumentAction,
  getDocumentsByBoardAction,
} from "@/action/document.action";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";
import { preventImage } from "@/constant/preventimage";

export default async function BoardLayout({ children, params }) {
  const session = await auth();
  const boardId = params?.boardId;

  const getDocuments = await getDocumentsByBoardAction(boardId);

  console.log("doooo", getDocuments);

  const tokenFromGoogle =
    "ya29.a0AW4XtxjXCngCVfswyg0VcxVqCBTf07rmNn-25epp2Ry5EAvYeiZU_pEe2YPs_3JJAU0q3QnCzzrQoIG8Yy_-q9lCCZvYtSZwWHvASenPTGv9DZ_O4OXtI-NvQudpF6_HvFeYwrbOcPMFJiZlTe7ARj664JTWmi-7ie4gC9tl4gaCgYKAZkSARYSFQHGX2MiiFBC2xuEwG79tlslJeXSWA0177";

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
        boardId={boardId}
        tokenFromGoogle={tokenFromGoogle}
        preventUserImage={preventUserImage}
      />
      <div>{children}</div>
    </div>
  );
}
