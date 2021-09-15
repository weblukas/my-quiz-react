import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import EndScreen from './Components/EndScreen';
import Menu from './Components/Menu';
import Quiz from './Components/Quiz';
import {createContext} from 'react'
import { getDefaultNormalizer } from '@testing-library/react';

export const gameContext = createContext();
function App() {

  const [gameView, setGameView] = useState('start');
  const [quizData, setQuizData] = useState([])
  async function fetchData() {
    const url = 'https://opentdb.com/api.php?amount=10&type=multiple'

    try {
      const resp = await fetch(url)
      const data = await resp.json()
      
      // test 

      const formattedData = data.results.map((result)=>{
        
        const incorrectAnswersIndex = result.incorrect_answers.length;
        const randomIndex = Math.floor(Math.random() * (incorrectAnswersIndex +1))
        result.incorrect_answers.splice(randomIndex, 0 , result.correct_answer)

        return {
          question: result.question,
          allAnswers: result.incorrect_answers,
          correctAnswer: result.correct_answer
          
        }
        
      })
      setQuizData(formattedData)
      
    } catch (error) {
      alert('somethig goes wrong')
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

      
  return (
    <div className="App">
      <header className="App-header"> 
        <h1 className="heading">Quiz react</h1>
        <gameContext.Provider value={{gameView, setGameView}}>
          {gameView === 'start' ? <Menu /> : null}
          {gameView === 'quiz' ? <Quiz quizData={quizData}/> : null}
          {gameView === 'End' ? <EndScreen /> : null}
        </gameContext.Provider>
          
      </header>
    </div>
  );
}

export default App;
