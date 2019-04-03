import * as AuthActions from './auth.actions';
import { Credentials, TestUser } from '../../users/models/user';

describe('AuthActions', () => {
    it('should create LoginRequest', () => {
        const payload: Credentials = {username: 'test', password: 'password'};
        const action = new AuthActions.LoginRequest(payload);

        expect({...action} as AuthActions.LoginRequest).toEqual({
            type: AuthActions.ActionTypes.LoginRequest,
            payload
        } as AuthActions.LoginRequest);
    });

    it('should create LoginSuccess', () => {
        const payload = {user: new TestUser(), token: 'token'};
        const action = new AuthActions.LoginSuccess(payload);

        expect({...action} as AuthActions.LoginSuccess).toEqual({
            type: AuthActions.ActionTypes.LoginSuccess,
            payload
        } as AuthActions.LoginSuccess);
    });

    it('should create LoginFailed', () => {
        const payload = {error: 'error'};
        const action = new AuthActions.LoginFailed(payload);

        expect({...action} as AuthActions.LoginFailed).toEqual({
            type: AuthActions.ActionTypes.LoginFailed,
            payload
        } as AuthActions.LoginFailed);
    });

    it('should create LogoutRequest', () => {
        const action = new AuthActions.LogoutRequest();
        expect({...action} as AuthActions.LogoutRequest).toEqual({
            type: AuthActions.ActionTypes.LogoutRequest
        } as AuthActions.LogoutRequest);
    });

    it('should create LogoutSuccess', () => {
        const action = new AuthActions.LogoutSuccess();
        expect({...action} as AuthActions.LogoutSuccess).toEqual({
            type: AuthActions.ActionTypes.LogoutSuccess
        } as AuthActions.LogoutSuccess);
    });

    it('should create LoginRedirect', () => {
        const action = new AuthActions.LoginRedirect();
        expect({...action} as AuthActions.LoginRedirect).toEqual({
            type: AuthActions.ActionTypes.LoginRedirect
        } as AuthActions.LoginRedirect);
    });
});
