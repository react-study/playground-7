import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {

    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13){
            return;
        }
        this.props.addTodo(text);
        e.target.value ='';
    }

    render(){
        const {
            isAllDone,
            toggleAll
        } = this.props;
        return(
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={this.handleKeyDown}
                />

                {/*<button
                    className={`toggle-all${isAllDone ? ' checked' : ''}`}
                    onClick = {toggleAll}
                /> */}
                <button
                    className={ClassNames('toggle-all', {
                        checked: isAllDone
                    })}
                    onClick = {toggleAll}
                />

            </header>
        );
    }
}

export default Header;
