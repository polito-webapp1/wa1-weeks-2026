import { useContext, useState, useEffect } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { ArrowUpSquare, Pencil, Plus, Trash } from "react-bootstrap-icons";
import { useParams } from 'react-router';


import UserContext from "../contexts/UserContext";
import {getAnswersByQuestionId} from '../api/api'

function AnswersTable(props) {

    const answers = props.answers;
    const enableButtons = (props.mode == 'display')
    const [editedAnswer, setEditedAnswer] = useState();

    const user = useContext(UserContext)

    const enterEditMode = (answer) => {
        props.setMode('edit')
        setEditedAnswer(answer)
    }

    return <>
        <Table >
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
                {answers.map((a) => <AnswerRow key={a.id} a={a}
                    upVote={props.upVote} delAnswer={props.delAnswer}
                    enableButtons={enableButtons}
                    enterEditMode={enterEditMode}></AnswerRow>)}
                <tr><td colspan='4'></td>
                    <td><Button disabled={!enableButtons || !user.id}
                        variant='success' onClick={() => props.setMode('add')}><Plus /></Button> <></></td></tr>
            </tbody>
        </Table>
        {(props.mode == 'edit' || props.mode == 'add') && <AddOrEditAnswerForm key={editedAnswer?.id} goal={props.mode} editedAnswer={editedAnswer} addAnswer={props.addAnswer} updateAnswer={props.updateAnswer} setMode={props.setMode} />}
    </>

}

function AddOrEditAnswerForm(props) {

    const [text, setText] = useState(props.goal == 'edit' ? props.editedAnswer.text : '')

    const [error, setError] = useState("")

    // otherwise props?.editedAnswer?.text

    const submitAction = (event) => {

        setError("")

        event.preventDefault()

        // validate data

        // update the list of Answers in the main state
        try {
            if (props.goal == 'add')
                props.addAnswer(text)
            else
                props.updateAnswer(props.editedAnswer.id, text)

            // close the form
            props.setMode('display')

        } catch (err) {
            setError(err.message)
        }

    }

    return <>
        <div>{error}</div>
        <Form onSubmit={submitAction}>
            <Form.Group>
                <Form.Label>Answer text</Form.Label>
                <Form.Control type='text' placeholder="your answer" value={text} onChange={(e) => setText(e.target.value)}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                {props.goal == 'add' ? "Add" : "Update"}
            </Button>
            <Button type="cancel" onClick={() => props.setMode("display")}>
                Cancel
            </Button>
        </Form></>


}

function AnswerRow(props) {
    const ans = props.a;
    return (
        <tr>
            <td>{ans.date.format('YYYY-MM-DD')}</td>
            <td>{ans.text}</td>
            <td>{ans.email}</td>
            <td>{ans.score}</td>
            <AnswerActionButtons enterEditMode={props.enterEditMode} enableButtons={props.enableButtons} answer={ans} upVote={props.upVote} delAnswer={props.delAnswer} />
        </tr>
    )
}

function AnswerActionButtons(props) {

    const user = useContext(UserContext)


    return <td>
        <Button disabled={!props.enableButtons || !user.id || user.id == props.answer.userId}
            variant='primary' onClick={() => props.upVote(props.answer.id)}><ArrowUpSquare /></Button> <></>
        <Button disabled={!props.enableButtons || !user.id || user.id != props.answer.userId}
            variant='warning'><Pencil onClick={() => props.enterEditMode(props.answer)} /></Button> <></>
        <Button disabled={!props.enableButtons || !user.id || user.id != props.answer.userId}
            variant='danger' onClick={() => props.delAnswer(props.answer.id)}><Trash /></Button>
    </td>
}

function AnswersDisplay(props) {

    const [answers, setAnswers] = useState([])

    const [mode, setMode] = useState('display');

    const { questionId } = useParams()

    const [waiting, setWaiting] = useState(true)
    useEffect(() => {
        setWaiting(true)
        getAnswersByQuestionId(questionId)
            .then(answers => {
                setAnswers(answers)
                setWaiting(false)
            })
    }, [questionId])


    const my_answers = answers // all of them
    // const my_answers = props.answers.filter( ans => ans.questionId == questionId)

    if(waiting)
        return <h2>Please wait...</h2>
    return (
        <>
            <Row>
                <Col as='h2' className='text-start'>Answers for question {questionId}:</Col>
            </Row>
            <Row>
                <AnswersTable mode={mode} setMode={setMode} answers={my_answers} upVote={props.upVote} delAnswer={props.delAnswer} addAnswer={props.addAnswer} updateAnswer={props.updateAnswer}></AnswersTable>
            </Row>
        </>
    )

}

export default AnswersDisplay