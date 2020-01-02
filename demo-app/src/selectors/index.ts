import { createSelector } from 'reselect';
import IStoreState from "../store/IStoreState";
const pendingActionsSelector = (state: IStoreState) => state.pendingActions;
export const isPendingActions = createSelector(
    [pendingActionsSelector],
    pendingActions => pendingActions > 0
);
export const makeId = (length: number): string => {
    let result: string = '';
    const characters: string= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

