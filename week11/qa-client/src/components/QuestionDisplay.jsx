import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router';

function QuestionDisplay(props) {
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
                <Col as='h2' className='text-start' >{q.text}</Col>
            </Row>
        </Container>
    )
    //q.text
    //q.author
}

function QuestionsList(props) {
    return <Container>
        {props.questions.map(q => (
            <Row key={q.id}>
                <Col sm="2">Question {q.id}</Col>
                <Col sm="10"><Link to={`/answers/${q.id}`}>{q.text}</Link></Col>
            </Row>
        ))}
    </Container>
}

export { QuestionDisplay, QuestionsList };
