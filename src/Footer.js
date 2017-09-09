import React from 'react';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';

class Footer extends React.Component {

    _filterList = ['', 'active', 'completed'];

    render() {
        const {
            activeLength,
            shouldCompletedBtnHidden,
            clearCompleted,
            selectedFilter
        } = this.props;

        const links = this._filterList.map(v => (
            <li key={`filter_${v}`}>
                <Link
                    className={ClassNames({
                        selected: selectedFilter === v
                    })}
                    to={`/${v}`}
                >
                    {v ? v.replace(/^\w/, v => v.toUpperCase()) : 'All'}
                </Link>
            </li>
        ));

        return (
            <div className="footer">
                <span className="todo-count">
                    <strong>{activeLength}</strong>
                    {activeLength === 1 ? ' item ' : ' items '}
                    left
                </span>
                <ul className="todo-filters">
                    {links}
                </ul>
                <button
                    className={ClassNames('todo-delete-completed', {
                        hidden: shouldCompletedBtnHidden
                    })}
                    onClick={clearCompleted}
                >
                    Clear Completed
                </button>
            </div>
        );
    }
}

export default Footer;
