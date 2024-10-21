import React from "react";

function Alert({ point }) {
  return (
    <div className="absolute  bg-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/5 text-white flex items-center justify-center">
      <h1 className=" text-5xl font-bold">{point}</h1>
    </div>
  );
}

export default Alert;
