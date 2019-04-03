import { ConfigurationRequestParams } from '@app/operational-client/models/configuration.model';
import { ConfigurationActions } from './';
import configurationMock from '../../mocks/configuration-mock.json';


describe('ConfigurationActions', () => {
    it('should create LoadConfigRequest', () => {
        const payload: { params: ConfigurationRequestParams } = {params: {app: 'app', version: 'version', build: 1}};
        const action = new ConfigurationActions.LoadConfigRequest(payload);

        expect({...action} as ConfigurationActions.LoadConfigRequest).toEqual({
            type: ConfigurationActions.ActionTypes.LoadConfigRequest,
            payload
        } as ConfigurationActions.LoadConfigRequest);
    });

    it('should create LoadConfigSuccess', () => {
        const payload = {config: configurationMock};
        const action = new ConfigurationActions.LoadConfigSuccess(payload);

        expect({...action} as ConfigurationActions.LoadConfigSuccess).toEqual({
            type: ConfigurationActions.ActionTypes.LoadConfigSuccess,
            payload
        } as ConfigurationActions.LoadConfigSuccess);
    });

    it('should create SelectConfig', () => {
        const payload = {config: configurationMock};
        const action = new ConfigurationActions.SelectConfig(payload);

        expect({...action} as ConfigurationActions.SelectConfig).toEqual({
            type: ConfigurationActions.ActionTypes.SelectConfig,
            payload
        } as ConfigurationActions.SelectConfig);
    });
});
