import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const min = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60;

  // useEffect(
  //   function () {
  //     const id = setInterval(function () {
  //       dispatch({ type: "tick" });
  //     }, 1000);
  //     return () => clearInterval(id);
  //   },
  //   [dispatch]
  // );

  return (
    <div className="timer" aria-live="polite">
      {min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}
      {/** For accessibility purposes */}
      {secondsRemaining === 10 && (
        <span aria-live="assertive" className="srOnly">
          Only 10 seconds left!
        </span>
      )}
    </div>
  );
}

export default Timer;

/*
 * Creating a side effect on mount. Each time this component mounts,
   the timer will be initialized
 * We need a state value to be decreased every second:
 * dispatch({ type: "tick" }) means that each 1000 miliseconds useEffect 
   will dispatch the action type: "tick" and then secondsRemaining will 
   be decreased by 1

 * const id = setInterval ... we need to store the id that is returned by 
   the setInterval method so we can then use in the cleanUp function that is 
   returned in the useEffect.

   Every single setInterval timer will return an unique id. 

*/
