import React from 'react';
import ClassNames from 'classnames';

class Footer extends React.Component {

    _filterList = ['All', 'Active', 'Completed'];

    render() {
        const {
            activeLength,
            shouldCompletedBtnHidden,
            clearCompleted,
            selectedFilter,
            changeFilter
        } = this.props;

        const links = this._filterList.map(v => (
            <li key={`filter_${v}`}>
                <a
                    className={ClassNames({
                        selected: selectedFilter === v
                    })}
                    onClick={() => changeFilter(v)}
                >
                    {v}
                </a>
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
