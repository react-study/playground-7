import React, {Component} from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import {connect} from 'react-redux';
import BankAction from './action/BankAction';

const mapStateToProps = state => ({
    accountList: state.accountList
});

const mapDispatchToProps = dispatch => ({
    calc: (type, money) => dispatch({
        type, money
    })
});


/*
class App extends Component {
    // state = {
    //     accountList: [],
    // };

     calc = (type, money) => {
     money = +money;
     if (typeof money !== 'number') return;
     const prevAccount = this.state.accountList;
     const lastResult = prevAccount.length
     ? prevAccount[prevAccount.length - 1].result
     : 0;
     this.setState({
     accountList: [...this.state.accountList, {
     type,
     money,
     result: lastResult + (type === 'save' ? 1 : -1) * money
     }]
     });
     }

    render() {
        const {
            accountList,
            calc
        } = this.props;

        return (
            <div>
                <InputBox
                    calc={calc}
                />
                <AccountBook
                    accountList={accountList}
                />
            </div>
        )
    }
}
*/

const App = ({accountList, calc}) => (
    <div>
        <InputBox calc={calc}/>
        <AccountBook accountList={accountList}/>
    </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
// const ConnectContainer = connect(mapStateToProps, mapDispatchToProps);