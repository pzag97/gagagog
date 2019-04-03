import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '@app/users/services/users.service';
import * as UsersActions from './users.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable()
export class UsersEffects {
    @Effect()
    loadUsersRequest$ = this.actions$.pipe(
        ofType(UsersActions.ActionTypes.LoadUsersRequest),
        switchMap(() =>
            this.usersService.fetchUsers().pipe(
                map(users => new UsersActions.LoadUsersSuccess({users}))
            )
        )
    );

    @Effect()
    addUserRequest$ = this.actions$.pipe(
        ofType<UsersActions.AddUserRequest>(UsersActions.ActionTypes.AddUserRequest),
        switchMap(action =>
            this.usersService.createUser(action.payload.user).pipe(
                map(user => new UsersActions.AddUserSuccess({user})),
                catchError(error => of(new UsersActions.AddUserFailed({error})))
            )
        )
    );

    @Effect()
    deleteUserRequest$ = this.actions$.pipe(
        ofType<UsersActions.DeleteUserRequest>(UsersActions.ActionTypes.DeleteUserRequest),
        switchMap(action =>
            this.usersService.deleteUser(action.payload.user).pipe(
                map(() => new UsersActions.DeleteUserSuccess({user: action.payload.user}))
            )
        )
    );

    constructor(private actions$: Actions, private usersService: UsersService) {
    }
}
