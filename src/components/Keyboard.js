import React from "react";

function Keyboard({ data, onChange }) {
  console.log(data);
  return (
    <div className=" absolute  bg-black bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white h-fit flex flex-col items-center justify-center  rounded-xl px-8 py-4">
      {data.map((row, index) => (
        <div className=" flex" key={index}>
          {row.map((item, itemIndex) => (
            <button
              className={`${
                item.isSelect === true ? "bg-gray-500" : "bg-blue-500"
              } px-2 py-2 mx-2 my-2 rounded-lg`}
              disabled={item.isSelect}
              onClick={() => {
                onChange(item.key);
              }}
              key={itemIndex}
            >
              {item.key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
