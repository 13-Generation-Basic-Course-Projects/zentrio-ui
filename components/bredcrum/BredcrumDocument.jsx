import Link from "next/link";
import React from "react";

export default function BredcrumDocument({
  breadcrumbList = [],
  header,
  modal,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-grid-cols-2">
      <nav className="text-h6 text-[#94A3B8]">
        <ol className="flex space-x-2 items-center">
          {breadcrumbList.map((item, index) => (
            <li key={index} className="flex items-center">
              <Link
                href={item.href ?? "#"}
                className={`hover:text-blueActive ${
                  !item.href ? "cursor-default" : ""
                }`}
              >
                {item.label}
              </Link>
              {index < breadcrumbList.length - 1 && (
                <span className="px-1">/</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <p className="text-h1 text-titles font-semibold">{header}</p>
        </div>
        <div className="flex items-center justify-start md:justify-end gap-3">
          {modal?.map((ModalComp, i) => (
            <div key={i}>{ModalComp}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
