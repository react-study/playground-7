import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import axios from 'axios'; // axios도 인스턴스

const ax = axios.create({
    // process.env === 'production' ? 'http://naver.com/todos' : 'http://localhost:2403/todos';
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000 // 1초가 지나면 에러로 간주
});

class App extends React.Component {

    constructor(){
        super();
        this.state = {
            todos : [],
            editingId: null
        };

        // 전체 데이터 가져오기
        //axios.get('http://localhost:2403/todos')
        ax.get('/')
        .then(res => {
            //console.log(res);
            this.setState({
                todos: res.data
            });
        });
    }

    addTodo = text => {
        // state를 바꿔주면 됐는데
        // server 요청하고 -> res오면 -> 그제서야 반영
        // server에서 에러가 나면 -> 화면에도 반영하지 말아야 합니다.

        //axios.post('http://localhost:2403/todos', { text }) // text:text data short
        ax.post('/', { text })
        .then(res => {
            console.log(res.data);
            this.setState({
                todos: [ ... this.state.todos, res.data]
            });
        })
    }

    deleteTodo = id => {
        // 서버에서 return되는 값이 없다
        // id 삭제 => 삭제 성공하면, 무얼 봔환해야 하지? 할게 없는 상황...
        // 낙관적으로 믿고 따르는 수밖에...

        //axios.delete(`http://localhost:2403/todos/${id}`)
        ax.delete(`/${id}`)
        .then(() => {
            const newTodos = [... this.state.todos];
            const targetIndex = newTodos.findIndex( v => v.id ===id );
            newTodos.splice(targetIndex, 1);
            this.setState({
                todos: newTodos
            });
        });
    }

    startEdit = id => {
        this.setState({
            editingId : id
        });
    }

    saveTodo = (id, newText) => {
        ax.put(`/${id}`, {text: newText}) // 전체가 아니라 바꾸고 싶은 부분만
        .then(res => {
            const newTodos = [... this.state.todos];
            const targetIndex = newTodos.findIndex( v => v.id ===id );
            newTodos[targetIndex] = res.data;
            this.setState({
                todos: newTodos,
                editingId: null
            });
        });
    }

    cancelEdit = () => {
        console.log('canceled');
        this.setState({
            editingId: null
        });
    }

    toggleTodo = id => {
        const newTodos = [... this.state.todos];
        const targetIndex = newTodos.findIndex( v => v.id ===id );
        const newDone = !newTodos[targetIndex].isDone;

        ax.put(`/${id}`, { isDone: newDone })
        .then(res => {
            newTodos.splice(targetIndex, 1, res.data);
            //newTodos[targetIndex] = res.data;
            this.setState({
                todos: newTodos
            });
        });
    }

    toggleAll = () => {
        const newDone = this.state.todos.some( v => !v.isDone);
        const axArray = this.state.todos.map( v =>
            ax.put(`/${v.id}`, { isDone: newDone })
        );
        axios.all(axArray) // promise all과 같은 녀석 동작이 똑같이 됨
        .then(res => {
            //console.log(res);
            this.setState({
                todos: res.map(r => r.data)
            });
        });

        /* 하나씩 바뀜 나쁨
        todos[0].isDone => newDone // res setState
        todos[1].isDone => newDone // res setState
        todos[2].isDone => newDone // res setState
        res만 한데 묶어서 처리
        request를 여러번 날리고 response는 기다렸다가 다 돌아오면 묶어서 처리

        // ax.put => Promise instance
        // 요청은 각자 하더라도, resㄴㄴ 한데 묶어서 처리해보자
        Promise.all([promise, promise, promise])
        .then(responses => {
            responses === [res, res, res]
        })
        .catch(errors => {
            errors === [err, err, err]
        })

        axios.all([ax.put(), ax.put(), ... ])
        .then(data => {
            data === [res, res, res]
        })
        .catch(errors => {
            errors === [err, err, err]
        })
        */
    }

    clearCompleted = () => {
        // bluebird, superagent, fetch
        const axArray = this.state.todos
            .filter(v => v.isDone)
            .map(todos => ax.delete(`/${todos.id}`));

        axios.all(axArray)
        .then(() => {
            const newTodos = this.state.todos.filter(v => !v.isDone);
            this.setState({
                todos: newTodos
            });
        });
    }

    render() {
        const {
            todos,
            editingId
        } = this.state;

        const { match: { params }} = this.props;
        const selectedFilter = params && params.filter || '';

        const completedLength = todos.filter(v => v.isDone).length;
        const activeLength = todos.length - completedLength;

        let filteredTodos;
        switch(selectedFilter){
            case 'active':
                filteredTodos = todos.filter(v => !v.isDone);
                break;
            case 'completed':
                filteredTodos = todos.filter(v => v.isDone);
                break;
            case '':
            default:
                filteredTodos = todos;
        }

        return (
            <div className="todo-app">
                <Header
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                    isAllDone = {todos.every(v => v.isDone)} //flag 하나 헤더에게 넘겨줌
                />
                <TodoList
                    todos={filteredTodos}
                    deleteTodo={this.deleteTodo}
                    startEdit = {this.startEdit}
                    editingId = {editingId}
                    saveTodo = {this.saveTodo}
                    cancelEdit = {this.cancelEdit}
                    toggleTodo = {this.toggleTodo}
                />
                <Footer
                    activeLength = {activeLength}
                    shouldCompletedBtnHidden = {!completedLength}
                    clearCompleted = {this.clearCompleted}
                    selectedFilter = {selectedFilter}
                />
            </div>
        );
    }
}

export default App;

/*
toggleAll의 기능:
전부 true인 경우에만 false로.
하나라도 false인 경우에는 true로.
some()
*/
