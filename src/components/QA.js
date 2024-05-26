import React, { useEffect } from "react";
import DOMPurify from "dompurify";

function QA(props) {
  useEffect(() => {
    if (props.check) {
      const currentAnswer = props.answers[props.selectedAnswers[props.index]];
      if (currentAnswer === props.correctAnswer) {
        props.setCountCorrect((prevCountCorrect) => prevCountCorrect + 1);
      }
    }
  }, [props]);

  function handleAnswerClick(index) {
    if (!props.check) {
      props.setSelectedAnswers((prevSelectedAnswers) => {
        const updatedArray = [...prevSelectedAnswers];
  
        updatedArray[props.index] = updatedArray[props.index] === index ? null : index;
  
        return updatedArray;
      });
    }
  }

  return (
    <div className="container">
      <div className="game">
        <h1 className="question" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.question) }}></h1>
        <div className="answers">
          {props.answers.map((answer, index) => (
            <button
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer) }}
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={getClassNames(props, answer)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

function getClassNames(props, currentAnswer) {
  if (!props.check) {
    return props.selectedAnswers && props.selectedAnswers[props.index] === props.answers.indexOf(currentAnswer)
      ? "selected"
      : "";
  } else {
    return props.answers[props.selectedAnswers[props.index]] === currentAnswer
      ? props.correctAnswer === currentAnswer
        ? "correct-answer no-hover"
        : "disabled wrong-answer no-hover"
      : currentAnswer === props.correctAnswer ? "correct-answer no-hover" : "disabled no-hover";
  }
}


export default QA;
