import React from 'react';
import Header from 'Header';
import Cashlist from 'Cashlist';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            cashlists : [
                {income: null,
                outcome: null,
                total:0}
            ],
            temptotal:0
        };
    }

    addCashList = (cash,sign) => {
        let gettemptotal;
        if(sign==='+'){ gettemptotal = this.state.temptotal + cash}
            else{gettemptotal = this.state.temptotal - cash};
        
        this.setState({
            cashlists: [...this.state.cashlists, {
                income: (sign==='+'?cash:null),
                outcome: (sign==='-'?cash:null),
                id: Date.now(),
                total : gettemptotal
            }], temptotal:gettemptotal
        });

        console.log(this.state.cashlists);
    }

    render() {
        const {
            cashlists
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
