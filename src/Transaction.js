import React from 'react';


import ClassNames from 'classnames';

class Transaction extends React.Component {
    render() {
        const {
            amount,
            depositStatus,
            balance,
        } = this.props;

        return (
            <tr className={
                ClassNames({
                    add: depositStatus,
                    subtract: !depositStatus
                })
            }>
                <td>
                    {depositStatus ? amount + '원' : "0"}
                </td>
                <td>
                    {!depositStatus ? amount + '원' : "0"}
                </td>
                <td>
                    {balance + '원'}
                </td>
            </tr>
        );
    }
}

export default Transaction;
