import React, { useState } from "react";

function StartScreen({ numQuestions, dispatch }) {
  const [userChoice, setUserChoice] = useState(null);

  const handleClick = (value) => setUserChoice(value);

  return (
    <div className="start">
      <h3>{numQuestions} question to test your React mastery</h3>
      <div>
        <h4>How many question do you want to answer?</h4>
        <div className="btnGroup" role="group" aria-label="Number of questions">
          {[15, 30, 45, 60].map((num) => (
            <button
              aria-pressed={userChoice === num}
              type="button"
              key={num}
              className={`btn-user-option ${
                userChoice === num ? "btnSelected" : ""
              } `}
              value={num}
              onClick={() => handleClick(num)}>
              {num}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="btn btn-ui btnStart"
        onClick={() => dispatch({ type: "start", payload: userChoice })}
        disabled={userChoice === null}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
