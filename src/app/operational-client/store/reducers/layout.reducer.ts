import { LayoutActions } from '../actions';

export interface State {
    title: string;
}

export const initialState: State = {
    title: null
};

export function reducer(state = initialState, action: LayoutActions.ActionsUnion) {
    switch (action.type) {
        case LayoutActions.ActionTypes.SetTitle:
            return {
                ...state,
                title: action.payload.title
            };
        default:
            return state;
    }
}

export const getTitle = (state: State) => state.title;
