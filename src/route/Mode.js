import React, { useEffect, useState, Component } from "react";
import LetterTile from "../components/LetterTile";
import keyboardJson from "../resources/keyboard.json";

import scoreSegment from "../resources/scoreSegment.json";
import { Wheel } from "react-custom-roulette";
import Alert from "../components/Alert";
import Option from "../components/Option";
import Keyboard from "../components/Keyboard";
import Typing from "../components/Typing";

function Mode({ questions }) {
  const data = [{ option: 50 }, { option: 100 }, { option: 200 }];
  const [answers, setAnswer] = useState([]);
  const [keyboard, setKeyboard] = useState([]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isAlert, setIsAlert] = useState(false);
  const [pointGained, setPointGained] = useState(0);
  const [isOptionDisplay, setIsOptionDisplay] = useState(false);
  const [myOption, setMyOption] = useState(1);

  useEffect(() => {
    const newAnswers = splitAnswer(questions[0].answer).map((item) => {
      return {
        key: item,
        isSelect: false,
      };
    });
    setAnswer(newAnswers);
    const newKeyboard = keyboardJson.map((i) => {
      const newI = i.map((j) => {
        return { key: j, isSelect: false };
      });
      return newI;
    });
    setKeyboard(newKeyboard);
  }, [questions, keyboardJson]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleStopSpin = () => {
    setMustSpin(false); // Đặt mustSpin về false
    setIsAlert(true); // Đặt isAlert về true
    setIsOptionDisplay(true);
    // Sử dụng setTimeout để sau 3 giây đặt lại isAlert về false
    const timer = setTimeout(() => {
      setIsAlert(false);
    }, 3000);

    // Cleanup timer nếu cần
    return () => clearTimeout(timer);
  };

  const handleOptionChange = (option) => {
    setIsOptionDisplay(false);
    setMyOption(option);
  };

  const handleKeyBoardChange = (key) => {
    const updatedKeyboard = keyboard.map((row) =>
      row.map((item) => (item.key === key ? { ...item, isSelect: true } : item))
    );
    setKeyboard(updatedKeyboard);
    checkAnswer(key);
    setMyOption(0);
  };

  const checkAnswer = (key) => {
    const updateAnswers = answers.map((answer) => {
      if (answer.key === key) {
        return { ...answer, isSelect: true };
      } else {
        return { ...answer };
      }
    });
    setAnswer(updateAnswers);
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <h1 className=" text-5xl font-bold">{questions[0].ques}</h1>
      <div className=" flex ">
        {answers.map((answer, index) => (
          <LetterTile
            key={index}
            letter={answer.key}
            isSelect={answer.isSelect}
          />
        ))}
      </div>
      <div>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          onStopSpinning={handleStopSpin}
        />
        <button
          className=" bg-black text-white px-8 py-2 rounded-xl"
          onClick={handleSpinClick}
        >
          SPIN
        </button>
      </div>
      {isAlert === true ? (
        <div className="h-full w-full z-50 absolute">
          <Alert point={data[prizeNumber].option} />
        </div>
      ) : isOptionDisplay === true ? (
        <div className="h-full w-full z-50 absolute">
          <Option onChange={handleOptionChange} />
        </div>
      ) : myOption === 1 ? (
        <div className="h-full w-full z-50 absolute">
          <Keyboard data={keyboard} onChange={handleKeyBoardChange} />
        </div>
      ) : (
        myOption === 2 && (
          <div className="h-full w-full z-50 absolute">
            <Typing />
          </div>
        )
      )}
    </div>
  );
}

export default Mode;

function splitAnswer(string) {
  return string.toUpperCase().split("");
}
