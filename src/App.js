import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:2403/todos'
})

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            todos: [],
            editingId: null, //수정이 진행되고있는 todo li 의 id
            selectedFilter: 'All'
        };
        ax.get('/')
            .then(res => {
                this.setState({
                    todos: res.data
                })
            });
    }

    componentWillMount() {
        //에서 최초 get을 보내주면 성능향상이 될 수도 있다
    }

    //arr.push(), shift()의 return은 arr.length -> 추가는 length반환
    //arr.pop(), unshift()의 return은 pop된 elem -> 삭제는 elem반환

    //text를 받아서 todos한테 하나를 push해주는 동작을 하는 메소드
    addTodo = text => {
        //state를 직접 변환하지 말 것
        // 1)
        //this.state.todos.push(text);
        //const newTodos = this.state.todos.slice(); //잘라붙이기 배열복사 1
        //newTodos.push(text);

        // 2)
        //const newTodos = [...this.state.todos, text]; //spread operator 배열복사 2
        //newTodos.push();

        ax.post('/', {text: text})
            .then(res => {
                this.setState({
                    todo: [...this.state.todos, res.data]
                });
            });

        /* this.setState({
         todos: this.state.todos
         3)
         todos: [...this.state.todos, {
         text, //text: text
         id: Date.now() //local에서 할 때 유용한 방법
         }]
         })
         */
    };

    //대부분의 메소드들의 형태가 deleteTodo와 비슷할 것입니다다다다
    deleteTodo = id => {
        // 실행 후 서버에서 return되는 값이 없다
        // 근거가 없덩

        ax.delete(`/${id}`)
            .then(() => {
                const newTodos = [...this.state.todos];
                const targetIndex = newTodos.findIndex(v => v.id === id);
                //배열안에 요소를 찾아서 index를 리턴 해줌

                newTodos.splice(targetIndex, 1); //배열이니 처리는 index로 하는게 편해어
                this.setState({
                    todos: newTodos
                })
            });
    };

    startEdit = id => {
        this.setState({
            editingId: id
        })
    };

    cancelEdit = () => {
        this.setState({
            editingId: null
        })
    };

    saveTodo = (id, newText) => {
        ax.put(`/${id}`, {text: newText})
            .then(res => {
                const newTodos = [...this.state.todos];
                const targetIndex = newTodos.findIndex(v => v.id === id);

                // newTodos[targetIndex].text = newText;
                // ==> (X) state 내부를 직접 바꾸는 결과가 되므로 지양하자
                /*
                 newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
                 text: newText
                 });
                 */
                newTodos[targetIndex] = res.data;
                this.setState({
                    todos: newTodos,
                    // editingId: null
                })
            })

    };

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        const newDone = !newTodos[targetIndex].isDone;

        ax.put(`/${id}`, {isDone: newDone})
            .then(res => {
                newTodos.splice(targetIndex, 1, res.data); //saveTodo와 동일한 방법
                this.setState({
                    todos: newTodos
                })
            });

        /* 서버 적용 전
         newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
         isDone: !newTodos[targetIndex].isDone
         });
         this.setState({
         todos: newTodos
         })
         */
    };

    toggleAll = () => {
        const newDone = this.state.todos.some(v => !v.isDone);
        const axArray = this.state.todos.map(v =>
            ax.put(`/${v.id}`, {isDone: newDone})
        );

        axios.all(axArray)
            .then(res => {
                this.setState({
                    todos: res.map(r => r.data)
                });
            });

        // request는 각자 하고 response는 한데 묶어서 처리해 보자
        /*

         [ES6 promise]

         Promise.all([promise, promise, promise])
         .then(response => {
         response === [res, res, res]
         })
         .catch(errors => {
         errors === [error, error, error]
         })

         axios.all([ax.put(), ax.put(), ax.put(), ...])
         .then(data => {
         data === [res, res,res, ...]
         })
         ...
         */

        /* 서버 적용 이전
         const newTodos = this.state.todos.map(v =>
         Object.assign({}, v,
         {isDone: newDone}
         ));
         this.setState({
         todos: newTodos
         });
         */

    };

    clearCompleted = () => {
        //    완료된 애들은 지워라 === 완료되지 않은 애들만 남겨라
        const axArray = this.state.todos.filter(v => v.isDone).map(todo => ax.delete(`/${todo.id}`));

        axios.all(axArray)
            .then(() => {
                const newTodos = this.state.todos.filter(v => !v.isDone);
                this.setState({
                    todos: newTodos
                })
            });
    };

    changeFilter = filter => {
        this.setState({
            selectedFilter: filter
        })
    };

    render() {
        const {
            todos,
            editingId,
            selectedFilter
        } = this.state;

        const completedLength = todos.filter(v => v.isDone).length;
        const activeLength = todos.length - completedLength;

        let filteredTodos = todos;
        switch (selectedFilter) {
            case 'Active':
                filteredTodos = todos.filter(v => !v.isDone);
                break;
            case 'Completed':
                filteredTodos = todos.filter(v => v.isDone);
                break;
            default:
                filteredTodos = todos;
        }

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

/*
 toggleAll의 기능 :
 전부 true인 경우에만 false로
 하나라도 false인 경우에는 true로

 array method
 some - or의 개념
 every - and의 개념
 상황에 따라 어느 시점에 판단이 가능한지에 따라 달라집니다
 */