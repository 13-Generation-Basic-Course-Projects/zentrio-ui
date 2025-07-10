"use client";
import React, { useEffect, useState } from "react";

export function TypewriterEffectSmooth({ words }) {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [finished, setFinished] = useState(false);

  // Stop if all words typed
  if (wordIndex >= words.length) return null;

  const currentWordObj = words[wordIndex];
  const currentWord = currentWordObj.text;
  const currentClassName = currentWordObj.className || "";

  useEffect(() => {
    if (finished) return;

    let timeout;

    if (isTyping && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentWord.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 80);
    } else if (isTyping && charIndex === currentWord.length) {
      timeout = setTimeout(() => {
        setIsTyping(false);
      }, 1200);
    } else if (!isTyping && wordIndex < words.length - 1) {
      timeout = setTimeout(() => {
        setDisplayedText("");
        setCharIndex(0);
        setWordIndex((prev) => prev + 1);
        setIsTyping(true);
      }, 400);
    } else {
      // Last word finished typing
      setFinished(true);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, wordIndex, currentWord, finished, words.length]);

  return (
    <div className={`inline-block text-4xl font-bold mt-4 ${currentClassName}`}>
      {displayedText}
      {!finished && <span className="inline-block w-[1ch] animate-pulse">|</span>}
    </div>
  );
}
