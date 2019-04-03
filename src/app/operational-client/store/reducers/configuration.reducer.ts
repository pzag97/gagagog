import { ConfigurationActions } from '../actions';

export interface State {
    selectedConfiguration: object;
}

export const initialState: State = {
    selectedConfiguration: null
};

export function reducer(state = initialState, action: ConfigurationActions.ActionsUnion) {
    switch (action.type) {
        case ConfigurationActions.ActionTypes.LoadConfigSuccess:
            return {
                ...state,
                selectedConfiguration: action.payload.config
            };
        case ConfigurationActions.ActionTypes.SelectConfig:
            return {
                ...state,
                selectedConfiguration: action.payload.config
            };
        default:
            return state;
    }
}

export const getSelected = (state: State) => state.selectedConfiguration;
