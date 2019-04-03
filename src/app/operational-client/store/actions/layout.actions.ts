import { Action } from '@ngrx/store';

export enum ActionTypes {
    SetTitle = '[Layout] Set Title'
}

export class SetTitle implements Action {
    readonly type = ActionTypes.SetTitle;

    constructor(public payload: { title: string }) {
    }
}

export type ActionsUnion = SetTitle;
