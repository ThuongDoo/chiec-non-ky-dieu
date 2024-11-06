import logo from "./logo.svg";
import "./App.css";
import MainMenu from "./route/MainMenu";
import { useState } from "react";
import Game from "./route/Game";
import Mode from "./route/Mode";
import SingleMode from "./route/SingleMode";
import MultiMode from "./route/MultiMode";
import PlayerSelector from "./route/PlayerSelector";
import questionsList from "../src/resources/questions.json";

function App() {
  const routes = {
    mainMenu: "main-menu",
    game: "game",
    guide: "guide",
    select: "select",
  };
  const [activeScreen, setActiveScreen] = useState(routes.mainMenu);
  const [playerColors, setPlayerColors] = useState([]);
  const [playerNames, setPlayerNames] = useState([]);
  const [questions, setQuestions] = useState(shuffleArray(questionsList));

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
      {activeScreen === routes.mainMenu ? (
        <MainMenu routes={routes} onNavigate={hangleChangeRoute} />
      ) : activeScreen === routes.game ? (
        <Game
          playerColors={playerColors}
          playerNames={playerNames}
          questions={questions}
        />
      ) : (
        activeScreen === routes.select && (
          <PlayerSelector routes={routes} onNavigate={handlePlayerSelector} />
        )
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
