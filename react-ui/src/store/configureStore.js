import { createStore, combineReducers, applyMiddleware } from 'redux';
import blepsReducer from '../reducers/bleps';
import fitlersReducer from '../reducers/filters';
import thunk from 'redux-thunk';


export default () => {
    const store = createStore(
        combineReducers({
            bleps: blepsReducer,
            filters: fitlersReducer
        }),
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}