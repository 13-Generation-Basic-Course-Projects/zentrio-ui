import {
  getDocumentsByBoardAction,
  getPublicDocumentsByBoardAction,
} from "@/action/document.action";
import { getCurrentUserProfileAction } from "@/action/profile.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";
import { preventImage } from "@/constant/preventimage";
import { Token } from "@/constant/token";

export default async function BoardLayout({ children, params }) {
  const session = await auth();
  const boardId = params?.boardId;
  const workspaceId = (await params).workspaceId;

  const getDocuments = await getDocumentsByBoardAction(boardId);
  const publicDocuments = await getPublicDocumentsByBoardAction(boardId);

  // const refresh_token = session?.user?.google?.refreshToken;
  // const tokenFromGoogle = await refreshAccessToken(refresh_token);

  // console.log("refresh token ", refresh_token)
  // const userToken = await Token();
  // const token = userToken.GoogleDocumentToken;

  const tokenFromGoogle = "ya29.a0AW4XtxgJAVqf4lekUOSc1yWJfP9rQc_ktHNQF9tm4s_XqW6Jnz1BgH1stHv-plDgNmDUBn2Uisi-SBKe2lP0vdubB_cu5kOjFCCBvcc_GxD52zD6QEti6Iw6jlqi6hZP9DnqlGhYGndYbr0gzP_vE54a5jC-OcT1RoenBPzv2QaCgYKAUwSARcSFQHGX2MitJlyflBYrXfAtuuaFIgGnw0177";

  console.log("debug", tokenFromGoogle);
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
        workspaceId={workspaceId}
      />
      <div>{children}</div>
    </div>
  );
}
