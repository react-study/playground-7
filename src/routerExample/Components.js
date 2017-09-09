import React from 'react';

// stateless component / functional component
export const Home = () => (<h2>Home</h2>);

export const About = ({children}) => (
    <div>
        <h2>About</h2>
        {children ? <div>{children}</div> : null}

    </div>
);
//ㅍ라우트가 children이라는 값을 내려줄것임 내려주면 보여주고 안내려주면 안보여줌!
// 원래 props.children이라고 해야하지만 받아오는 props가 하나밖에 없으면 children이라고 사용해도 무관함.

export const Name = () => (<h3>react 스터디</h3>);

const portfolioList = [
    {id : 0, text: 'pf#0 helloooo'},
    {id : 1, text: 'pf#1 holalalalala'},
];
// 배열 안에 객체

export const Portfolio = ({match}) => {
    const filteredList = (match.params && match.params.id)
        ? portfolioList.filter(v => v.id == match.params.id)
        : portfolioList;
    const renderList = filteredList.map(v => (
        <li key={v.id}>{v.text}</li>
    ));
    return (
        <div>
            <h2>Portfolio</h2>
            <ul>{renderList}</ul>
        </div>
    )
};