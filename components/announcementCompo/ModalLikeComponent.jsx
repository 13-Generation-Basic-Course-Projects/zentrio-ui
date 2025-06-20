"use client";

import { reactAction, unreactAction, updateReactAction } from "@/action/react.action";
import { useState, useEffect, useRef } from "react";
// Import SVGs
import likeSvg from "../../assets/announcement/like.svg";
import loveSvg from "../../assets/announcement/love.svg";
import funnySvg from "../../assets/announcement/haha.svg";
import surprisedSvg from "../../assets/announcement/wow.svg";
import sadSvg from "../../assets/announcement/sad.svg";
import angrySvg from "../../assets/announcement/angry.svg";
import defaultLike from "../../assets/announcement/defaultLike.png";

export function LikeReactionButton({ announId, reacts, currentUserProfile }) {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [hoverTotal, setHoverTotal] = useState(false);
  const pickerRef = useRef();
  const hoverTimeoutRef = useRef();

  const userId = currentUserProfile?.payload?.user?.userId;

  const reactions = [
    { label: "Like", emoji: likeSvg },
    { label: "Love", emoji: loveSvg },
    { label: "Funny", emoji: funnySvg },
    { label: "Surprised", emoji: surprisedSvg },
    { label: "Sad", emoji: sadSvg },
    { label: "Angry", emoji: angrySvg },
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

  // Handle mouse enter for button and picker area
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowPicker(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setShowPicker(false);
    }, 100); // Small delay to allow moving between button and picker
  };

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setHoverTotal(false);
      }
    }
    if (hoverTotal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hoverTotal]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleReactionSelect = async (reaction) => {
    const userReact = reacts.find(react => react.commentBy?.userId === userId);
    const isSameReaction = selectedReaction?.label === reaction.label;

    try {
      if (userReact && isSameReaction) {
        await unreactAction({ reactId: userReact.reactId });
        setSelectedReaction(null);
      } else if (userReact && !isSameReaction) {
        await updateReactAction({
          reactId: userReact.reactId,
          reactType: reaction.label.toUpperCase(),
          announId,
        });
        setSelectedReaction(reaction);
      } else if (!userReact) {
        await reactAction({ announId, reaction });
        setSelectedReaction(reaction);
      }
      
      // Hide picker after selection
      setShowPicker(false);
    } catch (error) {
      console.error("❌ Reaction error:", error.message);
    }
  };

  const currentReaction = selectedReaction || { label: "Like", emoji: defaultLike };

  const reactionCounts = reacts?.reduce((acc, react) => {
    const type = react.reactType.toUpperCase();
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {}) || {};

  const topTypes = Object.entries(reactionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type]) => type);

  const getEmoji = (type) => {
    const found = reactions.find(r => r.label.toUpperCase() === type);
    return found ? (
      <img src={found.emoji.src || found.emoji} alt={found.label} className="w-4 h-4 inline" />
    ) : (
      "❓"
    );
  };

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
      {/* Reaction Summary */}
      <div className="flex items-center text-sm text-gray-600 gap-1 mb-2">
        {topTypes.map((type) => (
          <div key={type} className="relative">
            <span className="cursor-default">{getEmoji(type)}</span>
          </div>
        ))}

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
                    <strong className="flex items-center gap-1">
                      <img
                        src={group.emoji.src || group.emoji}
                        alt={group.label}
                        className="w-4 h-4 inline"
                      />
                      {group.label}
                    </strong>
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

      {/* Reaction Button Container */}
      <div className="relative inline-block">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          {/* Main Reaction Button */}
          <button
            className="border-none ml-3 p-2 rounded hover:bg-gray-100 transition-colors"
            onClick={() => setShowPicker(prev => !prev)}
          >
            <img
              src={currentReaction.emoji.src || currentReaction.emoji}
              alt={currentReaction.label}
              className="inline-block w-6 h-6"
            />
          </button>

          {/* Reaction Picker */}
          {showPicker && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute bottom-full mb-2 left-0 flex gap-2 bg-white p-2 rounded-full shadow-lg border z-50 animate-fade-in w-[200px]"
            >
              {reactions.map((reaction) => (
                <button
                  key={reaction.label}
                  onClick={() => handleReactionSelect(reaction)}
                  className={`cursor-pointer transition-transform duration-200 hover:scale-125 ${
                    selectedReaction?.label === reaction.label ? "opacity-60" : ""
                  }`}
                  type="button"
                  aria-label={`React with ${reaction.label}`}
                >
                  <img
                    src={reaction.emoji.src || reaction.emoji}
                    alt={reaction.label}
                    className="w-6 h-6"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}