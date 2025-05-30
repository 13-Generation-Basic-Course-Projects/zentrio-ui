import React from 'react'

export default function ProgressBar() {
  return (
    <div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-progress-blue w-[70%]"></div>
        </div>
        <p className="text-body text-right text-description mt-1">70%</p>
    </div>
  )
}
