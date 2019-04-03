import { Action } from '@ngrx/store';
import { Credentials, User } from '@app/users/models/user';

export enum ActionTypes {
    LoginRequest = '[Auth] Login Request',
    LoginSuccess = '[Auth] Login Success',
    LoginFailed = '[Auth] Login Failed',
    LoginRedirect = '[Auth] Login Redirect',
    LogoutRequest = '[Auth] Logout Request',
    LogoutSuccess = '[Auth] Logout Success',
}

export class LoginRequest implements Action {
    readonly type = ActionTypes.LoginRequest;

    constructor(public payload: Credentials) {
    }
}

export class LoginSuccess implements Action {
    readonly type = ActionTypes.LoginSuccess;

    constructor(public payload: { user: User, token: string }) {
    }
}

export class LoginFailed implements Action {
    readonly type = ActionTypes.LoginFailed;

    constructor(public payload: { error: string }) {
    }
}

export class LogoutRequest implements Action {
    readonly type = ActionTypes.LogoutRequest;
}

export class LogoutSuccess implements Action {
    readonly type = ActionTypes.LogoutSuccess;
}

export class LoginRedirect implements Action {
    readonly type = ActionTypes.LoginRedirect;
}

export type ActionsUnion =
    LoginRequest |
    LoginSuccess |
    LoginFailed |
    LoginRedirect |
    LogoutRequest |
    LogoutSuccess;
