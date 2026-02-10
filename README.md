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
mutation CreateUser($firstName: String!, $lastName: String!, $age: Int) {
  createUser(firstName: $firstName, lastName: $lastName, age: $age) {
    firstName
    id
    lastName
    age
  }
}
```

2. Fetch All Users
```GraphQL
query GetUsers {
  getUsers {
    lastName
    id
    firstName
    age
  }
}
```

3. Fetch Single User (By ID)
```GraphQL
query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    firstName
    lastName
    age
  }
}
```

4. Update User
```GraphQL
mutation UpdateUser($updateUserId: ID!, $firstName: String, $lastName: String, $age: Int) {
  updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, age: $age) {
    lastName
    id
    firstName
    age
  }
}
```

5. Delete User
```GraphQL
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}
```