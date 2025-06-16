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
    "ya29.a0AW4XtxhTVWs5Dyisz75gT-gdXWn-I5RRAf6md5RZW9C0umn8dblkuPMDmLcLrL3pakUeGcFyw3lYKqP7QtasgUdpl5aaxwKh8OZ0g4Ev1k58HMM-NJ-PZLFsiRUlbxkG4m4062-98vgvCkjcJQu0EJKXUreCjWKl5NpVYtFNdAaCgYKAU4SARcSFQHGX2MiE4VRjwn_er0CT4mba35bYg0177";

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
