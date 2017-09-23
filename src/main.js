import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

import App from './component/AppContainer';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/:filter" component={App}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
