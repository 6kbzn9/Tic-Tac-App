import React from "react";

const Square = ({ value, onClick, isWiningSquare }) => {
  return (
    <button
      type="button"
      className={`square ${isWiningSquare ? "winning" : ""} ${
        value === "X" ? "text-green" : "text-orange"
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
