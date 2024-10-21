import React, { useState } from "react";

function MainMenu({ routes, onNavigate }) {
  return (
    <div className=" flex flex-col">
      <h1
        onClick={() => {
          onNavigate(routes.mode.single);
        }}
      >
        1 player
      </h1>
      <h1
        onClick={() => {
          onNavigate(routes.mode.multi);
        }}
      >
        multiplay
      </h1>
      <h1
        onClick={() => {
          onNavigate(routes.guide);
        }}
      >
        Huong dan
      </h1>
    </div>
  );
}

export default MainMenu;
