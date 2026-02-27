//const dayjs = require('dayjs')
import dayjs from 'dayjs' 


function Answer (text, userId, date, score=0){
    this.text = text;
    this.userId = userId;
    this.date = dayjs(date);
    this.score = score;

}

function Question (text, userId, date){
    this.text = text;
    this.userId = userId;
    this.date = dayjs(date);
    this.answers = [];

    this.addAnswer = (ans) => {
        this.answers.push(ans);
    }

    this.getAnswers = (userId) =>{
        const userAnswers = [];
        for (const ans of this.answers ){
            if (ans.userId === userId){
                userAnswers.push(ans);
            }
        }
        return userAnswers;
    }


    this.afterDate = (date) => {
        const afterDateAnswers = [];
        for (const ans of this.answers){
            if (ans.date.isAfter(date)){
                afterDateAnswers.push(ans);
            }
        }
        return afterDateAnswers;
    }
}


const q1 = new Question("How long is this exercise?", 1, "2026-02-27");
console.log(q1);

const a1 = new Answer("too much", 2, "2026-02-27");
const a2 = new Answer("10 minutes", 3, "2026-02-27");
const a3 = new Answer("15 minutes", 2, "2026-02-27");
const a4 = new Answer("30 minutes", 2, "2026-02-26");


q1.addAnswer(a1);
q1.addAnswer(a2);
q1.addAnswer(a3);
q1.addAnswer(a4);

console.log(q1);

const user2a = q1.getAnswers(2);

const yesterday = dayjs("2026-02-26");


const answersAfterYesterday = q1.afterDate(yesterday);

console.log (answersAfterYesterday);
