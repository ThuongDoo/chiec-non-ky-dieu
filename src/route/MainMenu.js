import React, { useState } from "react";
import bgImg from "../resources/bgmainmenu.png";

function MainMenu({ routes, onNavigate }) {
  return (
    <div className=" flex flex-col">
      <div className=" absolute  h-full w-full bg-blue-500 -z-10">
        <img src={bgImg} alt="" className=" h-full w-full"></img>
      </div>
      <div className="absolute top-1/2 left-20 transform  -translate-y-1/2 flex flex-col gap-y-10 ">
        <h1
          className=" bg-yellow-600 border border-yellow-500 text-5xl px-16 hover:bg-yellow-400 py-5 cursor-pointer rounded-xl"
          onClick={() => {
            onNavigate({ route: routes.select });
          }}
        >
          Chơi
        </h1>
        <h1
          className=" bg-yellow-600 border border-yellow-500 text-5xl px-16 hover:bg-yellow-400 py-5 cursor-pointer rounded-xl"
          onClick={() => {
            onNavigate({ route: routes.guide });
          }}
        >
          Hướng dẫn
        </h1>
        <h1
          className=" bg-yellow-600 border border-yellow-500 text-5xl px-16 hover:bg-yellow-400 py-5 cursor-pointer rounded-xl"
          onClick={() => {
            onNavigate({ route: routes.ques });
          }}
        >
          Bảng câu hỏi
        </h1>
        <h1
          className=" bg-yellow-600 border border-yellow-500 text-5xl px-16 hover:bg-yellow-400 py-5 cursor-pointer rounded-xl"
          onClick={() => {
            onNavigate({ route: routes.scoreBoard });
          }}
        >
          Bảng điểm
        </h1>
      </div>
    </div>
  );
}

export default MainMenu;
