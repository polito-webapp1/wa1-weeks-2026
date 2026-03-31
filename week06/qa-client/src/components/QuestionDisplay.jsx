import {Container, Row, Col} from 'react-bootstrap';

function QuestionDisplay (props){
    const q = props.question;

    return (
        <Container fluid>
        <Row>
            <Col as='h1' className='text-start'>
            Question: {q.id}
            </Col>
            <Col className='text-end'>
            {q.email}
            </Col>
        </Row>
        <Row>
            <Col as ='h2' className='text-start' >{q.text}</Col>
        </Row>
        </Container>
    )
   //q.text
   //q.author
}

export default QuestionDisplay