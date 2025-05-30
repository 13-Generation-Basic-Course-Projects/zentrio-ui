"use client";
import { documentData } from "@/data/docu/documentData";
import { useParams } from "next/navigation";

export default function DocuView() {
  const { docId } = useParams();
  const folder = documentData.find((item) => item.id === parseInt(docId));
  const files = documentData.filter(
    (item) => item.parent === docId && item.category === "File"
  );

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <nav className="mb-4 text-sm text-gray-600">
        <a href="/system/documentView" className="hover:underline">
          {folder.id}
        </a>
        {" / "}
        <span>{folder?.title || docId}</span>
      </nav>

      {/* Folder Info */}
      {folder ? (
        <div className="mb-4">
          <h1 className="text-xl font-semibold">{folder.title}</h1>
          <p className="text-gray-600 text-sm">Status: {folder.status}</p>
          <p className="text-gray-600 text-sm">Date: {folder.date}</p>
        </div>
      ) : (
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Folder not found</h1>
        </div>
      )}

      {/* Files */}
      {files.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="border p-4 rounded-md shadow hover:shadow-md transition"
            >
              <FileIcon type={file.type} />
              <p className="mt-2 text-sm font-medium">{file.title}</p>
              <p className="text-xs text-gray-500">
                {file.type?.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No files in this folder.</p>
      )}
    </div>
  );
}
