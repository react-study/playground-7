import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component{
    render(){
        return(
            <div className="todo-app__main">
                <ul className="todo-list">
                    {this.props.todos.map((v,i) => (
                        <Todo
                            key={`todo#${i}`}
                            text={v}
                            deleteTodo={this.props.deleteTodo}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;