import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import './pages/homepage/homepage.style.scss';
import ShopPage from './pages/shop/shop.component.jsx';
import SignInUpPage from './pages/sign-in-up/sign-in-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {

      //if there is a userAuth object from google
      //running the createUserProfileDocument function returns the userRef
      //it creates the user in the /user collection if none exists in the database
      //if it exists, it simply returns the userRef
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //calling onSnapshot returns the snapShot of the userRef
        userRef.onSnapshot(snapShot => {
          // console.log(snapShot.data());
          this.setState(
            {
              currentUser: {
                id : snapShot.id,
                ...snapShot.data()
              }
            }
            // , () => {
            // console.log(this.state);
            // }
          )
          // console.log(this.state);
        });
        
      } else {
        this.setState({currentUser:userAuth}); //i.e. set to null if it does not exists
      }
     });
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
