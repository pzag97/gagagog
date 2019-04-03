export interface Credentials {
    username: string;
    password: string;
}

export interface Permissions {
    applications?: {
        [key: string]: {
            canUpdate: boolean,
            canDelete: boolean,
            canAddNewUsers: boolean
        }
    };
}

export interface UserInterface {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
    permissions?: Permissions;
}

export enum UserRoles {
    User = 'user',
    Admin = 'admin'
}

export class User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRoles;
    permissions: Permissions = {};

    constructor(options: UserInterface) {
        const {firstName = '', lastName = '', role = UserRoles.User, permissions = {}, username, password} = options;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.permissions = permissions;
        this.username = username;
        this.password = password;
    }

    getPermissionsForApp(app: string) {
        if (this.role === UserRoles.Admin) {
            return {
                canUpdate: true,
                canDelete: true,
                canAddNewUsers: true
            };
        } else {
            return this.permissions[app] || {
                canUpdate: false,
                canDelete: false,
                canAddNewUsers: false
            };
        }
    }
}

export class TestUser extends User {
    constructor() {
        super({
            firstName: 'test',
            lastName: 'test',
            role: UserRoles.User,
            username: 'test',
            password: 'test'
        });
    }
}
