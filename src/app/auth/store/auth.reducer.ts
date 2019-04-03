import * as AuthActions from './auth.actions';
import { User } from '@app/users/models/user';

export interface State {
    user: User;
    error: string;
}

export const initialState: State = {
    user: null,
    error: null
};

export function reducer(state = initialState, action: AuthActions.ActionsUnion): State {
    switch (action.type) {
        case AuthActions.ActionTypes.LoginSuccess:
            return {
                ...state,
                error: null,
                user: action.payload.user
            };
        case AuthActions.ActionTypes.LoginFailed:
            return {
                ...state,
                error: action.payload.error
            };
        case AuthActions.ActionTypes.LogoutSuccess:
            return {
                ...state,
                user: null
            };
        default: {
            return state;
        }
    }
}

export const getUserState = (state: State) => state.user;
export const getAuthErrorState = (state: State) => state.error;
