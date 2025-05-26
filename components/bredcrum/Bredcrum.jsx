import React from "react";

export default function BredCrum({ board, feature, header }) {
  return (
    <div>
      <nav className="text-h6 text-[#94A3B8]">
        <ol className="flex space-x-2">
          <li>
            <a href="#" className="hover:text-blueActive">
              Workspace
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-blueActive">
              {board}
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="#" className="hover:text-blueActive">
              {feature}
            </a>
          </li>
        </ol>
      </nav>

      <header className="text-h1 text-titles font-semibold">
        <p>{header}</p>
      </header>
    </div>
  );
}
