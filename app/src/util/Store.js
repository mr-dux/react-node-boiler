import reducers from '../reducers';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'


const history = createHistory();
const store = createStore(reducers, applyMiddleware(thunk, routerMiddleware(history)));

export {history};
export default store;
