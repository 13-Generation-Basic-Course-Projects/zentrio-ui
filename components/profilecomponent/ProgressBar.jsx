// ProgressBar.js
import React from "react";

export default function ProgressBar({ percent }) {
  const getColorClass = (percent) => {
    if (percent >= 100) return "bg-emerald-400";
    if (percent >= 75) return "bg-green-300";
    if (percent >= 50) return "bg-yellow-400";
    if (percent >= 25) return "bg-orange-400";
    return "bg-red-500";
  };

  const progress = percent ?? 0;
  const colorClass = getColorClass(progress);

  return (
    <div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass}`}
          style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-body text-right text-description mt-1">{progress}%</p>
    </div>
  );
}
