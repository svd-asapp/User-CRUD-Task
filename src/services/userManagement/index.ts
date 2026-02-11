import { UserManagementService, User } from './types';
import { UserModel } from './model';

export default function createUserManagementService(): UserManagementService {
    return {
        async getUsers() {
            const users = await UserModel.find();
            return users as unknown as User[];
        },

        async getUser(id: string) {
            const user = await UserModel.findById(id);
            return user as unknown as User;
        },

        async createUser(firstName: string, lastName: string, age?: number) {
            try {
                const newUser = new UserModel({ firstName, lastName, age });
                const savedUser = await newUser.save();
                return savedUser as unknown as User;
            } catch (error) {
                throw new Error(`Error creating user: ${error}`);
            }
        },

        async updateUser(id: string, firstName?: string, lastName?: string, age?: number) {
            const updatedUser = await UserModel.findByIdAndUpdate(
                id,
                { firstName, lastName, age },
                { new: true }
            );
            return updatedUser as unknown as User;
        },

        async deleteUser(id: string) {
            const result = await UserModel.findByIdAndDelete(id);
            return !!result;
        }
    };
}