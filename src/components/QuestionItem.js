import React from "react";

function QuestionItem({ question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDelete = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  const handleUpdate = (event) => {
    const newIndex = parseInt(event.target.value);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: newIndex,
      }),
    }).then((res) => res.json());
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdate}>
          {options}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
