"use client";

import { useState } from "react";

export function ImageViewer({ urls }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {urls.map((url, i) => (
          <img
            key={i}
            src={url}
            alt={`img-${i}`}
            className="cursor-pointer w-full h-auto rounded-lg object-cover max-h-96"
            onClick={() => setSelectedImage(url)}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-full max-h-[90vh] rounded-lg shadow-xl"
            alt="preview"
          />
        </div>
      )}
    </>
  );
}
