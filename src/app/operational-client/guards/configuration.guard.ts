import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { getSelectedConfiguration } from '@app/operational-client/store/reducers';
import { ConfigurationActions } from '../store/actions';
import * as fromApp from '@app/store/app.reducer';

@Injectable()
export class ConfigurationGuard implements CanActivate {

    constructor(private store: Store<fromApp.State>) {
    }

    getFromStoreOrAPI(route: ActivatedRouteSnapshot): Observable<any> {
        return this.store.pipe(
            select(getSelectedConfiguration),
            tap((config: object) => {
                if (!config) {
                    console.log(route.params);
                    const {app, version, build} = route.params;
                    this.store.dispatch(new ConfigurationActions.LoadConfigRequest({
                        params: {
                            app,
                            version,
                            build: parseInt(build, 10)
                        }
                    }));
                }
            }),
            filter(config => !!config),
            take(1)
        );
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.getFromStoreOrAPI(route).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }
}
