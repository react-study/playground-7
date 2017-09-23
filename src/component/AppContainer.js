import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

import TodoAction from '../action/TodoAction';

const mapStateToProps = state => ({
    todos: state.todos,
    editingId: state.editingId
});
const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(TodoAction.getTodos()),
    addTodo: (text) => dispatch(TodoAction.addTodo(text)),
    deleteTodo: (id) => dispatch(TodoAction.deleteTodo(id)),
    startEdit: (id) => dispatch(TodoAction.startEdit(id)),
    saveTodo: (id, newText) => dispatch(TodoAction.saveTodo(id, newText)),
    cancelEdit: () => dispatch(TodoAction.cancelEdit()),
    toggleTodo: (id) => dispatch(TodoAction.toggleTodo(id)),
    toggleAll: () => dispatch(TodoAction.toggleAll()),
    clearCompleted: () => dispatch(TodoAction.clearCompleted()),
});

class App extends React.Component {
    componentWillMount(){
        this.props.getTodos();
    }

    render() {
        const {
            todos,
            editingId,
            match: { params },
            addTodo,
            toggleAll,
            deleteTodo,
            startEdit,
            saveTodo,
            cancelEdit,
            toggleTodo,
            clearCompleted
        } = this.props;

        const selectedFilter = params && params.filter || '';

        const completedLength = todos.filter(v =>v.isDone).length;
        const activeLength = todos.length - completedLength;

        let filteredTodos;
        switch(selectedFilter) {
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
                    addTodo={addTodo}
                    toggleAll={toggleAll}
                    isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList
                    todos={filteredTodos}
                    deleteTodo={deleteTodo}
                    startEdit={startEdit}
                    editingId={editingId}
                    saveTodo={saveTodo}
                    cancelEdit={cancelEdit}
                    toggleTodo={toggleTodo}
                />
                <Footer
                    activeLength={activeLength}
                    shouldCompletedBtnHidden={!completedLength}
                    clearCompleted={clearCompleted}
                    selectedFilter={selectedFilter}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);