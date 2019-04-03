import { LayoutActions } from './';

describe('LayoutActions', () => {
    it('should create SetTitle', () => {
        const payload = {title: 'MyTitle'};
        const action = new LayoutActions.SetTitle(payload);

        expect({...action} as LayoutActions.SetTitle).toEqual({
            type: LayoutActions.ActionTypes.SetTitle,
            payload
        } as LayoutActions.SetTitle);
    });
});
