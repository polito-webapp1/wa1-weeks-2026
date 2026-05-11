

import 'bootstrap/dist/css/bootstrap.min.css';

import dayjs from 'dayjs';

import { useContext, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router';

import AnswersDisplay from './components/AnswersDisplay.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import { QuestionsList } from './components/QuestionDisplay.jsx';
import { LoginForm, Logout } from './components/LoginForm.jsx';

import UserContext from './contexts/UserContext.js';

import { Answer, Question } from './models/QAModels.js';
import { getQuestions } from './api/api.js';

function App() {
  const fakeAnswers = []
  fakeAnswers.push(new Answer(10, 'ok', 'a@b.com', 100, '2025-04-01', 1))
  fakeAnswers.push(new Answer(11, 'it crashes', 'c@b.com', 101, '2025-03-31'))

  const [answers, setAnswers] = useState(fakeAnswers)


  const [questions, setQuestions] = useState([])

  const navigate = useNavigate()

  // read the full list of questions at application startup (when App mounts)
  useEffect( ()=>{
    async function getQuestionList() {
      try {
      const list_of_questions = await getQuestions()
      setQuestions(list_of_questions)
      } catch(ex) {
        // navigate away, and/or write a message , ...
        navigate('/error')
      }
    }
    getQuestionList()
    }, [] )


  // Currently logged-in user
  const [user, setUser] = useState({ id: undefined, email: undefined, name: undefined })

  const doLogin = (newUser) => {
    setUser({ id: newUser.id, email: newUser.username, name: newUser.name })
    navigate('/home')
  }

  const upVote = (id) => {
    setAnswers(ans => ans.map(a => (a.id == id ? { ...a, score: a.score + 1 } : a)))
  }

  const delAnswer = (id) => {
    setAnswers(ans => ans.filter(a => a.id != id))
  }

  const addAnswer = (text) => {

    if (user.id == undefined) {
      throw new Error("No User ID")
    }
    const newId = Math.max(...answers.map(a => a.id)) + 1

    const ans = new Answer(
      newId, // the ID must be assigned by whoever is managing the list
      text, // coming from the user (the form)
      user.email, // must come from user login
      user.id, // userId -> from login
      dayjs(), // date: today
      0 // score
    )

    setAnswers((oldAnswers) => [...oldAnswers, ans])
  }

  const updateAnswer = (id, text) => {

    setAnswers(oldAnswers => oldAnswers.map(ans => ans.id != id ? ans : { ...ans, text: text }))

  }

  return (
    <UserContext.Provider value={user}>
      <Container>
        <Routes>
          <Route path='/' element={<MainLayout doLogin={doLogin} />}>
            <Route index element={<LoginView />} />
            <Route path='home' element={<HomeView questions={questions} />} />
            <Route path='answers/:questionId' element={<AnswersDisplay />} />
            {/* <Route path='answers/:questionId/new' element={<AddAnswerForm/>}/> */}
            <Route path='login' element={<LoginForm doLogin={doLogin}/>}/>
            <Route path='logout' element={<Logout doLogin={doLogin}/>}/>
            <Route path='error' element={<h1>"Something is Wrong"</h1>}/>
          </Route>
        </Routes>
      </Container>
    </UserContext.Provider>
  )
}

function MainLayout(props) {
  return <>
    <Header doLogin={props.doLogin}></Header>
    <Outlet />
    <Footer></Footer>
  </>
}

function LoginView(props) {

  // if user.id is not undefined, navigate to /home
  const user = useContext(UserContext)
  if (user.id)
    return <Navigate to='/home' />

  return "Login View : main welcome page for anonymous users"
}

function HomeView(props) {

  // if user.id is not defined, navigate to /
  const user = useContext(UserContext)

  // if you want to navigate "away", just render a Navigate component
  if (!user.id)
    return <Navigate to='/' />

  // otherwise render normal page content
  return <QuestionsList questions={props.questions} />
}




export default App


// <Header doLogin={doLogin}></Header>

// <QuestionDisplay question={question}></QuestionDisplay>

// <AnswersDisplay answers={answers} upVote={upVote} delAnswer={delAnswer} addAnswer={addAnswer} updateAnswer={updateAnswer}></AnswersDisplay>
// {/* <Footer></Footer> */}


