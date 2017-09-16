const TabReducer = (prevState = { focused: 0 }, action) => {
    switch(action.type) {
        case 'CHANGE_TAB':
            return {
                focused: action.focused
            };
        default: return prevState;
    }
}

export default TabReducer;