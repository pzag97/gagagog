import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { UsersService } from '@app/users/services/users.service';
import { Credentials, User } from '@app/users/models/user';

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient, private userService: UsersService) {
    }

    login({username, password}: Credentials): Observable<{ user: User, token: string }> {
        const users = this.userService.getUsersFromStorage();
        const user = users.find(u => u.username === username);
        if (!user || user.password !== password) {
            return throwError('Invalid username or password');
        }

        return of({user, token: `token_${Math.floor(Math.random() * 100000)}`});
    }

    logout() {
        return of(true);
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    clearToken() {
        localStorage.removeItem('token');
    }

    getToken(): string {
        return localStorage.getItem('token');
    }
}
