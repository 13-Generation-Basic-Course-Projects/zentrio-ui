"use client";
import React, { useState, useEffect } from "react";

const ImagePopup = ({ url, alt = "image" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // ESC to close modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <>
      {/* Display inside card (cropped) */}
      <div
        onClick={openModal}
        className="border rounded-medium flex justify-center items-center relative w-full h-40 cursor-pointer"
      >
        <img
          src={url}
          alt={alt}
          className="w-full h-full object-cover rounded-medium"
        />
      </div>

      {/* Fullscreen modal (full image) */}
      {isOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        >
          <img
            src={url}
            alt={`popup-${alt}`}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ImagePopup;
