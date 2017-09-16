import {createStore} from 'redux';
import BankReducer from './reducer/BankReducer';

// const store = createStore(BankReducer);

const store = createStore(
    BankReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

