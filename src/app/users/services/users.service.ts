import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { User, UserInterface, UserRoles } from '@app/users/models/user';

@Injectable({providedIn: 'root'})
export class UsersService {
    fetchUsers() {
        return of(this.getUsersFromStorage());
    }

    createUser(userObj: UserInterface) {
        const user = new User(userObj);
        const users = this.getUsersFromStorage();
        if (users.findIndex(u => u.username === user.username) !== -1) {
            return throwError(`User with username ${user.username} already exists`);
        }
        users.push(user);
        this.updateStorage(users);
        return of(user);
    }

    getUsersFromStorage(): User[] {
        let users: User[];
        const userObjects: Array<UserInterface> = JSON.parse(localStorage.getItem('users'));
        if (userObjects && Array.isArray(userObjects)) {
            users = userObjects.map(userObj => new User(userObj));
        } else {
            const admin = new User({firstName: 'Super', lastName: 'User', role: UserRoles.Admin, username: 'super.user', password: 'test'});
            this.updateStorage([admin]);
            users = [admin];
        }
        return users;
    }

    deleteUser(user: User) {
        const users = this.getUsersFromStorage();
        const index = users.findIndex(u => u.username === user.username);
        if (index === -1) {
            return throwError(`User with username ${user.username} not found`);
        }
        users.splice(index, 1);
        this.updateStorage(users);
        return of({success: true});
    }

    private updateStorage(users: User[]) {
        localStorage.setItem('users', JSON.stringify(users));
    }
}
