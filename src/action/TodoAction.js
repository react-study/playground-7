import axios from 'axios';
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

const TodoAction = {
    getTodos: () => dispatch => {
        ax.get('/')
        .then(res => {
            dispatch({
                type: 'GET_TODOS',
                todos: res.data
            });
        });
    },
    addTodo: (text) => dispatch => {
        ax.post('/', { text })
        .then(res => {
            dispatch({
                type: 'ADD_TODO',
                newTodo: res.data
            });
        });
    },
    deleteTodo: (id) => dispatch => {
        ax.delete(`/${id}`)
        .then(() => {
            dispatch({
                type: 'DELETE_TODO',
                id
            });
        });
    },
    startEdit: (id) => ({
        type: 'START_EDIT',
        id
    }),
    saveTodo: (id, newText) => dispatch => {
        ax.put(`/${id}`, { text: newText })
        .then(res => {
            dispatch({
                type: 'SAVE_TODO',
                editedTodo: res.data,
                id
            });
        });
    },
    cancelEdit: () => ({
        type: 'CANCEL_EDIT'
    }),
    toggleTodo: (id) => (dispatch, getState) => {
        const newTodos = getState().todos;
        const targetIndex = newTodos.findIndex(v => v.id === id);
        const newDone = !newTodos[targetIndex].isDone;
        ax.put(`/${id}`, { isDone: newDone })
        .then(res => {
            dispatch({
                type: 'TOGGLE_TODO',
                id,
                editedTodo: res.data
            });
        });
    },
    toggleAll: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const newDone = prevTodos.some(v => !v.isDone);
        const axArray = prevTodos.map(v =>
            ax.put(`/${v.id}`, { isDone: newDone })
        );
        axios.all(axArray)
        .then(res => {
            dispatch({
                type: 'TOGGLE_ALL',
                editedTodos: res.map(r => r.data)
            });
        });
    },
    clearCompleted: () => (dispatch, getState) => {
        const prevTodos = getState().todos;
        const axArray = prevTodos
            .filter(v => v.isDone)
            .map(todo => ax.delete(`/${todo.id}`));
        axios.all(axArray)
        .then(() => {
            dispatch({
                type: 'CLEAR_COMPLETED'
            });
        });
    }
};

export default TodoAction;