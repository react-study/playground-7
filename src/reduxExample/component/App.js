import React, { Component} from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import Tab from './Tab';
import { connect } from 'react-redux';
import BankAction from '../action/BankAction';
import TabAction from '../action/TabAction';

const mapStateToProps = state => ({
    accountList: state.bank.accountList,
    effect: state.bank.effect,
    focused: state.tab.focused,
});

const mapDispatchToProps = dispatch => ({
    calc: (type, money) => dispatch(BankAction[type](money)),
    changeTab: index => dispatch(TabAction.changeTab(index))
    // type: 'save' or 'withdraw'
    // money: 숫자(문자열)

    // BankAction['save'](money)
    // === BankAction.save(money)
    // === { type: 'SAVE_MONEY', money }

    // BankAction['withdraw'](money)
    // === BankAction.withdraw(money)
    // === { type: 'WITHDRAW_MONEY', money }

});

const App = ({
    accountList,
    calc,
    focused,
    changeTab,
    effect
}) => (
    <div style={{backgroundColor: effect ? '#ff0' : '#fff'}}>
        <Tab focused={focused} changeTab={changeTab} />
        <InputBox calc={calc} />
        <AccountBook accountList={accountList} />
    </div>
);
export default connect(mapStateToProps, mapDispatchToProps)(App);

    /* state = {
        accountList: [],
    };
    calc = (type, money) => {
        money = +money;
        if(typeof money !== 'number') return;
        const prevAccount = this.state.accountList;
        const lastResult = prevAccount.length
            ? prevAccount[prevAccount.length - 1].result
            : 0;
        this.setState({
            accountList: [...this.state.accountList, {
                type,
                money,
                result: lastResult + (type === 'save' ? 1 : -1) * money
            }]
        });
    }
    */

