import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUsers from '../users/store/users.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { getAuthErrorState, getUserState } from '../auth/store/auth.reducer';
import { getSelectedUsername, selectAllUsers } from '../users/store/users.reducer';

export interface State {
    auth: fromAuth.State;
    users: fromUsers.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    users: fromUsers.reducer
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getUsersState = createFeatureSelector<fromUsers.State>('users');

export const getUser = createSelector(
    getAuthState,
    getUserState
);

export const getAuthError = createSelector(
    getAuthState,
    getAuthErrorState
);

export const getLoggedIn = createSelector(getUser, user => !!user);

export const getAllUsers = createSelector(
    getUsersState,
    selectAllUsers
);

export const getUsersEntities = createSelector(
    getUsersState,
    fromUsers.selectUsersEntities
);

export const getSelectedUser = createSelector(
    getUsersEntities,
    getSelectedUsername,
    (entities, username) => entities[username]
);

export const getUsersError = createSelector(
    getUsersState,
    fromUsers.getError
);
