import React from 'react';

class InputBox extends React.Component {
    constructor() {
        super();
        this.state = {
            input: 0
        }
    }

    handleChange = e => {
        this.setState({ input: e.target.value });
    };

    handleClick = state => {
        if (this.state.input > 0) {
            if (state) {
                this.props.deposit(this.state.input);
            } else {
                this.props.withdrawal(this.state.input);
            }
        }
        this.amountInput.value= '';
        this.setState({ input: 0 })
    };

    render() {
        return (
            <header>
                <h1 className="todo-app__header">bankit</h1>
                <div>
                    <input type="tel" className="input m-r-10" placeholder="0" onChange={this.handleChange} ref={el => this.amountInput = el}/>
                    <button className="btn btn-blue m-r-10" onClick={() => this.handleClick(true)}>입금</button>
                    <button className="btn btn-red m-r-10" onClick={() => this.handleClick(false)}>출금</button>
                </div>
            </header>
        );
    }
}

export default InputBox;
