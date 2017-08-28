import React from 'react';

class Header extends React.Component{

    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13){
            return;
        }
        //console.log(this); this 는 윈도우 .리액트에서 this를 찾을수 없을 때 null이 나온다
        this.props.addTodo(text);
        e.target.value = '';
    }
    render(){
        return(
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyDown={this.handleKeyDown}
                />
                <button className="toggle-all"/>
            </header>
        );
    }
}


// 형제끼리 통신 안됨.부모로 가서 설정하고 받아야함 App.js

export default Header;

/* this 바인딩하는 네가지 방법

(1). constructor 내부에서 바인딩한다  => 단점 : this 반복이 많아진다 , 소스가 길어진다 (비추천)
prototype O / instance 0

constructor(){
    super();
    this.handleKeyDown=this.handleKeyDown.bind(this); //인스턴스 자기자신에게 새로운 프로퍼티를 추가해줌
    this.abc=this.abc.bind(this);
    this.def=this.def.bind(this);
}

(2). jsx 내부에서 바인딩 (제일 많이 쓰임 . 협업하기 좋음 알아보기 좋음.)
prototype O / instance X  바인딩을 매번 새로함

onKeyDown={this.handleKeyDown.bind(this)}

(3) jsx 내부에서 arrow function 활용 (쓰기에 나쁘지 않음)
prototype 0 / instance X 함수를 한번 더 감쌈

onKeyDown={e => this.handleKeyDown(e)}

(4) class property 기능(es proposal) - arrow function 사용 (강사님이 추천하는 방식)
메소드 자체를 arrow function으로 만든다.
prototype X / instance O

handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13){
            return;
        }
    }

*/




