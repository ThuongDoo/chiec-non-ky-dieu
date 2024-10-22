import React from "react";

function Player({ name = "Player 1", point = 0, color = "blue" }) {
  return (
    <div
      className=" text-white px-4 py-8 flex flex-col gap-y-5 items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <h1 className=" font-bold text-3xl">{name}</h1>
      <h1 className=" text-4xl">{point}</h1>
    </div>
  );
}

export default Player;
