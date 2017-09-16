//store는 react와 전혀 무관한 객체

import {createStore} from 'redux';
import BankReducer from './reducer/BankReducer';

const store = createStore(BankReducer);

export default store;