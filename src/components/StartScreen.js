function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h3>{numQuestions} question to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}>
        Lest's Start
      </button>
    </div>
  );
}

export default StartScreen;
