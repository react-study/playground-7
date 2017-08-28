import React from 'react';

class Todo extends React.Component{
    render(){
        return(
            <li className="todo-item">
                <button className="toggle"/>
                <div className="todo-item__view">
                    <div className="todo-item__view__text">
                        {this.props.text}
                    </div>
                    <button
                        className="todo-item__destroy"
                        onClick={this.props.deleteTodo}
                    />
                </div>
                <input type="text" className="todo-item__edit"/>
            </li>
        );
    }
}

export default Todo;