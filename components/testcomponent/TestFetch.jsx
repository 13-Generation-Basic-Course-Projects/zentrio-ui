import React from "react";

export default function TestFetch({ dataProp }) {
  console.log("aaaa", dataProp);

  return (
    <div className="p-10 mx-auto">
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Workspace ID</th>
            <th className="border px-4 py-2">Created By</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {dataProp.payload.map((el, index) => (
            <tr key={index} className="border">
              <td className="border px-4 py-2">{el.workspaceId}</td>
              <td className="border px-4 py-2">{el.createdBy}</td>
              <td className="border px-4 py-2">{el.createdAt}</td>
              <td className="border px-4 py-2">{el.title}</td>
              <td className="border px-4 py-2">{el.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
