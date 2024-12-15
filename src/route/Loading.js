import React, { useEffect, useState } from "react";
import api from "../util/api";

function Loading() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("ques")
        .then((res) => {
          setQuestions(res.data.questions);
        })
        .catch((e) => console.log(e));
    };
    fetchData();
  }, []);
  console.log(questions);

  return <div>Loading</div>;
}

export default Loading;
