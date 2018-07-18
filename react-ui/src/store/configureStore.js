import { createStore, combineReducers } from 'redux';
import blepsReducer from '../reducers/bleps';
import fitlersReducer from '../reducers/filters';


export default () => {
    const store = createStore(
        combineReducers({
            bleps: blepsReducer,
            filters: fitlersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}