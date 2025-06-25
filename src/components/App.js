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
 */

const SECS_PER_QUESTION = 30;

//Shuffling the questions:
function getRandomQuestions(allQuestions, userChoice) {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, userChoice);
}

const initialState = {
  allQuestions: [],
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
      return { ...state, allQuestions: action.payload, status: "ready" };

    case "start":
      const getQuestions = getRandomQuestions(
        state.allQuestions,
        action.payload
      );
      return {
        ...state,
        status: "active",
        questions: getQuestions,
        secondsRemaining: action.payload * SECS_PER_QUESTION,
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
        allQuestions: state.allQuestions,
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
      allQuestions,
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
  const numQuestions = allQuestions.length;

  useEffect(function () {
    //fetch("http://localhost:8000/questions")
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.questions })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  useEffect(() => {
    if (status !== "active") return;

    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000); //setInterval

    return () => clearInterval(id);
  }, [status, dispatch]);

  return (
    <div className="app">
      {status === "active" || <Header />}
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <div className="quiz-logo">
              <img src="logo512.png" alt="React logo" className="logo" />
            </div>
            <Progress
              index={index}
              numQuestions={questions.length}
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
                numQuestions={questions.length}
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
