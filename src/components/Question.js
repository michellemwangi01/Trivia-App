import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timeoutID;

    const countDown = () => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          onAnswered(false);
          return 10;
        } else {
          return prevTime - 1;
        }
      });
    };

    timeoutID = setTimeout(countDown, 1000);

    return function cleanup() {
      clearTimeout(timeoutID);
    };
  }, [timeRemaining]); 

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
