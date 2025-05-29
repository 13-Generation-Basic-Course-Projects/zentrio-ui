import React from "react";
import "../../styles/roundText.css"; // Adjust relative path as needed

export const RoundText1 = () => {
  return (
    <div>
      <button className="button1">
        <p className="button1__text">
          {"Learn more. Learn more. Learn.".split("").map((char, i) => (
            <span key={i} style={{ "--index": i }}>
              {char}
            </span>
          ))}
        </p>
        <div className="button1__circle">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
          >
            <path
              d="M12 4V20M12 20L8 16M12 20L16 16"
              stroke="#000000"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};


export const RoundText2 = () => {
    return (
      <div>
        <button className="button2">
          <p className="button2__text">
            {"Our Feature.Our Feature. Here. ".split("").map((char, i) => (
              <span key={i} style={{ "--index": i }}>
                {char}
              </span>
            ))}
          </p>
          <div className="button2__circle">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
            >
              <path
                d="M12 4V20M12 20L8 16M12 20L16 16"
                stroke="#000000"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
    );
  };
  

  export const RoundText3 = () => {
    return (
      <div>
        <button className="button3">
          <p className="button3__text">
            {"Our the best mentors at KSHRD. ".split("").map((char, i) => (
              <span key={i} style={{ "--index": i }}>
                {char}
              </span>
            ))}
          </p>
          <div className="button3__circle">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M4 12H20M20 12L16 8M20 12L16 16"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
        </button>
      </div>
    );
  };
  
