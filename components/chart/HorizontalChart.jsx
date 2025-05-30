"use client";
import { TrendingUp } from "lucide-react";

const data = [
  { browser: "Todo", visitors: 270, color: "#64A9F6" },
  { browser: "In Progress", visitors: 200, color: "#5FC381" },
  { browser: "Under Review", visitors: 187, color: "#F59E0B" },
  { browser: "Done", visitors: 173, color: "#64A9F6" },
];

const maxVisitors = Math.max(...data.map((d) => d.visitors));
const labelWidth = 120;
const barHeight = 15;
const barGap = 16;
const padding = 20;

export default function HorizontalChart() {
  const totalHeight = data.length * (barHeight + barGap);
  const viewBoxWidth = 1000;
  const barAreaWidth = viewBoxWidth - labelWidth - padding * 2;

  return (
    <div className="p-6 rounded-xl shadow-sm bg-white w-full">
      <h2 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-500" /> Total of Checklist
      </h2>

      <div className="relative w-full">
        <svg
          className="w-full h-auto "
          viewBox={`0 0 ${viewBoxWidth} ${totalHeight + 60}`}
          preserveAspectRatio="xMinYMin meet"
          role="img"
          aria-label="Horizontal bar chart of checklist status"
        >
          {/* Bars */}
          {data.map((item, index) => {
            const barLength = (item.visitors / maxVisitors) * barAreaWidth;
            const percent =
              ((item.visitors / maxVisitors) * 100).toFixed(1) + "%";
            const y = index * (barHeight + barGap);
            return (
              <g key={item.browser} transform={`translate(0, ${y})`}>
                {/* Status Label */}
                <text
                  x={padding}
                  y={barHeight / 2}
                  alignmentBaseline="middle"
                  fontSize="14"
                  fill="#334155"
                >
                  {item.browser}
                </text>

                {/* Bar */}
                <rect
                  x={labelWidth}
                  y={0}
                  width={barLength}
                  height={barHeight}
                  fill={item.color}
                  rx={4}
                />

                {/* Visitors & Percent Label */}
                <text
                  x={labelWidth + barLength + 8}
                  y={barHeight / 2}
                  alignmentBaseline="middle"
                  fontSize="12"
                  fill="#0f172a"
                >
                  {item.visitors} ({percent})
                </text>
              </g>
            );
          })}

          {/* Low / Medium / High Labels */}
          <text
            x={labelWidth}
            y={totalHeight + 40}
            fontSize="12"
            fill="#64748b"
          >
            Low
          </text>
          <text
            x={labelWidth + barAreaWidth * 0.5}
            y={totalHeight + 40}
            textAnchor="middle"
            fontSize="12"
            fill="#64748b"
          >
            Medium
          </text>
          <text
            x={labelWidth + barAreaWidth}
            y={totalHeight + 40}
            textAnchor="end"
            fontSize="12"
            fill="#64748b"
          >
            High
          </text>
        </svg>
      </div>
    </div>
  );
}