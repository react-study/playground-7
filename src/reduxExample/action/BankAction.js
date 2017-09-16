//객체 하나하나가 action자체 입니다

const save = money => ({
    type: 'SAVE_MONEY',
    money
});

const withdraw = money => ({
    type: 'WITHDRAW_MONEY',
    money
});

// save, withdraw 함수들을 'action creator'라 부른다

export default {
    save,
    withdraw
}