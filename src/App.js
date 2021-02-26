import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import './pages/homepage/homepage.style.scss';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(user => {
      this.setState({currentUser:user});
      console.log(user);
     })
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (
      <div>
        <Header currentUser ={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
