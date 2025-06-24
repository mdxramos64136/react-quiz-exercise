//Also need to pass the answer state here as it will determine if the button
// will be rendered or not.
// Button will only be shown if there is an answer
function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return;

  if (index < numQuestions - 1) {
    return (
      <button
        type="button"
        className="btn btn-ui btnNext"
        onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}>
        Finish
      </button>
    );
  }
}

export default NextButton;
