import React from 'react';

import Transaction from './Transaction';

class AccountBook extends React.Component {

    render() {
        const {
            transactions,
        } = this.props;

        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>입금</th>
                        <th>출금</th>
                        <th>잔액</th>
                    </tr>
                        {transactions.map((v) => (
                            <Transaction
                                key={`transaction#${v.id}`}
                                amount={v.amount}
                                depositStatus={v.depositStatus}
                                balance={v.balance}
                            />
                        )) }
                    </tbody>

                </table>
            </div>
        );
    }
}

export default AccountBook;
