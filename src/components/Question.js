import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div aria-describedby="questionInfo">
      <h4>{question.question}</h4>
      <span id="questionInfo" className="srOnly">
        Choose one of the options below. Only one answer can be selected.
      </span>
      <div>
        <Options question={question} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}

export default Question;
