import React from 'react';

class InputBox extends React.Component {

    constructor() {
        super();
        this.state = {
            inputMoney: 0
        };
    }

    handleChange = e => {
        this.setState({inputMoney: e.target.value});
    };

    transaction = type => {
        console.log('희희' + this.state.inputMoney);

        const inputMoney = Number(this.state.inputMoney);

        if (type == 'DEPOSIT') {
            this.props.deposit(inputMoney);
            this.props.addHistory(inputMoney, 0);
        } else if (type == 'WITHDRAW') {
            if(this.props.withdraw(inputMoney)) {
                this.props.addHistory(0, inputMoney);
            }
        }
        this.setState({inputMoney: 0});
    };

    render() {

        return (
            <div className="form-group">
                <input type="text" className="input-txt" value={this.state.inputMoney} onChange={this.handleChange}/>
                <button type="button" className="btn btn-deposit" onClick={() => this.transaction('DEPOSIT')}>입금
                </button>
                <button type="button" className="btn btn-withdraw" onClick={() => this.transaction('WITHDRAW')}>출금
                </button>
            </div>
        );
    }
}

export default InputBox;
