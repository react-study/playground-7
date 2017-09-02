import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import axios from 'axios';

//axios 상속 인스턴스 (서버URL 지정)
const ax = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos : [],
            editingId: null,
            selectedFilter: 'All'
        }
        ax.get('/')
        .then( res => {
            this.setState({
                todos: res.data
            });
        });
    }

    addTodo = text => {
        ax.post('/', { text })
        .then(res => {
            this.setState({
                todos: [... this.state.todos, res.data]
            });
        });

        // this.setState({
        //     todos: [...this.state.todos, {
        //         text,
        //         id: Date.now()
        //     }]
        // });
    }

    deleteTodo = id => {
        ax.delete(`/${id}`)
        .then( () => {
            //기존 소스
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
        ax.put(`/${id}`,{text:newText})
        .then(res => {
            const newTodos = [...this.state.todos];
            const targetIndex = newTodos.findIndex(v => v.id === id);
            newTodos[targetIndex] = res.data; //덮어 씌움

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

        ax.put(`/${id}`,{isDone: newDone})
        .then(res=> {
            newTodos.splice(targetIndex, 1, res.data); // == newTodos[targetIndex] = res.data
            this.setState({
                todos: newTodos
            });
        });

        // newTodos[targetIndex] = Object.assign({},newTodos[targetIndex], {
        //     isDone: !newTodos[targetIndex].isDone
        // });
        // this.setState({
        //     todos: newTodos
        // });
    }

    toggleAll = () => {
        const newDone = this.state.todos.some( v => !v.isDone );
        const axArray = this.state.todos.map( v=> ax.put(`/${v.id}`, {isDone: newDone}) );

        axios.all(axArray)
        .then(res => {
            this.setState({
                todos: res.map(r => r.data)
            });
        });

        // const newTodos = this.state.todos.map( v=> Object.assign({}, v, {isDone: newDone}) );
        // this.setState({
        //     todos: newTodos
        // });
    }

    clearCompleted = () => {
        const axArray = this.state.todos
            .filter(v=>v.isDone)
            .map(todo => ax.delete(`/${todo.id}`)); //DB요청

        axios.all(axArray)
        .then(res => { //DB요청 완료후 로컬 화면 처리
            const newTodos = this.state.todos.filter( v => !v.isDone );
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

        const completedLength = todos.filter( v => v.isDone ).length;
        const activeLength = todos.length - completedLength;
        let filteredTodos;

        switch(selectedFilter) {
            case 'Active':
                filteredTodos = todos.filter( v => !v.isDone );
                break;
            case 'Completed':
                filteredTodos = todos.filter( v => v.isDone );
                break;
            case 'All':
            default:
                filteredTodos = todos;
        }

        return (
            <div className="todo-app">
                <Header
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                    isAllDone={todos.every( v => v.isDone )}
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
