# GraphQL User CRUD API

A backend API project to build a **GraphQL** server using **TypeScript** and **MongoDB**.

This project implements **CRUD** (Create, Read, Update, Delete) operations for a `User` entity.

## Tech Stack

* **Runtime:** Node.js
* **Language:** TypeScript
* **API Framework:** Apollo Server v4
* **Database:** MongoDB (via Mongoose)

## Start the server

```bash
npm start
```

## Apollo Sandbox


1. Create a User
```GraphQL
mutation {
  createUser(firstName: "abc", lastName: "X Y", age: 25) {
    id
    firstName
  }
}
```

2. Fetch All Users
```GraphQL
query {
  getUsers {
    id
    firstName
    lastName
    age
  }
}
```

3. Fetch Single User (By ID)
```GraphQL
query {
  getUser(id: "<ID>") {
    firstName
    age
  }
}
```

4. Update User
```GraphQL
mutation {
  updateUser(id: "<ID>", age: 50) {
    id
    firstName
    age
  }
}
```

5. Delete User
```GraphQL
mutation {
  deleteUser(id: "<ID>")
}
```