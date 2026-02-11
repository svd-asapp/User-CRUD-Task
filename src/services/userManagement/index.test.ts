import createUserManagementService from './index';
import { UserModel } from './model';

// Mock Mongoose Model
jest.mock('./model');

describe('UserManagement Service', () => {
    const service = createUserManagementService();

    // After each 'it' block, clean up mocks
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Test if the service calls find() and returns users
    it('getUsers should return users', async () => {
        const mockUser = [{ firstName: 'Abc', lastName: 'X Y' }];
        (UserModel.find as jest.Mock).mockResolvedValue(mockUser);

        const result = await service.getUsers();
        expect(result).toEqual(mockUser);
        expect(UserModel.find).toHaveBeenCalled();
    });

    it('createUser should save a new user', async () => {
        const mockUser = { firstName: 'Xyz', lastName: 'A B', save: jest.fn().mockResolvedValue({ id: '1', firstName: 'Xyz' }) };

        // Mock the constructor of UserModel
        (UserModel as unknown as jest.Mock).mockImplementation(() => mockUser);

        const result = await service.createUser('Xyz', 'A B');
        expect(result.firstName).toBe('Xyz');
        expect(mockUser.save).toHaveBeenCalled();
    });
});