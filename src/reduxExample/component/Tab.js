import React from 'react';

const tabList = [
    'Lorem ipsum del amot',
    '12312312',
    'dlaskfjksjalkf',
    '한ㄷ그ㅏ렁ㅁ니란ㅁ'
];

const Tab = ({
    focused,
    changeTab
}) => (
    <ul>
        {tabList.map((tab, i) => (
            <li key={`tabList${i}`} onClick={() => changeTab(i)}>
                <span>#{i}</span>{ ' ' }
                <span style={{
                    display: i === focused ? 'block' : 'none'
                }}>
                    {text}
                </span>
            </li>
        ))}
    </ul>
);

export default Tab;