import React, { useEffect, useState, Component } from "react";
import LetterTile from "../components/LetterTile";
import keyboardJson from "../resources/keyboard.json";

import scoreSegment from "../resources/scoreSegment.json";
import { Wheel } from "react-custom-roulette";
import Alert from "../components/Alert";
import Option from "../components/Option";
import Keyboard from "../components/Keyboard";
import Typing from "../components/Typing";
import config from "../resources/config.json";
import wheelSegment from "../resources/wheelSegment.json";
import Player from "./Player";
import GameOver from "./GameOver";

function Mode({ questions }) {
  const [answers, setAnswer] = useState([]);
  const [keyboard, setKeyboard] = useState([]);
  const [hearts, setHearts] = useState(3);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isAlert, setIsAlert] = useState(false);
  const [isSpinDisplay, setIsSpinDisplay] = useState(false);
  const [prizePoint, setPrizePoint] = useState(0);
  const [isOptionDisplay, setIsOptionDisplay] = useState(false);
  const [point, setPoint] = useState(0);
  const [isKeyboardDisplay, setIsKeyboardDisplay] = useState(false);
  const [isTypingDisplay, setIsTypingDisplay] = useState(false);
  const [isLose, setIsLose] = useState(false);

  useEffect(() => {
    const newAnswers = splitAnswer(questions[0].answer).map((item) => {
      if (item === " ") {
        return {
          key: item,
          isSelect: true,
        };
      } else {
        return {
          key: item,
          isSelect: false,
        };
      }
    });

    setAnswer(newAnswers);
    const newKeyboard = keyboardJson.map((i) => {
      const newI = i.map((j) => {
        return { key: j, isSelect: false };
      });
      return newI;
    });
    setKeyboard(newKeyboard);

    setIsOptionDisplay(true);
  }, [questions, keyboardJson]);

  useEffect(() => {
    if (hearts <= 0) {
      setIsLose(true);
    }
  }, [hearts]);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * wheelSegment.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleStopSpin = () => {
    setMustSpin(false); // Đặt mustSpin về false
    setIsAlert(true); // Đặt isAlert về true
    setPrizePoint(wheelSegment[prizeNumber].option);
    const timer = setTimeout(() => {
      setIsAlert(false);
      setIsSpinDisplay(false);
      setIsKeyboardDisplay(true);
    }, config.spinDisplayDelay);

    // Cleanup timer nếu cần
    return () => clearTimeout(timer);
  };

  const handleOptionChange = (option) => {
    setIsOptionDisplay(false);

    if (option === 1) {
      const timer = setTimeout(() => {
        setIsSpinDisplay(true);
      }, config.spinDisplayDelay);

      return () => clearTimeout(timer);
    } else if (option === 2) {
      setIsTypingDisplay(true);
    }
  };

  const handleKeyBoardChange = (key) => {
    const updatedKeyboard = keyboard.map((row) =>
      row.map((item) => (item.key === key ? { ...item, isSelect: true } : item))
    );
    setKeyboard(updatedKeyboard);
    checkAnswer(key);

    setIsKeyboardDisplay(false);

    const timer = setTimeout(() => {
      setIsOptionDisplay(true);
    }, config.optionDisplayDelay);
    return () => clearTimeout(timer);
  };

  const handleTyping = (typingValue) => {
    setIsTypingDisplay(false);
    if (typingValue.toLowerCase() === questions[0].answer.toLowerCase()) {
      OpenAllLetter();
      const newPoint = point + 2000;
      setPoint(newPoint);
    } else {
      setHearts(0);
    }
  };

  const checkAnswer = (key) => {
    let newPoint = point;
    const updateAnswers = answers.map((answer) => {
      if (answer.key === key) {
        newPoint += prizePoint;
        return { ...answer, isSelect: true };
      } else {
        return { ...answer };
      }
    });
    if (newPoint === point) {
      const newHeart = hearts - 1;
      setHearts(newHeart);
    }
    setPoint(newPoint);

    setAnswer(updateAnswers);
  };

  const OpenAllLetter = () => {
    const newAnswers = answers.map((item) => {
      return {
        ...item,
        isSelect: true,
      };
    });
    setAnswer(newAnswers);
  };

  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <div className=" h-2/3 space-y-20 ">
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
      </div>
      <div className=" absolute right-0 top-0">
        <Player point={point} heart={hearts} />
      </div>
      {isSpinDisplay === true && (
        <div className="w-full h-full absolute top-0 right-0">
          <div className=" z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={wheelSegment}
              onStopSpinning={handleStopSpin}
            />
            <button
              className=" bg-black text-white px-8 py-2 rounded-xl z-50"
              onClick={handleSpinClick}
            >
              SPIN
            </button>
          </div>
          <div className=" absolute top-0 right-0 opacity-70 bg-black w-full h-full z-10"></div>
        </div>
      )}
      {isAlert === true ? (
        <div className="h-full w-full z-50 absolute">
          <Alert point={prizePoint} />
        </div>
      ) : isOptionDisplay === true ? (
        <div className="h-full w-full z-50 absolute">
          <Option onChange={handleOptionChange} />
        </div>
      ) : isKeyboardDisplay === true ? (
        <div className="h-full w-full z-50 absolute">
          <Keyboard data={keyboard} onChange={handleKeyBoardChange} />
        </div>
      ) : (
        isTypingDisplay === true && (
          <div className="h-full w-full z-50 absolute">
            <Typing onSubmit={handleTyping} />
          </div>
        )
      )}
      {isLose && (
        <div className=" z-50 w-full h-full absolute">
          <GameOver />
        </div>
      )}
    </div>
  );
}

export default Mode;

function splitAnswer(string) {
  return string.toUpperCase().split("");
}
