import React from 'react';
import ClassNames from 'classnames';

/*
 * 1) constructor 에서 //비추
 * constructor() {
 *   super();
 *   this.handleKeyDown = this.handleKeyDown.bind(this);
 * }
 *
 * 2) JSX 내부에서 //많이 쓰임
 * <input onKeyDown = {this.handleKeyDown.bind(this)} />
 *
 * 3) JSX 내부에서 arrow fnc
 * onKeyDown = {e => this.handleKeyDown(e)}
 * - 직접호출하는애는 e fnc이고 handleKeyDown은 메소드로 호출되면서 this를 찾는다
 *
 * 4) class property(es proposal) //gomugom most
 * handleKeyDown = e => {...}
 * - 메소드 자체를 arrow fnc로 만듬,
 *
 * */

class Header extends React.Component {

//4번 방법 사용해서 this binding
    handleKeyDown = e => {
        const text = e.target.value;

        if (!text || e.keyCode !== 13) {
            return;
        }
        this.props.addTodo(text);
        e.target.value = '';
    };

    render() {
        const {
            isAllDone,
            toggleAll
        } = this.props;
        return (
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={this.handleKeyDown}
                />
                <button
                    className={ClassNames(
                        'toggle-all',
                        {
                            checked: isAllDone
                        })}
                    /* className={`toggle-all${isAllDone ? ' checked' : ''}`} */
                    onClick={toggleAll}
                />
            </header>
        );
    }
}

export default Header;
