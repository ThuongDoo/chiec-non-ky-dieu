import React, { useState } from "react";

function Typing({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  console.log(inputValue);
  return (
    <div className=" absolute  bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-xl text-white flex gap-x-6 items-center justify-around">
      <input
        type="text"
        id="name"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Nhập đáp án không dấu"
        className="w-full px-4 py-2 border border-gray-300 bg-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={() => onSubmit(inputValue)}
        className=" bg-blue-500 rounded-lg px-4 py-2 text-nowrap"
      >
        Xác nhận
      </button>
    </div>
  );
}

export default Typing;
