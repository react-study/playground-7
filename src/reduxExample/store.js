import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import BankReducer from './reducer/BankReducer';
import TabReducer from './reducer/TabReducer';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({
    collapsed: true,
    diff: true
});

const store = createStore(
    combineReducers({
        bank: BankReducer,
        tab: TabReducer
    }),
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;

// createStore(BankReducer)
// store.state = {accountList: []}
// createStore(combineReducer({bank: ..., tab: ...}))