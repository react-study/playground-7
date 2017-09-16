import React, { Component } from 'react';

class InputBox extends Component {
    calc = type => {
        this.props.calc(type, this._input.value);
        this._input.value = '';
        this._input.focus();
    };

    render() {
        return (
            <div>
                <input type="text" ref={ref => {this._input = ref;}} />
                <button
                    onClick={() => this.calc('save')}
                >입금</button>
                <button
                    onClick={() => this.calc('withdraw')}
                >출금</button>
            </div>
        )
    }
}

export default InputBox;