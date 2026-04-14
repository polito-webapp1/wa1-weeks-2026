import { Navbar, Container } from "react-bootstrap"

function Header (){

return(

    <Navbar bg="primary">
        <Container fluid>
          <h1 style={{color: 'white'}} >HeapOverrun </h1>
        </Container>
      </Navbar>)
}


export default Header