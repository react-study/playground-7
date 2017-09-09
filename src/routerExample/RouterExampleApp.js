import React from 'react';
import {
    BrowserRouter as Router, // HashRouter, BrowserRouter 중 하나 사용.
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import Links from './Links';
import { Home, About, Name, Portfolio } from './Components';

const App = () => (
    <Router>
        <div> {/* Router 컴포넌트의 자식요소에는 오직 하나의 컴포넌트만 올 수 있다. */}
            {/* HEADER tag 를 links.js로 이동 */}
            <Links />
            {/*links는 늘 보여지게 된다. Route로 감싸지 않아서*/}
            <Route exact path="/" component={Home} /> {/* exact는 정확히 해당 경로와 일치할 경우에만 렌더링 */}
            <Route path="/about" component={About} />
            <Route path="/about/name" component={Name} /> {/* exact가 없으므로 About과 Name 컴포턴트가 모두 렌더링된다. */}
                {/* 위에거는 name컴퍼넌트가 about의 children 이다?!?!?!*/}
            <Switch>
                {/* 3개중 하나만 보여주게 됨 */}
                <Redirect from="/about/redirect" to="/portfolio/1" /> {/* Redirect는 Switch 컴포넌트로 감싸주어야 정상 동작한다. */}
                {/* Redirect는 from 에서 오는 경우 to 로 보내버림 */}
                <Route exact path="/portfolio" component={Portfolio} /> {/* exact에 유의. */}
                <Route path="/portfolio/:id" component={Portfolio} /> {/* id값 등 동적으로 할당되는 주소값에는 `:` 표기. */}
                {/* id값은 해당 컴포넌트에 `props.match.params.id`로 전달된다. */}
                {/* id를 parameter로 보냄 query문 사용 쩝?*/}
            </Switch>
        </div>
    </Router>
);

export default App;