import { ApplicationActions } from './';
import { applicationsResponse } from '@app/operational-client/mocks/applications-mock';

describe('ApplicationsActions',  () => {
    it('should create LoadAppsRequest', () => {
        const action = new ApplicationActions.LoadAppsRequest();
        expect({...action} as ApplicationActions.LoadAppsRequest).toEqual({
            type: ApplicationActions.ActionTypes.LoadAppsRequest
        } as ApplicationActions.LoadAppsRequest);
    });

    it('should create LoadAppsSuccess', () => {
        const payload = {appResponse: applicationsResponse};

    });

    it('should create LoadAppsFailed', () => {

    });

    it('should create DeleteAppRequest', () => {

    });

    it('should create DeleteAppSuccess', () => {

    });

    it('should create DeleteAppFailed', () => {

    });

    it('should create CreateAppRequest', () => {

    });

    it('should create CreateAppSuccess', () => {

    });

    it('should create CreateAppFailed', () => {

    });

    it('should create SelectApp', () => {

    });

    it('should create SelectVersion', () => {

    });

    it('should create SelectBuild', () => {

    });
});
