import * as fromApplications from './applications.reducer';
import * as fromLayout from './layout.reducer';
import * as fromConfiguration from './configuration.reducer';
import * as fromApp from '@app/store/app.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface OperationalClientState {
    applications: fromApplications.State;
    configuration: fromConfiguration.State;
    layout: fromLayout.State;
}

export interface State extends fromApp.State {
    operationalClient: OperationalClientState;
}

export const reducers: ActionReducerMap<OperationalClientState> = {
    applications: fromApplications.reducer,
    layout: fromLayout.reducer,
    configuration: fromConfiguration.reducer
};

export const getOperationalClientState = createFeatureSelector<State, OperationalClientState>('operationalClient');

export const getApplicationsState = createSelector(
    getOperationalClientState,
    state => state.applications
);

export const getSelectedApplicationName = createSelector(
    getApplicationsState,
    fromApplications.getSelectedName
);

export const getApplicationsEntities = createSelector(
    getApplicationsState,
    fromApplications.selectApplicationsEntities
);

export const getSelectedApplication = createSelector(
    getApplicationsEntities,
    getSelectedApplicationName,
    (entities, name) => entities[name]
);

export const getAllApplications = createSelector(
    getApplicationsState,
    fromApplications.selectAllApplications
);

export const getSelectedAppVersion = createSelector(
    getApplicationsState,
    fromApplications.getSelectedVersion
);

export const getSelectedAppBuild = createSelector(
    getApplicationsState,
    fromApplications.getSelectedBuild
);

export const getApplicationError = createSelector(
    getApplicationsState,
    fromApplications.getError
);

export const getLayoutState = createSelector(
    getOperationalClientState,
    state => state.layout
);

export const getLayoutTitle = createSelector(
    getLayoutState,
    fromLayout.getTitle
);

export const getConfigurationState = createSelector(
    getOperationalClientState,
    state => state.configuration
);

export const getSelectedConfiguration = createSelector(
    getConfigurationState,
    fromConfiguration.getSelected
);
