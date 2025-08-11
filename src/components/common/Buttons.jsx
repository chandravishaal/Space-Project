import { useState } from "react";
import "../../styles/Button.css";
import "../../styles/BorderStyle.css";

export default function CosmicButton({ children, onClick, className = "" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        cosmic-button px-6 py-3 font-bold uppercase tracking-wide
        bg-white/10 rounded-3xl text-sm text-white
        ${className}
        ${hovered ? "cosmic-border-animate" : " "}
      `}
    >
      {children}
    </button>
  );
}

//refactor/optimisation needed ////  border border-white/20