import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '@app/users/models/user';
import * as UsersActions from './users.actions';

export interface State extends EntityState<User> {
    selectedUsername: string;
    error: string;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: user => user.username,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedUsername: null,
    error: null
});

export function reducer(state = initialState, action: UsersActions.ActionsUnion) {
    switch (action.type) {
        case UsersActions.ActionTypes.LoadUsersSuccess:
            return {
                ...adapter.addAll(action.payload.users, state),
                error: null
            };
        case UsersActions.ActionTypes.AddUserSuccess:
            return {
                ...adapter.addOne(action.payload.user, state),
                error: null
            };
        case UsersActions.ActionTypes.AddUserFailed:
            return {
                ...state,
                error: action.payload.error
            };
        case UsersActions.ActionTypes.DeleteUserSuccess:
            return {
                ...adapter.removeOne(action.payload.user.username, state),
                error: null
            };
        default:
            return state;
    }
}

const {
    selectEntities,
    selectAll
} = adapter.getSelectors();

// select the array of users
export const selectAllUsers = selectAll;

// select the dictionary of application entities
export const selectUsersEntities = selectEntities;

export const getSelectedUsername = (state: State) => state.selectedUsername;

export const getError = (state: State) => state.error;
