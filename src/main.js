import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router, // HashRouter as Router
    Route,
    Switch
} from 'react-router-dom';

import App from './App';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />{/* Router가 관여하는 부분은 only App */}
            <Route exact path="/:filter" component={App} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
