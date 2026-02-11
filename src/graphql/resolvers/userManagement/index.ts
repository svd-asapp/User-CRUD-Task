import { UserManagementService } from '../../../services/userManagement/types';

// Context Type that every request will have
type ServiceContext = {
    loaders: {
        userManagement: UserManagementService;
    };
};

export const resolvers = {
    Query: {
        getUsers: async (_: any, __: any, context: ServiceContext) => {
            return context.loaders.userManagement.getUsers();
        },
        getUser: async (_: any, args: { id: string }, context: ServiceContext) => {
            return context.loaders.userManagement.getUser(args.id);
        },
    },
    Mutation: {
        createUser: async (_: any, args: { firstName: string; lastName: string; age?: number }, context: ServiceContext) => {
            return context.loaders.userManagement.createUser(args.firstName, args.lastName, args.age);
        },
        updateUser: async (_: any, args: { id: string; firstName?: string; lastName?: string; age?: number }, context: ServiceContext) => {
            return context.loaders.userManagement.updateUser(args.id, args.firstName, args.lastName, args.age);
        },
        deleteUser: async (_: any, args: { id: string }, context: ServiceContext) => {
            const success = await context.loaders.userManagement.deleteUser(args.id);
            return success ? "User deleted successfully" : "User not found";
        },
    },
};