import React from 'react';

class Cashlist extends React.Component {

    render() {
        const {
            cashlists
        } = this.props;


        return (
                <tbody>
                    {cashlists.map((v) => (
                        <tr key={`cashlist#${v.id}`}>
                            <td>{v.income}</td>
                            <td>{v.outcome}</td>
                            <td className={v.total<0?'minus':'plus'}>{v.total}</td>
                        </tr>
                    ))}
                </tbody>
        )
    }
}

export default Cashlist;