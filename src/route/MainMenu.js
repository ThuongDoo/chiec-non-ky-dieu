import React, { useState } from "react";

function MainMenu({ routes, onNavigate }) {
  return (
    <div className=" flex flex-col">
      <h1
        onClick={() => {
          onNavigate({ route: routes.guide });
        }}
      >
        Huong dan
      </h1>
      <h1
        onClick={() => {
          onNavigate({ route: routes.select });
        }}
      >
        Play
      </h1>
    </div>
  );
}

export default MainMenu;
