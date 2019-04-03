import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Credentials, User } from '@app/users/models/user';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    @Effect()
    login$ = this.actions$.pipe(
        ofType<AuthActions.LoginRequest>(AuthActions.ActionTypes.LoginRequest),
        map(action => action.payload),
        exhaustMap((auth: Credentials) =>
            this.authService.login(auth).pipe(
                map((response: { user: User, token: string }) => new AuthActions.LoginSuccess({
                    user: response.user,
                    token: response.token
                })),
                catchError((error: string) => of(new AuthActions.LoginFailed({error})))
            )
        )
    );

    @Effect({dispatch: false})
    loginSuccess$ = this.actions$.pipe(
        ofType<AuthActions.LoginSuccess>(AuthActions.ActionTypes.LoginSuccess),
        tap(action => {
            this.router.navigate(['/']);
            this.authService.setToken(action.payload.token);
        })
    );

    @Effect({dispatch: false})
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActions.ActionTypes.LoginRedirect, AuthActions.ActionTypes.LogoutSuccess),
        tap(() => this.router.navigate(['/login']))
    );

    @Effect()
    logoutRequest$ = this.actions$.pipe(
        ofType(AuthActions.ActionTypes.LogoutRequest),
        switchMap(() =>
            this.authService.logout().pipe(
                map(() => new AuthActions.LogoutSuccess())
            )
        )
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) {
    }
}
