import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { GlobalStyles } from './components/header/headerStyles';
import MainPage from './components/pages/MainPage';
import PopUp from './components/popUp/PopUp';
import MainProfile from './components/pages/MainProfile';
import ProtectedRouter from './components/actions/protectedRouter';
import Header from './components/header/Header';


function App() {
  const popUp = useSelector((state) => state.popUp);
  const activeUser = useSelector((state) => state.currentUser);
  return (
    <Router>
      <GlobalStyles isShow={popUp} />
      <div className="App">
        <Header />
        {popUp && <PopUp />}
        <Switch>
          <Route path="/" exact component={MainPage} />
          <ProtectedRouter path="/profile" isAuth={activeUser.isLogIn}>
            <MainProfile />
          </ProtectedRouter>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
