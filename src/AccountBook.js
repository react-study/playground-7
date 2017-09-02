import React from 'react';
import AccountItem from './AccountItem';

class AccountBook extends React.Component {

    render(){

        let balanceValue = 0,
            isAdd = true;

        return(
            <div className="account-app__main">
                <table className="account-list">
                    <thead>
                        <tr>
                            <th>입금</th>
                            <th>출금</th>
                            <th>잔액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.account.map(v => {
                            balanceValue += v.money;
                            isAdd = v.money > 0 ? true : false;
                            return(<AccountItem
                                key={ `account#${v.id}` }
                                isAdd = { isAdd }
                                money={ Math.abs(v.money) }
                                balanceValue = { balanceValue }
                            />);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default AccountBook;
