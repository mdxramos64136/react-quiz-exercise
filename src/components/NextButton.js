//Also need to pass the answer state here as it will determine if the button
// will be rendered or not.
function NextButton({ dispatch, answer }) {
  //If there isn't an answer, return nothing...
  if (answer === null) return;

  // ... otherwise,return the button
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}>
      Next
    </button>
  );
}

export default NextButton;
