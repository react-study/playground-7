const save = money => ({
    type: 'SAVE_MONEY',
    money
});

const withdraw = money => ({
    type: 'WITHDRAW_MONEY',
    money
});

// save, withdraw 함수들을 'action creator'라 부릅니다.

export default {
    save,
    withdraw
};