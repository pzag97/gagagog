import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApplicationService } from '@app/operational-client/services/application.service';
import { ApplicationActions } from '../actions';

@Injectable()
export class ApplicationsEffects {

    @Effect()
    loadAppRequest$ = this.actions$.pipe(
        ofType(ApplicationActions.ActionTypes.LoadAppsRequest),
        switchMap(() =>
            this.applicationService.fetchApplications().pipe(
                map(response => new ApplicationActions.LoadAppsSuccess({appResponse: response}))
            )
        )
    );

    @Effect()
    createAppRequest$ = this.actions$.pipe(
        ofType<ApplicationActions.CreateAppRequest>(ApplicationActions.ActionTypes.CreateAppRequest),
        switchMap(action =>
            this.applicationService.createApplication(action.payload.name).pipe(
                map(app => new ApplicationActions.CreateAppSuccess({app})),
                catchError(error => of(new ApplicationActions.CreateAppFailed({error})))
            )
        )
    );

    @Effect()
    deleteAppRequest$ = this.actions$.pipe(
        ofType<ApplicationActions.DeleteAppRequest>(ApplicationActions.ActionTypes.DeleteAppRequest),
        switchMap(action =>
            this.applicationService.deleteApplication(action.payload.app.AppName).pipe(
                map(() => new ApplicationActions.DeleteAppSuccess(action.payload)),
                catchError(error => of(new ApplicationActions.DeleteAppFailed({error})))
            )
        )
    );

    @Effect()
    deleteAppSuccess$ = this.actions$.pipe(
        ofType<ApplicationActions.DeleteAppSuccess>(ApplicationActions.ActionTypes.DeleteAppSuccess),
        tap(() => {
            this.router.navigate(['/applications']);
        })
    );

    @Effect({dispatch: false})
    navigateToApp$ = this.actions$.pipe(
        ofType<ApplicationActions.CreateAppSuccess | ApplicationActions.SelectApp>(
            ApplicationActions.ActionTypes.CreateAppSuccess,
            ApplicationActions.ActionTypes.SelectApp
        ),
        tap(action => {
            const app = action.payload.app;
            this.router.navigate([`/applications/${app ? app.AppName : ''}`]);
        })
    );

    constructor(private actions$: Actions, private applicationService: ApplicationService, private router: Router) {
    }
}
