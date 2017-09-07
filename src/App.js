import React from 'react';

import InputBox from './InputBox';
import AccountBook from './AccountBook';

// import axios from 'axios';

class App extends React.Component {

    state = {
        transactions: [],
        totalBalance: 0
    };

    deposit = (amount) => {
        let currentBalance = this.state.totalBalance + amount * 1;
        this.setState({
            transactions: [ ... this.state.transactions, {
                amount,
                depositStatus: true,
                id: Date.now(),
                balance: currentBalance
            }],
            totalBalance: this.state.totalBalance + amount * 1
        })
    };

    withdrawal = (amount) => {
        let currentBalance = this.state.totalBalance - amount * 1;
        this.setState({
            transactions: [ ... this.state.transactions, {
                amount,
                depositStatus: false,
                id: Date.now(),
                balance: currentBalance
            }],
            totalBalance: this.state.totalBalance - amount * 1
        })
    };

    render() {
        return (
            <div className="todo-app">
                <InputBox
                    deposit={this.deposit}
                    withdrawal={this.withdrawal}
                />
                <AccountBook
                    transactions={this.state.transactions}
                />
            </div>
        );
    }
    }

export default App;
