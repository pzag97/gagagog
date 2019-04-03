import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ConfigurationActions } from '../actions';
import { map, switchMap } from 'rxjs/operators';
import { ConfigurationService } from '@app/operational-client/services/configuration.service';

@Injectable()
export class ConfigurationEffects {
    @Effect()
    loadRequest$ = this.actions$.pipe(
        ofType<ConfigurationActions.LoadConfigRequest>(ConfigurationActions.ActionTypes.LoadConfigRequest),
        switchMap(action =>
            this.configurationService.fetchConfiguration(action.payload.params).pipe(
                map(config => new ConfigurationActions.LoadConfigSuccess({config}))
            )
        )
    );

    constructor(private actions$: Actions, private configurationService: ConfigurationService) {
    }
}
