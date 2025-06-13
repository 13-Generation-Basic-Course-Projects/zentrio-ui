"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { reactAction } from "@/action/react.action";

const reactions = [
  { label: "Like", emoji: "👍" },
  { label: "Love", emoji: "❤️" },
  { label: "Funny", emoji: "😂" },
  { label: "Surprised", emoji: "😮" },
  { label: "Sad", emoji: "😢" },
  { label: "Angry", emoji: "😡" },
];

export function LikeReactionButton({announId}) {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  let closeTimeout;

  console.log("kkaaa", announId)

  const handleReactionSelect = async (reaction) => {
    console.log("Calling reactAction with:", reaction, announId);
    setSelectedReaction(reaction);
    setShowPicker(false);
    await reactAction({reaction,announId});

  };

  const currentReaction = selectedReaction || reactions[0];

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearTimeout(closeTimeout);
        setShowPicker(true);
      }}
      onMouseLeave={() => {
        closeTimeout = setTimeout(() => setShowPicker(false), 200);
      }}
    >
      <Button
        variant="ghost"
        size="sm"
        className={`p-0 gap-1 ${
          currentReaction.label === "Like"
            ? "text-title hover:text-primary"
            : "text-primary"
        }`}
      >
        <span className="text-lg">{currentReaction.emoji}</span>
        {currentReaction.label}
      </Button>

      {showPicker && (
        <div className="absolute bottom-full mb-2 left-0 flex gap-2 bg-white p-2 rounded-full shadow-lg border z-50 animate-fade-in">
          {reactions.map((reaction) => (
            <button
              key={reaction.label}
              onClick={() => handleReactionSelect(reaction)}
              className="text-2xl hover:scale-125 transition-transform duration-200"
            >
              {reaction.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
