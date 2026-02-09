import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';

// 1. DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/user-task";

// 2. MONGOOSE SCHEMA and MODEL
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
});

const userModel = mongoose.model('User', userSchema);

// 3. GRAPHQL SCHEMA
const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int): User
    updateUser(id: ID!, firstName: String, lastName: String, age: Int): User
    deleteUser(id: ID!): String
  }
`;

// 4. RESOLVERS
const resolvers = {
    Query: {
        getUsers: async () => await userModel.find(), // Get all users

        getUser: async (_: any, args: { id: string }) => await userModel.findById(args.id), // Get single user by ID
    },

    Mutation: {
        createUser: async (_: any, args: { firstName: string; lastName: string; age: number }) => {
            // Create a new user
            const newUser = new userModel({
                firstName: args.firstName,
                lastName: args.lastName,
                age: args.age,
            });
            const res = await newUser.save();
            return res; // Returns the saved user with the new ID
        },

        updateUser: async (_: any, args: { id: string; firstName?: string; lastName?: string; age?: number }) => {
            // Update an existing user by ID
            return await userModel.findByIdAndUpdate(
                args.id,
                {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    age: args.age
                },
                { new: true }
            );
        },

        deleteUser: async (_: any, args: { id: string }) => {
            // Delete a user by ID
            const wasDeleted = await userModel.findByIdAndDelete(args.id);
            if (!wasDeleted) return "User not found";
            return "User deleted successfully";
        },
    },
};

// 5. START SERVER
async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const server = new ApolloServer({ typeDefs, resolvers });

        const { url } = await startStandaloneServer(server, {
            listen: { port: 4000 },
        });

        console.log(`Server ready at: ${url}`);
    } catch (error) {
        console.error("Error connecting to DB:", error);
    }
}

startServer();