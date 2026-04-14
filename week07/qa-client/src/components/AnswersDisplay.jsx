import {Row, Col, Table, Button} from "react-bootstrap"
import {ArrowUpSquare, Pencil, Trash, Plus} from "react-bootstrap-icons"


function AnswersTable (props){

    const answers = props.answers;

    return <Table >
        <thead >
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Text</th>
                <th scope="col">Author</th>
                <th scope="col">Score</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
                {answers.map((a)=><AnswerRow key ={a.id} a={a} upVote={props.upVote} delAnswer={props.delAnswer}></AnswerRow>)}
                <tr><td colspan='4'></td><td><Button variant='success'><Plus/></Button> <></></td></tr>
            </tbody>
    </Table>

}

function AnswerRow (props){
    const ans = props.a;
    return(
        <tr>
                <td>{ans.date.format('YYYY-MM-DD')}</td>
                <td>{ans.text}</td>
                <td>{ans.email}</td>
                <td>{ans.score}</td>
                <AnswerActionButtons answer={ans} upVote={props.upVote} delAnswer={props.delAnswer}/>
              </tr>
    )
}

function NewAnswerRow (props){
    return(
        <form>
        </form>
    )
}


function AnswerActionButtons(props) { 
    return <td>
        <Button variant='primary' onClick={()=>props.upVote(props.answer.id)}><ArrowUpSquare/></Button> <></>
        <Button variant='warning'><Pencil/></Button> <></>
        <Button variant='danger' onClick={()=>props.delAnswer(props.answer.id)}><Trash/></Button>
    </td>
}

function AnswersDisplay (props){

    return (
        <>
        <Row>
            <Col as='h2' className='text-start'>Answers:</Col>
            
        </Row>
        <Row>
            <AnswersTable answers={props.answers} upVote={props.upVote} delAnswer={props.delAnswer} ></AnswersTable>
        </Row>
        </>
    )

}

export default AnswersDisplay