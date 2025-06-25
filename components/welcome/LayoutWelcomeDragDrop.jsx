"use client";
import React, { useState } from "react";
import {
  Search,
  Mail,
  Calendar,
  HardDrive,
  Image,
  Youtube,
  MapPin,
  Newspaper,
  Settings,
  User,
} from "lucide-react";

const GoogleStyleLayout = () => {
  const [layouts, setLayouts] = useState([
    { i: "search", x: 0, y: 0, w: 2, h: 1 },
    { i: "gmail", x: 2, y: 0, w: 1, h: 1 },
    { i: "calendar", x: 3, y: 0, w: 1, h: 1 },
    { i: "drive", x: 0, y: 1, w: 1, h: 1 },
    { i: "photos", x: 1, y: 1, w: 1, h: 1 },
    { i: "youtube", x: 2, y: 1, w: 1, h: 1 },
    { i: "maps", x: 3, y: 1, w: 1, h: 1 },
    { i: "news", x: 0, y: 2, w: 1, h: 1 },
    { i: "settings", x: 1, y: 2, w: 1, h: 1 },
    { i: "profile", x: 2, y: 2, w: 2, h: 1 },
  ]);

  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const cardData = {
    search: {
      icon: Search,
      title: "Search",
      color: "bg-blue-500",
      description: "Search the web",
    },
    gmail: {
      icon: Mail,
      title: "Gmail",
      color: "bg-red-500",
      description: "Email service",
    },
    calendar: {
      icon: Calendar,
      title: "Calendar",
      color: "bg-green-500",
      description: "Schedule events",
    },
    drive: {
      icon: HardDrive,
      title: "Drive",
      color: "bg-yellow-500",
      description: "Cloud storage",
    },
    photos: {
      icon: Image,
      title: "Photos",
      color: "bg-purple-500",
      description: "Photo gallery",
    },
    youtube: {
      icon: Youtube,
      title: "YouTube",
      color: "bg-red-600",
      description: "Video platform",
    },
    maps: {
      icon: MapPin,
      title: "Maps",
      color: "bg-emerald-500",
      description: "Navigation",
    },
    news: {
      icon: Newspaper,
      title: "News",
      color: "bg-orange-500",
      description: "Latest news",
    },
    settings: {
      icon: Settings,
      title: "Settings",
      color: "bg-gray-600",
      description: "App settings",
    },
    profile: {
      icon: User,
      title: "Profile",
      color: "bg-indigo-500",
      description: "User account",
    },
  };

  const handleDragStart = (e, itemId) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, itemId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverItem(itemId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e, targetItemId) => {
    e.preventDefault();

    if (draggedItem && targetItemId && draggedItem !== targetItemId) {
      const newLayouts = [...layouts];
      const draggedIndex = newLayouts.findIndex(
        (item) => item.i === draggedItem
      );
      const targetIndex = newLayouts.findIndex(
        (item) => item.i === targetItemId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Swap positions
        const draggedLayout = { ...newLayouts[draggedIndex] };
        const targetLayout = { ...newLayouts[targetIndex] };

        // Swap x and y coordinates
        const tempX = draggedLayout.x;
        const tempY = draggedLayout.y;

        newLayouts[draggedIndex] = {
          ...draggedLayout,
          x: targetLayout.x,
          y: targetLayout.y,
        };
        newLayouts[targetIndex] = { ...targetLayout, x: tempX, y: tempY };

        setLayouts(newLayouts);
      }
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const getCardStyle = (layout) => {
    const baseStyle = {
      gridColumn: `span ${layout.w}`,
      gridRow: `span ${layout.h}`,
    };

    return baseStyle;
  };

  const renderCard = (itemId, layout) => {
    const card = cardData[itemId];
    if (!card) return null;

    const Icon = card.icon;
    const isDragging = draggedItem === itemId;
    const isDragOver = dragOverItem === itemId;

    return (
      <div
        key={itemId}
        draggable
        onDragStart={(e) => handleDragStart(e, itemId)}
        onDragOver={(e) => handleDragOver(e, itemId)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, itemId)}
        style={getCardStyle(layout)}
        className={`
          group relative overflow-hidden rounded-2xl p-6 cursor-grab active:cursor-grabbing
          transition-all duration-300 ease-out hover:scale-105
          ${card.color} text-white shadow-lg hover:shadow-2xl
          ${isDragging ? "opacity-50 scale-95" : ""}
          ${isDragOver ? "ring-4 ring-white ring-opacity-50 scale-105" : ""}
          backdrop-blur-sm bg-opacity-90 hover:bg-opacity-100
        `}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Icon size={32} className="text-white drop-shadow-lg" />
            <div className="w-2 h-2 bg-white bg-opacity-30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <h3 className="text-xl font-semibold mb-2 text-white drop-shadow-sm">
            {card.title}
          </h3>

          <p className="text-sm text-white text-opacity-80 leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-800 mb-4">
            Dashboard Overview
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Drag and drop cards to customize your layout. Click and hold any
            card to move it to a new position.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-4 gap-6 auto-rows-fr">
          {layouts
            .sort((a, b) => a.y - b.y || a.x - b.x)
            .map((layout) => renderCard(layout.i, layout))}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 font-medium">
              Drag any card to rearrange your dashboard
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleStyleLayout;
