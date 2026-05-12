import { Answer } from "../models/QAModels"

async function getQuestions() {
    try {
        const response = await fetch('http://localhost:3001/api/questions')

        if (response.ok) {
            const list_of_questions = await response.json()
            return list_of_questions
        } else {
            // 4xx or 5xx status code
            throw new Error('HTTP error in getQuestions, code=' + response.status)
        }
    } catch (ex) {
        // handle network errors + parsing errors
        throw new Error("Network error", { cause: ex })
    }
}

async function getAnswersByQuestionId(questionId) {
    try {
        const response = await fetch(`http://localhost:3001/api/questions/${questionId}/answers`)

        if (response.ok) {
            const list = await response.json()
            const ans_list = list.map(item => new Answer(item.id, item.text, item.author.email, item.author.id, item.date, item.score))
            return ans_list
        } else {
            // 4xx or 5xx status code
            throw new Error('HTTP error in getAnswersByQuestionId, code=' + response.status)
        }
    } catch (ex) {
        // handle network errors + parsing errors
        throw new Error("Network error", { cause: ex })
    }

}

async function upVoteAnswer(answerId) {
    try {
        const response = await fetch(`http://localhost:3001/api/answers/${answerId}/vote`, {
            method: 'POST',
            body: JSON.stringify({ vote: "up" }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (response.ok) {
            return true
        } else {
            throw new Error("UpVote failed with code " + response.status)
        }
    } catch (e) {
        throw new Error("Network error in upVote", { cause: e })
    }
}

async function deleteAnswer(answerId) {
    try {
        const response = await fetch(`http://localhost:3001/api/answers/${answerId}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        if (response.ok) {
            return true
        } else {
            throw new Error("deleteAnswer failed with code " + response.status)
        }
    } catch (e) {
        throw new Error("Network error in deleteAnswer", { cause: e })
    }
}

async function addAnswer(questionId, text) {
    try {
        const response = await fetch(`http://localhost:3001/api/questions/${questionId}/answers`, {
            method: 'POST',
            body: JSON.stringify({ text: text }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (response.ok) {
            return true
        } else {
            throw new Error("Error in addAnswer")
        }
    } catch (ex) {
        throw new Error("Network error in addAnswer")
    }

}

async function updateAnswer(answerId, text) {
    try {
        const response = await fetch(`http://localhost:3001/api/answers/${answerId}`, {
            method: 'PUT',
            body: JSON.stringify({ text: text }),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        if (response.ok) {
            return true
        } else {
            throw new Error("Error in updateAnswer")
        }
    } catch (ex) {
        throw new Error("Network error in updateAnswer")
    }

}



export { getQuestions, getAnswersByQuestionId, upVoteAnswer, deleteAnswer, addAnswer, updateAnswer }