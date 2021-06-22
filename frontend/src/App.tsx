import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const { REACT_APP_PUBLIC_URL } = process.env;

// Dynamically loaded page example
const Home = loadable(() => import('./Home'), {
  fallback: <div>Loading...</div>,
});

const App: React.FC = () => (
  <Router basename={REACT_APP_PUBLIC_URL}>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
