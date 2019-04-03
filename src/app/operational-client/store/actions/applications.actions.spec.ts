import { ApplicationActions } from './';
import { applicationsResponse } from '@app/operational-client/mocks/applications-mock';

describe('ApplicationsActions', () => {
    it('should create LoadAppsRequest', () => {
        const action = new ApplicationActions.LoadAppsRequest();
        expect({...action} as ApplicationActions.LoadAppsRequest).toEqual({
            type: ApplicationActions.ActionTypes.LoadAppsRequest
        } as ApplicationActions.LoadAppsRequest);
    });

    it('should create LoadAppsSuccess', () => {
        const payload = {appResponse: applicationsResponse};
        const action = new ApplicationActions.LoadAppsSuccess(payload);

        expect({...action} as ApplicationActions.LoadAppsSuccess).toEqual({
            type: ApplicationActions.ActionTypes.LoadAppsSuccess,
            payload
        } as ApplicationActions.LoadAppsSuccess);
    });

    it('should create LoadAppsFailed', () => {
        const action = new ApplicationActions.LoadAppsFailed();
        expect({...action} as ApplicationActions.LoadAppsFailed).toEqual({
            type: ApplicationActions.ActionTypes.LoadAppsFailed
        } as ApplicationActions.LoadAppsFailed);
    });

    it('should create DeleteAppRequest', () => {
        const payload = {app: applicationsResponse.Apps[0]};
        const action = new ApplicationActions.DeleteAppRequest(payload);

        expect({...action} as ApplicationActions.DeleteAppRequest).toEqual({
            type: ApplicationActions.ActionTypes.DeleteAppRequest,
            payload
        } as ApplicationActions.DeleteAppRequest);
    });

    it('should create DeleteAppSuccess', () => {
        const payload = {app: applicationsResponse.Apps[0]};
        const action = new ApplicationActions.DeleteAppSuccess(payload);

        expect({...action} as ApplicationActions.DeleteAppSuccess).toEqual({
            type: ApplicationActions.ActionTypes.DeleteAppSuccess,
            payload
        } as ApplicationActions.DeleteAppSuccess);
    });

    it('should create DeleteAppFailed', () => {
        const payload = {error: 'error'};
        const action = new ApplicationActions.DeleteAppFailed(payload);

        expect({...action} as ApplicationActions.DeleteAppFailed).toEqual({
            type: ApplicationActions.ActionTypes.DeleteAppFailed,
            payload
        } as ApplicationActions.DeleteAppFailed);
    });

    it('should create CreateAppRequest', () => {
        const payload = {name: 'app.name'};
        const action = new ApplicationActions.CreateAppRequest(payload);

        expect({...action} as ApplicationActions.CreateAppRequest).toEqual({
            type: ApplicationActions.ActionTypes.CreateAppRequest,
            payload
        } as ApplicationActions.CreateAppRequest);
    });

    it('should create CreateAppSuccess', () => {
        const payload = {app: applicationsResponse.Apps[0]};
        const action = new ApplicationActions.CreateAppSuccess(payload);

        expect({...action} as ApplicationActions.CreateAppSuccess).toEqual({
            type: ApplicationActions.ActionTypes.CreateAppSuccess,
            payload
        } as ApplicationActions.CreateAppSuccess);
    });

    it('should create CreateAppFailed', () => {
        const payload = {error: 'error'};
        const action = new ApplicationActions.CreateAppFailed(payload);

        expect({...action} as ApplicationActions.CreateAppFailed).toEqual({
            type: ApplicationActions.ActionTypes.CreateAppFailed,
            payload
        } as ApplicationActions.CreateAppFailed);
    });

    it('should create SelectApp', () => {
        const payload = {app: applicationsResponse.Apps[0]};
        const action = new ApplicationActions.SelectApp(payload);

        expect({...action} as ApplicationActions.SelectApp).toEqual({
            type: ApplicationActions.ActionTypes.SelectApp,
            payload
        } as ApplicationActions.SelectApp);
    });

    it('should create SelectVersion', () => {
        const payload = {version: applicationsResponse.Apps[0].Versions[0]};
        const action = new ApplicationActions.SelectVersion(payload);

        expect({...action} as ApplicationActions.SelectVersion).toEqual({
            type: ApplicationActions.ActionTypes.SelectVersion,
            payload
        } as ApplicationActions.SelectVersion);
    });

    it('should create SelectBuild', () => {
        const payload = {build: applicationsResponse.Apps[0].Versions[0].Builds[0]};
        const action = new ApplicationActions.SelectBuild(payload);

        expect({...action} as ApplicationActions.SelectBuild).toEqual({
            type: ApplicationActions.ActionTypes.SelectBuild,
            payload
        } as ApplicationActions.SelectBuild);
    });
});
