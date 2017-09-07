import React from 'react';
import Account from 'Account';

class AccountBook extends React.Component {

    render() {
        const {
            history
        } = this.props;
        return (
            <table>
                <thead>
                <tr>
                    <th>입금</th>
                    <th>출금</th>
                    <th>잔액</th>
                </tr>
                </thead>
                <tbody>
                {history.map((v) => (
                    <Account
                        key={`history#${v.id}`}
                        depositM={v.depositM}
                        withdrawM={v.withdrawM}
                        nowBalance={v.nowBalance}
                    />
                ))}
                </tbody>
            </table>
        );
    }
}

export default AccountBook;
