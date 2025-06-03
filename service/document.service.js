"use server"

import { documentRoute } from "@/routes/documentRoute"
import { headers } from "next/headers";

export const token = "ya29.a0AW4XtxgHyorL1UDxFzFvTT4lZn8M-vdDhvjXpc4kkqjCfbKM0j8WMCsWvPfDIzYTPtyzyOTedkjElxZHam_4ylqkEk6DhSsZMEfMCQnQUdiP04YRbN7JwKqpnpsO0WAZs8gmKIfzkCF1HyOsirzwmo9W97vYZK2irYd8neA3aCgYKAZUSARcSFQHGX2MiQljAPSelgbRK_eWgEdhydw0175";
export const boardId = "d0d17acc-ca1e-4e3c-9fbf-1c1ab47607fe";

// GET document by ID
export const fetchDocument = async (id,token) => {
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
export const fetchPublicDocuments = async (boardId, token) => {
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
export const fetchDocumentsByBoard = async (boardId, token) => {
  const res = await fetch(documentRoute.getAllDocumentsByBoard(boardId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }))

  if (!res.ok) {
    throw new Error(`Failed to fetch document: ${res.status}`);
  }

  return res.json();
}

// DELETE document by ID
export const deleteDocument = async (id, token) => {
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
export const createDocument = async (data, token) => {
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