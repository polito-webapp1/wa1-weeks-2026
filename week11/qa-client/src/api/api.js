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

export { getQuestions, getAnswersByQuestionId, upVoteAnswer }