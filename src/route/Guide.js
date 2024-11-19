import React, { useState } from "react";
import bgImg from "../resources/bgGuide.png";
import guide from "../resources/guide.json";

function Guide({ routes, onNavigate }) {
  const [guideData, setGuideData] = useState(guide);
  return (
    <div className=" flex flex-col w-full h-screen text-black items-center  justify-between gap-y-10 ">
      <div className=" absolute h-full w-full bg-blue-500 -z-10">
        <img src={bgImg} alt="" className=" h-full w-full "></img>
      </div>
      <h1 className=" text-6xl font-bold pt-10">Hướng dẫn</h1>
      <div className=" relative w-5/6 flex-1 overflow-y-auto bg-white bg-opacity-30">
        {guideData.map((itemi, indexi) => (
          <div key={indexi} className="text-start px-4 py-6">
            <h1 className="  font-bold italic text-4xl">
              {indexi + 1}. {itemi.title}
            </h1>
            {itemi.content.map((itemj, indexj) => (
              <div className=" pl-4 pt-2 text-xl">
                <h1>
                  - <span className=" font-semibold">{itemj.title} </span>
                  {itemj.content}
                </h1>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className=" flex justify-between items-center pb-16 w-5/6">
        <button
          className=" bg-yellow-600 text-black font-bold text-3xl px-44 py-4 rounded-xl"
          onClick={() => onNavigate({ route: routes.mainMenu })}
        >
          MENU
        </button>
        <button
          className=" bg-yellow-600 text-black font-bold text-3xl px-44 py-4 rounded-xl"
          onClick={() => onNavigate({ route: routes.select })}
        >
          PLAY
        </button>
      </div>
    </div>
  );
}

export default Guide;
