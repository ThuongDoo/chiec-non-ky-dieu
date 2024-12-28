import React, { useState } from "react";
import bgImg from "../resources/bgmainmenu.png";

function MainMenu({ routes, onNavigate }) {
  const [password, setPassword] = useState("123456");
  const [nextRoute, setNextRoute] = useState("");
  const [isPsswordConfirm, setIsPsswordConfirm] = useState(false);

  const PasswordConfirm = () => {
    const [inputValue, setInputValue] = useState(""); // Khởi tạo state

    // Hàm xử lý khi nội dung input thay đổi
    const handleChange = (event) => {
      setInputValue(event.target.value); // Cập nhật giá trị từ input
    };

    // Hàm xử lý khi form được submit
    const handleSubmit = (event) => {
      event.preventDefault(); // Ngăn không cho form reload trang

      if (inputValue === password) {
        onNavigate({ route: nextRoute });
      } else {
        alert("Sai Mật Khẩu");
      }
    };
    return (
      <div className=" absolute h-full w-full  flex items-center justify-center">
        <div className=" bg-white relative rounded-xl">
          <h1
            className=" font-bold text-red-500 absolute right-2 cursor-pointer"
            onClick={() => {
              setIsPsswordConfirm(false);
            }}
          >
            X
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 mx-4 my-6">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="border rounded px-3 py-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div className=" flex flex-col">
      <div className=" absolute  h-full w-full bg-blue-500 -z-10">
        <img src={bgImg} alt="" className=" h-full w-full"></img>
      </div>
      <div className="  flex flex-col items-center justify-center gap-y-20 w-full h-screen ">
        <div>
          <h1 className=" text-9xl font-bold text-black bg-yellow-500 px-8 py-4 shadow-black shadow-xl">
            Chiếc Nón Kỳ Diệu
          </h1>
        </div>
        <div className=" grid grid-cols-2 gap-x-10 gap-y-10 w-fit ">
          <h1
            className=" bg-yellow-600 border border-yellow-500 text-5xl px-16 hover:bg-yellow-400 py-5 cursor-pointer rounded-xl"
            onClick={() => {
              onNavigate({ route: routes.select });
            }}
          >
            Chơi
          </h1>
          <h1
            className=" bg-yellow-600 border border-yellow-500 text-5xl px-16 hover:bg-yellow-400 py-5 cursor-pointer rounded-xl"
            onClick={() => {
              onNavigate({ route: routes.guide });
            }}
          >
            Hướng dẫn
          </h1>
          <h1
            className=" bg-yellow-600 border border-yellow-500 text-5xl px-16 hover:bg-yellow-400 py-5 cursor-pointer rounded-xl"
            onClick={() => {
              setNextRoute(routes.ques);
              // onNavigate({ route: routes.ques });
              setIsPsswordConfirm(true);
            }}
          >
            Bảng câu hỏi
          </h1>
          <h1
            className=" bg-yellow-600 border border-yellow-500 text-5xl px-16 hover:bg-yellow-400 py-5 cursor-pointer rounded-xl"
            onClick={() => {
              setNextRoute(routes.scoreBoard);
              setIsPsswordConfirm(true);

              // onNavigate({ route: routes.scoreBoard });
            }}
          >
            Bảng điểm
          </h1>
        </div>
      </div>
      {isPsswordConfirm && <PasswordConfirm />}
    </div>
  );
}

export default MainMenu;
