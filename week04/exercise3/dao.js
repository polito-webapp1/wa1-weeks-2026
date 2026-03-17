import sqlite from 'sqlite3'

import {Question} from './entities.js'

const db = new sqlite.Database('questions.sqlite')

function getUsers() {
    return new Promise( (resolve, reject) => {
        db.all('SELECT * FROM user', (err, rows) => {
            if(err) reject(err)
            else resolve(rows)
        })
    })    
}

/**
 * Retrieves the list of all Question objects from the QUESTION table
 * @returns {Promise<Array<Question>>} a Promise resolving to an array of Question objects
 */
function getQuestions() {
    return new Promise( (resolve, reject) => {
        const sql = 'SELECTss id, text, authorId, date FROM question' ;
        db.all(sql, (err, rows) => {
            if(err) {
                reject(err)
            } else {
                resolve( rows.map( item => new Question(item.id, item.text, item.authorId, item.date)))
            }
        })
    })
}

/**
 * Retrieve a Question given its `id`
 * @param {number} id 
 * @returns {Promise<Question>}
 */
function getQuestion(id) {
    return new Promise( (resolve, reject) => {
        const sql = 'SELECT id, text, authorId, date FROM question WHERE id=?' ;
        db.get(sql, [id], (err, row) => {
            if(err) {
                reject(err)
            } else {
                if (row) { // the question exists
                resolve(new Question(row.id, row.text, row.authorId, row.date))
             } else {
                // row is undefined
                reject( new Error("No such question ID") )
             }
            }
        })
    })
}

/**
 * Adds a new question to the database
 * @param {Question} question 
 * @returns {Promise<number>} `id` of the newly added question
 */
function addQuestion(question) {

    return new Promise( (resolve, reject) => {
        const sql= "INSERT INTO QUESTION(text, authorid, date) VALUES (?,?,?)"
        db.run(sql, [question.text, question.author, question.date.format('YYYY-MM-DD')], function(err) {
            if(err)
                reject(err)
            else
                resolve(this.lastID)
         })
    })
}


export {getUsers, getQuestions, getQuestion, addQuestion}