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
    "ya29.a0AS3H6Nzbjh32qvhl_6x6lB4Sc-deRqQWGAwlno2kRP12WXQMdT0O0mSc-dnhwCAJq86FM5I9Lr_jxq9HxG1WNcymcRQr6buT3BZ3q6qzh3dtRnbrGMgR7NFFgZ0kLgqX02yzWBRi8sfBIT-cJM6WBJRV0LxlnizajtCjPp3yaCgYKAcASARISFQHGX2MiTzZdG1Q7lfkVyv7TuNOW3Q0175";

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
