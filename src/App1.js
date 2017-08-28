import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component{
    state = {
        todos : ['첫번째','두번째','세번째','네번째']
    }; //stage-1 을 사용하고 있기 때문에 사용 가능
    /*constructor(){
        super();
        this.state = {
            todos : ['첫번째','두번째','세번째','네번째']
        }
    }*/

    addTodo= text => {
        this.setState({
            todos:[...this.state.todos, text]
        });
    }

    deleteTodo = index => {
        const newTodos = [...this.state.todos];
        newTodos.splice(index,1); // 잘려나간애가 반환된다
        this.setState({
            todos:newTodos
        });
    }

    /*var arr = [10,20,30,40,50];
    var v = arr.push(60);
    console.log(v);  -> length를 가져온다 그래서 결과값 6*/


    render(){
        return(
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo}
                />
                <Footer/>
            </div>
        );
    }
}

export default App;