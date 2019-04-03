import * as UsersActions from './users.actions';
import { TestUser } from '@app/users/models/user';

describe('UserActions', () => {
    it('should create LoadUsersRequest', () => {
        const action = new UsersActions.LoadUsersRequest();
        expect<UsersActions.LoadUsersRequest>({...action} as UsersActions.LoadUsersRequest).toEqual({
            type: UsersActions.ActionTypes.LoadUsersRequest
        } as UsersActions.LoadUsersRequest);
    });

    it('should create LoadUsersSuccess', () => {
        const payload = {users: [new TestUser(), new TestUser()]};
        const action = new UsersActions.LoadUsersSuccess(payload);

        expect<UsersActions.LoadUsersSuccess>({...action} as UsersActions.LoadUsersSuccess).toEqual({
            type: UsersActions.ActionTypes.LoadUsersSuccess,
            payload
        } as UsersActions.LoadUsersSuccess);
    });

    it('should create AddUserRequest', () => {
        const payload = {user: new TestUser()};
        const action = new UsersActions.AddUserRequest(payload);

        expect<UsersActions.AddUserRequest>({...action} as UsersActions.AddUserRequest).toEqual({
            type: UsersActions.ActionTypes.AddUserRequest,
            payload
        } as UsersActions.AddUserRequest);
    });

    it('should create AddUserSuccess', () => {
        const payload = {user: new TestUser()};
        const action = new UsersActions.AddUserSuccess(payload);

        expect<UsersActions.AddUserSuccess>({...action} as UsersActions.AddUserSuccess).toEqual({
            type: UsersActions.ActionTypes.AddUserSuccess,
            payload
        } as UsersActions.AddUserSuccess);
    });

    it('should create AddUserFailed', () => {
        const payload = {error: 'error'};
        const action = new UsersActions.AddUserFailed(payload);

        expect<UsersActions.AddUserFailed>({...action} as UsersActions.AddUserFailed).toEqual({
            type: UsersActions.ActionTypes.AddUserFailed,
            payload
        } as UsersActions.AddUserFailed);
    });

    it('should create DeleteUserRequest', () => {
        const payload = {user: new TestUser()};
        const action = new UsersActions.DeleteUserRequest(payload);

        expect<UsersActions.DeleteUserRequest>({...action} as UsersActions.DeleteUserRequest).toEqual({
            type: UsersActions.ActionTypes.DeleteUserRequest,
            payload
        } as UsersActions.DeleteUserRequest);
    });

    it('should create DeleteUserSuccess', () => {
        const payload = {user: new TestUser()};
        const action = new UsersActions.DeleteUserSuccess(payload);

        expect<UsersActions.DeleteUserSuccess>({...action} as UsersActions.DeleteUserSuccess).toEqual({
            type: UsersActions.ActionTypes.DeleteUserSuccess,
            payload
        } as UsersActions.DeleteUserSuccess);
    });
});
