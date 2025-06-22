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

  const userToken = await Token();
  const token = userToken.GoogleDocumentToken;

  // const tokenFromGoogle = "ya29.a0AW4XtxjmO36PU4vEhXhB6gyXpb_Um9wMecy153P4YRr7lbQaC5zR0qVTHvsNpKsmcSrt9ofkJ4633QrkEglksfLYbUF_YKfQWVpRgULGi4RTN_pa-J-8EQWOCkcjanCB6EkpvRisb_zSI5PcSOOTmXjmwG0Heh9HS42cPFlrygaCgYKARASARcSFQHGX2MiTyWDkwYvZZfQWcsybwPyeA0177";
  const tokenFromGoogle = token;

  console.log("debug", tokenFromGoogle);
  //pf
  /*
   * This function is the main entry point for the profile page.
   */
  const currentUserProfile = await getCurrentUserProfileAction();
  const imageUser = currentUserProfile?.payload?.user?.profileImage;
  const noImage = preventImage.noProfile;
  const preventUserImage = imageUser == null ? noImage : imageUser;

  const { id } = params;
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
        docIdPagedocIdPage={id}
      />
      <div>{children}</div>
    </div>
  );
}
