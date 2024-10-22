import React from "react";

function Option({ onChange }) {
  return (
    <div className=" absolute bg-black bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-xl  w-2/4 h-1/5 text-white flex items-center justify-around">
      <button
        onClick={() => onChange(1)}
        className=" bg-red-500 px-8 py-2 rounded-xl flex items-center justify-center"
      >
        <h1>ĐOÁN CHỮ CÁI</h1>
      </button>
      <button
        onClick={() => onChange(2)}
        className=" bg-blue-500 px-8 py-2 rounded-xl flex items-center justify-center"
      >
        <h1>TRẢ LỜI TOÀN BỘ</h1>
      </button>
    </div>
  );
}

export default Option;
