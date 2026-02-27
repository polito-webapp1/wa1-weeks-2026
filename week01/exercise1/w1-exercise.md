# Exercise 1: Q&A
_Goal: managing a simple data structure as an array of objects_.

Using JavaScript objects and functional programming methods, manage objects that contain information about a question and their answers.

Each answer will contain:
- Response (text)
- Respondent id (positive integer, unique)
- Score (positive or negative integer)
- Date

Define a constructor function `Answer` to create one or more answers.

A question, instead, is made of:
- Question (text)
- Questioner id (positive integer, unique)
- Date
- List of Answers

Define a constructor function `Question` to represent a question. Implement the following methods to manipulate its answers: 

- `addAnswer(answer)` // pass a fully-constructed `Answer` object
- `getAnswers(userId)` // returns all the Answers of a given person
- `afterDate(date)` // returns an array of Answers after the given date
- `listByDate()` // returns an array of Answers, sorted by increasing date
- `listByScore()` // idem, by decreasing score

Create an instance of `Question` with at least four `Answer`s in it.