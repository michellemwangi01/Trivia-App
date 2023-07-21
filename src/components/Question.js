import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(()=>{
    let timeoutID;

    const countDown = ()=>{
      setTimeRemaining((prevTime)=>{
        if(prevTime === 0){
          onAnswered(false)
          console.log(onAnswered);
          return 10
        }
        else{
          return prevTime -1
        }
  
       })
  
      }
    timeoutID = setTimeout(countDown, 1000)
    //countDown()
   
    return function cleanup(){
      clearTimeout(timeoutID)
    }
  ,[onAnswered]})

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

    // const timeoutID = setTimeout(()=>{
    //  setTimeRemaining((prevTime)=>{
    //   if(prevTime === 0){
    //     onAnswered(false)
    //     return 10
    //   }
    //   else{
    //     return prevTime -1
    //   }

    //  })

    // },1000)
