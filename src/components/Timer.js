import { useEffect } from "react";

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

* Antes da cleanup functio, toda vez  que o quiz era iniciado, um novo timer 
  era adicionado. Entao muitos times estava rodando ao mesmo tempo e 
  todos estavam dispatching a action type:'tick', o que fazia com que o 
  tempos diminuisse mais rápido que o normal. 
 */

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const sec = secondsRemaining % 60; // ???

  useEffect(
    function () {
      //As the component mounts, the timer will be initialized
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins}:{sec < 10 ? "0" + sec : sec}
    </div>
  );
}

export default Timer;
