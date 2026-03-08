import dayjs from 'dayjs'
import sqlite from 'sqlite3'

// Constructor functions matching database tables

function User(id, name, email) {
    this.id = id
    this.name = name
    this.email = email
}

function Answer(id, text, author, date, score = 0) {
    thid.id = id;
    this.text = text;
    this.author = author;
    this.date = dayjs(date);
    this.score = score;

    this.vote = undefined
}

function Question(id, text, author, date) {
    this.text = text;
    this.author = author;
    this.date = dayjs(date);

    this.getAnswers = undefined
    this.addAnswer = undefined
}

// For managing lists of questions

function QuestionList() {
    this.addQuestion = undefined
    this.getQuestion = undefined
}

export { User, Question, QuestionList, Answer }