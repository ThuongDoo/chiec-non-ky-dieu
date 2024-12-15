import React, { useEffect, useState } from "react";
import api from "../util/api";

const Ques = ({ onNavigate, routes }) => {
  const [questions, setQuestions] = useState([]); // Lưu danh sách câu hỏi
  const [currentQuestion, setCurrentQuestion] = useState({
    ques: "",
    answer: "",
  }); // Trạng thái cho câu hỏi đang chỉnh sửa hoặc thêm mới
  const [editingIndex, setEditingIndex] = useState(null); // Chỉ mục câu hỏi đang chỉnh sửa
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await api
        .get("ques")
        .then((res) => {
          console.log(res.data);
          setQuestions(res.data.questions);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchData();
  }, [onNavigate]);

  const handleSaveQuestion = (e) => {
    e.preventDefault();

    const { ques, answer } = currentQuestion;

    // Kiểm tra các điều kiện:
    if (!ques.trim()) {
      setError("Câu hỏi không được để trống.");
      return;
    }

    if (!answer.trim()) {
      setError("Câu trả lời đúng không được để trống.");
      return;
    }

    setError("");

    if (editingIndex !== null) {
      // Nếu đang chỉnh sửa câu hỏi
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = currentQuestion;
      setQuestions(updatedQuestions);
    } else {
      // Thêm câu hỏi mới
      setQuestions([...questions, currentQuestion]);
    }

    // Reset form
    setCurrentQuestion({
      ques: "",
      answer: "",
    });
    setEditingIndex(null);
  };

  const handleEditQuestion = (index) => {
    setCurrentQuestion(questions[index]);
    setEditingIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveToBackend = async () => {
    console.log(questions);

    await api
      .post("ques", { questions })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="p-6 bg-yellow-300 min-h-screen">
      <div className="flex justify-between items-center mb-6 ">
        <button
          className=" bg-yellow-500 text-black font-bold text-xl px-12 py-4 rounded-xl"
          onClick={() => onNavigate({ route: routes.mainMenu })}
        >
          MENU
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Quản lý câu hỏi tự luận
        </h1>
        <button
          className=" bg-yellow-500 text-black font-bold text-xl px-12 py-4 rounded-xl"
          onClick={() => {
            handleSaveToBackend();
          }}
        >
          LƯU
        </button>
      </div>

      {/* Danh sách câu hỏi */}
      <div className="bg-white p-6 shadow rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Danh sách câu hỏi
        </h2>
        {questions.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">
            Chưa có câu hỏi nào.
          </p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg bg-gray-100 shadow-sm"
              >
                <p className="text-lg font-medium text-gray-800">
                  <strong>Câu hỏi {index + 1}:</strong> {q.ques}
                </p>
                <p className="text-gray-700 mt-2">
                  <strong>Đáp án đúng:</strong> {q.answer}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => handleEditQuestion(index)}
                    className="text-blue-600 font-semibold hover:underline mr-4"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form tạo/chỉnh sửa câu hỏi */}
      <form
        onSubmit={handleSaveQuestion}
        className="bg-white p-6 shadow rounded-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          {editingIndex !== null ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi mới"}
        </h2>
        <div className="mb-6">
          <label className="block font-bold text-gray-600 mb-2">Câu hỏi:</label>
          <textarea
            value={currentQuestion.ques}
            onChange={(e) =>
              setCurrentQuestion({ ...currentQuestion, ques: e.target.value })
            }
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Nhập câu hỏi"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block font-bold text-gray-600 mb-2">
            Câu trả lời đúng:
          </label>
          <textarea
            value={currentQuestion.answer}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                answer: e.target.value.toUpperCase(), // Chuyển thành in hoa
              })
            }
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
            rows="2"
            placeholder="Nhập câu trả lời đúng"
          ></textarea>
        </div>

        {error && <p className="text-red-500 mb-6">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600"
        >
          {editingIndex !== null ? "Lưu câu hỏi" : "Thêm câu hỏi"}
        </button>
      </form>
    </div>
  );
};

export default Ques;
