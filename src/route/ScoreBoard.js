import React, { useEffect, useState } from "react";
import api from "../util/api";
import bgImg from "../resources/bg.png";

function ScoreBoard({ onNavigate, routes, activeScreen }) {
  const [multiData, setMultiData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  useEffect(() => {
    const getScore = async () => {
      try {
        await api.get(`user/${true}`).then((res) => {
          console.log(res.data.users);
          const newScores = res.data.users.sort((a, b) => b.score - a.score);
          setSingleData(newScores);
        });
      } catch (error) {
        console.error("Error saving score: ", error);
      }
    };
    const getMultiScore = async () => {
      try {
        await api.get(`user/${false}`).then((res) => {
          console.log(res.data.users);
          const newScores = res.data.users.sort((a, b) => b.score - a.score);
          setMultiData(newScores);
        });
      } catch (error) {
        console.error("Error saving score: ", error);
      }
    };
    getScore();
    getMultiScore();
  }, [activeScreen]);

  return (
    <div className=" flex flex-col w-full h-screen text-black  justify-between">
      <div className=" absolute h-full w-full bg-blue-500 -z-10">
        <img src={bgImg} alt="" className=" h-full w-full "></img>
      </div>
      <h1 className=" text-6xl font-bold pt-10">Bảng Điểm</h1>
      <div className=" px-20 flex h-96 w-full gap-x-10 ">
        <div className="h-full w-1/2 flex flex-col relative">
          <div className=" absolute h-full w-full bg-white -z-10 opacity-90 rounded-lg"></div>
          <h1 className=" text-3xl font-semibold italic">Chơi đơn</h1>
          <div className="overflow-y-auto flex-1 px-10 py-2 font-semibold text-black">
            {singleData.map((data, index) => (
              <div
                className="grid grid-cols-5 w-full items-center "
                key={index}
              >
                <h1 className="text-start">{index + 1}</h1>
                <h1 className="text-start">{data.name}</h1>
                <h1 className="text-start">{data.point}</h1>
                <h1 className="text-end col-span-2">
                  {formatDate(data.createdAt)}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full w-1/2 flex flex-col relative">
          <div className=" absolute h-full w-full bg-white -z-10 opacity-90 rounded-lg"></div>
          <h1 className=" text-3xl font-semibold italic">Chơi nhóm</h1>
          <div className="overflow-y-auto flex-1 px-10 py-2 font-semibold text-black">
            {multiData.map((data, index) => (
              <div
                className="grid grid-cols-5 w-full items-center "
                key={index}
              >
                <h1 className="text-start">{index + 1}</h1>
                <h1 className="text-start">{data.name}</h1>
                <h1 className="text-start">{data.point}</h1>
                <h1 className="text-end col-span-2">
                  {formatDate(data.createdAt)}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=" flex justify-between items-center pb-16 px-20">
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

export default ScoreBoard;

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
