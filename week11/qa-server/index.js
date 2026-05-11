// import
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { listQuestions, getQuestion, getAnswers, addAnswer, updateAnswer, voteAnswer, getUser } from "./dao.js";
import { check, validationResult } from "express-validator";

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

// init
const app = express();
const port = 3001;

// middlewares
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessState: 200,
  credentials: true
};
app.use(cors(corsOptions))

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  
  if(!user)
    //null -> no error, invalid credetials, message
    return cb(null, false, "Incorrect username or password."); // error message in the WWW-Authenticated header of the response
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  console.log(req.user)
  return res.status(401).json({error: "Not authorized"});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate("session"));

/* ROUTES */

// POST /api/sessions
app.post("/api/sessions", passport.authenticate("local"), function(req, res) {
  return res.status(201).json(req.user);
});

// GET /api/sessions/current
app.get("/api/sessions/current", (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: "Not authenticated"});
});

// DELETE /api/session/current
app.delete("/api/sessions/current", (req, res) => {
  req.logout(() => {
    res.end();
  });
});

// GET /api/questions
app.get("/api/questions", (request, response) => {
  listQuestions()
    .then(questions => response.json(questions))
    .catch(() => response.status(500).end());
});

// GET /api/questions/<id>
app.get("/api/questions/:id", async (req, res) => {
  try {
    const question = await getQuestion(req.params.id);
    if(question.error) {
      res.status(404).json(question);
    }
    else res.json(question);
  }
  catch {
    res.status(500).end();
  }
});

// GET /api/questions/<id>/answers
app.get("/api/questions/:id/answers", async (req, res) => {
  try {
    const answers = await getAnswers(req.params.id);
    setTimeout(()=>res.json(answers), 1000);
  } catch {
    res.status(500).end();
  }
});

// POST /api/questions/<id>/answers
app.post("/api/questions/:id/answers", isLoggedIn, [
  check("text").notEmpty(),
  check("author.email").isEmail(),
  check("score").isNumeric(),
  check("date").isDate({format: "YYYY-MM-DD", strictMode: true})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const newAnswer = req.body;
  const questionId = req.params.id;

  try {
    const id = await addAnswer(newAnswer, questionId);
    res.status(201).location(id).end();
  } catch(e) {
    console.error(`ERROR: ${e.message}`);
    res.status(503).json({error: "Impossible to create the answer."});
  }
});

// PUT /api/answers/<id>
app.put("/api/answers/:id", isLoggedIn, [
  check("text").notEmpty(),
  check("author.email").isEmail(),
  check("score").isNumeric(),
  check("date").isDate({format: "YYYY-MM-DD", strictMode: true})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const answerToUpdate = req.body;
  answerToUpdate.id = req.params.id;

  try {
    await updateAnswer(answerToUpdate);
    res.status(200).end();
  } catch {
    res.status(503).json({"error": `Impossible to update answer #${req.params.id}.`});
  }
});


app.use(isLoggedIn)
// POST /api/answers/<id>/vote
app.post("/api/answers/:id/vote",  [
  check("vote").notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(422).json({errors: errors.array()});
  }

  const answerId = req.params.id;
  try {
    const num = await voteAnswer(answerId, req.body.vote);
    if(num === 1)
      res.status(204).end();
    else
      throw new Error(`Error in casting a vote for answer #${answerId}`);
  }
  catch(e) {
    res.status(503).json({error: e.message});
  }
});



// start the server
app.listen(port, () => {console.log(`API server started at http://localhost:${port}`)});