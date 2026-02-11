import { resolvers } from './index';

describe('UserManagement Resolvers', () => {
    // Mock Context with mocked functions
    const mockContext = {
        loaders: {
            userManagement: {
                getUsers: jest.fn(),
                getUser: jest.fn(),
                createUser: jest.fn(),
                updateUser: jest.fn(),
                deleteUser: jest.fn(),
            },
        },
    };

    it('Query.getUsers should call service.getUsers', async () => {
        await resolvers.Query.getUsers({}, {}, mockContext as any);
        expect(mockContext.loaders.userManagement.getUsers).toHaveBeenCalled();
    });

    it('Mutation.createUser should call service.createUser with args', async () => {
        const args = { firstName: 'firstName', lastName: 'lastName', age: 20 };
        await resolvers.Mutation.createUser({}, args, mockContext as any);
        expect(mockContext.loaders.userManagement.createUser).toHaveBeenCalledWith('firstName', 'lastName', 20);
    });
});