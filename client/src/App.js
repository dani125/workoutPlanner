import React,{useEffect} from 'react';
import './custom.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/landing/Landing';
import Routes from './components/routing/Routes';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App=()=> {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <div className="container-fluid">
   <Router>
    
      <NavBar />
     <div className="container">  
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route component={Routes} />
        
      </Switch>

      </div>
     
    </Router>
    </div>
  
    </Provider>
   
  );
}

export default App;
