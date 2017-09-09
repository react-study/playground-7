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
            <Links />
            <Route exact path="/" component={Home} /> {/* exact는 정확히 해당 경로와 일치할 경우에만 렌더링 */}
            <Route path="/about" component={About} />
            <Route path="/about/name" component={Name} /> {/* exact가 없으므로 About과 Name 컴포턴트가 모두 렌더링된다. */}
            <Switch>
                <Redirect from="/about/redirect" to="/portfolio/1" /> {/* Redirect는 Switch 컴포넌트로 감싸주어야 정상 동작한다. */}
                <Route exact path="/portfolio" component={Portfolio} /> {/* exact에 유의. */}
                <Route path="/portfolio/:id" component={Portfolio} /> {/* id값 등 동적으로 할당되는 주소값에는 `:` 표기. */}
                {/* id값은 해당 컴포넌트에 `props.match.params.id`로 전달된다. */}
            </Switch>
        </div>
    </Router>
);

export default App;