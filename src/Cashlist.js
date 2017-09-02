import React from 'react';

class Cashlist extends React.Component {

    render() {
        const {
            cashlists
        } = this.props;// destructuring 을 사용하자!!


        return (
                <tbody>
                    {cashlists.map((v) => (
                        <tr key={`cashlist#${v.id}`}>
                            <td>{v.income}</td>
                            <td>{v.outcome}</td>
                            <td>{v.total}</td>
                        </tr>
                    ))}
                </tbody>
        )
    }
}

export default Cashlist;