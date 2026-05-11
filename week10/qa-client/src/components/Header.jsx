import { useContext } from "react"
import { Button, Container, Navbar } from "react-bootstrap"
import { Link, Links, useNavigate } from 'react-router'

import UserContext from "../contexts/UserContext"

function Header(props) {

  const user = useContext(UserContext)

  const destination = user.id ? '/home' : '/'

  return (
    <Navbar bg='info' >
      <Container fluid>
        <h1 style={{ color: 'white' }} ><Link to={destination}>HeapOverrun</Link></h1>
        <div>{user.name ? <UserInfo name={user.name}/> : <LoginButton/>}</div>
      </Container>
    </Navbar>)
}

function LoginButton(props) {
  const navigate = useNavigate()

  return <Button onClick={() => navigate('/login')}>Log In</Button>
}

function UserInfo(props) {
  return <div>
    <div>{props.name}</div>
    <div><Link to='/logout'>Logout</Link></div>
  </div>
}

export default Header