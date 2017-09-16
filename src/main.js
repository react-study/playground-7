/* import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import App from './App';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/:filter" component={App}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);
*/

import React from 'react';
import { render } from 'react-dom';
import App from './reduxExample/App';

render(
    <App/>,
    document.getElementById('root')
);