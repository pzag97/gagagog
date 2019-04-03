import { Action } from '@ngrx/store';
import { ConfigurationRequestParams } from '@app/operational-client/models/configuration.model';

export enum ActionTypes {
    LoadConfigRequest = '[Configuration] Load Request',
    LoadConfigSuccess = '[Configuration] Load Success',
    SelectConfig = '[Configuration] Select'
}

export class LoadConfigRequest implements Action {
    readonly type = ActionTypes.LoadConfigRequest;

    constructor(public payload: { params: ConfigurationRequestParams }) {
    }
}

export class LoadConfigSuccess implements Action {
    readonly type = ActionTypes.LoadConfigSuccess;

    constructor(public payload: { config: object }) {
    }
}

export class SelectConfig implements Action {
    readonly type = ActionTypes.SelectConfig;

    constructor(public payload: { config: object }) {
    }
}

export type ActionsUnion = LoadConfigRequest | LoadConfigSuccess | SelectConfig;