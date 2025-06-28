"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ImageViewer = ({ urls }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const imageCount = urls.length;

  // Ensure component is mounted (for Next.js)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Choose grid layout based on image count
  const getGridClasses = () => {
    if (imageCount === 1) return "grid-cols-1";
    if (imageCount === 2) return "grid-cols-2 gap-1";
    if (imageCount === 3) return ""; // We'll use custom layout
    return "grid-cols-2 gap-1";
  };

  // Handle arrow key navigation and ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, imageCount]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedIndex]);

  // Special layout for 3 images: 1 big left + 2 stacked right
  const renderThreeImagesLayout = () => (
    <div className="grid grid-cols-3 gap-1 h-[300px]">
      <div
        className="col-span-2 row-span-2 relative rounded-lg overflow-hidden cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Image clicked:', 0);
          setSelectedIndex(0);
        }}
      >
        <img
          src={urls[0]}
          alt="image-0"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="relative rounded-lg overflow-hidden cursor-pointer transition-transform"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Image clicked:', 1);
          setSelectedIndex(1);
        }}
      >
        <img
          src={urls[1]}
          alt="image-1"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="relative rounded-lg overflow-hidden cursor-pointer transition-transform"
        onClick={(e) => {
          e.stopPropagation();
          console.log('Image clicked:', 2);
          setSelectedIndex(2);
        }}
      >
        <img
          src={urls[2]}
          alt="image-2"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );

  const goPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
  };

  // Render modal using portal
  const renderModal = () => {
    if (!mounted || selectedIndex === null) return null;
    
    return createPortal(
      <div
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999]"
        onClick={() => setSelectedIndex(null)}
        style={{ margin: 0 }}
      >
        {/* Navigation buttons - only show if more than 1 image */}
        {imageCount > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-[100px] p-5 select-none hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
            >
              ‹
            </button>

            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-[100px] select-none p-5 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
            >
              ›
            </button>
          </>
        )}

        {/* Main image */}
        <img
          src={urls[selectedIndex]}
          alt={`preview-${selectedIndex}`}
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Close button */}
        <button
          onClick={() => setSelectedIndex(null)}
          className="absolute top-4 right-4 text-white text-3xl hover:bg-white hover:bg-opacity-10 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
        >
          ×
        </button>

        {/* Image counter */}
        {imageCount > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {imageCount}
          </div>
        )}
      </div>,
      document.body
    );
  };

  return (
    <>
      {/* Grid Display */}
      {imageCount === 3 ? (
        renderThreeImagesLayout()
      ) : (
        <div className={`grid ${getGridClasses()}`}>
          {urls.slice(0, 4).map((url, index) => (
            <div
              key={index}
              className={`relative w-full overflow-hidden rounded-lg cursor-pointer ${
                imageCount === 1 ? "h-[600px]" : "h-[300px]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Image clicked:', index);
                setSelectedIndex(index);
              }}
            >
              <img
                src={url}
                alt={`image-${index}`}
                className="w-full h-full object-cover"
              />
              {index === 3 && imageCount > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl">
                  +{imageCount - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Render modal using portal */}
      {renderModal()}
    </>
  );
};

export default ImageViewer;