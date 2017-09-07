import React from 'react';

class Account extends React.Component {

    render() {
        const {
            depositM,
            withdrawM,
            nowBalance
        } = this.props;
        return (
            <tr>
                <td>{depositM}</td>
                <td>{withdrawM}</td>
                <td>{nowBalance}</td>
            </tr>
        );
    }
}

export default Account;
