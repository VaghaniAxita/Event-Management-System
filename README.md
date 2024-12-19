
# Event Management System API

This is a backend API for an Event Management System built with Node.js, Express.js, and MongoDB. The API supports user authentication, event management and file uploads.


 - Deploy on Render: https://event-management-system-l946.onrender.com
____________________________________________________




## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT) for authentication
- Multer for file uploads


## Setup

1. Clone the Repository

```bash
 https://github.com/VaghaniAxita/Event-Management-System
```

2. Navigate to the Project Directory:

```bash
  cd backend  
```

3. Run the server:
```bash
  nodemon
```




# Routes

### User Authentication Routes
  
  **Register  User**

- Route: POST /api/auth/register
- Description: Register a new user
- Request Body:
```bash
  {
    "name": "event",
    "email": "event@gmail.com.com",
    "password": "event"
}
```
- Sample Response:
  - Status: 201 Created
   - Body:
```bash
  {
  "message": "User registered successfully"
  }
```

**User Login**

- Route: POST /api/auth/login
- Description:Login an existing user
- Request Body:
```bash
 {
  "email": "event@gmail.com",
    "password": "event"
}
```
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
 {
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjJkNDE1MTJlZGY0ZjU1M2ZiNTViMyIsImlhdCI6MTczNDUzMDExOSwiZXhwIjoxNzM3MTIyMTE5fQ.GuvWtrmShK-1v7hOfBmPvL1T74g3BT2varjMnStFEeg"
}
```

**Get All Users**

- Route: GET /api/auth/users
- Description: Fetches all registered users.
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
 [
  {
    "_id": "639b8b4e88d1f02463ef1234",
    "name": "event",
    "email": "event@gmail.com",
    "createdAt": "2024-12-15T12:00:00.000Z"
  }
]
```

###  Event  Routes

**Create Event**

- Route:POST /api/events
- Description: 	Create an Event
- Request Body:
```bash
 {
  "title": "Tech Conference 2024",
  "description": "An annual conference for developers.",
  "date": "2024-12-20",
  "location": "Surat",
  "maxAttendees": 100
}

```
- Sample Response:
  - Status: 201 Created
   - Body:
```bash
  {
  "_id": "639b9d4e88d1f02463ef5678",
  "title": "Tech Conference 2024",
  "description": "An annual conference for developers.",
  "date": "2024-12-20T00:00:00.000Z",
  "location": "Surat",
  "maxAttendees": 100,
  "attendees": [],
  "image": null,
  "createdBy": "639b8b4e88d1f02463ef1234",
  "createdAt": "2024-12-15T12:00:00.000Z",
  "updatedAt": "2024-12-15T12:00:00.000Z"
}
```

**Get All Events**
- Route: GET /api/events
- Description: Get All Events
- Sample Response:
    - Status: 200 OK
    -  Body:
```bash
[
  {
    "_id": "639b9d4e88d1f02463ef5678",
    "title": "Tech Conference 2024",
    "description": "An annual conference for developers.",
    "date": "2024-12-20T00:00:00.000Z",
    "location": "Surat",
    "maxAttendees": 100,
    "attendees": [],
    "image": null,
    "createdBy": {
      "_id": "639b8b4e88d1f02463ef1234",
      "name": "event",
      "email": "event@gmail.com"
    }
  }
]
```

**Get Event by ID**
- Route: GET /api/events
- Description: Get Event by ID
- Sample Response:
    - Status: 200 OK
    -  Body:
```bash
{
  "_id": "639b9d4e88d1f02463ef5678",
  "title": "Tech Conference 2024",
  "description": "An annual conference for developers.",
  "date": "2024-12-20T00:00:00.000Z",
  "location": "Surat",
  "maxAttendees": 100,
  "attendees": [],
  "image": null,
  "createdBy": {
    "_id": "639b8b4e88d1f02463ef1234",
    "name": "event",
    "email": "event@gmail.com"
  }
}
```

**Update Event**
- Route: PUT /api/events/:id
- Description: Update a event's details
- Request Body:
```bash
 {
  "title": "Tech 2024"
}
```
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
 {
  "_id": "639b9d4e88d1f02463ef5678",
  "title": "Tech 2024",
  "description": "An annual conference for developers.",
  "date": "2024-12-20T00:00:00.000Z",
  "location": "Surat",
  "maxAttendees": 100,
  "attendees": [],
  "image": null,
  "createdBy": "639b8b4e88d1f02463ef1234",
  "updatedAt": "2024-12-15T13:00:00.000Z"
}

```

**Delete event**
- Route: DELETE /api/expenses/:id
- Description:Delete an Event by ID
- Sample Response:
   - Status: 200 OK
   - Body:
```bash
 {
  "message": "Event deleted successfully"
}
```

###  RSVP  Routes

**RSVP to an Event**
- Route: POST /api/events/:id/rsvp
- Sample Response:
   - Status: 200 OK
   - Body:
```bash
 {
  "message": "RSVP successful"
}
```

**Cancel RSVP**
- Route: DELETE /api/events/:id/rsvp
- Description:Return a book
- Sample Response:
   - Status: 200 OK
   - Body:
```bash
 {
  "message": "RSVP cancelled successfully"
}
```
  
  
