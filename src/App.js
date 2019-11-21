import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyles } from './components/header/headerStyles';
import MainPage from './components/pages/MainPage';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
