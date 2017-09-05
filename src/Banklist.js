import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {
    // constructor() {
    //     super();
    //     this.handleKeyDown = this.handleKeyDown.bind(this);
    // }
    // handleKeyDown = e => {
    //     const text = e.target.value;
    //     if(!text || e.keyCode !== 13) { // 엔터키를 치지 않았거나 텍스트가 없을경우
    //         return;
    //     }
    //     // console.dir(this);
    //     this.props.addTodo(text);
    //     e.target.value = '';
    // }

    render() {
        const {
            isAllDone,
            toggleAll
        } = this.props;

        return (
            <div>
                <table>
                    <tr>
                        <th>입금</th>
                        <th>출금</th>
                        <th>잔액</th>
                    </tr>
                    <tr>
                        <td>3000</td>
                        <td>0</td>
                        <td>3000</td>
                    </tr>
                    <tr>
                        <td>3000</td>
                        <td>0</td>
                        <td>3000</td>
                    </tr>
                    <tr>
                        <td>3000</td>
                        <td>0</td>
                        <td>3000</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Header;
