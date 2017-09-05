import React from 'react';

import Header from './Header';
import BankList from './BankList';
// import TodoList from './TodoList';
// import Footer from './Footer';
//
// import axios from 'axios';


// process.env === 'production' ? 'url//' : 'localhost'
// webpack 내부 또는 외부에서도 설정을 만져야 한다..!! 어렵스.. 라이브러리가 있다고 함!!

class App extends React.Component {

    // constructor () {
    //     super();
    //     this.state = {
    //         todos: ['1번', '2번', '3번', '4번']
    //     }
    // }

    state = {
        todos: [
            {
                text: '배고파',
                id: 1,
                isDone: false
            }, {
                text: '호호',
                id: 2,
                isDone: false
            }, {
                text: '하하',
                id: 3,
                isDone: true
            }
        ],
        editingId: null, // 이 아이디를 넣어서 수정이 될것인지 아닌지를 구분하도록 함.
        selectedFilter: 'All'
    };

    /**
     * Header에서 엔터치면 todo가 입력되는 메서드임.
     * @param text
     */
    addTodo = text => {
        this.setState({
            // todos: [... this.state.todos, text]
            todos: [... this.state.todos, {
                text,
                id: Date.now() // ms단위로 시간을 설정해줌. 로컬에서 테스트할때 사용하기 좋음.
            }]
        })
    };

    deleteTodo = id => {
        // const newTodos = [... this.state.todos];
        // const targetIndex = newTodos.findIndex(v => v.id === id); // find, findIndex값으로 index를 찾아가야함.
        // newTodos.splice(targetIndex, 1);
        // this.setState({
        //     todos: newTodos
        // });
        /**
         * 인덱스를 넘겨받아야함
         * 하지만 이 인덱스로 삭제하는 방법은 좋은 방법이 아님.
         * 필터를 해서 넘겼을때 오동작을 많이 일으킴.
         */

        /**
         * db 활용
         * 서버에서 return되는 값이 없어서 무얼 반환해야하는지 모름.
         * 낙관적 코딩! restfulapi 의 단점..이라구함
         */
        ax.delete(`/${id}`)
            .then(() => {
                const newTodos = [... this.state.todos];
                const targetIndex = newTodos.findIndex(v => v.id === id); // find, findIndex값으로 index를 찾아가야함.
                newTodos.splice(targetIndex, 1);
                this.setState({
                    todos: newTodos
                });
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

        let filteredTodos;
        switch(selectedFilter) {
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
                />
                <BankList/>
            </div>
        );
    }
    }

export default App;

/**
 * toggleAll의 기능 :
 * 전부 true 인 경우에만 false로
 * 아닐경우 true로 변환
 * >>> array.some을 사용해보자!!
 *
 * arr.some(v => !v) -> 일부라도 성립하면 true / 전부 성립하지 않으면 false (or 개념)
 * arr.every(v => !v) -> 전부 성립하면 true / 일부라도 성립하지 않으면 false (and 개념)
 *
 * 상황에 따라, 어느 시점에 판단이 간으한지에 따라 달라집니다.
 *
 * 중간에 빠져 나오고 싶으면 some
 *
 * 배열을 처리하기 위한 필수 메서드
 * foreach
 * map
 * filter
 * every
 * some
 *
 */
