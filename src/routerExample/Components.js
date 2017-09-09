import React from 'react';

export const Home = () => (<h2>HOME</h2>);

export const About = ({ children }) => (
    <div>
        <h2>About</h2>
        {children ? <div>{children}</div> : null}
    </div>
);

export const Name = () => (<h3>리액트스터디</h3>);

const portfolioList = [
    { id: '0', text: 'Portfolio #0. 포트폴리오 첫작품입니다아..'},
    { id: '1', text: 'Portfolio #1. 포트폴리오 두번째!'}
];

export const Portfolio = ({ match }) => {
    const filteredList = (match.params && match.params.id)
        ? portfolioList.filter(v => v.id === match.params.id)
        : portfolioList;
    const renderList = filteredList.map(v => (
        <li key={v.id}>{v.text}</li>
    ));
    return (
        <div>
            <h2>Portfolio</h2>
            <ul>{renderList}</ul>
        </div>
    );
}