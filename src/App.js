import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyles } from './components/header/headerStyles';
import MainPage from './components/pages/MainPage';
import PopUp from './components/popUp/PopUp';

function App() {
  const popUp = useSelector((state) => state.popUp);
  return (
    <Router>
      <GlobalStyles isShow={popUp} />
      <div className="App">
        {popUp && <PopUp />}
        <Switch>
          <Route path="/" exact component={MainPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
