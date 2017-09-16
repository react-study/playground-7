// 요 칭구들은 함수로 action을 만드는 애들임. 이를 action creator 라고 부름.
const save = money => ({
    type: 'SAVE_MONEY',
    money
});

const withdraw = money => ({
    type: 'WITHDRAW_MONEY',
    money
});

export default {
    save,
    withdraw
}