import React, { Component} from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import { connect } from 'react-redux';
import BankAction from './action/BankAction'

const mapStateToProps = state => ({
    accountList: state.accountList // store로부터 accountList state 값을 받아오자
});
// 인자로 상태를 받음, 객체를 반환
const mapDispatchToProps = state => ({
    // 기본적인  action
    // clac: (type, money) => dispatch({
    //     type: type, // 이름과 키가 같으면
    //     money       // 이렇게 키 값만 넣어서 축약할 수 있음!
    // }) // 이게 하나의 action 이다

    // action creator 를 호출해보자!
    clac: (type, money) => dispatch(
        BankAction[type](money)
    )

    // BankAction[type](money)
    // BankAction['save'](1)
    // === BankAction.save(1)
    // === {type: SAVE_MONEY, money: 1}

});

class App extends Component {
    // 아래 스테이트 값은 리덕스로 옮길 수 있다.
    // state = {
    //     accountList: [],
    // };

    // 아래 함수도 주석처리, 안 씀!! dispatch로 메서들 받아요오면 됨 ~_~
    // calc = (type, money) => {
    //     money = +money;
    //     if(typeof money !== 'number') return;
    //     const prevAccount = this.state.accountList;
    //     const lastResult = prevAccount.length
    //         ? prevAccount[prevAccount.length - 1].result
    //         : 0;
    //     this.setState({
    //         accountList: [...this.state.accountList, {
    //             type,
    //             money,
    //             result: lastResult + (type === 'save' ? 1 : -1) * money
    //         }]
    //     });
    // }

    render() {
        const {
            accountList,
            calc
        } = this.props;

        return (
            <div>
                <InputBox
                    calc={calc} // connect를 통해서 props로 받아옴~
                />
                <AccountBook
                    accountList={accountList}
                />
            </div>
        )
    }
}

// 위의 방법을 stateless component방법으로 바꿀 수 있음
// const App = ({
//     accountList,
//     calc
// }) => (
//     <div>
//         <InputBox
//             calc={calc}
//         />
//         <AccountBook
//             accountList={accountList}
//         />
//     </div>
// )
export default connect (mapStateToProps, mapDispatchToProps)(App);