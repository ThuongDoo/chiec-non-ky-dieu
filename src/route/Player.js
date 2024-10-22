import React from "react";
import heartPng from "../resources/heart.png";

function Player({ name = "Player 1", point = 0, color = "blue", heart = 3 }) {
  return (
    <div
      className=" text-white px-4 py-8 flex flex-col gap-y-5 items-center justify-center"
      style={{ backgroundColor: color }}
    >
      <h1 className=" font-bold text-3xl">{name}</h1>
      <h1 className=" text-4xl">{point}</h1>
      <div className=" flex items-center">
        <h1>{heart} x </h1>
        <img className=" w-10" src={heartPng} alt=""></img>
      </div>
    </div>
  );
}

export default Player;
