### Noise Controller ###

**/--------------------------------------------/ AUTH ROUTES /-----------------------------------/**

**Register a Teacher**
_method url_: `/api/teachers/register`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name         | type   | required | description            |
| ------------ | ------ | -------- | --------------         |
| `username`   | String | Yes      | Must be unique         |
| `password`   | String | Yes      |                        |
| `email`      | String | Yes      | Must be unique         |
| `firstName`  | String | No       |                        |
| `lastName`   | String | No       |                        |
| `title`      | String | No       | Mr., Mrs., etc         |
| `theme`      | String | No       | Default theme          |
| `intake`     | String | No       | Intake Q & A           |
|              |        |          | JSON.stringify() first |

#### Example

```
  {
    "username": "michael",
    "password": "1234",
    "email": "michael@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "zoo"
  }
```

#### Response

##### 201 (created)

###### Example Response

```
  {
    "id": 2,
    "username": "michael",
    "email": "michael@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "zoo",
    "intake": null,
    "classes": []
  }
```

##### 428 (Preconditon Failed)

```
  {
    "message": "Missing required field(s): username, password"
  }
```

##### 500 (Server error)

```
  {
    "message": "Teacher could not be added",
    "error": {
      "errno": 19,
      "code": "SQLITE_CONSTRAINT"
    }
  }
```

`SQLITE_CONSTRAINT` usually indicates that one of the fields that is required to be unique, eg. `username` or `email`, is already registered. Will replace this with more helpful error messages soon.

**/----------------------------------------/**

### **Login a teacher**

_method url_: `/api/teachers/login`

_http method_: **[POST]**

#### Headers

| name           | type   | required | description              |
| -------------- | ------ | -------- | ------------------------ |
| `Content-Type` | String | Yes      | Must be application/json |

#### Body

| name       | type   | required | description             |
| ---------- | ------ | -------- | ----------------------- |
| `username` | String | Yes      | must be registered user |
| `password` | String | Yes      |                         |

#### Example

```
  {
    "username": "michael",
    "password": "1234"
  }
```

#### Response

##### 200 (ok)

> no issues logging in

###### Example response

```
  {
    "id": 2,
    "username": "michael",
    "email": "michael@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "zoo",
    "intake": null,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6Im1pY2hhZWwiLCJpYXQiOjE1NjQ0MDY4OTQsImV4cCI6MTU2NDQ1MDA5NH0.sbuq8MfwUEaqjcdMEFgCLsxlNvnrpX9UndYIMKli14s"
  }
```

##### 428 (Method Not Allowed)

```
  {
    message: "Missing username or password"
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid credentials"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Error logging in",
    error: {
      "errno": 1,
      "code": "SOME_ERROR"
    }
  }
```

**/--------------------------------------------/ USER ROUTES /-----------------------------------/**

### **Get all Teachers**

_method url_: `/api/teachers`

_http method_: **[GET]**

#### Headers

| name            | type   | required | description                    |
| --------------  | ------ | -------- | ------------------------------ |
| `Authorization` | String | Yes      | Authorization token from login |

#### Response

##### 200 (ok)

###### Example response

```
  [
    {
      "id": 1,
      "username": "michael",
      "email": "michael@example.com",
      "firstName": "Michael",
      "lastName": "Hart",
      "title": "Mr.",
      "theme": "zoo",
      "intake": null
    },
    {
      "id": 2,
      "username": "anabel",
      "email": "anabel@example.com",
      "firstName": "Anabel",
      "lastName": "Roberts",
      "title": "Mrs.",
      "theme": "aquarium",
      "intake": null
    }
  ]
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Error logging in",
    error: {
      "errno": 1,
      "code": "SOME_ERROR"
    }
  }
```

**/----------------------------------------/**

### **Get a single Teacher**

_method url_: `/api/teachers/:id`

_http method_: **[GET]**

#### Response

##### 200 (ok)

###### Example response

```
  {
    "id": 2,
    "username": "michael",
    "email": "michael@example.com",
    "firstName": "Michael",
    "lastName": "Hart",
    "title": "Mr.",
    "theme": "zoo",
    "intake": null,
    "classes": [
      {
        "id": 4,
        "name": "First grade",
        "teacherId": 2,
        "theme": "zoo",
        "timer": 60,
        "threshold": 85,
        "sensitivity": 50,
        "streakSince": "2019-07-29 13:39:49"
      }
    ]
  }
```

##### 401 (UnAuthorized)

```
  {
    message: "Invalid or expired token"
  }
```

##### 404 (Bad Request) 
Body was empty

```
  {
    message: "Missing teacher data"
  }
```

##### 500 (Bad Request)

```
  {
    message: "Failed to get teacher",
    error: {
      "errno": 1,
      "code": "SOME_ERROR"
    }
  }
```