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

  const tokenFromGoogle =
    "ya29.a0AW4XtxiI2oxYcy_QpLwPjaCPrh3hka6WauBBvggaIKi8PnkSZ4oUFYnY4cmmq7W1CfvBrAcR8B-hmnrbESFZfkn56-UYOmlg_Er0P01pVqKCumURBOq7bhEjD_pnGQPWrVGEZS0dSxkyTCuVvL0vNNKamRMo2m_fWEwhX6GSFwaCgYKAXwSARYSFQHGX2MislZSD27DjS3PdQV6bqPuLg0177";

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
