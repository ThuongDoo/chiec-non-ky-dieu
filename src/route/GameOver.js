import React, { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import api from "../util/api";

function GameOver({ playerNames, points, routes, onNavigate }) {
  const [isScoreSaved, setIsScoreSaved] = useState(false); // Track if score is already saved
  const [isSingle, setIsSingle] = useState(true);
  useEffect(() => {
    if (playerNames.length > 1) {
      setIsSingle(false);
    }
  }, [playerNames]);

  const saveScore = async () => {
    try {
      await api.post("user", { names: playerNames, points, isSingle });
      setIsScoreSaved(true); // Set to true after saving
    } catch (error) {
      console.error("Error saving score: ", error);
    }
  };
  return (
    <div className="text-yellow-600 absolute bg-black border-2 border-yellow-600  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 h-3/4 flex flex-col items-center justify-between py-10 rounded-xl">
      <h1 className=" text-6xl">Game Over</h1>
      <div className=" w-96">
        {playerNames.map((item, index) => (
          <div className=" flex w-full justify-between text-2xl" key={index}>
            <h1>{playerNames[index]}</h1>
            <h1>{points[index]}</h1>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between w-full px-20">
        <button
          onClick={() => {
            onNavigate({ route: routes.mainMenu });
          }}
          className="size-32 text-3xl bg-yellow-600 text-black font-bold rounded-xl cursor-pointer"
        >
          MENU
        </button>
        {/* <div onClick={() => onRePlay(1)}>
          <ArrowPathIcon className="size-32 bg-yellow-600 text-black rounded-xl cursor-pointer" />
        </div> */}
        <button
          onClick={saveScore}
          disabled={isScoreSaved} // Disable button if score is saved
          className={`size-32 text-3xl font-bold rounded-xl flex items-center justify-center ${
            isScoreSaved
              ? "bg-gray-400 text-gray-700"
              : "bg-yellow-600 text-black cursor-pointer"
          }`}
        >
          <h1 className=" text-center">
            {isScoreSaved ? "ĐÃ LƯU" : "LƯU ĐIỂM"}
          </h1>
        </button>
      </div>
    </div>
  );
}

export default GameOver;
