import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import path from 'path';

import createUserManagementService from './services/userManagement';
import { resolvers as userResolvers } from './graphql/resolvers/userManagement';

// Database Connection
const MONGODB_URI = "mongodb://127.0.0.1:27017/user-task";

// Read Schema File
const typeDefs = readFileSync(path.join(__dirname, './graphql/schema.graphql'), { encoding: 'utf-8' });

async function startServer() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Initialise Service
        const userService = createUserManagementService();

        // Server Instance
        const server = new ApolloServer({
            typeDefs,
            resolvers: userResolvers,
        });

        const { url } = await startStandaloneServer(server, { // Config Object
            listen: { port: 4000 },
            context: async () => { // Data and tools available to every single request
                return { // New env object for each request
                    loaders: { // Data fetching tools
                        userManagement: userService, // Inject Service into Context
                    },
                };
            },
        });

        console.log(`Server ready at: ${url}`);
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();