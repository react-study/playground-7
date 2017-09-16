const initialState = { accountList: [] };

const BankReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case 'SAVE_MONEY': {
            const money = +action.money;
            const prevAccount = prevState.accountList;
            const lastResult = prevAccount.length
                ? prevAccount[prevAccount.length - 1].result
                : 0;

            return {
                accountList: [...prevState.accountList, {
                    type: 'save',
                    money,
                    result: lastResult + money
                }]
            };
        }
        case 'WITHDRAW_MONEY': {
            const money = +action.money;
            const prevAccount = prevState.accountList;
            const lastResult = prevAccount.length
                ? prevAccount[prevAccount.length - 1].result
                : 0;

            return {
                accountList: [...prevState.accountList, {
                    type: 'withdraw',
                    money,
                    result: lastResult - money
                }]
            };
        }
        default: return prevState;
    }
}

export default BankReducer;