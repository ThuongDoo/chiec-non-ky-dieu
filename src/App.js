import logo from "./logo.svg";
import "./App.css";
import MainMenu from "./route/MainMenu";
import { useEffect, useState } from "react";
import Game from "./route/Game";
import PlayerSelector from "./route/PlayerSelector";
import questionsList from "../src/resources/questions.json";
import ScoreBoard from "./route/ScoreBoard";
import Guide from "./route/Guide";
import Ques from "./route/Ques";
import api from "./util/api";

function App() {
  const routes = {
    mainMenu: "main-menu",
    game: "game",
    guide: "guide",
    select: "select",
    scoreBoard: "score-board",
    ques: "ques",
  };
  const [activeScreen, setActiveScreen] = useState(routes.mainMenu);
  const [playerColors, setPlayerColors] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("ques")
        .then((res) => {
          setQuestions(shuffleArray(res.data.questions));
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, []);

  const hangleChangeRoute = (data) => {
    setActiveScreen(data.route);
  };

  const handlePlayerSelector = (data) => {
    setActiveScreen(data.route);
    setPlayerColors(data.state.playerColors);
    setPlayerNames(data.state.playerNames);
  };
  return (
    <div className="App">
      {questions.length > 0 ? (
        <>
          {" "}
          {activeScreen === routes.mainMenu ? (
            <MainMenu routes={routes} onNavigate={hangleChangeRoute} />
          ) : activeScreen === routes.game ? (
            <Game
              routes={routes}
              playerColors={playerColors}
              playerNames={playerNames}
              questions={questions}
              onNavigate={hangleChangeRoute}
            />
          ) : activeScreen === routes.scoreBoard ? (
            <ScoreBoard
              activeScreen={activeScreen}
              routes={routes}
              onNavigate={hangleChangeRoute}
            />
          ) : activeScreen === routes.ques ? (
            <Ques routes={routes} onNavigate={hangleChangeRoute} />
          ) : activeScreen === routes.guide ? (
            <Guide routes={routes} onNavigate={hangleChangeRoute} />
          ) : (
            activeScreen === routes.select && (
              <PlayerSelector
                routes={routes}
                onNavigate={handlePlayerSelector}
              />
            )
          )}
        </>
      ) : (
        <div className=" flex items-center justify-center h-screen text-3xl">
          Loading....
        </div>
      )}
    </div>
  );
}

export default App;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Đổi chỗ 2 phần tử
  }
  return array;
}
