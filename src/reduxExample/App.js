import React, { Component} from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';

class App extends Component {
    state = {
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
    render() {
        return (
            <div>
                <InputBox
                    calc={this.calc}
                />
                <AccountBook
                    accountList={this.state.accountList}
                />
            </div>
        )
    }
}

export default App;