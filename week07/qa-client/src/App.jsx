

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Question, Answer } from './models/QAModels.js'
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx'
import QuestionDisplay from './components/QuestionDisplay.jsx';
import AnswersDisplay from './components/AnswersDisplay.jsx'
import { useState } from 'react';


function App() {
  const fakeQuestion = new Question(1, 'how are you?', 'me@mail.com', 24, '2025-04-01')
  const fakeAnswers = []
  fakeAnswers.push( new Answer(10, 'ok', 'a@b.com', 100, '2025-04-01', 1) )
  fakeAnswers.push( new Answer(11, 'it crashes', 'c@b.com', 101, '2025-03-31') )

  const [question, setQuestion] = useState(fakeQuestion)
  const [answers, setAnswers] = useState(fakeAnswers)


  const upVote = (id) => {
    setAnswers( ans => ans.map( a => (a.id==id ? {...a, score: a.score+1} : a)))
  }

  const delAnswer = (id) => {
    setAnswers( ans => ans.filter( a => a.id != id)) 
  }

  return (
    <>
    <Header></Header>
    
    <QuestionDisplay question={question}></QuestionDisplay>
    
    <AnswersDisplay answers={answers} upVote={upVote} delAnswer={delAnswer}></AnswersDisplay>
    <Footer></Footer>
      
    </>
  )
}

export default App
