import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {
    // constructor() {
    //     super();
    //     this.handleKeyDown = this.handleKeyDown.bind(this);
    // }
    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13) { // 엔터키를 치지 않았거나 텍스트가 없을경우
            return;
        }
        // console.dir(this);
        this.props.addTodo(text);
        e.target.value = '';
    }

    render() {
        const {
            isAllDone,
            toggleAll
        } = this.props;

        return (
            <header>
                <h1 className="todo-app__header">bankit</h1>
                <div>
                    <input type="text" className="input m-r-10" placeholder="0"/>
                    <button className="btn btn-blue m-r-10">입금</button>
                    <button className="btn btn-red m-r-10">출금</button>

                </div>
                {/*<input*/}
                    {/*type="text"*/}
                    {/*className="todo-app__new-todo"*/}
                    {/*placeholder="What needs to be done?"*/}
                    {/*onKeyUp={this.handleKeyDown}*/}
                    {/*// /!* onkeyup, onkeydown, onkeypress - 100ms마다 한번씩 호출됨 *!/*/}
                    {/*// addEventListner*/}
                    {/*// 함수 안에서의 this 는 전역함수다.*/}
                {/*/>*/}
                {/*<button*/}
                    {/*///!*className="toggle-all"*!/*/}
                    {/*// className={`toggle-all${isAllDone ? ' checked' : ''}`}*/}
                    {/*className={ClassNames('toggle-all',{*/}
                        {/*checked: isAllDone*/}
                    {/*})}*/}
                    {/*onClick={toggleAll}*/}
                {/*/>*/}
            </header>
        );
    }
}

export default Header;
