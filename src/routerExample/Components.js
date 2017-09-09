import React from 'react';

export const Home = () => (<h2>HOME</h2>);
export const About = ({ children }) => ( // props의 children만
    <div>
        <h2>About</h2>
        {children? <div>{children}</div> : null}
    </div>
);

export const Name = () => (<h2>리액트스터디</h2>);

const portfolioList = [
    { id:'0', text: 'Portfolio #0. 포트폴리오 첫번째 작품입니다.'},
    { id:'1', text: 'Portfolio #1. 포트폴리오 두번째 작품입니다.'}
];

export const Portfolio = ({ match }) => { // router에서 내려주는 props 중의 하나
    const filteredList = (match.params && match.params.id)
        ? portfolioList.filter(v => v.id === match.params.id)
        : portfolioList;
    const renderList = filteredList.map(v => (
        <li key={v.id}>{v.text}</li>
    ));
    return(
        <div>
            <h2>Portfolio</h2>
            <ul>{renderList}</ul>
        </div>
    );
}

// export default Component; import 아무이름 from './Component'; only default만 아무이름
// Component.js
// export const ABC;
// export function aaa()();
// import { ABC, aaa } from './Component';
// import { ABC as A, aaa as abc } from './Component';
// <A />
// abc(); (0)
// aaa() : (x)
