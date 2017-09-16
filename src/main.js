import React from 'react';
import { render } from 'react-dom';
import ReduxMain from './reduxExample/reduxMain';
//
// import {
//     BrowserRouter as Router,
//     Route,
//     Switch
// } from 'react-router-dom';
//
// import App from './App';
//
// ReactDOM.render(
//     <Router>
//         <Switch>
//             <Route exact path="/" component={App} />
//             <Route path="/:filter" component={App} />
//         </Switch>
//     </Router>,
//     document.getElementById('root')
// );


render(
    <ReduxMain/>,
    document.getElementById('root')
);