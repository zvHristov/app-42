import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import IStoreState from './IStoreState';
import rootReducer from '../reducers/rootReducer';
export default function configureStore() {
    // @ts-ignore
    return createStore<IStoreState>(
        rootReducer,
        applyMiddleware(thunkMiddleware)
    );
}
