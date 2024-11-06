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

function Game({ playerColors, playerNames, questions }) {
  const [activePlayer, setActivePlayer] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswer] = useState([]);
  const [keyboard, setKeyboard] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [points, setPoints] = useState([]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isAlert, setIsAlert] = useState(false);
  const [isSpinDisplay, setIsSpinDisplay] = useState(false);
  const [prizePoint, setPrizePoint] = useState(0);
  const [isOptionDisplay, setIsOptionDisplay] = useState(false);
  const [isKeyboardDisplay, setIsKeyboardDisplay] = useState(false);
  const [isTypingDisplay, setIsTypingDisplay] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    console.log(playerNames.length);
    setPoints(Array(playerNames.length).fill(0));
    setHearts(Array(playerNames.length).fill(3));
  }, [playerNames]);

  useEffect(() => {
    if (isNext === true) {
      const newAnswers = answers.map((item) => {
        return {
          ...item,
          isSelect: true,
        };
      });
      setAnswer(newAnswers);
    }
    const timer = setTimeout(() => {
      if (isNext === true) {
        setActiveQuestion(activeQuestion + 1);

        const newAnswers = splitAnswer(
          questions[activeQuestion + 1].answer
        ).map((item) => {
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
      }
      setIsNext(false);
    }, config.correctDisplayDelay);

    // Cleanup timer nếu cần
    return () => clearTimeout(timer);
  }, [isNext, +1]);

  useEffect(() => {
    const newAnswers = splitAnswer(questions[activeQuestion].answer).map(
      (item) => {
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
      }
    );

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
    if (
      typingValue.toLowerCase() ===
      questions[activeQuestion].answer.toLowerCase()
    ) {
      let newPoint = points;
      newPoint[activePlayer] += 2000;
      setPoints(newPoint);
      setIsNext(true);
    } else {
      let newHearts = hearts;
      newHearts[activePlayer] = 0;
      setHearts(newHearts);
      changePlayer();
    }
    const timer = setTimeout(() => {
      setIsOptionDisplay(true);
    }, config.optionDisplayDelay);
    return () => clearTimeout(timer);
  };

  const changePlayer = () => {
    let nextIndex = activePlayer;
    let found = false;

    for (let i = 0; i < playerNames.length; i++) {
      nextIndex = (nextIndex + 1) % playerNames.length;
      if (hearts[nextIndex] !== 0) {
        found = true;
        setActivePlayer(nextIndex);
        break;
      }
    }

    if (!found) {
      setIsLose(true);
    }
  };

  const checkAnswer = (key) => {
    let newPoint = points;
    const updateAnswers = answers.map((answer) => {
      if (answer.key === key) {
        newPoint[activePlayer] += prizePoint;
        return { ...answer, isSelect: true };
      } else {
        return { ...answer };
      }
    });
    if (newPoint[activePlayer] === points[activePlayer]) {
      let newHeart = hearts;
      newHeart[activePlayer] -= 1;
      setHearts(newHeart);
    }
    setPoints(newPoint);
    setAnswer(updateAnswers);
    const areAllSelected = updateAnswers.every((item) => item.select === true);
    if (areAllSelected === true) {
      setIsNext(true);
    } else {
      changePlayer();
    }
  };

  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <div className=" h-2/3 space-y-20 ">
        <h1 className=" text-5xl font-bold">
          {questions[activeQuestion].ques}
        </h1>
        <div className=" flex ">
          {answers.map(
            (answer, index) =>
              answer.key !== " " && (
                <LetterTile
                  key={index}
                  letter={answer.key}
                  isSelect={answer.isSelect}
                />
              )
          )}
        </div>
      </div>
      <div className=" absolute right-0 top-0 flex flex-col  h-full justify-between items-end py-10">
        {playerNames.map((player, index) => (
          <div
            className={`${activePlayer === index ? " w-52" : ""}`}
            key={index}
          >
            <Player
              point={points[index]}
              heart={hearts[index]}
              color={playerColors[index]}
              name={playerNames[index]}
            />
          </div>
        ))}
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
        <div className="h-full w-full z-50 absolute ">
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

export default Game;

function splitAnswer(string) {
  return string.toUpperCase().split("");
}
