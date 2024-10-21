import React from "react";

function LetterTile({ letter, isSelect = false }) {
  return (
    <div className=" w-20 h-32 bg-blue-500 m-2 flex items-center justify-center">
      <h1
        className={`${
          isSelect === true ? "block" : "hidden"
        } text-white font-bold text-5xl`}
      >
        {letter}
      </h1>
    </div>
  );
}

export default LetterTile;
