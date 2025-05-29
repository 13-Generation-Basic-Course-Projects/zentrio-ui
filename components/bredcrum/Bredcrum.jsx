import React from "react";

export default function BredCrum({ board, feature,user, header, modal }) {
  return (
    <div className="p-0">
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
          <li>/</li>
          <li>
            <a href="#" className="hover:text-blueActive">
              {user}
            </a>
          </li>
        </ol>
      </nav>

      <div className=" grid grid-cols-2  ">
        <div>
          <p className="text-h1 text-titles font-semibold">{header}</p>
        </div>
        {/* apis */}
        <div className=" flex items-center justify-end  gap-3 ">
          {modal &&
            modal.length > 0 &&
            modal.map((ModalComp, i) => (
              <div className="" key={i}>
                {ModalComp}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
