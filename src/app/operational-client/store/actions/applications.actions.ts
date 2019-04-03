import { Action } from '@ngrx/store';
import { AppInterface, AppBuildInterface, AppResponseInterface, AppVersionInterface } from '../../models/application.model';

export enum ActionTypes {
    LoadAppsRequest = '[Applications] Load Applications Request',
    LoadAppsSuccess = '[Applications] Load Applications Success',
    LoadAppsFailed = '[Applications] Load Applications Failed',
    DeleteAppRequest = '[Applications] Delete Application Request',
    DeleteAppSuccess = '[Applications] Delete Application Success',
    DeleteAppFailed = '[Applications] Delete Application Failed',
    CreateAppRequest = '[Applications] Create Application Request',
    CreateAppSuccess = '[Applications] Create Application Success',
    CreateAppFailed = '[Applications] Create Application Failed',
    SelectApp = '[Applications] Select App',
    SelectVersion = '[Applications] Select Version',
    SelectBuild = '[Applications] Select Build'
}

export class LoadAppsRequest implements Action {
    readonly type = ActionTypes.LoadAppsRequest;
}

export class LoadAppsSuccess implements Action {
    readonly type = ActionTypes.LoadAppsSuccess;

    constructor(public payload: { appResponse: AppResponseInterface }) {
    }
}

export class LoadAppsFailed implements Action {
    readonly type = ActionTypes.LoadAppsFailed;
}

export class DeleteAppRequest implements Action {
    readonly type = ActionTypes.DeleteAppRequest;

    constructor(public payload: { app: AppInterface }) {
    }
}

export class DeleteAppSuccess implements Action {
    readonly type = ActionTypes.DeleteAppSuccess;

    constructor(public payload: { app: AppInterface }) {
    }
}

export class DeleteAppFailed implements Action {
    readonly type = ActionTypes.DeleteAppFailed;

    constructor(public payload: { error: string }) {
    }
}

export class CreateAppRequest implements Action {
    readonly type = ActionTypes.CreateAppRequest;

    constructor(public payload: { name: string }) {
    }
}

export class CreateAppSuccess implements Action {
    readonly type = ActionTypes.CreateAppSuccess;

    constructor(public payload: { app: AppInterface }) {
    }
}

export class CreateAppFailed implements Action {
    readonly type = ActionTypes.CreateAppFailed;

    constructor(public payload: { error: string }) {
    }
}

export class SelectApp implements Action {
    readonly type = ActionTypes.SelectApp;

    constructor(public payload: { app: AppInterface }) {
    }
}

export class SelectVersion implements Action {
    readonly type = ActionTypes.SelectVersion;

    constructor(public payload: { version: AppVersionInterface }) {
    }
}

export class SelectBuild implements Action {
    readonly type = ActionTypes.SelectBuild;

    constructor(public payload: { build: AppBuildInterface }) {
    }
}

export type ActionsUnion =
    LoadAppsRequest |
    LoadAppsSuccess |
    LoadAppsFailed |
    DeleteAppRequest |
    DeleteAppSuccess |
    DeleteAppFailed |
    CreateAppRequest |
    CreateAppSuccess |
    CreateAppFailed |
    SelectApp |
    SelectVersion |
    SelectBuild;
