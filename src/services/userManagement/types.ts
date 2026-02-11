export type User = {
    id: string;
    firstName: string;
    lastName: string;
    age?: number;
};

// Interface with all the functions of the service
export type UserManagementService = {
    getUsers: () => Promise<User[]>;
    getUser: (id: string) => Promise<User | null>;
    createUser: (firstName: string, lastName: string, age?: number) => Promise<User>;
    updateUser: (id: string, firstName?: string, lastName?: string, age?: number) => Promise<User | null>;
    deleteUser: (id: string) => Promise<boolean>;
};