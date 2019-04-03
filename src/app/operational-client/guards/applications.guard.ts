import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { getAllApplications } from '@app/operational-client/store/reducers';
import { AppInterface } from '@app/operational-client/models/application.model';
import { ApplicationActions } from '../store/actions';
import * as fromApp from '@app/store/app.reducer';

@Injectable()
export class ApplicationsGuard implements CanActivate {

    constructor(private store: Store<fromApp.State>) {
    }

    getFromStoreOrAPI(): Observable<any> {
        return this.store.pipe(
            select(getAllApplications),
            tap((applications: AppInterface[]) => {
                if (!applications.length) {
                    this.store.dispatch(new ApplicationActions.LoadAppsRequest());
                }
            }),
            filter(applications => !!applications.length),
            take(1)
        );
    }

    canActivate(): Observable<boolean> {
        return this.getFromStoreOrAPI().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }
}
