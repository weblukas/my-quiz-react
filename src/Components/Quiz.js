import React, { useState } from 'react'
import './Quiz.css'

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

const Answer = ({id, children, onClick, className}) => {
    const [disable, setDisable] = useState(false)
    return(
    <button disabled={disable} className={`answer-btn ${className}`} id={id}
onClick={onClick}>{children}</button>)
}
function Quiz({quizData}) {
    const [index, setIndex] = useState(0);
    const {question, correctAnswer} = quizData[index]
    
    
    // const [answerColor, setAnswerColor] = useState("rgb(78, 146, 223)")
    const [isCorrect, setIsCorrect] = useState(false);
    const [wasAnswerSelected, setWasAnswerSelected] = useState(false)


    const allAnswers = quizData[index].allAnswers.map(str => str);

    const correctAnswerId = allAnswers.indexOf(correctAnswer);
    
    console.log(quizData);

    function nextQuestion(){
        setIndex((index) => {
            let newIndex = index +1 

            return newIndex
        })
    }

    // function checkAnswer(e) {
    //     const chosenAnswer = e.target.innerHTML
        
    //     if(chosenAnswer == correctAnswer){
            
    //         setAnswerColor("rgb(88, 189, 20)")
            
    //     } else {
    //         setAnswerColor("rgb(216, 29, 66)")
    //     }
        
    // }

    const handleAnswer = (e)=>{
       setWasAnswerSelected(e.target.id);
       const isCorrect = e.target.id === `answer-${correctAnswerId}`;
       setIsCorrect(isCorrect);
       return 
    }

    
    return (
        <div>
            <h2>{renderHTML(question)}</h2>

            {allAnswers.map((answer, i)=> {
                const currentWasClicked = wasAnswerSelected === `answer-${i}`; // czy zostala kliknieta TA odpowiedz
                const isCorrect = i === correctAnswerId; // czy ta odp. jest poprawna
                

                // currentWasClicked - jeżeli był klik ? to jeżeli poprawny to className 'anzwer-correct' a jeżeli nie to 'answer-incorrect' 
                // 
                const className = currentWasClicked ? (
                    isCorrect ? 'answer-correct' : 'answer-incorrect' 
                ) : 'default-answer-color'; 
                return <Answer id={`answer-${i}`} className={className}  onClick={handleAnswer}>{answer}</Answer>
            })}

            {/* <div className='answer-btn' style={{backgroundColor: answerColor}}
            onClick={checkAnswer}>{allAnswers[0]}</div>
            <div className='answer-btn' style={{backgroundColor: answerColor}}
            onClick={checkAnswer}>{allAnswers[1]}</div>
            <div className='answer-btn' style={{backgroundColor: answerColor}} 
            onClick={checkAnswer}>{allAnswers[2]}</div>
            <div className='answer-btn' style={{backgroundColor: answerColor}}
            onClick={checkAnswer}>{allAnswers[3]}</div> */}
            
            <button className='next-question-btn' 
            onClick={nextQuestion}>next question</button>
        </div>

    )
}

export default Quiz
