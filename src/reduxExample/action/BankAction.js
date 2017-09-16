const addEffect = () => {
    return dispatch => {
        dispatch({ type: 'SHOW_EFFECT' });
        setTimeout(() => {
            dispatch({ type: 'HIDE_EFFECT' });
        }, 500);
    }
}

const save = money => {
    return dispatch => {
        dispatch({
            type: 'SAVE_MONEY',
            money
        });
        dispatch(addEffect());
    }
}

const withdraw = money => ({
    type: 'WITHDRAW_MONEY',
    money
});

// save, withdraw 함수들을 'action creator'라 부릅니다.

export default {
    save,
    withdraw
};