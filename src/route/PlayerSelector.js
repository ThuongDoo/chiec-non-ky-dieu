import React, { useState, useRef } from "react";
import bgImg from "../resources/bgGuide.png";

function PlayerSelector({ routes, onNavigate }) {
  const [numPlayers, setNumPlayers] = useState(1);
  const [playerColors, setPlayerColors] = useState([
    "#FF6961",
    "#77DD77",
    "#B39EB5",
    "#FFD700",
  ]);
  const [playerNames, setPlayerNames] = useState([
    "Player 1",
    "Player 2",
    "Player 3",
    "Player 4",
  ]);
  const colorInputRefs = useRef([]);

  const handleNumPlayersChange = (value) => {
    if (value >= 1 && value <= 4) {
      setNumPlayers(value);
    }
  };

  const handleColorChange = (index, color) => {
    const newColors = [...playerColors];
    newColors[index] = color;
    setPlayerColors(newColors);
  };

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const triggerColorPicker = (index) => {
    colorInputRefs.current[index].click();
  };

  const handlePlay = () => {
    onNavigate({
      route: routes.game,
      state: {
        playerColors: playerColors.slice(0, numPlayers),
        playerNames: playerNames.slice(0, numPlayers),
      },
    });
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      <div className=" absolute h-full w-full bg-blue-500 -z-10">
        <img src={bgImg} alt="" className=" h-full w-full "></img>
      </div>
      <div className="p-8 bg-white shadow-2xl rounded-2xl w-2/5 m-auto  border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Chọn số lượng người chơi
        </h2>
        <div className="flex justify-center mb-6 space-x-4">
          {[1, 4].map((value) => (
            <button
              key={value}
              className={`px-5 py-2 rounded-lg font-medium transition-all duration-300 transform ${
                numPlayers === value
                  ? "bg-blue-500 text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => handleNumPlayersChange(value)}
            >
              {value}
            </button>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Cài đặt người chơi
        </h3>
        <div
          className={`grid grid-cols-1 gap-4 ${
            numPlayers > 2 ? "sm:grid-cols-2" : ""
          }`}
        >
          {Array.from({ length: numPlayers }).map((_, index) => (
            <div
              key={index}
              style={{ backgroundColor: playerColors[index] }}
              className="flex flex-col p-4 rounded-lg shadow-sm transition-colors"
            >
              <input
                type="text"
                value={playerNames[index]}
                onChange={(e) => handleNameChange(index, e.target.value)}
                className="p-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                placeholder={`Enter Player ${index + 1} name`}
              />
              <button
                onClick={() => triggerColorPicker(index)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all"
              >
                Đổi Màu
              </button>
              <input
                type="color"
                value={playerColors[index]}
                onChange={(e) => handleColorChange(index, e.target.value)}
                ref={(el) => (colorInputRefs.current[index] = el)}
                className="hidden"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handlePlay}
          className="mt-6 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
        >
          Play
        </button>
      </div>
    </div>
  );
}

export default PlayerSelector;
