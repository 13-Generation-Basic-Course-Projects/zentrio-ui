import {
  createDocumentByUploadAction,
  deleteDocumentAction,
  getDocumentsByBoardAction,
} from "@/action/document.action";
import { auth } from "@/auth";
import DocumentAutherize from "@/components/appserver/Documentpage";

export default async function BoardLayout({ children }) {
  const session = await auth();
  const boardId = "d0d17acc-ca1e-4e3c-9fbf-1c1ab47607fe";

  const getDocuments = await getDocumentsByBoardAction(boardId);

  const tokenFromGoogle =
    "ya29.a0AW4XtxiDRO_ijQGr32ySKbebU077a98tpZY4WZGm-TDML8TQQfIOcDj3vdL2tPg0yVvaeflgTwR4-g03q3hyUrtdxMvzDXdcLnEW88BJUsPC5OSPzbk_Pc8r1nFVZ1Vd7nHfVI9RSK9MjFsWsE914lYrWDjqxtHTNVMcuq6obQaCgYKAUISARcSFQHGX2MiLqwQmPFIoLvrxm_vTv-Ozw0177";
  return (
    <div>
      <DocumentAutherize
        user={session?.user}
        documents={getDocuments}
        boardId={boardId}
        tokenFromGoogle={tokenFromGoogle}
      />
      <div>{children}</div>
    </div>
  );
}
