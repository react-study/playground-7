import React from 'react';

const tabList = [
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, veritatis!',
    'Qui tempore aspernatur rem, ipsum sunt laboriosam tempora corrupti fuga?',
    'Ut aut fuga porro qui aliquid. Necessitatibus quos fuga ullam.',
    'Deserunt itaque obcaecati corporis similique doloribus iusto dolores cumque assumenda.',
];

const Tab = ({
    focused,
    changeTab
}) => (
    <ul>
        {tabList.map((text, i) => (
            <li key={`tabList${i}`} onClick={() => changeTab(i)}>
                <span>#{i}</span>{' '}
                <span style={{
                    display: i === focused ? 'block' : 'none'
                }}>{text}</span>
            </li>
        ))}
    </ul>
);
export default Tab;