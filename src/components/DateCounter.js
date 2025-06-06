import { useReducer } from "react";
// valores iniciais: count é o nº que aparece na tela sendo reduzido (-), aumentado(+) ou inserido pelo usuário.
// ja o step é a barra horizontal onde se seleciona o número desejado
const initialState = { count: 0, step: 1 }; //object que representa o ESTADO INICIAL
///////////////////////////////////////////////////////
function reducer(state, action) {
  switch (action.type) {
    // we need to set the step. But instead of writing it out explicity,
    // we spread out the entire current state object here ...state so we basically override
    // ...state contém os dados do objeto anterior que queremos sobescrever
    // state.step é o valor definido pelo usuário.. de 2 em 2, 4 em 4 etc
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return { initialState };
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state; // destructuring object 'state'

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: -1 }); // passing the action that contains the object and the value
  };

  //increment event handler
  const inc = function () {
    dispatch({ type: "inc", payload: 1 }); //This is the action in the reducer
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
    //setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) }); //converting to a number e.target.value
    //setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" }); // ñ precisamos passar nenhum dado. Por isso, ñ especificamos o payload. o faremos no switch
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
