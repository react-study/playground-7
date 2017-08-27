import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {

  state = {
      todos : [{
          text: '배고파1',
          isDone: false,
          id: 1111
      },{
          text: '배고파2',
          isDone: false,
          id: 2222
      },{
          text: '배고파3',
          isDone: true,
          id: 3333
      },{
          text: '배고파4',
          isDone: false,
          id: 4444
      },{
          text: '배고파5',
          isDone: true,
          id: 5555
      }],

      editingId: null,
      selectedFilter: 'All'
  };

    addTodo = text => {
        this.setState({
            todos: [... this.state.todos, {
                text,
                id: Date.now()
            }]
        });
    }

    deleteTodo = id => {
        const newTodos = [... this.state.todos];
        const targetIndex = newTodos.findIndex( v => v.id ===id );
        newTodos.splice(targetIndex, 1);
        this.setState({
            todos: newTodos
        });
    }

    startEdit = id => {
        this.setState({
            editingId : id
        });
    }

    saveTodo = (id, newText) => {
        const newTodos = [... this.state.todos];
        const targetIndex = newTodos.findIndex( v => v.id ===id );
        // newTodos[targetIndex].text = newText;
        // (X) state ㄴ내부를 직접 바꾸는 결과가 되므로 지양하자.
        // state를 바꾸는게 된다 [] 안에 {} 참조
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
            text: newText
        });
        this.setState({
            todos: newTodos,
            editingId: null
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
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
            isDone: !newTodos[targetIndex].isDone
        });
        this.setState({
            todos: newTodos
        });
    }

    toggleAll = () => {
        const newDone = this.state.todos.some( v => !v.isDone);
        const newTodos = this.state.todos.map( v => Object.assign({}, v, {
            isDone : newDone
        })); // map은 새로울 배열을 만드는 것
        this.setState({
            todos: newTodos
        });
    }

    clearCompleted = () => {
        /* 완료된 애들은 지워라 === 완료되지 않은 애들은 남겨라 */
        const newTodos = this.state.todos.filter( v => !v.isDone);
        // 조건을 충족한 애들만으로 새로운 배열을 만들어줌
        this.setState({
            todos: newTodos
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

        const completedLength = todos.filter(v => v.isDone).length;
        const activeLength = todos.length - completedLength;

        let filteredTodos;
        switch(selectedFilter){
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
                    changeFilter = {this.changeFilter}
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
