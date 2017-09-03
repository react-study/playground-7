import React from 'react';
import ClassNames from 'classnames'; 

class Header extends React.Component {

    handleClick = (sign) => {
        const cash = parseInt(this._input.value);
        this.props.addCashList(cash,sign);
        this._input.value = '';
    }


    render() {
        return (
            <div>
                <h1 className="cashbook_title">Cashbook</h1>
                <input
                    type="text"
                    className="input_cash"
                    placeholder="금액입력"
                    ref={ref=>{this._input=ref}}
                />
                <button className='button_action' onClick={()=>this.handleClick('+')}>입금</button> 
                <button className='button_action' onClick={()=>this.handleClick('-')}>출금</button>
                
            </div>
        );
    }
}

export default Header;