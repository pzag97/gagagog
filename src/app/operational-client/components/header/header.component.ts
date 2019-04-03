import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromApp from '@app/store/app.reducer';
import * as AuthActions from '@app/auth/store/auth.actions';
import { getUser } from '@app/store/app.reducer';
import { Observable } from 'rxjs';
import { User } from '@app/users/models/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    user$: Observable<User> = this.store.pipe(select(getUser));

    constructor(private store: Store<fromApp.State>) {
    }

    logout() {
        this.store.dispatch(new AuthActions.LogoutRequest());
    }
}
