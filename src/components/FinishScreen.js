function FinishScreen({ points, maxPoints, highestScore }) {
  const percentage = (points / maxPoints) * 100;
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
        <strong>
          {points} out of {maxPoints} ({Math.ceil(percentage)}%){" "}
          <span>{emoji}</span>
        </strong>
      </p>
      <p className="highscore">
        Highest Score so far: <span>{highestScore} points.</span>
      </p>
    </>
  );
}

export default FinishScreen;
