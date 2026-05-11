# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### Summary
- list the questions GET /questions
- get a single question GET /questions/<id>
- list the answers GET /answers
- add a new answer POST /answers
- update an existing answer PUT /answers/<id>
- vote for an answer POST /answers/<id>/vote

### __List the questions__

URL: `/api/questions`

HTTP Method: GET

Description: Retrieve all the questions.

Request body: _None_

Response: `200 OK` (success) or `500 Internal Server Error` (failure). In case of success, returns an array of questions in JSON format (see below); otherwise, an error message.

Response body:
```
[
  {
    "id": 1,
    "text": "Is JavaScript better than Python?",
    "author": {
      "email": "luigi.derussis@polito.it",
      "id": 1
    },
    "date": "2026-02-26"
  },
  ...
]
```

### __Get a single question__

URL: `/api/questions/<id>`

HTTP Method: GET

Description: Retrieve the question identified by `<id>`.

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (failure, wrong id) or `500 Internal Server Error` (failure). In case of success, returns a question in JSON format (see below); otherwise, an error message.

Response body:
```
{
  "id": 1,
  "text": "Is JavaScript better than Python?",
  "author": {
    "email": "luigi.derussis@polito.it",
    "id": 1
  },
  "date": "2026-02-26"
}
```

### __Get all the answers of a single question__

URL: `/api/questions/<id>/answers`

HTTP Method: GET.

Description: Get all the answers of the question represented by `<id>`.

Request body: _None_

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "text": "Yes",
    "author": {
      "email": "marco.zeta@email.it",
      "id": 2
    },
    "date": "2025-02-23"
  },
  ...
]
```

### __Create a new answer for a given question__

URL: `/api/questions/<id>/answers`

HTTP Method: POST.

Description: Create a new answer to the question represented by `<id>`.

Request body:
```
{
  "text": "Last year, it had about 3400 first-timers.",
  "author": {
    "email": "luigi.derussis@polito.it",
    "id": 1
  },
  "score": 0,
  "date": "2026-03-15"
}
```

Response: `201 Created` (succes, with the created id), `404 Not Found` (wrong id), or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: _None_

### __Update an answer__

URL: `/api/answer/<id>`

HTTP Method: PUT

Description: Update the answer identified by `<id>`.

Request body: A JSON object representing the answer.
```
{
  "text": "Last year, it had about 340 first-timers.",
  "author": {
    "email": "luigi.derussis@polito.it",
    "id": 1
  },
  "score": 0,
  "date": "2026-03-15"
}
```

Response: `200 OK` (success), `404 Not Found` (failure, if id doesn't exist) or `500 Internal Server Error` (failure). If the request body isn't valid, `422 Unprocessable Entity` (validation error).

Response body: _None_


### __Vote for an answer__

URL: `/api/answer/<id>/vote`

HTTP Method: POST

Description: Upvote (+1) or downvote (-1) the answer identified by `<id>`.

Request body: A JSON object representing the action.
```
{
  "vote": "up"
}
```

Response: `204 No content` (success) or `500 Internal Server Error` (failure). If the request body isn't valid, `422 Unprocessable Entity` (validation error).

Response body: _None_

### __Login__

URL: `/api/sessions`

HTTP Method: POST

Description: Create a new session (i.e., perform the login).

Request body: A JSON object with username and password.
```
{
  "username": "luigi.derussis@polito.it",
  "password": "password"
}
```

Response: `201 Created` (success) or `401 Unauthorized` (failure, not authenticated).

Response body: A JSON object representing the authenticated user.
```
{
  "id": 1,
  "username": "luigi.derussis@polito.it",
  "name": "Luigi De Russis"
}
```

### __Check if still logged in__

URL: `/api/sessions/current`

HTTP Method: GET

Description: Check if the user is still logged in.

Response: `200 OK` (success) or `401 Unauthorized` (failure, not authenticated).

Response body: A JSON object representing the authenticated user.
```
{
  "id": 1,
  "username": "luigi.derussis@polito.it",
  "name": "Luigi De Russis"
}
```

### __Logout__

URL: `/api/sessions/current`

HTTP Method: DELETE

Description: Delete the session for the current user (i.e., perform the logout).

Response: `200 OK` (success).