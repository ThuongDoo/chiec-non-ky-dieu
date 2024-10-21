import logo from "./logo.svg";
import "./App.css";
import MainMenu from "./route/MainMenu";
import { useState } from "react";
import Game from "./route/Game";
import Mode from "./route/Mode";
import SingleMode from "./route/SingleMode";

function App() {
  const routes = {
    mainMenu: "main-menu",
    game: "game",
    mode: {
      single: "single",
      multi: "multi",
    },
    guide: "guide",
  };
  const [activeScreen, setActiveScreen] = useState(routes.mainMenu);

  const hangleChangeRoute = (screen) => {
    setActiveScreen(screen);
  };
  return (
    <div className="App">
      {activeScreen === routes.mainMenu ? (
        <MainMenu routes={routes} onNavigate={hangleChangeRoute} />
      ) : activeScreen === routes.game ? (
        <Game />
      ) : (
        activeScreen === routes.mode.single && <SingleMode />
      )}
    </div>
  );
}

export default App;
