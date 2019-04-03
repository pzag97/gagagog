import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromApp from '@app/store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromApp.State>) {
    }

    canActivate(): Observable<boolean> {
        return this.store.pipe(
            select(fromApp.getLoggedIn),
            map(isLoggedIn => {
                if (!isLoggedIn) {
                    this.store.dispatch(new AuthActions.LoginRedirect());
                    return false;
                }

                return true;
            }),
            take(1)
        );
    }
}
