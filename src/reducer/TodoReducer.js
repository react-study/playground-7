const initialState = {
    todos: [],
    editingId: null,
};

const TodoReducer = (prevState = initialState, action) => {
    switch(action.type) {
        case 'GET_TODOS':
            return Object.assign({}, prevState, {
                todos: action.todos
            });
        case 'ADD_TODO':
            return Object.assign({}, prevState, {
                todos: [...prevState.todos, action.newTodo]
            });
        case 'DELETE_TODO': {
            const newTodos = [...prevState.todos];
            const targetIndex = newTodos.findIndex(v => v.id === action.id);
            newTodos.splice(targetIndex, 1);
            return Object.assign({}, prevState, {
                todos: newTodos
            });
        }
        case 'START_EDIT':
            return Object.assign({}, prevState, {
                editingId: action.id
            });
        case 'SAVE_TODO': {
            const newTodos = [...prevState.todos];
            const targetIndex = newTodos.findIndex(v => v.id === action.id);
            newTodos[targetIndex] = action.editedTodo;
            return {
                todos: newTodos,
                editingId: null
            };
        }
        case 'CANCEL_EDIT':
            return Object.assign({}, prevState, {
                editingId: null
            });
        case 'TOGGLE_TODO': {
            const newTodos = [...prevState.todos];
            const targetIndex = newTodos.findIndex(v => v.id === action.id);
            newTodos.splice(targetIndex, 1, action.editedTodo);
            return Object.assign({}, prevState, {
                todos: newTodos
            });
        }
        case 'TOGGLE_ALL':
            return Object.assign({}, prevState, {
                todos: action.editedTodos
            });
        case 'CLEAR_COMPLETED': {
            const newTodos = [...prevState.todos].filter(v => !v.isDone);
            return Object.assign({}, prevState, {
                todos: newTodos
            });
        }
        default: return prevState;
    }
}

export default TodoReducer;