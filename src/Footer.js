import React from 'react';
import ClassNames from 'classnames';

import { Link } from 'react-router-dom';

class Footer extends React.Component {
    _filterList = ['', 'active', 'completed'];

    render() {
        const {
            clearCompleted,
            activeLength,
            shouldCompletedBtnHidden,
            selectedFilter,
            // changeFilter
        } = this.props;

        const links = this._filterList.map(v => (
            <li key={`filter_${v}`}>
                <Link className={
                    ClassNames({
                        selected: selectedFilter === v
                    })}

                    to={`/${v}`}
                >
                    {v ? v.replace(/^\w/, v => v.toUpperCase()) : 'All'}
                    {/* 정규표현식 사용 */}
                </Link>
            </li>
        ))

        return (
            <div className="footer">
                <span className="todo-count">
                    <strong>{activeLength}</strong>
                    {activeLength === 1 ? ' item' : ' items'} left
                </span>
                <ul className="todo-filters">
                    {links}
                </ul>
                <button
                    className={
                        ClassNames('todo-delete-completed',{
                            hidden: shouldCompletedBtnHidden
                        })
                        //[
                        //'todo-delete-completed',
                      //  shouldCompletedBtnHidden ? ' hidden' : ''
                    //].join('')
                    }
                    onClick={clearCompleted}
                >
                    Clear Completed
                </button>
            </div>
        );
    }
}

export default Footer;
