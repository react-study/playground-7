import React from 'react';

class InputBox extends React.Component {

    newData = '';
    isNumber = true;

    componentDidUpdate(prevProps){
        this.newData = '';
        this.isNumber = true;
        this._input.value = '';
    }

    handleKeyDown = e => {
        if ( (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 37 || e.keyCode == 39 ) {
            return;
        }
    	else {
            this.isNumber = false;
        }
    }

    handleKeyUp = e => {
        this.newData = e.target.value;
    }

    handleClick = text => {
        let money = parseInt(this.newData);
        if(!money || !this.isNumber){
            alert('숫자만 입력하세요!');
            this.newData = '';
            this.isNumber = true;
            this._input.value = '';
            return;
        }
        if(text === 'minus'){
            money = money * -1;
        }
        this.props.insertData(money);
    }

    render(){
        return(
            <div className="account-app__header">
                <input
                    type="text"
                    className="account-app__insert"
                    placeholder="숫자를 입력하세요"
                    maxLength="10"
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                    ref={ ref => { this._input = ref; }}
                />
                <button
                    type="button"
                    className="account-app__plus"
                    onClick = {() => this.handleClick('plus')}
                >
                    입금
                </button>
                <button
                    type="button"
                    className="account-app__minus"
                    onClick = {() => this.handleClick('minus')}
                >
                    출금
                </button>
            </div>
        );

    }
}

export default InputBox;
