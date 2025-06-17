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

  // const refresh_token = session?.user?.google?.refreshToken;
  // const tokenFromGoogle = await refreshAccessToken(refresh_token);

  // console.log("refresh token ", refresh_token)

  const tokenFromGoogle = 
    "ya29.a0AS3H6Nyqg0fDw6vCCPcPBMqjY01zH8vPXI253BYy6CqCzTOokfWM948dZubgO1epZAV2qNuHv3Rw26m2iyMyJyuyBFqKGKdfplmzi2lYRPZCjRmBeNFi84G2T3CwjCPoWVl3H4lFK1PvUz7JoYtebNtAWYT034VPUbT2j4dCVwaCgYKAfUSARcSFQHGX2Mi0zwHD7gBWOYZabTEwkC8_Q0177";

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
