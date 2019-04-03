import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { AppInterface, AppBuildInterface, AppVersionInterface } from '../../models/application.model';
import { ApplicationActions } from '../actions';


export interface State extends EntityState<AppInterface> {
    selectedApplicationName: string;
    selectedVersion: AppVersionInterface;
    selectedBuild: AppBuildInterface;
    error: string;
}

export const adapter: EntityAdapter<AppInterface> = createEntityAdapter<AppInterface>({
    selectId: app => app.AppName,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedApplicationName: null,
    selectedBuild: null,
    selectedVersion: null,
    error: null
});

export function reducer(state = initialState, action: ApplicationActions.ActionsUnion) {
    switch (action.type) {
        case ApplicationActions.ActionTypes.LoadAppsSuccess:
            return adapter.addAll(action.payload.appResponse.Apps, state);
        case ApplicationActions.ActionTypes.DeleteAppSuccess:
            return {
                ...adapter.removeOne(action.payload.app.AppName, state),
                selectedApplicationName: null,
                selectedBuild: null,
                selectedVersion: null,
                error: null
            };
        case ApplicationActions.ActionTypes.DeleteAppFailed:
            return {
                ...state,
                error: action.payload.error
            };
        case ApplicationActions.ActionTypes.SelectApp:
            const latestVersion = action.payload.app ? action.payload.app.Versions[action.payload.app.Versions.length - 1] : null;
            return {
                ...state,
                selectedApplicationName: action.payload.app ? action.payload.app.AppName : null,
                selectedVersion: latestVersion || null,
                selectedBuild: latestVersion ? latestVersion.Builds[latestVersion.LastBuild - 1] : null
            };
        case ApplicationActions.ActionTypes.SelectVersion:
            return {
                ...state,
                selectedVersion: action.payload.version,
                selectedBuild: action.payload.version.Builds[action.payload.version.LastBuild - 1]
            };
        case ApplicationActions.ActionTypes.SelectBuild:
            return {
                ...state,
                selectedBuild: action.payload.build
            };
        case ApplicationActions.ActionTypes.CreateAppSuccess:
            return {
                ...adapter.addOne(action.payload.app, state),
                error: null
            };
        case ApplicationActions.ActionTypes.CreateAppFailed:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
}

const {
    selectEntities,
    selectAll
} = adapter.getSelectors();

export const getSelectedName = (state: State) => state.selectedApplicationName;

// select the array of applications
export const selectAllApplications = selectAll;

// select the dictionary of application entities
export const selectApplicationsEntities = selectEntities;

export const getSelectedVersion = (state: State) => state.selectedVersion;

export const getSelectedBuild = (state: State) => state.selectedBuild;

export const getError = (state: State) => state.error;
