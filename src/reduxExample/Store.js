import {createStore} from 'redux';
import BankReducer from './reducer/BankReducer';

const store = createStore(BankReducer);

export default store;

