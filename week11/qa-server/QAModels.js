
import dayjs from "dayjs";

function Question(id, text, authorEmail, authorId, date) {
  this.id = id;
  this.text = text;
  this.author = {email: authorEmail, id: authorId};
  this.date = dayjs(date);
}

function Answer(id, text, authorEmail, authorId, date, score = 0) {
  this.id = id;
  this.text = text;
  this.author = {email: authorEmail, id: authorId};
  this.score = score;
  this.date = dayjs(date);
}

export {Question, Answer};