"use client";

import {
  reactAction,
  unreactAction,
  updateReactAction,
} from "@/action/react.action";
import { useState, useEffect, useRef } from "react";

export function LikeReactionButton({ announId, reacts, currentUserProfile }) {
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [hoverTotal, setHoverTotal] = useState(false);
  const pickerRef = useRef();
  const hoverTimeoutRef = useRef();

  const userId = currentUserProfile?.payload?.user?.userId;

  const reactions = [
    {
      label: "Like",
      emoji: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-blue-500 fill-current"
          viewBox="0 0 512 512"
        >
          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z" />
        </svg>
      ),
    },
    {
      label: "Love",
      emoji: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-red-500 fill-current"
          viewBox="0 0 512 512"
        >
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
      ),
    },
    {
      label: "Funny",
      emoji: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zm53.5-96.7s0 0 0 0c0 0 0 0 0 0l-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8c0 0 0 0 0 0s0 0 0 0zm160 0c0 0 0 0 0 0l-.2-.2c-.2-.2-.4-.5-.7-.9c-.6-.8-1.6-2-2.8-3.4c-2.5-2.8-6-6.6-10.2-10.3c-8.8-7.8-18.8-14-27.7-14s-18.9 6.2-27.7 14c-4.2 3.7-7.7 7.5-10.2 10.3c-1.2 1.4-2.2 2.6-2.8 3.4c-.3 .4-.6 .7-.7 .9l-.2 .2c0 0 0 0 0 0c0 0 0 0 0 0s0 0 0 0c-2.1 2.8-5.7 3.9-8.9 2.8s-5.5-4.1-5.5-7.6c0-17.9 6.7-35.6 16.6-48.8c9.8-13 23.9-23.2 39.4-23.2s29.6 10.2 39.4 23.2c9.9 13.2 16.6 30.9 16.6 48.8c0 3.4-2.2 6.5-5.5 7.6s-6.9 0-8.9-2.8c0 0 0 0 0 0s0 0 0 0s0 0 0 0z" />
        </svg>
      ),
    },
    {
      label: "Surprised",
      emoji: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-yellow-300 fill-current"
          viewBox="0 0 512 512"
        >
          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM176.4 176a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm128 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM256 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
        </svg>
      ),
    },
    {
      label: "Sad",
      emoji: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-blue-400 fill-current"
          viewBox="0 0 512 512"
        >
          <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm240 80c0-8.8 7.2-16 16-16c45 0 85.6 20.5 115.7 53.1c6 6.5 5.6 16.6-.9 22.6s-16.6 5.6-22.6-.9c-25-27.1-57.4-42.9-92.3-42.9c-8.8 0-16-7.2-16-16zm-80 80c-26.5 0-48-21-48-47c0-20 28.6-60.4 41.6-77.7c3.2-4.4 9.6-4.4 12.8 0C179.6 308.6 208 349 208 369c0 26-21.5 47-48 47zM367.6 208a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm-192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
      ),
    },
    {
      label: "Angry",
      emoji: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-red-600 fill-current"
          viewBox="0 0 512 512"
        >
          <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM338.7 395.9c6.6-5.9 7.1-16 1.2-22.6C323.8 355.4 295.7 336 256 336s-67.8 19.4-83.9 37.3c-5.9 6.6-5.4 16.7 1.2 22.6s16.7 5.4 22.6-1.2c11.7-13 31.6-26.7 60.1-26.7s48.4 13.7 60.1 26.7c5.9 6.6 16 7.1 22.6 1.2zM176.4 272c17.7 0 32-14.3 32-32c0-1.5-.1-3-.3-4.4l10.9 3.6c8.4 2.8 17.4-1.7 20.2-10.1s-1.7-17.4-10.1-20.2l-96-32c-8.4-2.8-17.4 1.7-20.2 10.1s1.7 17.4 10.1 20.2l30.7 10.2c-5.8 5.8-9.3 13.8-9.3 22.6c0 17.7 14.3 32 32 32zm192-32c0-8.9-3.6-17-9.5-22.8l30.2-10.1c8.4-2.8 12.9-11.9 10.1-20.2s-11.9-12.9-20.2-10.1l-96 32c-8.4 2.8-12.9 11.9-10.1 20.2s11.9 12.9 20.2 10.1l11.7-3.9c-.2 1.5-.3 3.1-.3 4.7c0 17.7 14.3 32 32 32s32-14.3 32-32z" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    if (reacts && userId) {
      const userReact = reacts.find(
        (react) => react.commentBy?.userId === userId
      );
      if (userReact) {
        const match = reactions.find(
          (r) => r.label.toUpperCase() === userReact.reactType.toUpperCase()
        );
        setSelectedReaction(match || null);
      } else {
        setSelectedReaction(null);
      }
    }
  }, [reacts, userId]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setShowPicker(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setShowPicker(false), 100);
  };

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

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleReactionSelect = async (reaction) => {
    const userReact = reacts.find(
      (react) => react.commentBy?.userId === userId
    );
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
      setShowPicker(false);
    } catch (error) {
      console.error("Reaction error:", error.message);
    }
  };

  const currentReaction = selectedReaction || reactions[0];

  const reactionCounts =
    reacts?.reduce((acc, react) => {
      const type = react.reactType.toUpperCase();
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {}) || {};

  const topTypes = Object.entries(reactionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type]) => type);

  const getEmoji = (type) => {
    const found = reactions.find((r) => r.label.toUpperCase() === type);
    return found ? (
      <span className="w-4 h-4 inline-block">{found.emoji}</span>
    ) : (
      "❓"
    );
  };

  const groupedReacts = reactions
    .filter((r) =>
      reacts.some((rr) => rr.reactType.toUpperCase() === r.label.toUpperCase())
    )
    .map((r) => ({
      emoji: r.emoji,
      label: r.label.toUpperCase(),
      users: reacts
        .filter((rr) => rr.reactType.toUpperCase() === r.label.toUpperCase())
        .map((rr) => rr.commentBy?.username)
        .filter(Boolean),
    }));

  return (
    <div className="relative inline-block" ref={pickerRef}>
      {/* Reaction Summary */}
      <div className="flex items-center text-sm text-gray-600 gap-1 mb-2">
        {topTypes.map((type) => (
          <span key={type}>{getEmoji(type)}</span>
        ))}

        {reacts.length > 0 && (
          <div
            onMouseEnter={() => setHoverTotal(true)}
            onMouseLeave={() => setHoverTotal(false)}
            className="relative"
          >
            <span className="text-small text-gray-500 cursor-pointer pl-1">
              • {reacts.length} total
            </span>

            {hoverTotal && (
              <div className="absolute bottom-full left-0 bg-white border shadow px-3 py-2 rounded text-small z-50 w-60 max-h-60 overflow-auto space-y-2">
                {groupedReacts.map((group) => (
                  <div key={group.label}>
                    <strong className="flex items-center gap-2">
                      <span className="w-4 h-4 inline-block">
                        {group.emoji}
                      </span>
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

      {/* Reaction Button */}
      <div className="relative inline-block">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <button
            className="border-none ml-3 p-2 rounded hover:bg-gray-100 transition-colors"
            onClick={() => setShowPicker((prev) => !prev)}
          >
            {currentReaction.emoji}
          </button>

          {showPicker && (
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="absolute justify-center bottom-full mb-2 left-0 flex gap-2 bg-white p-2 rounded-full shadow-lg border z-50 animate-fade-in w-[190px]"
            >
              {reactions.map((reaction) => (
                <button
                  key={reaction.label}
                  onClick={() => handleReactionSelect(reaction)}
                  className={`cursor-pointer transition-transform duration-200 hover:scale-125 ${
                    selectedReaction?.label === reaction.label
                      ? "opacity-50"
                      : ""
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
      </div>
    </div>
  );
}