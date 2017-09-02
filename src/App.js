import React from 'react';

import InputBox from './InputBox';
import AccountBook from './AccountBook';

class App extends React.Component {

    state = {
        account: [{
            money: 100,
            id: 1111
        }, {
            money: -200,
            id: 2222
        }, {
            money: 300,
            id: 3333
        }, {
            money: -400,
            id: 4444
        }, {
            money: 500,
            id: 5555
        }]
    };

    insertData = money => {
        this.setState({
            account: [... this.state.account, {
                money: money,
                id: Date.now()
            }]
        });
    }

    render() {
        return(
            <div className="account-app">
                <InputBox
                    insertData = {this.insertData}
                />
                <AccountBook
                    account = {this.state.account}
                />
            </div>
        );
    }
}

export default App;
