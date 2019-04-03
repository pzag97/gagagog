import { Action } from '@ngrx/store';
import { User, UserInterface } from '@app/users/models/user';

export enum ActionTypes {
    LoadUsersRequest = '[Users] Load Users Request',
    LoadUsersSuccess = '[Users] Load Users Success',
    AddUserRequest = '[Users] Add User Request',
    AddUserSuccess = '[Users] Add User Success',
    AddUserFailed = '[Users] Add User Failed',
    DeleteUserRequest = '[Users] Delete User Request',
    DeleteUserSuccess = '[Users] Delete User Success'
}

export class LoadUsersRequest implements Action {
    readonly type = ActionTypes.LoadUsersRequest;
}

export class LoadUsersSuccess implements Action {
    readonly type = ActionTypes.LoadUsersSuccess;

    constructor(public payload: { users: User[] }) {
    }
}

export class AddUserRequest implements Action {
    readonly type = ActionTypes.AddUserRequest;

    constructor(public payload: { user: UserInterface }) {
    }
}

export class AddUserSuccess implements Action {
    readonly type = ActionTypes.AddUserSuccess;

    constructor(public payload: { user: User }) {
    }
}

export class AddUserFailed implements Action {
    readonly type = ActionTypes.AddUserFailed;

    constructor(public payload: { error: string }) {
    }
}

export class DeleteUserRequest implements Action {
    readonly type = ActionTypes.DeleteUserRequest;

    constructor(public payload: { user: User }) {
    }
}

export class DeleteUserSuccess implements Action {
    readonly type = ActionTypes.DeleteUserSuccess;

    constructor(public payload: { user: User }) {
    }
}

export type ActionsUnion =
    LoadUsersRequest |
    LoadUsersSuccess |
    AddUserRequest |
    AddUserSuccess |
    AddUserFailed |
    DeleteUserRequest |
    DeleteUserSuccess;
