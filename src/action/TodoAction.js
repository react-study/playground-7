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
        const tempId = 'temp_' + Date.now();
        dispatch({
            type: 'ADD_TODO_REQUEST',
            newTodo: {
                id: tempId,
                text,
                isDone: false
            }
        });

        ax.post('/', { text })
        .then(res => {
            dispatch({
                type: 'ADD_TODO_SUCCESS',
                tempId,
                newTodo: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: 'ADD_TODO_FAILED',
                tempId
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
    saveTodo: (id, newText) => (dispatch, getState) => {
        const prevText = getState().todos.find(v => v.id === id).text;
        dispatch({
            type: 'SAVE_TODO_REQUEST',
            id,
            newText
        });

        ax.put(`/${id}`, { text: newText })
        .then(res => {
            dispatch({
                type: 'SAVE_TODO_SUCCESS',
                id,
                editedTodo: res.data,
            });
        })
        .catch(err => {
            dispatch({
                type: 'SAVE_TODO_FAILED',
                id,
                newText: prevText
            });
        })
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