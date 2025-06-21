import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

/*
 * index: 0, we be used it to  take question out of the array. Changing the 
  index will change the question and then re-render tje screen. This is how 
  next qquestion is handle. FFor that reason it needs to be a state. 
 * status: "loading, error, ready, active, finished
 * status: state.secondsRemaining === 0 ? "finished" : state.status, if the 
   timer is equal to zero,  we set the status to finish and then it will trigger 
   the end of the game and render the FinishScreen. 

* secondsRemaining: state.questions.length * SECS_PER_QUESTION:
  O tempo total é calculado de acordo como numero de perguntas. 
  No início, nós nao sabemos ainda qual o tamanho do array de 
  perguntas (questions) já que ele nao foi carregado.
  Por isso, calculamos no case start, quando o array já está carregado e , portanto, 
  o seu length já está disponível. 

 */

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highestScore: 0,
  secondsRemaining: null,
  timeElapsed: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "dataFailed":
      return { ...state, status: "error" };

    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, answer: null, index: state.index + 1 };

    case "finish":
      return {
        ...state,
        status: "finished",
        highestScore:
          state.points > state.highestScore ? state.points : state.highestScore,
      };

    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        timeElapsed: 0,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        timeElapsed: state.timeElapsed + 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  //nested destructuring of initialState (state)
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highestScore,
      secondsRemaining,
      timeElapsed,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPoints = questions.reduce((acc, item) => acc + item.points, 0);

  // derived state
  const numQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  //for the time ellapsed:
  useEffect(() => {
    if (status !== "active") return;

    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000); //setInterval

    return () => clearInterval(id);
  }, [status, dispatch]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highestScore={highestScore}
            dispatch={dispatch}
            timeElapsed={timeElapsed}
          />
        )}
      </Main>
    </div>
  );
}
