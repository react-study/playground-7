import update from 'immutability-helper';
const initialState = {
    todos: [],
    editingId: null,
};

const TodoReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case 'GET_TODOS':
            return update(prevState, {
                todos: {
                    $set: action.todos
                }
            });
        case 'ADD_TODO':
            return update(prevState, {
                todos: {
                    $push: [ action.newTodo ]
                }
            });
        case 'DELETE_TODO':
            return update(prevState, {
                todos: {
                    $splice: [
                        [ prevState.todos.findIndex(v => v.id === action.id), 1 ]
                    ]
                }
            });
        case 'START_EDIT':
            return update(prevState, {
                editingId: {
                    $set: action.id
                }
            });
        case 'SAVE_TODO':
            return update(prevState, {
                todos: {
                    [prevState.todos.findIndex(v => v.id === action.id)]: {
                        $set: action.editedTodo
                    }
                },
                editingId: {
                    $set: null
                }
            });
        case 'CANCEL_EDIT':
            return update(prevState, {
                editingId: {
                    $set: null
                }
            });
        case 'TOGGLE_TODO':
            return update(prevState, {
                todos: {
                    $splice: [[
                        prevState.todos.findIndex(v => v.id === action.id),
                        1,
                        action.editedTodo
                    ]]
                }
            });
        case 'TOGGLE_ALL':
            return update(prevState, {
                todos: {
                    $set: action.editedTodos
                }
            });
        case 'CLEAR_COMPLETED':
            return update(prevState, {
                todos: {
                    $apply: todos => todos.filter(v => !v.isDone)
                }
            });
        default: return prevState;
    }
}

export default TodoReducer;