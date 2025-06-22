import DocumentEachFolder from "@/components/documentcomponent/DocumentEachFolder";
import { NavbarAuthorized } from "@/components/layout/NavbarAutherized";
import { Token } from "@/constant/token";
import React from "react";

export default async function page({ params }) {
  const { id } = await params;
  const { boardId, workspaceId } = await params;
  const userToken = await Token();
  const token = userToken.GoogleDocumentToken;

  // const tokenFromGoogle = "ya29.a0AW4XtxjmO36PU4vEhXhB6gyXpb_Um9wMecy153P4YRr7lbQaC5zR0qVTHvsNpKsmcSrt9ofkJ4633QrkEglksfLYbUF_YKfQWVpRgULGi4RTN_pa-J-8EQWOCkcjanCB6EkpvRisb_zSI5PcSOOTmXjmwG0Heh9HS42cPFlrygaCgYKARASARcSFQHGX2MiTyWDkwYvZZfQWcsybwPyeA0177";
  const tokenFromGoogle = token;

  const isHidden = false;
  return (
    <div>
      <div className="p-4 ">
        <DocumentEachFolder
          id={id}
          tokenFromGoogle={tokenFromGoogle}
          boardId={boardId}
          workspaceId={workspaceId}
          isHidden={isHidden}
        />
      </div>
    </div>
  );
}
