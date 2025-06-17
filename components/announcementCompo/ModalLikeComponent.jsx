"use client";

import { reactAction, unreactAction, updateReactAction } from "@/action/react.action";
import { Button } from "@heroui/react";
import { useState, useEffect, useRef } from "react";

export function LikeReactionButton({ announId, reacts, currentUserProfile }) {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false); // toggled by click
  const [hoverOnButton, setHoverOnButton] = useState(false);
  const [hoverOnPicker, setHoverOnPicker] = useState(false);
  const [hoverTotal, setHoverTotal] = useState(false);
  const pickerRef = useRef();

  const userId = currentUserProfile?.payload?.user?.userId;

  const reactions = [
    { label: "Like", emoji: "👍" },
    { label: "Love", emoji: "❤️" },
    { label: "Funny", emoji: "😂" },
    { label: "Surprised", emoji: "😮" },
    { label: "Sad", emoji: "😢" },
    { label: "Angry", emoji: "😡" },
  ];

  useEffect(() => {
    if (reacts && userId) {
      const userReact = reacts.find(react => react.commentBy?.userId === userId);
      if (userReact) {
        const match = reactions.find(r => r.label.toUpperCase() === userReact.reactType.toUpperCase());
        setSelectedReaction(match || null);
      } else {
        setSelectedReaction(null);
      }
    }
  }, [reacts, userId]);

  // Show picker if hovered or toggled open by click
  const showPicker = hoverOnButton || hoverOnPicker || pickerOpen;

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setPickerOpen(false);
        setHoverTotal(false);
      }
    }
    if (showPicker || hoverTotal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker, hoverTotal]);

  const handleReactionSelect = async (reaction) => {
    const userReact = reacts.find(react => react.commentBy?.userId === userId);
    const isSameReaction = selectedReaction?.label === reaction.label;

    try {
      if (userReact && isSameReaction) {
        await unreactAction({ reactId: userReact.reactId });
        setSelectedReaction(null);
        setPickerOpen(false);  // close picker on unreact
        return;
      }
      if (userReact && !isSameReaction) {
        await updateReactAction({
          reactId: userReact.reactId,
          reactType: reaction.label.toUpperCase(),
          announId,
        });
        setSelectedReaction(reaction);
        setPickerOpen(false); // close picker on update
        return;
      }
      if (!userReact) {
        await reactAction({ announId, reaction });
        setSelectedReaction(reaction);
        setPickerOpen(false); // close picker on new react
        return;
      }
    } catch (error) {
      console.error("❌ Reaction error:", error.message);
    }
  };

  const currentReaction = selectedReaction || { label: "Like", emoji: "👍" };

  // Count reactions by type
  const reactionCounts = reacts?.reduce((acc, react) => {
    const type = react.reactType.toUpperCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {}) || {};

  // Get top 3 reaction types by count
  const topTypes = Object.entries(reactionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type]) => type);

  const getEmoji = (type) => reactions.find(r => r.label.toUpperCase() === type)?.emoji || "❓";

  // Group users by reaction type for total popup
  const groupedReacts = reactions
    .filter(r => reacts.some(rr => rr.reactType.toUpperCase() === r.label.toUpperCase()))
    .map(r => ({
      emoji: r.emoji,
      label: r.label.toUpperCase(),
      users: reacts
        .filter(rr => rr.reactType.toUpperCase() === r.label.toUpperCase())
        .map(rr => rr.commentBy?.username)
        .filter(Boolean),
    }));

  return (
    <div className="relative inline-block" ref={pickerRef}>
      {/* Reaction Button */}
      <div className="relative inline-block" ref={pickerRef}>
        <div
          onMouseEnter={() => setHoverOnButton(true)}
          onMouseLeave={() => setHoverOnButton(false)}
          className="relative inline-block"
        >
          <Button
            variant="ghost"
            size="lg"
            className="border-none"
            onClick={() => setPickerOpen(prev => !prev)}
          >
            <span className="text-lg">{currentReaction.emoji}</span>{" "}
            {currentReaction.label}
          </Button>

          {showPicker && (
            <div
              onMouseEnter={() => setHoverOnPicker(true)}
              onMouseLeave={() => setHoverOnPicker(false)}
              className="absolute bottom-full mb-2 left-0 flex gap-2 bg-white p-2 rounded-full shadow-lg border z-50 animate-fade-in"
            >
              {reactions.map((reaction) => (
                <button
                  key={reaction.label}
                  onClick={() => handleReactionSelect(reaction)}
                  className={`text-2xl cursor-pointer transition-transform duration-200 hover:scale-125 ${selectedReaction?.label === reaction.label ? "opacity-60" : ""
                    }`}
                  type="button"
                  aria-label={`React with ${reaction.label}`}
                >
                  {reaction.emoji}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* rest of your UI */}

      </div>

      {/* Top 3 Reactions */}
      <div className="flex items-center mt-1  text-sm text-gray-600">
        {topTypes.map((type) => (
          <div key={type} className="relative">
            <span className="cursor-default">{getEmoji(type)}</span>
          </div>
        ))}
        {/* Total reactions with tooltip showing users by type */}
        {reacts.length > 0 && (
          <div
            onMouseEnter={() => setHoverTotal(true)}
            onMouseLeave={() => setHoverTotal(false)}
            className="relative"
          >
            <span className="text-xs text-gray-500 cursor-pointer">
              • {reacts.length} total
            </span>

            {hoverTotal && (
              <div className="absolute bottom-full left-0 bg-white border shadow px-3 py-2 rounded text-xs z-50 w-60 max-h-60 overflow-auto space-y-2">
                {groupedReacts.map((group) => (
                  <div key={group.label}>
                    <strong>{group.emoji} {group.label}</strong>
                    <ul className="list-disc list-inside ml-4">
                      {group.users.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
