import React from 'react';

import InputBox from 'InputBox';
import AccountBook from 'AccountBook';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            balance: 0,
            history: []
        };
    }

    /*
     history : [{
     'id' : '',
     'depositMoney' : 0,
     'withdrawMoney' : 0,
     'balance' : 0
     }]
     */

    //예금
    deposit = money => {
        this.setState({
            balance: this.state.balance + money * 1
        })
    };

    //출금
    withdraw = money => {
        if (this.state.balance <= 0) {
            alert('잔액이 부족합니다.');
            return false;
        } else {
            this.setState({
                balance: this.state.balance - money * 1
            })
            return true;
        }
    };

    addHistory = (depositM, withdrawM) => {
        let nowBalance = this.state.balance + depositM - withdrawM;
        this.setState({
            history: [...this.state.history, {
                depositM,
                withdrawM,
                nowBalance,
                id: Date.now()
            }]
        })
    };

    render() {
        const {
            balance,
            history
        } = this.state;
        return (
            <div className="seoheely-home">
                <InputBox
                    deposit={this.deposit}
                    withdraw={this.withdraw}
                    addHistory={this.addHistory}
                />
                <AccountBook
                    balance={balance}
                    history={history}
                />
            </div>
        );
    }
}

export default App;
