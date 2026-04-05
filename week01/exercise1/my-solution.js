"use strict";

import dayjs from 'dayjs';

/* =========================
   Answer constructor
========================= */
function Answer(text, userId, date, score = 0) {
    this.text = text;
    this.userId = userId;
    this.date = dayjs(date);
    this.score = score;
}


/* =========================
   Question constructor
========================= */
function Question(text, userId, date) {
    this.text = text;
    this.userId = userId;
    this.date = dayjs(date);
    this.answers = [];
}


/* =========================
   Methods (prototype)
========================= */

// addAnswer
Question.prototype.addAnswer = function(answer) {
    this.answers.push(answer);
};

// getAnswers (by userId)
Question.prototype.getAnswers = function(userId) {
    return this.answers.filter(ans => ans.userId === userId);
};

// afterDate
Question.prototype.afterDate = function(date) {
    return this.answers.filter(ans => ans.date.isAfter(date));
};

// listByDate (ascending)
Question.prototype.listByDate = function() {
    return [...this.answers].sort((a, b) => a.date.diff(b.date));
};

// listByScore (descending)
Question.prototype.listByScore = function() {
    return [...this.answers].sort((a, b) => b.score - a.score);
};


/* =========================
   Create data (TEST)
========================= */

const q1 = new Question(
    "How long is this exercise?",
    1,
    "2026-02-27"
);

// Answers
const a1 = new Answer("too much", 2, "2026-02-27", 3);
const a2 = new Answer("10 minutes", 3, "2026-02-27", 5);
const a3 = new Answer("15 minutes", 2, "2026-02-27", 8);
const a4 = new Answer("30 minutes", 2, "2026-02-26", 1);

// add answers
q1.addAnswer(a1);
q1.addAnswer(a2);
q1.addAnswer(a3);
q1.addAnswer(a4);


/* =========================
   Outputs
========================= */

console.log("\nAll answers:");
console.log(q1.answers);

console.log("\nAnswers from user 2:");
console.log(q1.getAnswers(2));

console.log("\nAnswers after 2026-02-26:");
console.log(q1.afterDate(dayjs("2026-02-26")));

console.log("\nSorted by date:");
console.log(q1.listByDate());

console.log("\nSorted by score:");
console.log(q1.listByScore());
