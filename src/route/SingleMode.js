import React, { useEffect, useState } from "react";
import Mode from "./Mode";
import questions from "../resources/questions";

function SingleMode() {
  const [shuffleQuestions, setShuffleQuestions] = useState(
    shuffleArray(questions)
  );

  useEffect(() => {
    setShuffleQuestions(shuffleArray(questions));
  }, [questions]);

  return (
    <div>
      <Mode questions={shuffleQuestions} />
    </div>
  );
}

export default SingleMode;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Đổi chỗ 2 phần tử
  }
  return array;
}
