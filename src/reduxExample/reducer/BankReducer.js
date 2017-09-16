const initialState = {accountList: []};

const BankReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'SAVE_MONEY': {
            const money = +action.money;
            // if (typeof money !== 'number') return;
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
            // if (typeof money !== 'number') return;
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
        default:
            return prevState;
        //reducer에서 처음 한번 발생
    }
    // return newState;
};

export  default BankReducer;