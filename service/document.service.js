"use server"

import { documentRoute } from "@/routes/documentRoute"
import { headers } from "next/headers";


// GET document by ID
export const fetchDocumentService = async (id,token) => {
  const res = await fetch(documentRoute.getDocumentById(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
}

// GET public documents by board
export const fetchPublicDocumentsService = async (boardId, token) => {
  const res = await fetch(documentRoute.getPublicDocumentsByBoard(boardId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
}

// GET documents by board
export const fetchDocumentsByBoardService = async (boardId, token) => {
  const res = await fetch(
    documentRoute.getAllDocumentsByBoard(boardId), // URL only
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
};

// DELETE document by ID
export const deleteDocumentService = async (id, token) => {
  const res = await fetch(documentRoute.deleteDocumentById(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })

  if (!res.ok) {
    throw new Error(`Failed to delete document: ${res.status}`);
  }

  return res.json();
}

// POST (create) new document
export const createDocumentService = async (data, token) => {
  const res = await fetch(documentRoute.createDocument(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to create document: ${res.status}`);
  }

  return res.json();
}