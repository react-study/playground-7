import React from 'react';

class AccountItem extends React.Component {

    render(){
        return(
            <tr>
                <td>
                    { this.props.isAdd ? this.props.money : 0 }
                </td>
                <td>
                    { this.props.isAdd ? 0 : this.props.money }
                </td>
                <td>
                    { this.props.balanceValue }
                </td>
            </tr>
        );
    }
}

export default AccountItem;
