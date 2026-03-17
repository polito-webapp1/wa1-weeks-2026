# Example

Entities:
    User            URL: http://localhost:3001/api/v1/users
    Question        URL: ............................/questions
    Answer          URL: ............................/answers


GET http://localhost:3001/api/v1/users
    will retrieve the list of all items inside collection '/users'
    encoded in a JSON format
    (if we have the permission to do that...)

    Option 1: return an array of user IDs
    ```json
        [1, 2, 3, 4]
    ```

    Option 2: return an array with the full representation of users
    ```json
        [
            {
                "id": 1,
                "name": "Luigi De Russis",
                "email": "luigi.derussis@polito.it"
            },
            {
                "id": 2,
                "name": "Marco Zeta",
                "email: "marco.zeta@email.it"
            },
            {},
            {}
        ]
    ```
    GET ..../users?type=full
    GET ..../users?limit=10&sort=date



GET http://localhost:3001/api/v1/users/2
    retrieve the JSON representation of the properties of the user with id=2
    The result will be a JSON object

    ```json
        {
                "id": 2,
                "name": "Marco Zeta",
                "email: "marco.zeta@email.it"
        }
    ```


POST http://localhost:3001/api/v1/users
    create a new item in the collection of users

    the POST request body will contain the JSON representation
    of the new user that we want to add (except for the "id")

    ```json
        {
            "name": "New Guy",
            "email": "last@gmail.com"
        }
    ```

        ```json
        {  
            "id": null,
            "name": "New Guy",
            "email": "last@gmail.com"
        }
    ```


    the server "stores" the new user and returns the confirmation of 
    successful operation, with the just assigned "id" 
    -- or -- with a full representation of the just created user

    ```json
        5
    ````

    ```json
        { "id": 5 }
    ```

    ```json
        {
            "id": 5,
            "name": "New Guy",
            "email": "last@gmail.com"
        }
    ```


In case of errors, the server will generate an HTTP error code (ex. 503) with 
(optionally) a response body containing the cause of the error (just a string, or an
'error object' encoded in JSON).


PUT http://localhost:3001/api/v1/users/2

    Update part of the object (one or more properties, but normally not the "id")
    with new data stored (JSON) in the request body

    ```json
        {
            "email": "marco.zeta.99@gmail.com"
        }
    ```

    ```json
        {
            "name": "Marco Zeta",
            "email": "marco.zeta.99@gmail.com"
        }
    ```

        ```json
        {
            "id": 2,
            "name": "Marco Zeta",
            "email": "marco.zeta.99@gmail.com"
        }
    ```




# different from http:///createUser    # Remote procedure call... not widely used

/questions -> list of all questions

/users/2/questions -> the list of all questions by user id=2
    GET /users/2/questions
        give me the list of question made by that user
    POST /users/2/questions
        create a new question for that user (will have a new id ... 15)

        could also do: POST /questions (by specifying "authorId": 2)

/questions/15 will be the identifier of that question
(not /users/2/questions/15)

GET /question/2

    ```json
        {
            "id": 2,
            "text": ".....javascript....",
            "authorId": 2,
            "date": "2026-03-01"
        }
    ```

    to have the information about the author
    GET /users/2
    (( and maybe also
    GET /questions/2/answers ))

    or 

        ```json
        {
            "id": 2,
            "text": ".....javascript....",
            "authorId": 2,
            "author": {
                "id": 2,
                "name": "Marco Zeta",
                "email": "marco.zeta.99@gmail.com"
            },
            "date": "2026-03-01"
        }
    ```

    GET /questions/2/users  -- NO because the author is only one, and is not a collection

    Create a new answer
    POST /answers
    POST /questions/2/answers   ***
    POST /users/2/answers


    How to represent a 'vote' operation?

    PUT /answers/3

    ```json
        { 
            "score": 10
        }
    ```

    POST /answers/3/vote


    POST /session
    DELETE /session
    GET /session



# APIs for Questions

GET /questions
GET /questions/:id
POST /questions
PUT /questions/:id

# APIs for Answers

GET /questions/:id/answers
POST /questions/:id/answers
GET /answers/:id
PUT /answers/:id

POST /answers/:id/votes