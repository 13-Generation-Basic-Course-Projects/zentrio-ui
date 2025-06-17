import React from 'react'

export default function ProgressBar({percent, color}) {
  return (
    <div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className= {`h-full ${color == null ? "bg-progress-blue" : color }`}  
            style={{ width: `${percent ? percent: "23"}%`}}

          ></div>
        </div>
        <p className="text-body text-right text-description mt-1">{percent ? percent : "23" }%</p>
    </div>
  )
}
