function FinishScreen({
  points,
  maxPoints,
  highestScore,
  dispatch,
  timeElapsed,
}) {
  const percentage = (points / maxPoints) * 100;
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage > 0 && percentage < 50) emoji = "🎉";
  if (percentage === 0) emoji = "🤦🏽‍♂️";
  return (
    <>
      <p className="result">
        You scored&nbsp;
        <strong className="score">{points}</strong> / {maxPoints} (
        {Math.ceil(percentage)}%) <span>{emoji}</span>
      </p>
      <p className="timeElapsed">
        It took you{" "}
        <strong>
          {minutes}:{seconds}
        </strong>{" "}
        to complete the quiz.
      </p>
      <p className="highscore">
        Highest score so far: <span>{highestScore} points.</span>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
