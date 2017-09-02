import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import axios from 'axios';

const ax = axios.create({
    // process.env === 'production' ? 'http://naver.com/todos' : 'http://localhost:2403/todos'
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            editingId: null,
            selectedFilter: 'All'
        };
        ax.get('/')
        .then(res => {
            this.setState({
                todos: res.data
            });
        });
    }

    addTodo = text => {
        // state를 바꿔주면 됐는데
        // server 요청하고 -> res오면 -> 그제서야 반영
        // server에서 에러가 나면 -> 화면에도 반영하지 말아야 합니다.
        ax.post('/', { text })
        .then(res => {
            this.setState({
                todos: [...this.state.todos, res.data]
            });
        });
    }

    deleteTodo = id => {
        // 서버에서 return되는 값이 없다
        // id삭제 => 삭제 성공하면, 무얼 반환해야 하지? 할게 없는 상황...
        // 낙관적으로 믿고 따르는 수밖에...
        ax.delete(`/${id}`)
        .then(() => {
            const newTodos = [...this.state.todos];
            const targetIndex = newTodos.findIndex(v => v.id === id);
            newTodos.splice(targetIndex, 1);
            this.setState({
                todos: newTodos
            });
        });
    }

    startEdit = id => {
        this.setState({
            editingId: id
        });
    }

    saveTodo = (id, newText) => {
        ax.put(`/${id}`, { text: newText })
        .then(res => {
            const newTodos = [...this.state.todos];
            const targetIndex = newTodos.findIndex(v => v.id === id);
            newTodos[targetIndex] = res.data;
            this.setState({
                todos: newTodos,
                editingId: null
            });
        });
    }

    cancelEdit = () => {
        this.setState({
            editingId: null
        });
    }

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        const newDone = !newTodos[targetIndex].isDone;

        ax.put(`/${id}`, { isDone: newDone })
        .then(res => {
            newTodos.splice(targetIndex, 1, res.data);
            this.setState({
                todos: newTodos
            });
        });
    }

    toggleAll = () => {
        const newDone = this.state.todos.some(v => !v.isDone);
        const axArray = this.state.todos.map(v =>
            ax.put(`/${v.id}`, { isDone: newDone })
        );
        axios.all(axArray)
        .then(res => {
            this.setState({
                todos: res.map(r => r.data)
            });
        });
    }

    clearCompleted = () => {
        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(todo => ax.delete(`/${todo.id}`));
        axios.all(axArray)
        .then(() => {
            const newTodos = this.state.todos.filter(v => !v.isDone);
            this.setState({
                todos: newTodos
            });
        });
    }

    changeFilter = filter => {
        this.setState({
            selectedFilter: filter
        });
    }

    render() {
        const {
            todos,
            editingId,
            selectedFilter
        } = this.state;

        const completedLength = todos.filter(v =>v.isDone).length;
        const activeLength = todos.length - completedLength;

        let filteredTodos;
        switch(selectedFilter) {
            case 'Active':
                filteredTodos = todos.filter(v => !v.isDone);
                break;
            case 'Completed':
                filteredTodos = todos.filter(v => v.isDone);
                break;
            case 'All':
            default:
                filteredTodos = todos;
        }

        console.log('render');

        return (
            <div className="todo-app">
                <Header
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                    isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList
                    todos={filteredTodos}
                    deleteTodo={this.deleteTodo}
                    startEdit={this.startEdit}
                    editingId={editingId}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    toggleTodo={this.toggleTodo}
                />
                <Footer
                    activeLength={activeLength}
                    shouldCompletedBtnHidden={!completedLength}
                    clearCompleted={this.clearCompleted}
                    selectedFilter={selectedFilter}
                    changeFilter={this.changeFilter}
                />
            </div>
        );
    }
}

export default App;
