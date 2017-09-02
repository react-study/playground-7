import React from 'react';
import Header from 'Header';
import Cashlist from 'Cashlist';
import axios from 'axios';


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cashlists : [
                {income: 0,
                outcome: 0,
                total:0}
            ],
            temptotal:0
        };
        
    }

    addCashList = (cash,sign) => {
        let gettemptotal;
        if(sign==='+'){ gettemptotal = parseInt(this.state.temptotal) + parseInt(cash)}
            else{gettemptotal = parseInt(this.state.temptotal) - parseInt(cash)};
        console.log(this.state.temptotal);
        this.setState({
            cashlists: [...this.state.cashlists, {
                income: (sign==='+'?cash:0),
                outcome: (sign==='-'?cash:0),
                id: Date.now(),
                total : gettemptotal
            }], temptotal:gettemptotal
        });
    }

    render() {
        const {
            cashlists,
            temptotal,
            total
        } = this.state;

        return (
            <div className="cashbook">
                <Header
                    addCashList={this.addCashList}
                />
                <table className="cashbook_table">
                <thead>
                    <tr>
                        <th>입금</th>
                        <th>출금</th>
                        <th>잔액</th>
                    </tr>
                </thead>
                <Cashlist
                    cashlists={cashlists}
                />
                </table>
            </div>
        );
    }
}

export default App;
