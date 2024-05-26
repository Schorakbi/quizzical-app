// App.jsx
import React from 'react';
import QA from "./components/QA";
import ReactLoading from "react-loading";
function App() {
  const [data, setData] = React.useState(null);
  const [gameStarted, setGameStarted] = React.useState(null);
  const [qaArray, setQaArray] = React.useState(null);
  const [check, setCheck] = React.useState(null);
  const [selectedAnswers, setSelectedAnswers] = React.useState(null);
  const [countCorrect, setCountCorrect] = React.useState(null);
  const [answers, setAnswers] = React.useState(null);
  const [done, setDone] = React.useState(true);
  React.useEffect(() => {
    if (data && data.length !== 0) {
      setAnswers(data.map((elem) => {
        
        const answers = [...elem.incorrect_answers, elem.correct_answer];
        const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
        return shuffledAnswers;
      }));
    }
  },[data]);
  React.useEffect(() => {
    if (answers && answers.length !== 0) {
      setQaArray(answers.map((shuffledAnswers, index) => {
        return (
          <QA
            key={index}
            index={index}
            question={data[index].question}
            correctAnswer={data[index].correct_answer}
            answers={shuffledAnswers}
            setSelectedAnswers={setSelectedAnswers}
            selectedAnswers={selectedAnswers}
            setCountCorrect={setCountCorrect} 
            check={check}
          />
        );
      }));      
    }
  },[selectedAnswers,answers,data,check])
  function startGame() {
    setDone(false);
    setGameStarted(false);
    setCheck(false);
    setCountCorrect(0);
    setSelectedAnswers(Array(10).fill(null));
    setTimeout(()=> {fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        setDone(true);
        setGameStarted(true);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        
      });
    },4000)
  }
  

  
  

  function checkAnswers() {
    if (selectedAnswers.every(elem => elem !== null)) {
      setCheck(true);
    }
    else {
      alert("You need to answer all questions")
    }
  }
  return (
    <>
      {!done ? (
        <div className='loading'>
          <div className="loading-content">
            <ReactLoading type={"bars"} color={"#03fc4e"} height={"100%"} width={"100%"} />
            <p>Generating a new quizz...</p>
          </div>
      </div>) :
        (<div>
        {gameStarted ? (
          <div>
            {qaArray}
            {check && (
              <div className="score">
                <p>You scored {countCorrect}/{data.length} correct answers.</p>
                <button onClick={startGame} className='start-button'>
                  Play Again
                </button>
              </div>
            )}
            {!check && (
              <div className="check-container">
                <button onClick={checkAnswers} className='check-button'>
                  Check Answers
                </button>
                
              </div>
            )}
          </div>
        ) : (
          <div className="start-quiz">
            <h1>Quizzical</h1>
            <p>Explore a mix of topics in our General Culture Quiz! From history and science to pop culture, test your well-rounded knowledge. Good luck!</p>
            <button onClick={startGame} className='start-button'>
              Start quiz
            </button>
          </div>
  
        )}
      </div>)
}
    </>
  );
        
}

export default App;
